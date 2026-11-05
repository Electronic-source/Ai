import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { geoDistance, geoEquirectangular, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import topo from 'world-atlas/countries-110m.json';
import { COUNTRIES } from '../data/countries.js';

const TEX_W = 2048;
const TEX_H = 1024;

function latLonToVec3(lat, lon, r = 1) {
  const phi = ((lon + 180) / 360) * Math.PI * 2;
  const theta = ((90 - lat) / 180) * Math.PI;
  return new THREE.Vector3(
    -r * Math.cos(phi) * Math.sin(theta),
    r * Math.cos(theta),
    r * Math.sin(phi) * Math.sin(theta),
  );
}

function buildTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = TEX_W;
  canvas.height = TEX_H;
  const ctx = canvas.getContext('2d');

  /* deep ocean with a soft equator glow */
  const ocean = ctx.createLinearGradient(0, 0, 0, TEX_H);
  ocean.addColorStop(0, '#08101f');
  ocean.addColorStop(0.42, '#0a1526');
  ocean.addColorStop(0.5, '#0d1c31');
  ocean.addColorStop(0.58, '#0a1526');
  ocean.addColorStop(1, '#08101f');
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, TEX_W, TEX_H);

  const projection = geoEquirectangular()
    .translate([TEX_W / 2, TEX_H / 2])
    .scale(TEX_W / (2 * Math.PI));
  const path = geoPath(projection, ctx);

  /* graticule */
  ctx.beginPath();
  path(geoGraticule10());
  ctx.strokeStyle = 'rgba(126, 214, 255, 0.10)';
  ctx.lineWidth = 1;
  ctx.stroke();

  const countries = feature(topo, topo.objects.countries).features;

  /* land fill — vertical gradient so the northern hemisphere reads brighter */
  const land = ctx.createLinearGradient(0, 0, 0, TEX_H);
  land.addColorStop(0, '#1c3350');
  land.addColorStop(0.5, '#16283f');
  land.addColorStop(1, '#122134');
  for (const f of countries) {
    ctx.beginPath();
    path(f);
    ctx.fillStyle = land;
    ctx.fill();
  }

  /* coastlines: outer glow then crisp stroke */
  for (const f of countries) {
    ctx.beginPath();
    path(f);
    ctx.strokeStyle = 'rgba(124, 246, 196, 0.22)';
    ctx.lineWidth = 3.2;
    ctx.stroke();
  }
  for (const f of countries) {
    ctx.beginPath();
    path(f);
    ctx.strokeStyle = 'rgba(168, 255, 219, 0.55)';
    ctx.lineWidth = 1.15;
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

const GLOBE_VERT = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const GLOBE_FRAG = `
  uniform sampler2D uMap;
  uniform float uTime;
  uniform vec3 uRim;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vec3 base = texture2D(uMap, vUv).rgb;
    vec3 lightDir = normalize(vec3(-0.45, 0.55, 0.85));
    float diff = clamp(dot(vNormal, lightDir), 0.0, 1.0);
    float shade = 0.55 + 0.7 * diff;
    float rim = pow(1.0 - clamp(dot(vNormal, vView), 0.0, 1.0), 2.6);
    float sweep = smoothstep(0.86, 1.0, sin((vUv.x * 6.28318) - uTime * 0.45) * 0.5 + 0.5);
    vec3 color = base * shade + uRim * rim * 1.15 + uRim * sweep * 0.045;
    gl_FragColor = vec4(color, 1.0);
  }
`;

const HALO_VERT = `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const HALO_FRAG = `
  uniform vec3 uRim;
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float rim = clamp(0.62 - dot(vNormal, vView), 0.0, 1.0);
    float intensity = pow(rim, 3.2);
    float pulse = 0.85 + 0.15 * sin(uTime * 1.2);
    gl_FragColor = vec4(uRim, 1.0) * intensity * pulse;
  }
`;

function webglAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')));
  } catch {
    return false;
  }
}

export default function Globe({ selected, onPick, onHover, labels = {}, reduced = false }) {
  const mountRef = useRef(null);
  const stateRef = useRef({});
  const [ready, setReady] = useState(false);
  const [supported] = useState(() => (typeof document === 'undefined' ? false : webglAvailable()));

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || !supported) return undefined;

    let raf = 0;
    let disposed = false;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.35, 3.35);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.style.cursor = 'grab';

    const root = new THREE.Group();
    root.rotation.z = -0.06;
    root.rotation.x = 0.18;
    scene.add(root);

    const accent = new THREE.Color('#7cf6c4');
    const iris = new THREE.Color('#8b7cff');
    const coral = new THREE.Color('#ff9a72');

    /* — sphere — */
    const texture = buildTexture();
    const globeMat = new THREE.ShaderMaterial({
      uniforms: { uMap: { value: texture }, uTime: { value: 0 }, uRim: { value: new THREE.Color('#5fe7c0') } },
      vertexShader: GLOBE_VERT,
      fragmentShader: GLOBE_FRAG,
    });
    const globe = new THREE.Mesh(new THREE.SphereGeometry(1, 96, 96), globeMat);
    root.add(globe);

    /* — atmosphere halo — */
    const halo = new THREE.Mesh(
      new THREE.SphereGeometry(1.135, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: { uRim: { value: new THREE.Color('#5fe7c0') }, uTime: { value: 0 } },
        vertexShader: HALO_VERT,
        fragmentShader: HALO_FRAG,
        blending: THREE.AdditiveBlending,
        transparent: true,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    );
    root.add(halo);

    /* — stars — */
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1400;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 5 + Math.random() * 9;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      starPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      starPos[i * 3 + 1] = r * Math.cos(ph);
      starPos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xdcefff, size: 0.05, transparent: true, opacity: 0.75, depthWrite: false, sizeAttenuation: true }),
    );
    scene.add(stars);

    /* — markers — */
    const markerGeo = new THREE.SphereGeometry(0.0125, 10, 10);
    const hitGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const markers = [];
    const hits = [];
    for (const c of COUNTRIES) {
      const pos = latLonToVec3(c.lat, c.lon, 1.008);
      const dot = new THREE.Mesh(markerGeo, new THREE.MeshBasicMaterial({ color: accent.clone().lerp(new THREE.Color('#eafff7'), 0.35), transparent: true, opacity: 0.85 }));
      dot.position.copy(pos);
      dot.userData.code = c.code;
      root.add(dot);
      markers.push(dot);

      const hit = new THREE.Mesh(hitGeo, new THREE.MeshBasicMaterial({ visible: false }));
      hit.position.copy(pos.clone().multiplyScalar(1.01));
      hit.userData.code = c.code;
      root.add(hit);
      hits.push(hit);
    }

    /* — selection ring — */
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(0.03, 0.045, 48),
      new THREE.MeshBasicMaterial({ color: coral, transparent: true, opacity: 0.95, side: THREE.DoubleSide, depthWrite: false }),
    );
    root.add(ring);
    const ringGlow = new THREE.Mesh(
      new THREE.RingGeometry(0.05, 0.062, 48),
      new THREE.MeshBasicMaterial({ color: coral, transparent: true, opacity: 0.28, side: THREE.DoubleSide, depthWrite: false }),
    );
    root.add(ringGlow);

    /* — arcs — */
    const arcGroup = new THREE.Group();
    root.add(arcGroup);
    const pulseGeo = new THREE.SphereGeometry(0.011, 8, 8);
    let arcs = [];

    function buildArcs(code) {
      for (const a of arcs) {
        arcGroup.remove(a.line);
        a.line.geometry.dispose();
        a.line.material.dispose();
        arcGroup.remove(a.pulse);
      }
      arcs = [];
      const from = COUNTRIES.find((c) => c.code === code);
      if (!from) return;
      const targets = COUNTRIES.filter((c) => c.code !== code).sort((a, b) => {
        const da = Math.abs(a.lat - from.lat) + Math.abs(a.lon - from.lon) / 2;
        const db = Math.abs(b.lat - from.lat) + Math.abs(b.lon - from.lon) / 2;
        return da - db;
      }).slice(0, 5);
      const start = latLonToVec3(from.lat, from.lon, 1.004);
      for (const t of targets) {
        const end = latLonToVec3(t.lat, t.lon, 1.004);
        const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(1 + start.distanceTo(end) * 0.22);
        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(48));
        const line = new THREE.Line(geo, new THREE.LineBasicMaterial({ color: iris, transparent: true, opacity: 0.42, depthWrite: false }));
        arcGroup.add(line);
        const pulse = new THREE.Mesh(pulseGeo, new THREE.MeshBasicMaterial({ color: new THREE.Color('#d8ccff') }));
        arcGroup.add(pulse);
        arcs.push({ line, pulse, curve, offset: Math.random() });
      }
    }

    /* — state — */
    const st = stateRef.current;
    Object.assign(st, { root, globe, camera, renderer, markers, hits, ring, ringGlow, buildArcs, texture, arcsRef: () => arcs });

    /* — interaction — */
    const pointer = new THREE.Vector2();
    const ray = new THREE.Raycaster();
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let lastY = 0;
    let idleSince = performance.now();
    let hoverCode = null;

    function pointerToNdc(e) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      return { rect };
    }

    function pickCountry(e) {
      const { rect } = pointerToNdc(e);
      ray.setFromCamera(pointer, camera);
      const hitMarkers = ray.intersectObjects(hits, false);
      if (hitMarkers.length) return { code: hitMarkers[0].object.userData.code, x: e.clientX, y: e.clientY };
      const hitGlobe = ray.intersectObject(globe, false);
      if (!hitGlobe.length || !hitGlobe[0].uv) return null;
      const u = hitGlobe[0].uv.x;
      const v = hitGlobe[0].uv.y;
      const lon = u * 360 - 180;
      const lat = v * 180 - 90;
      let best = null;
      let bestD = Infinity;
      for (const c of COUNTRIES) {
        const dLat = c.lat - lat;
        const dLon = Math.abs(((c.lon - lon + 540) % 360) - 180) * Math.cos((lat * Math.PI) / 180);
        const d = Math.hypot(dLat, dLon);
        if (d < bestD) { bestD = d; best = c; }
      }
      if (best && bestD < 24) return { code: best.code, x: e.clientX, y: e.clientY };
      return null;
    }

    function onPointerDown(e) {
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      lastY = e.clientY;
      renderer.domElement.setPointerCapture?.(e.pointerId);
      renderer.domElement.style.cursor = 'grabbing';
      idleSince = performance.now();
    }

    function onPointerMove(e) {
      if (dragging) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        moved += Math.abs(dx) + Math.abs(dy);
        lastX = e.clientX;
        lastY = e.clientY;
        root.rotation.y += dx * 0.0052;
        root.rotation.x = Math.max(-0.75, Math.min(0.75, root.rotation.x + dy * 0.0038));
        idleSince = performance.now();
        return;
      }
      const found = pickCountry(e);
      const code = found?.code || null;
      if (code !== hoverCode) {
        hoverCode = code;
        renderer.domElement.style.cursor = code ? 'pointer' : 'grab';
        markers.forEach((m) => {
          m.scale.setScalar(m.userData.code === code ? 2.1 : 1);
        });
        onHover?.(code ? { code, x: found.x, y: found.y } : null);
      } else if (found) {
        onHover?.({ code, x: found.x, y: found.y });
      }
    }

    function onPointerUp(e) {
      if (!dragging) return;
      dragging = false;
      renderer.domElement.style.cursor = 'grab';
      idleSince = performance.now();
      if (moved < 7) {
        const found = pickCountry(e);
        if (found) onPick?.(found.code);
      }
    }

    function onLeave() {
      hoverCode = null;
      onHover?.(null);
    }

    const el = renderer.domElement;
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointermove', onPointerMove);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointerleave', onLeave);

    /* — resize — */
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    /* — loop — */
    const clock = new THREE.Clock();
    const tmp = new THREE.Vector3();
    const start = performance.now();
    function tick() {
      if (disposed) return;
      const t = clock.getElapsedTime();
      globeMat.uniforms.uTime.value = t;
      halo.material.uniforms.uTime.value = t;
      stars.rotation.y = t * 0.012;

      if (!dragging && !reduced && performance.now() - idleSince > 2200) {
        root.rotation.y += 0.0016;
      }

      /* markers breathing */
      markers.forEach((m, i) => {
        const base = m.userData.code === hoverCode ? 2.1 : 1;
        const s = base * (1 + Math.sin(t * 1.6 + i * 0.7) * 0.12);
        m.scale.setScalar(s);
      });

      /* selection ring faces outward and pulses */
      const selectedCode = stateRef.current.selectedCode || selected;
      const sc = COUNTRIES.find((c) => c.code === selectedCode);
      if (sc) {
        const pos = latLonToVec3(sc.lat, sc.lon, 1.012);
        ring.position.copy(pos);
        ring.lookAt(tmp.copy(pos).multiplyScalar(2));
        ringGlow.position.copy(pos);
        ringGlow.lookAt(tmp.copy(pos).multiplyScalar(2));
        const k = 1 + Math.sin(t * 2.1) * 0.16;
        ring.scale.setScalar(k);
        ringGlow.scale.setScalar(1 + Math.sin(t * 2.1 + 0.6) * 0.24);
        ring.rotation.z = t * 0.5;
      }

      /* travelling pulses */
      for (const a of arcs) {
        const p = (t * 0.18 + a.offset) % 1;
        const pt = a.curve.getPointAt(p);
        a.pulse.position.copy(pt);
        a.pulse.scale.setScalar(0.8 + Math.sin(p * Math.PI) * 1.1);
        a.line.material.opacity = 0.22 + Math.sin(p * Math.PI) * 0.22;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    setReady(true);
    const t0 = setTimeout(() => { if (!disposed) buildArcs(selected || 'IR'); }, 120);

    return () => {
      disposed = true;
      clearTimeout(t0);
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointermove', onPointerMove);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointerleave', onLeave);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose?.();
        if (o.material) {
          if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose?.());
          else o.material.dispose?.();
        }
      });
      texture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, supported]);

  /* react to selection changes without rebuilding the scene */
  useEffect(() => {
    const st = stateRef.current;
    st.selectedCode = selected;
    if (st.buildArcs && ready) st.buildArcs(selected);
  }, [selected, ready]);

  if (!supported) {
    return <StaticGlobe selected={selected} onPick={onPick} />;
  }

  return (
    <div className="globe-wrap" ref={mountRef} aria-hidden="true">
      {!ready && <div className="globe-loading">{labels.loading}</div>}
      <div className="globe-vignette" />
    </div>
  );
}

/* — SVG globe for browsers without WebGL — */
function StaticGlobe({ selected, onPick }) {
  const { land, dots } = React.useMemo(() => {
    const size = 460;
    const projection = geoOrthographic().translate([size / 2, size / 2]).scale(size * 0.47).rotate([-14, -16, 0]);
    const path = geoPath(projection);
    const landFeature = feature(topo, topo.objects.land);
    const viewCentre = [14, 16];
    const pts = COUNTRIES.map((c) => {
      if (geoDistance([c.lon, c.lat], viewCentre) > (Math.PI / 180) * 76) return null;
      const p = projection([c.lon, c.lat]);
      return p ? { ...c, x: p[0], y: p[1] } : null;
    }).filter(Boolean);
    return { land: path(landFeature) || '', dots: pts };
  }, []);

  return (
    <div className="globe-wrap" style={{ display: 'grid', placeItems: 'center' }}>
      <svg viewBox="0 0 460 460" style={{ width: '100%', maxWidth: 560, filter: 'drop-shadow(0 40px 80px rgba(0,0,0,0.65))' }} role="img" aria-label="world map">
        <defs>
          <radialGradient id="sph" cx="34%" cy="26%" r="78%">
            <stop offset="0" stopColor="#152845" />
            <stop offset="0.55" stopColor="#0b1526" />
            <stop offset="1" stopColor="#05080f" />
          </radialGradient>
          <linearGradient id="landG" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1f3a58" />
            <stop offset="1" stopColor="#152a40" />
          </linearGradient>
        </defs>
        <circle cx="230" cy="230" r="208" fill="url(#sph)" stroke="rgba(124,246,196,0.55)" strokeWidth="1.4" />
        <circle cx="230" cy="230" r="220" fill="none" stroke="rgba(124,246,196,0.16)" strokeWidth="1" />
        <path d={land} fill="url(#landG)" stroke="rgba(168,255,219,0.55)" strokeWidth="0.9" />
        {dots.map((c) => (
          <circle key={c.code} cx={c.x} cy={c.y} r={c.code === selected ? 5 : 2.6}
            fill={c.code === selected ? '#ff8a5b' : '#7cf6c4'} opacity={c.code === selected ? 1 : 0.75}
            style={{ cursor: 'pointer' }} onClick={() => onPick?.(c.code)} />
        ))}
      </svg>
    </div>
  );
}

export { latLonToVec3 };
