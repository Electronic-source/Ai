import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useApp } from '../lib/store.jsx';
import { COUNTRIES, COUNTRY_BY_CODE, SUBJECT_META } from '../data/countries.js';
import { LESSONS, TIPS } from '../data/curriculum.js';
import { LEVELS } from '../data/i18n.js';
import Globe from './Globe.jsx';
import { buildExam } from '../lib/exam.js';
import { Ico, Reveal, openAuth } from './ui.jsx';

function useCountUp(target, active, duration = 1600) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return undefined;
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active, duration]);
  return value;
}

function Stat({ value, suffix = '', label, active }) {
  const v = useCountUp(value, active);
  return (
    <div className="hero-stat">
      <b>{v.toLocaleString()}{suffix}</b>
      <span>{label}</span>
    </div>
  );
}

export default function Landing() {
  const { t, lang, pick, country, setCountry, navigate, user, setLevel, lessons } = useApp();
  const heroRef = useRef(null);
  const trackPointer = (e) => {
    const el = heroRef.current;
    if (!el || e.pointerType === 'touch') return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  const [hover, setHover] = useState(null);
  const [allCountries, setAllCountries] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStatsActive(true); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const selected = COUNTRY_BY_CODE[country] || COUNTRIES[0];
  const demoQuestion = useMemo(
    () => buildExam({ country, level: 'high', subject: 'math', count: 1, seed: 7, difficulty: 2 }).questions[0],
    [country],
  );
  const hovered = hover ? COUNTRY_BY_CODE[hover.code] : null;
  const lessonCount = useMemo(() => lessons.length, [lessons]);
  const specialCount = useMemo(() => lessons.filter((l) => l.special).length, [lessons]);
  const tip = TIPS[new Date().getDate() % TIPS.length];

  const start = () => (user ? navigate('dashboard') : openAuth('signup'));

  return (
    <div className="page-fade">
      {/* ——— hero ——— */}
      <section className="hero" ref={heroRef} onPointerMove={trackPointer}>
        <div className="shell">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">
                <span className="badge-dot" />
                <b>{t('hero_badge')}</b>
                <em>3D</em>
              </div>
              <h1 className="h-display">
                {t('hero_title_a')}
                <span className="line2 grad-text">{t('hero_title_b')}</span>
              </h1>
              <p className="hero-sub">{t('hero_sub')}</p>
              <div className="hero-actions">
                <button className="btn btn-primary btn-lg" onClick={start}>
                  {user ? t('nav_dashboard') : t('hero_cta')}
                  <Ico name="arrow" size={17} />
                </button>
                <button className="btn btn-ghost btn-lg" onClick={() => navigate('exams')}>
                  <Ico name="exam" size={16} />
                  {t('hero_cta2')}
                </button>
              </div>
              <div className="hero-hint">
                <Ico name="compass" size={14} />
                <span>{t('hero_hint')}</span>
                <kbd>{selected.flag} {selected.name[lang] || selected.name.en}</kbd>
              </div>

              <div className="hero-stats" ref={statsRef}>
                <Stat value={COUNTRIES.length} label={t('stat_countries')} active={statsActive} />
                <Stat value={lessonCount} suffix="+" label={t('stat_lessons')} active={statsActive} />
                <Stat value={14} label={t('stat_langs')} active={statsActive} />
                <Stat value={12400} suffix="+" label={t('stat_learners')} active={statsActive} />
              </div>
            </div>

            <div className="hero-visual">
              <div className="orbit-ring" style={{ inset: '8%' }} />
              <Globe
                selected={country}
                onPick={(code) => setCountry(code)}
                onHover={(h) => setHover(h)}
                labels={{ loading: t('globe_loading') }}
                reduced={window.matchMedia?.('(prefers-reduced-motion: reduce)').matches}
              />
              <div className="float-card q-float" aria-hidden="true">
                <div className="fc-label"><Ico name="exam" size={12} /> {t('exams_title')} · {t(`level_high`)}</div>
                <div className="fc-q">{pick(demoQuestion.q)}</div>
                <div className="fc-opts">
                  {demoQuestion.opts.slice(0, 3).map((o, i) => (
                    <span key={i} className={`fc-opt ${i === demoQuestion.a ? 'ok' : ''}`}>
                      <b>{String.fromCharCode(65 + i)}</b> {pick(o)}
                    </span>
                  ))}
                </div>
                <div className="fc-foot"><span className="badge-dot" /> {t('common_ready')} · 00:42</div>
              </div>

              <div className="float-card group-float" aria-hidden="true">
                <div className="fc-label"><Ico name="users" size={12} /> {t('groups_leaderboard')}</div>
                {['A', 'M', 'S'].map((init, i) => (
                  <div key={init} className="fg-row">
                    <span className="fg-rank">{i + 1}</span>
                    <span className="fg-av">{init}</span>
                    <span className="fg-name">{['Amina', 'Minh', 'Sara'][i]}</span>
                    <span className="fg-xp">{[1840, 1520, 1310][i]} XP</span>
                  </div>
                ))}
              </div>

              <div className="country-float">
                <div className="cf-top">
                  <span className="cf-flag">{selected.flag}</span>
                  <div>
                    <h4>{selected.name[lang] || selected.name.en}</h4>
                    <small style={{ fontSize: '0.72rem', color: 'var(--muted-2)' }}>{selected.exams.length} × {t('globe_exams')}</small>
                  </div>
                </div>
                <div className="cf-exams">
                  {selected.exams.map((e) => (
                    <span key={e.id} className="pill pill-mint" style={{ fontSize: 11 }}>{e.name[lang] || e.name.en}</span>
                  ))}
                </div>
                <div className="cf-sig">
                  <span>{t('globe_special')}:</span>
                  <b>{selected.signature.title[lang] || selected.signature.title.en}</b>
                </div>
                <button className="btn btn-sm btn-primary mt-16 btn-block" onClick={() => navigate('library', { country: selected.code })}>
                  {t('globe_open')} <Ico name="arrow" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {hovered && (
          <div className="globe-tip" style={{ left: hover.x, top: hover.y }}>
            {hovered.flag} {hovered.name[lang] || hovered.name.en}
          </div>
        )}
      </section>

      {/* ——— exam marquee ——— */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((k) => (
            <span key={k}>
              {['Konkur', 'Abitur', 'Gaokao', 'SAT', 'Baccalauréat', 'A-Levels', 'ЕГЭ', 'YKS', 'ENEM', 'Matric', 'Suneung', 'HSC', 'Qudurat', 'Thanaweya Amma', 'KCSE', 'SNBT'].map((x) => (
                <React.Fragment key={x}>{x} <i>✦</i></React.Fragment>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ——— features ——— */}
      <section className="section" id="features">
        <div className="shell">
          <div className="section-head">
            <span className="kicker">{t('feat_kicker')}</span>
            <h2 className="h-section">{t('feat_title')}</h2>
            <p className="lede mt-16">{t('feat_sub')}</p>
          </div>

          <div className="feature-grid">
            {[
              { icon: 'book', title: t('f1_title'), desc: t('f1_desc'), glow: 'rgba(124,246,196,0.22)', go: () => navigate('library') },
              { icon: 'exam', title: t('f2_title'), desc: t('f2_desc'), glow: 'rgba(155,140,255,0.24)', go: () => navigate('exams') },
              { icon: 'users', title: t('f3_title'), desc: t('f3_desc'), glow: 'rgba(255,138,91,0.2)', go: () => navigate('groups') },
              { icon: 'target', title: t('f4_title'), desc: t('f4_desc'), glow: 'rgba(247,215,116,0.2)', go: () => (user ? navigate('dashboard') : openAuth('signup')) },
            ].map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) + 1} className="feature" as="button" onClick={f.go} style={{ '--f-glow': f.glow, textAlign: 'start', cursor: 'pointer' }}>
                <span className="feature-icon"><Ico name={f.icon} size={20} /></span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <span className="feature-num">0{i + 1}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ——— stages ——— */}
      <section className="section-tight">
        <div className="shell">
          <div className="row-between mb-24">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="kicker">{t('levels_kicker')}</span>
              <h2 className="h-section">{t('levels_title')}</h2>
              <p className="lede mt-16">{t('levels_sub')}</p>
            </div>
            <button className="link-arrow" onClick={() => navigate('library')}>{t('common_view_all')} <span>→</span></button>
          </div>
          <div className="stage-rail">
            {LEVELS.map((lvl, i) => {
              const count = LESSONS.filter((l) => l.level === lvl).length;
              const max = Math.max(...LEVELS.map((l) => LESSONS.filter((x) => x.level === l).length));
              const width = Math.max(12, Math.round((count / max) * 100));
              return (
                <Reveal key={lvl} delay={Math.min(4, i + 1)}>
                  <button className="stage-card" onClick={() => { setLevel(lvl); navigate('library', { level: lvl }); }} style={{ width: '100%' }}>
                    <span className="sc-index">0{i + 1}</span>
                    <h4>{t(`level_${lvl}`)}</h4>
                    <p>{t(`level_${lvl}_d`)}</p>
                    <span className="row-between" style={{ marginTop: 'auto', paddingTop: 12 }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--muted-2)' }}>{count} {t('common_lessons')}</span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--mint)' }}>{Math.round((count / LESSONS.length) * 100)}%</span>
                    </span>
                    <span className="sc-bar" style={{ '--w': `${width}%`, '--sc': ['#7cf6c4', '#9b8cff', '#7fd4ff', '#ff8a5b', '#f7d774', '#ff9ec4'][i], paddingTop: 0 }}><i /></span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ——— how ——— */}
      <section className="section">
        <div className="shell">
          <div className="section-head center">
            <span className="kicker">{t('how_kicker')}</span>
            <h2 className="h-section">{t('how_title')}</h2>
          </div>
          <div className="how-grid">
            {[
              { h: t('how_1_t'), p: t('how_1_d') },
              { h: t('how_2_t'), p: t('how_2_d') },
              { h: t('how_3_t'), p: t('how_3_d') },
            ].map((s, i) => (
              <Reveal key={s.h} delay={i + 1} className={`how-card ${i < 2 ? 'how-connector' : ''}`}>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={2} className="mt-32">
            <div className="tip-card">
              <div className="tc-label"><Ico name="sparkle" size={13} style={{ verticalAlign: '-2px' }} /> {t('dash_tips')}</div>
              {pick(tip)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ——— countries ——— */}
      <section className="section-tight">
        <div className="shell">
          <div className="row-between mb-24">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="kicker">{t('countries_kicker')}</span>
              <h2 className="h-section">{t('countries_title')}</h2>
              <p className="lede mt-16">{t('countries_sub')}</p>
            </div>
          </div>

          <div className="country-grid">
            {(allCountries ? COUNTRIES : COUNTRIES.slice(0, 12)).map((c, i) => (
              <Reveal key={c.code} delay={Math.min(4, (i % 4) + 1)}>
                <button
                  className={`country-card ${c.code === country ? 'on' : ''}`}
                  style={{ width: '100%' }}
                  onClick={() => setCountry(c.code)}
                  onDoubleClick={() => navigate('library', { country: c.code })}
                >
                  <span className="cc-top">
                    <span className="cc-flag">{c.flag}</span>
                    <span>
                      <b>{c.name[lang] || c.name.en}</b>
                      <small style={{ display: 'block' }}>{c.exams[0] ? (c.exams[0].name[lang] || c.exams[0].name.en) : '—'}</small>
                    </span>
                  </span>
                  <span className="cc-exam">
                    {SUBJECT_META[c.signature.subject]?.icon} {c.signature.title[lang] || c.signature.title.en}
                  </span>
                </button>
              </Reveal>
            ))}
          </div>

          <div className="center mt-32 row" style={{ justifyContent: 'center' }}>
            <button className="btn btn-ghost" onClick={() => setAllCountries((v) => !v)}>
              {allCountries ? t('common_close') : `${t('common_view_all')} · ${COUNTRIES.length} ${t('common_countries')}`}
              <Ico name={allCountries ? 'chevron' : 'arrow'} size={15} />
            </button>
            <button className="btn btn-primary" onClick={() => navigate('library')}>
              {t('nav_library')} <Ico name="arrow" size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* ——— CTA ——— */}
      <section className="section-tight">
        <div className="shell">
          <Reveal className="cta-band">
            <span className="cta-orbit" />
            <span className="cta-orbit b" />
            <h2>{t('cta_title')}</h2>
            <p className="lede">{t('cta_sub')}</p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={() => (user ? navigate('dashboard') : openAuth('signup'))}>
                {t('cta_button')} <Ico name="arrow" size={16} />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => navigate('library')}>{t('cta_guest')}</button>
            </div>
            <p className="fs-76 muted mt-24">{t('footer_note')}</p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
