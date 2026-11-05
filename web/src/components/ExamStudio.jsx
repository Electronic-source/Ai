import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../lib/store.jsx';
import { COUNTRIES, COUNTRY_BY_CODE, SUBJECTS, SUBJECT_META } from '../data/countries.js';
import { LEVELS } from '../data/i18n.js';
import { buildExam, gradeAttempt, clock } from '../lib/exam.js';
import { Confetti, Ico, Modal, Reveal, ScoreRing, countryName } from './ui.jsx';

export default function ExamStudio() {
  const app = useApp();
  const { t, lang, pick, country, level, myGroups, routeArg, user, recordAttempt, progress } = app;

  const [mode, setMode] = useState('build');
  const [config, setConfig] = useState({
    country,
    level: user?.level || level,
    subject: routeArg?.subject || 'math',
    count: 10,
    duration: 15,
    difficulty: 2,
    groupId: routeArg?.groupId || '',
  });
  const [exam, setExam] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [flags, setFlags] = useState({});
  const [idx, setIdx] = useState(0);
  const [left, setLeft] = useState(0);
  const [result, setResult] = useState(null);
  const [confirm, setConfirm] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    setConfig((c) => ({ ...c, country, level: user?.level || level }));
  }, [country, level, user?.level]);

  useEffect(() => {
    const sig = COUNTRY_BY_CODE[country]?.signature?.subject;
    if (sig) setConfig((c) => ({ ...c, country, subject: sig }));
  }, [country]);

  useEffect(() => {
    if (!routeArg) return;
    setConfig((c) => ({
      ...c,
      subject: routeArg.subject || c.subject,
      country: routeArg.country || c.country,
      groupId: routeArg.groupId || c.groupId,
    }));
  }, [routeArg]);

  useEffect(() => {
    if (mode !== 'run') return undefined;
    intervalRef.current = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) {
          clearInterval(intervalRef.current);
          finish();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  const start = () => {
    const built = buildExam({
      country: config.country,
      level: config.level,
      subject: config.subject,
      count: config.count,
      difficulty: Number(config.difficulty),
      seed: Math.floor(Math.random() * 1e9),
      lang,
    });
    setExam(built);
    setAnswers(new Array(built.questions.length).fill(null));
    setFlags({});
    setIdx(0);
    setLeft(config.duration * 60);
    setResult(null);
    setMode('run');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finish = () => {
    setConfirm(false);
    setMode((m) => (m === 'run' ? 'result' : m));
  };

  /* grade exactly once when entering result */
  useEffect(() => {
    if (mode !== 'result' || !exam || result) return;
    const graded = gradeAttempt(exam, answers);
    setResult(graded);
    recordAttempt({
      subject: exam.subject,
      score: graded.score,
      correct: graded.correct,
      total: graded.total,
      country: exam.country,
      level: exam.level,
      xp: graded.xp,
      groupId: config.groupId || null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, exam, result]);

  const reset = () => {
    setMode('build');
    setExam(null);
    setResult(null);
    setAnswers([]);
  };

  if (mode === 'run' && exam) {
    return (
      <ExamPlayer
        exam={exam}
        answers={answers}
        setAnswers={setAnswers}
        flags={flags}
        setFlags={setFlags}
        idx={idx}
        setIdx={setIdx}
        left={left}
        onFinish={() => setConfirm(true)}
        onLeave={reset}
      />
    );
  }

  if (mode === 'result' && exam && result) {
    return <ExamResult exam={exam} result={result} answers={answers} onAgain={reset} group={myGroups.find((g) => g.id === config.groupId)} />;
  }

  const examSystems = COUNTRY_BY_CODE[config.country]?.exams || [];
  const group = myGroups.find((g) => g.id === config.groupId);
  const attempts = (progress.attempts || []).slice(0, 3);

  return (
    <div className="page page-fade">
      <div className="shell">
        <div className="page-head">
          <span className="kicker">{t('exams_title')}</span>
          <h1>{t('exams_title')}</h1>
          <p className="lede">{t('exams_sub')}</p>
        </div>

        <div className="exam-layout">
          <Reveal className="card exam-panel">
            <div className="exam-fields">
              <div className="form-row">
                <div className="field">
                  <label htmlFor="e-country">{t('exams_country')}</label>
                  <select id="e-country" className="select" value={config.country} onChange={(e) => setConfig((c) => ({ ...c, country: e.target.value }))}>
                    {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name[lang] || c.name.en}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="e-level">{t('exams_level')}</label>
                  <select id="e-level" className="select" value={config.level} onChange={(e) => setConfig((c) => ({ ...c, level: e.target.value }))}>
                    {LEVELS.map((l) => <option key={l} value={l}>{t(`level_${l}`)}</option>)}
                  </select>
                </div>
              </div>

              <div className="field">
                <label>{t('exams_subject')}</label>
                <div className="chips">
                  {SUBJECTS.map((s) => (
                    <button key={s} className={`chip ${config.subject === s ? 'on' : ''}`} onClick={() => setConfig((c) => ({ ...c, subject: s }))}>
                      <span style={{ marginInlineEnd: 5 }}>{SUBJECT_META[s]?.icon}</span>{t(`subj_${s}`)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="field">
                  <label>{t('exams_count')}</label>
                  <div className="seg">
                    {[5, 10, 15, 20].map((n) => (
                      <button key={n} className={config.count === n ? 'on' : ''} onClick={() => setConfig((c) => ({ ...c, count: n }))}>{n}</button>
                    ))}
                  </div>
                </div>
                <div className="field">
                  <label>{t('exams_duration')}</label>
                  <div className="seg">
                    {[5, 10, 20, 30].map((n) => (
                      <button key={n} className={config.duration === n ? 'on' : ''} onClick={() => setConfig((c) => ({ ...c, duration: n }))}>{n}</button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="field">
                <label>{t('exams_difficulty')}</label>
                <div className="seg">
                  {[[1, t('exams_easy')], [2, t('exams_medium')], [3, t('exams_hard')]].map(([v, label]) => (
                    <button key={v} className={Number(config.difficulty) === v ? 'on' : ''} onClick={() => setConfig((c) => ({ ...c, difficulty: v }))}>{label}</button>
                  ))}
                </div>
              </div>

              {myGroups.length > 0 && (
                <div className="field">
                  <label htmlFor="e-group">{t('groups_exams')}</label>
                  <select id="e-group" className="select" value={config.groupId} onChange={(e) => setConfig((c) => ({ ...c, groupId: e.target.value }))}>
                    <option value="">— {t('dash_guest')} —</option>
                    {myGroups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
                  </select>
                  <span className="fs-76 muted">{t('groups_new_exam_note')}</span>
                </div>
              )}

              <button className="btn btn-primary btn-lg btn-block mt-8" onClick={start}>
                <Ico name="bolt" size={17} /> {t('exams_build')}
              </button>
            </div>
          </Reveal>

          <aside className="card exam-preview">
            <div className="mini-label">{t('exams_mode')}</div>
            <div className="ep-big">{config.count}</div>
            <div className="fs-82 muted">{t('common_questions')} · {config.duration} {t('common_min')}</div>
            <hr className="hairline" style={{ margin: '18px 0' }} />
            <div className="ep-row"><span>{t('nav_country')}</span><b>{COUNTRY_BY_CODE[config.country]?.flag} {countryName(config.country, lang)}</b></div>
            <div className="ep-row"><span>{t('exams_national_format')}</span><b>{examSystems.map((e) => e.name[lang] || e.name.en).join(' · ') || '—'}</b></div>
            <div className="ep-row"><span>{t('exams_subject')}</span><b>{t(`subj_${config.subject}`)}</b></div>
            <div className="ep-row"><span>{t('exams_level')}</span><b>{t(`level_${config.level}`)}</b></div>
            <div className="ep-row"><span>{t('exams_difficulty')}</span><b>{t(`exams_${['easy', 'medium', 'hard'][config.difficulty - 1]}`)}</b></div>
            {group && <div className="ep-row"><span>{t('groups_exams')}</span><b>{group.name}</b></div>}
            <p className="ep-note">
              <Ico name="sparkle" size={12} style={{ verticalAlign: '-2px', marginInlineEnd: 4, color: 'var(--mint)' }} />
              {t('exams_generated')} — {t('footer_note')}
            </p>

            {attempts.length > 0 && (
              <div className="mt-24">
                <div className="mini-label mb-8">{t('dash_exam_bank')}</div>
                {attempts.map((a, i) => (
                  <div key={i} className="attempt-row" style={{ borderBottom: i === attempts.length - 1 ? 'none' : undefined }}>
                    <span className="fs-76">{t(`subj_${a.subject}`)}</span>
                    <span className="ar-score" style={{ color: a.score >= 50 ? 'var(--mint)' : 'var(--coral)' }}>{a.score}</span>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>

      <Modal open={confirm} onClose={() => setConfirm(false)} narrow>
        <div style={{ padding: 28 }}>
          <h3 className="h-card mb-16">{t('exams_submit')}</h3>
          <p className="fs-82 muted mb-24">{t('exams_confirm')}</p>
          <div className="row">
            <button className="btn btn-primary" onClick={finish}>{t('exams_submit')}</button>
            <button className="btn btn-ghost" onClick={() => setConfirm(false)}>{t('common_cancel')}</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function ExamPlayer({ exam, answers, setAnswers, flags, setFlags, idx, setIdx, left, onFinish, onLeave }) {
  const { t, lang, pick } = useApp();
  const q = exam.questions[idx];
  const answered = answers.filter((a) => a !== null).length;

  const choose = (i) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[idx] = i;
      return next;
    });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (['1', '2', '3', '4'].includes(e.key)) choose(Number(e.key) - 1);
      if (e.key === 'ArrowRight') setIdx((i) => Math.min(exam.questions.length - 1, i + 1));
      if (e.key === 'ArrowLeft') setIdx((i) => Math.max(0, i - 1));
      if (e.key === 'f') setFlags((f) => ({ ...f, [idx]: !f[idx] }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, exam]);

  const meta = SUBJECT_META[exam.subject] || {};
  return (
    <div className="page exam-player page-fade">
      <div className="shell" style={{ maxWidth: 920 }}>
        <div className="exam-top">
          <div>
            <div className="et-title">{t('exams_q')} {idx + 1} / {exam.questions.length}</div>
            <div className="et-sub">{COUNTRY_BY_CODE[exam.country]?.flag} {countryName(exam.country, lang)} · {t(`subj_${exam.subject}`)} · {t(`level_${exam.level}`)}</div>
          </div>
          <div className="row" style={{ marginInlineStart: 'auto' }}>
            <span className="pill">{answered} {t('exams_answered')}</span>
            <div className={`timer ${left < 60 ? 'warn' : ''}`}>
              <Ico name="clock" size={14} /> {clock(left)}
            </div>
          </div>
        </div>

        <div className="exam-progress"><i style={{ width: `${((idx + 1) / exam.questions.length) * 100}%` }} /></div>

        <div className="card q-card">
          <div className="q-index">
            <span className="qi-num">{meta.icon} {t(`subj_${exam.subject}`)} · Q{String(idx + 1).padStart(2, '0')}</span>
            <button className="chip" onClick={() => setFlags((f) => ({ ...f, [idx]: !f[idx] }))} style={{ color: flags[idx] ? 'var(--gold)' : undefined }}>
              <Ico name="flag" size={12} style={{ verticalAlign: '-2px', marginInlineEnd: 4 }} />
              {flags[idx] ? t('exams_flagged') : t('exams_flag')}
            </button>
          </div>

          <div className="q-text">{pick(q.q)}</div>

          <div className="q-opts">
            {q.opts.map((o, i) => (
              <button key={i} className={`q-opt ${answers[idx] === i ? 'picked' : ''}`} onClick={() => choose(i)}>
                <span className="qo-key">{String.fromCharCode(65 + i)}</span>
                <span>{pick(o)}</span>
              </button>
            ))}
          </div>

          <div className="exam-nav">
            <button className="btn btn-ghost btn-sm" onClick={() => setIdx(Math.max(0, idx - 1))} disabled={idx === 0}>
              <Ico name="back" size={14} /> {t('exams_prev')}
            </button>
            <span className="fs-76 muted mono">{answers[idx] === null ? '—' : `${t('exams_answered')}: ${String.fromCharCode(65 + answers[idx])}`}</span>
            <span className="spacer" />
            {idx < exam.questions.length - 1 ? (
              <button className="btn btn-primary btn-sm" onClick={() => setIdx(idx + 1)}>
                {t('exams_next')} <Ico name="arrow" size={14} />
              </button>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={onFinish}>
                <Ico name="check" size={15} /> {t('exams_submit')}
              </button>
            )}
          </div>

          <div className="q-dots">
            {exam.questions.map((_, i) => (
              <button
                key={i}
                className={`q-dot ${answers[i] !== null ? 'answered' : ''} ${i === idx ? 'current' : ''} ${flags[i] ? 'flagged' : ''}`}
                onClick={() => setIdx(i)}
                aria-label={`${t('exams_q')} ${i + 1}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="row-between mt-16">
          <button className="btn btn-ghost btn-sm" onClick={onLeave}>{t('exams_exit')}</button>
          <button className="btn btn-primary btn-sm" onClick={onFinish}>{t('exams_submit')}</button>
        </div>
      </div>
    </div>
  );
}

function ExamResult({ exam, result, answers, onAgain, group }) {
  const { t, lang, pick } = useApp();
  const [review, setReview] = useState(false);

  return (
    <div className="page page-fade">
      <div className="shell" style={{ maxWidth: 860 }}>
        <div className="card result-hero">
          {result.passed && <Confetti />}
          <span className="kicker" style={{ marginInline: 'auto' }}>{t('exams_results')}</span>
          <ScoreRing value={result.score} passed={result.passed} />
          <h2 className="h-card mb-8">{result.passed ? t('exams_pass') : t('exams_fail')}</h2>
          <p className="fs-82 muted">
            {COUNTRY_BY_CODE[exam.country]?.flag} {countryName(exam.country, lang)} · {t(`subj_${exam.subject}`)} · {t(`level_${exam.level}`)}
            {group && <> · {group.name}</>}
          </p>

          <div className="result-grid">
            <div className="result-cell"><b style={{ color: 'var(--mint)' }}>{result.correct}</b><span>{t('exams_correct')}</span></div>
            <div className="result-cell"><b style={{ color: '#ff9d9d' }}>{result.wrong}</b><span>{t('exams_wrong')}</span></div>
            <div className="result-cell"><b style={{ color: 'var(--muted)' }}>{result.skipped}</b><span>{t('exams_skipped')}</span></div>
            <div className="result-cell"><b style={{ color: 'var(--gold)' }}>+{result.xp}</b><span>{t('points')}</span></div>
          </div>

          <div className="row" style={{ justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={onAgain}><Ico name="bolt" size={15} /> {t('exams_again')}</button>
            <button className="btn btn-ghost" onClick={() => setReview((r) => !r)}><Ico name="book" size={15} /> {t('exams_review')}</button>
          </div>
          <p className="fs-76 muted mt-16">{t('exams_saved')} · +{result.xp} {t('points')}</p>
        </div>

        {review && (
          <div className="review-list mt-24">
            {exam.questions.map((q, i) => {
              const picked = answers[i];
              const ok = picked === q.a;
              return (
                <Reveal key={i} className="review-item">
                  <div className="ri-top">
                    <span className="mono">Q{String(i + 1).padStart(2, '0')}</span>
                    <span>{subjLabel(t, exam.subject)}</span>
                    {q.from === 'lesson' && <span className="pill pill-coral" style={{ fontSize: 10 }}>★ {t('library_national')}</span>}
                    <span style={{ marginInlineStart: 'auto', color: ok ? 'var(--mint)' : picked === null ? 'var(--muted-2)' : '#ff9d9d' }}>
                      {ok ? '✓' : picked === null ? t('exams_skipped') : '✕'}
                    </span>
                  </div>
                  <div className="ri-q">{pick(q.q)}</div>
                  <div className="ri-a">
                    <i className="ri-ok">✓ {pick(q.opts[q.a])}</i>
                    {picked !== null && !ok && <i className="ri-no">✕ {pick(q.opts[picked])}</i>}
                  </div>
                  <div className="review-why"><b>{t('exams_explain')}: </b>{pick(q.explanation || q.why)}</div>
                </Reveal>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function subjLabel(t, s) {
  return t(`subj_${s}`);
}
