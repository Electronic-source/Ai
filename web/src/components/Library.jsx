import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../lib/store.jsx';
import { COUNTRIES, COUNTRY_BY_CODE, SUBJECTS, SUBJECT_META } from '../data/countries.js';
import { LESSONS } from '../data/curriculum.js';
import { LEVELS } from '../data/i18n.js';
import { Ico, Modal, Reveal, toast, countryName } from './ui.jsx';

export default function Library() {
  const { t, lang, pick, routeArg, country, setCountry, progress, learn, navigate } = useApp();
  const [q, setQ] = useState('');
  const [lvl, setLvl] = useState(routeArg?.level || 'all');
  const [ctry, setCtry] = useState(routeArg?.country || 'all');
  const [subject, setSubject] = useState('all');
  const [openLesson, setOpenLesson] = useState(null);
  const [onlySpecial, setOnlySpecial] = useState(false);

  useEffect(() => {
    if (routeArg?.level) setLvl(routeArg.level);
    if (routeArg?.country) setCtry(routeArg.country);
  }, [routeArg]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return LESSONS.filter((l) => {
      if (lvl !== 'all' && l.level !== lvl) return false;
      if (ctry === 'national') { if (!l.special) return false; }
      else if (ctry !== 'all' && l.country !== ctry) return false;
      if (subject !== 'all' && l.subject !== subject) return false;
      if (onlySpecial && !l.special) return false;
      if (!needle) return true;
      return `${pick(l.title)} ${l.title.en} ${l.title.fa} ${pick(l.summary)} ${l.summary.en} ${l.subject}`.toLowerCase().includes(needle);
    });
  }, [q, lvl, ctry, subject, onlySpecial, pick]);

  const studied = Object.keys(progress.lessons || {}).length;
  const shelfTotal = LESSONS.length;
  const shelfPct = Math.round((studied / shelfTotal) * 100);

  return (
    <div className="page page-fade">
      <div className="shell">
        <div className="page-head">
          <div className="crumbs">
            <button onClick={() => navigate('home')}>{t('nav_home')}</button> <span>/</span> <span>{t('library_title')}</span>
          </div>
          <div className="row-between">
            <div>
              <h1>{t('library_title')}</h1>
              <p className="lede">{t('library_sub')}</p>
            </div>
            <div className="card" style={{ padding: '14px 18px', minWidth: 210 }}>
              <div className="row-between fs-76 muted mb-8">
                <span>{t('library_progress')}</span>
                <b className="mono" style={{ color: 'var(--mint)' }}>{shelfPct}%</b>
              </div>
              <div className="exam-progress" style={{ marginBottom: 6 }}><i style={{ width: `${shelfPct}%` }} /></div>
              <div className="fs-76" style={{ color: 'var(--muted-2)' }}>{studied} / {shelfTotal} {t('common_lessons')}</div>
            </div>
          </div>
        </div>

        <div className="filter-bar">
          <div className="search-wrap">
            <Ico name="search" size={16} />
            <input className="input" placeholder={t('library_search')} value={q} onChange={(e) => setQ(e.target.value)} aria-label={t('common_search')} />
          </div>
          <select className="select" value={ctry} onChange={(e) => setCtry(e.target.value)} aria-label={t('nav_country')}>
            <option value="all">{t('library_all_countries')}</option>
            <option value="national">★ {t('library_national')}</option>
            {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name[lang] || c.name.en}</option>)}
          </select>
          <select className="select" value={lvl} onChange={(e) => setLvl(e.target.value)} aria-label={t('exams_level')}>
            <option value="all">{t('common_all')} · {t('exams_level')}</option>
            {LEVELS.map((l) => <option key={l} value={l}>{t(`level_${l}`)}</option>)}
          </select>
          <button className={`chip ${onlySpecial ? 'on' : ''}`} onClick={() => setOnlySpecial((s) => !s)}>
            <Ico name="star" size={12} style={{ verticalAlign: '-2px', marginInlineEnd: 4 }} />
            {t('library_national')}
          </button>
        </div>

        <div className="chips mb-24">
          <button className={`chip ${subject === 'all' ? 'on' : ''}`} onClick={() => setSubject('all')}>{t('common_all')}</button>
          {SUBJECTS.map((s) => (
            <button key={s} className={`chip ${subject === s ? 'on' : ''}`} onClick={() => setSubject(s)}>
              <span style={{ marginInlineEnd: 5 }}>{SUBJECT_META[s]?.icon}</span>{t(`subj_${s}`)}
            </button>
          ))}
        </div>

        <div className="result-count">
          <b>{filtered.length}</b> {t('common_lessons')}
          {ctry !== 'all' && ctry !== 'national' && <> · {countryName(ctry, lang)}</>}
          {lvl !== 'all' && <> · {t(`level_${lvl}`)}</>}
        </div>

        <div className="lesson-grid">
          {filtered.map((l, i) => {
            const meta = SUBJECT_META[l.subject] || {};
            const c = COUNTRY_BY_CODE[l.country];
            const done = !!progress.lessons[l.id];
            return (
              <Reveal key={l.id} delay={Math.min(4, (i % 3) + 1)}>
                <button className="lesson-card" style={{ '--lc': meta.accent || '#7cf6c4', width: '100%' }} onClick={() => setOpenLesson(l)}>
                  <span className="lesson-art">
                    <span className="la-glyph">{meta.icon}</span>
                    <span className="la-flag">{c ? c.flag : '🌍'}</span>
                  </span>
                  {l.special && <span className="tag-special">{t('library_special_tag')} {c ? c.name[lang] || c.name.en : ''}</span>}
                  <span className="lesson-body">
                    <span className="lesson-meta">
                      <span className="pill" style={{ fontSize: 10.5, padding: '3px 8px' }}>{t(`level_${l.level}`)}</span>
                      <span>{t(`subj_${l.subject}`)}</span>
                    </span>
                    <h4>{pick(l.title)}</h4>
                    <p>{pick(l.summary)}</p>
                    <span className="lesson-foot">
                      <span><Ico name="clock" size={12} style={{ verticalAlign: '-2px', marginInlineEnd: 4 }} />{l.minutes} {t('common_min')}</span>
                      {done ? <span className="done-mark"><Ico name="check" size={13} /> {t('library_done')}</span> : <span style={{ color: 'var(--mint)' }}>{t('library_open')} →</span>}
                    </span>
                  </span>
                </button>
              </Reveal>
            );
          })}
          {!filtered.length && (
            <div className="empty-state">
              <b>∅</b>
              {t('library_empty')}
            </div>
          )}
        </div>
      </div>

      {openLesson && <LessonModal lesson={openLesson} onClose={() => setOpenLesson(null)} />}
    </div>
  );
}

export function LessonModal({ lesson, onClose }) {
  const { t, lang, pick, progress, learn, setCountry, setLevel, navigate } = useApp();
  const [picked, setPicked] = useState(null);
  const meta = SUBJECT_META[lesson.subject] || {};
  const c = COUNTRY_BY_CODE[lesson.country];
  const done = !!progress.lessons[lesson.id];

  useEffect(() => { setPicked(null); }, [lesson.id]);

  const answer = (i) => {
    if (picked !== null) return;
    setPicked(i);
  };

  return (
    <Modal open onClose={onClose} labelledBy="lesson-title">
      <div className="modal-hero" style={{ '--lc': meta.accent || '#7cf6c4' }}>
        <div className="pill-row">
          <span className="pill" style={{ color: meta.accent, borderColor: `${meta.accent}55`, background: `${meta.accent}14` }}>{meta.icon} {t(`subj_${lesson.subject}`)}</span>
          <span className="pill">{t(`level_${lesson.level}`)}</span>
          <span className="pill">{c ? `${c.flag} ${c.name[lang] || c.name.en}` : '🌍 ' + t('common_all')}</span>
          <span className="pill pill-gold"><Ico name="clock" size={12} /> {lesson.minutes} {t('common_min')}</span>
          {lesson.special && <span className="pill pill-coral">★ {t('library_national')}</span>}
        </div>
        <h2 id="lesson-title">{pick(lesson.title)}</h2>
        <p>{pick(lesson.summary)}</p>
      </div>

      <div className="modal-body">
        <div className="modal-section">
          <h5>{t('library_keypoints')}</h5>
          <ul className="point-list">
            {(lesson.points[lang] || lesson.points.en).map((p, i) => (
              <li key={i}><i>{i + 1}</i><span>{p}</span></li>
            ))}
          </ul>
        </div>

        <div className="modal-section">
          <h5>{t('library_example')}</h5>
          <div className="example-box">{pick(lesson.example)}</div>
        </div>

        <div className="modal-section">
          <h5>{t('library_check')}</h5>
          <div className="check-box">
            <div className="cb-q">{pick(lesson.check.q)}</div>
            <div className="cb-opts">
              {(lesson.check.opts[lang] || lesson.check.opts.en).map((o, i) => {
                let cls = '';
                if (picked !== null) {
                  if (i === lesson.check.answer) cls = 'ok';
                  else if (i === picked) cls = 'no';
                }
                return (
                  <button key={i} className={`cb-opt ${cls}`} onClick={() => answer(i)} disabled={picked !== null}>
                    <span className="mono" style={{ opacity: 0.6, fontSize: '0.76rem' }}>{String.fromCharCode(65 + i)}</span>
                    <span>{o}</span>
                    {picked !== null && i === lesson.check.answer && <Ico name="check" size={15} style={{ marginInlineStart: 'auto', color: 'var(--mint)' }} />}
                  </button>
                );
              })}
            </div>
            {picked !== null && <div className="cb-why"><b style={{ color: 'var(--mint)' }}>{t('exams_explain')}: </b>{pick(lesson.check.why)}</div>}
          </div>
        </div>

        {c && (
          <div className="modal-section">
            <h5>{t('library_related')}</h5>
            <div className="chips">
              {c.exams.map((e) => <span key={e.id} className="pill pill-iris">{e.name[lang] || e.name.en}</span>)}
            </div>
          </div>
        )}

        <div className="row-between" style={{ borderTop: '1px solid var(--line-soft)', paddingTop: 20 }}>
          <button className={`btn ${done ? 'btn-ghost' : 'btn-primary'}`} onClick={() => { learn(lesson.id); toast(done ? t('library_done') : `+20 ${t('points')}`); }}>
            <Ico name={done ? 'check' : 'book'} size={16} />
            {done ? t('library_done') : t('library_mark')}
          </button>
          <div className="row">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                if (c) setCountry(c.code);
                setLevel(lesson.level);
                onClose();
                navigate('exams');
              }}
            >
              <Ico name="exam" size={15} /> {t('exams_title')}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
