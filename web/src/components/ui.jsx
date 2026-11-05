import React, { useEffect, useRef, useState } from 'react';
import { COUNTRY_BY_CODE } from '../data/countries.js';

/* ————— icons (inline, stroke-based) ————— */
const PATHS = {
  arrow: 'M5 12h14M13 6l6 6-6 6',
  back: 'M19 12H5M11 18l-6-6 6-6',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3',
  close: 'M6 6l12 12M18 6L6 18',
  chevron: 'M6 9l6 6 6-6',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.6-4-9s1.5-6.6 4-9z',
  user: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75',
  book: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z',
  exam: 'M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11',
  sparkle: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  flame: 'M12 22c4 0 6.5-2.7 6.5-6.2 0-4.6-4.4-6.6-4.4-10.3C14.1 3.6 12.6 2 12.6 2s.4 3.5-2.1 5.6C8.3 9.4 5.5 11 5.5 15.8 5.5 19.3 8 22 12 22z',
  bolt: 'M13 2L4 14h6l-1 8 9-12h-6l1-8z',
  target: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z',
  check: 'M20 6L9 17l-5-5',
  plus: 'M12 5v14M5 12h14',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  menu: 'M3 6h18M3 12h18M3 18h18',
  logout2: 'M17 16l4-4-4-4M21 12H9',
  flag: 'M4 22V4M4 4h11l-1.5 4L15 12H4',
  star: 'M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9L12 3z',
  copy: 'M9 9h10v10H9zM5 15V5h10',
  play: 'M7 4l13 8-13 8V4z',
  layers: 'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5',
  compass: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM16 8l-2.5 5.5L8 16l2.5-5.5L16 8z',
};

export function Ico({ name, size = 18, stroke = 1.7, className = '', style }) {
  const d = PATHS[name] || PATHS.sparkle;
  return (
    <svg className={className} style={style} width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

/* ————— bilingual text helpers ————— */
export function countryName(code, lang) {
  const c = COUNTRY_BY_CODE[code];
  if (!c) return code;
  return c.name[lang] || c.name.en;
}

/* ————— reveal on scroll ————— */
export function Reveal({ children, delay = 0, className = '', as: Tag = 'div', ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);
  const dcls = delay ? `d${delay}` : '';
  return (
    <Tag ref={ref} className={`reveal ${dcls} ${seen ? 'in' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ————— progress ring ————— */
export function Ring({ value = 0, size = 66, stroke = 5, color = 'var(--mint)', children }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="ring-stat" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.9s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="rs-val">{children ?? `${Math.round(pct)}%`}</div>
    </div>
  );
}

export function ScoreRing({ value = 0, passed = true }) {
  const size = 168;
  const stroke = 9;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="score-ring">
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
        <defs>
          <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={passed ? '#7cf6c4' : '#ff8a5b'} />
            <stop offset="1" stopColor={passed ? '#9b8cff' : '#ffb27a'} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke="url(#scoreGrad)" strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={c - (pct / 100) * c} strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.22,1,0.36,1)' }}
        />
      </svg>
      <div className="sr-inner">
        <div>
          <div className="sr-val">{Math.round(pct)}</div>
          <div className="sr-lbl">/ 100</div>
        </div>
      </div>
    </div>
  );
}

/* ————— avatar ————— */
export function Avatar({ name = '?', size = '' }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();
  return <div className={`avatar ${size}`}>{initials || '·'}</div>;
}

/* ————— modal ————— */
export function Modal({ open, onClose, children, narrow = false, labelledBy }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose?.(); }} role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
      <div className={`modal ${narrow ? 'narrow' : ''}`} onMouseDown={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="close"><Ico name="close" size={17} /></button>
        {children}
      </div>
    </div>
  );
}

/* ————— toasts ————— */
const listeners = new Set();
let seq = 0;
export function toast(message, type = 'ok') {
  const item = { id: ++seq, message, type };
  listeners.forEach((fn) => fn(item));
}

export function Toasts() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fn = (item) => {
      setItems((prev) => [...prev, item]);
      setTimeout(() => setItems((prev) => prev.filter((x) => x.id !== item.id)), 4200);
    };
    listeners.add(fn);
    return () => listeners.delete(fn);
  }, []);
  if (!items.length) return null;
  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {items.map((it) => (
        <div key={it.id} className={`toast ${it.type === 'error' ? 'error' : ''}`}>
          <Ico name={it.type === 'error' ? 'close' : 'check'} size={16} style={{ marginTop: 2, color: it.type === 'error' ? '#ff9d9d' : 'var(--mint)' }} />
          <span>{it.message}</span>
        </div>
      ))}
    </div>
  );
}

/* ————— confetti ————— */
export function Confetti({ count = 26 }) {
  const colors = ['#7cf6c4', '#9b8cff', '#ff8a5b', '#f7d774', '#7fd4ff'];
  return (
    <div className="confetti" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <i
          key={i}
          style={{
            left: `${(i * 37) % 100}%`,
            background: colors[i % colors.length],
            animationDuration: `${1.6 + (i % 5) * 0.35}s`,
            animationDelay: `${(i % 7) * 0.08}s`,
            '--dx': `${((i % 9) - 4) * 14}px`,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}

/* ————— cross-component auth trigger ————— */
export function openAuth(mode = 'signup') {
  window.dispatchEvent(new CustomEvent('darsa:auth', { detail: { mode } }));
}

export function useClickAway(onAway) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onAway();
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [onAway]);
  return ref;
}
