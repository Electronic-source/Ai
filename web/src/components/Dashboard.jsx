import React, { useMemo } from 'react';
import { useApp } from '../lib/store.jsx';
import { COUNTRY_BY_CODE, SUBJECT_META } from '../data/countries.js';
import { LESSONS, TIPS } from '../data/curriculum.js';
import { Avatar, Ico, Reveal, Ring, openAuth } from './ui.jsx';

const dayKey = (offset) => {
  const d = new Date();
  d.setDate(d.getDate() - offset);
  return d.toISOString().slice(0, 10);
};

export default function Dashboard() {
  const app = useApp();
  const { t, lang, pick, user, country, level, progress, myGroups, navigate } = app;

  const c = COUNTRY_BY_CODE[country];
  const lessonsDone = Object.keys(progress.lessons || {}).length;
  const attempts = progress.attempts || [];
  const avg = attempts.length ? Math.round(attempts.reduce((s, a) => s + a.score, 0) / attempts.length) : 0;
  const tip = TIPS[new Date().getDate() % TIPS.length];

  const recommended = useMemo(() => {
    const pool = LESSONS.filter((l) => l.country === country || l.country === 'GLOBAL');
    const unread = pool.filter((l) => !progress.lessons?.[l.id]);
    const byLevel = unread.filter((l) => l.level === (user?.level || level));
    return [...byLevel, ...unread.filter((l) => !byLevel.includes(l))].slice(0, 3);
  }, [country, progress.lessons, level, user?.level]);

  const activity = useMemo(() => {
    const set = new Set(progress.activity || []);
    /* a lesson or attempt on a day fills the bar; the demo streak stays readable */
    return Array.from({ length: 14 }, (_, i) => ({ key: dayKey(13 - i), active: set.has(dayKey(13 - i)) }));
  }, [progress.activity]);

  const nextExam = useMemo(() => {
    const subject = c?.signature?.subject || 'math';
    return { subject, country };
  }, [c, country]);

  return (
    <div className="page page-fade">
      <div className="shell">
        <div className="dash-head">
          <Avatar name={user?.name || t('dash_guest')} size="lg" />
          <div>
            <h1>{user ? `${t('dash_hello')}، ${user.name.split(' ')[0]}` : t('dash_guest')}</h1>
            <p className="dh-sub">
              {c?.flag} {c?.name[lang] || c?.name.en} · {t(`level_${user?.level || level}`)} · {t('dash_sub')}
            </p>
          </div>
          <div className="dh-actions">
            {!user && <button className="btn btn-sm btn-primary" onClick={() => openAuth('signup')}>{t('nav_signup')}</button>}
            <button className="btn btn-sm btn-ghost" onClick={() => navigate('library')}><Ico name="book" size={14} /> {t('nav_library')}</button>
            <button className="btn btn-sm btn-primary" onClick={() => navigate('exams', { subject: nextExam.subject })}><Ico name="bolt" size={14} /> {t('dash_take')}</button>
          </div>
        </div>

        {!user && <div className="tip-card mb-24">{t('guest_notice')}</div>}

        <div className="stat-row">
          <div className="stat-card">
            <span className="st-icon" style={{ color: 'var(--coral)' }}><Ico name="flame" size={18} /></span>
            <div><b>{progress.streak || 0}</b><span>{t('dash_streak')}</span></div>
          </div>
          <div className="stat-card">
            <span className="st-icon" style={{ color: 'var(--gold)' }}><Ico name="bolt" size={18} /></span>
            <div><b>{progress.xp || 0}</b><span>{t('dash_xp')}</span></div>
          </div>
          <div className="stat-card">
            <span className="st-icon" style={{ color: 'var(--mint)' }}><Ico name="book" size={18} /></span>
            <div><b>{lessonsDone}</b><span>{t('dash_lessons')}</span></div>
          </div>
          <div className="stat-card">
            <span className="st-icon" style={{ color: 'var(--iris)' }}><Ico name="target" size={18} /></span>
            <div><b>{avg}%</b><span>{t('dash_avg')}</span></div>
          </div>
        </div>

        <div className="dash-grid">
          <div className="stack">
            <div className="card panel">
              <div className="panel-head">
                <h3>{t('dash_continue')}</h3>
                <button className="link-arrow" onClick={() => navigate('library')}>{t('common_view_all')} <span>→</span></button>
              </div>
              <div className="stack-sm">
                {recommended.map((l, i) => {
                  const meta = SUBJECT_META[l.subject] || {};
                  const done = !!progress.lessons?.[l.id];
                  return (
                    <button
                      key={l.id}
                      className="group-card"
                      style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14 }}
                      onClick={() => navigate('library', { level: l.level, country: l.country === 'GLOBAL' ? 'all' : l.country })}
                    >
                      <span className="group-emblem" style={{ color: meta.accent }}>{meta.icon}</span>
                      <span className="grow" style={{ textAlign: 'start' }}>
                        <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600 }}>{pick(l.title)}</span>
                        <span className="fs-76 muted">{t(`subj_${l.subject}`)} · {t(`level_${l.level}`)} · {l.minutes} {t('common_min')}</span>
                      </span>
                      {done ? <Ico name="check" size={16} style={{ color: 'var(--mint)' }} /> : <Ico name="arrow" size={16} style={{ color: 'var(--muted-2)' }} />}
                    </button>
                  );
                })}
                {!recommended.length && <div className="empty-state">{t('dash_nothing')}</div>}
              </div>
            </div>

            <div className="card panel">
              <div className="panel-head">
                <h3>{t('dash_activity')}</h3>
                <span className="fs-76 muted">{progress.streak || 0} × {t('dash_streak')}</span>
              </div>
              <div className="spark">
                {activity.map((d) => (
                  <i key={d.key} className={d.active ? '' : 'off'} style={{ height: d.active ? `${38 + ((d.key.charCodeAt(9) * 7) % 52)}%` : '8%' }} />
                ))}
              </div>
              <div className="row-between fs-76 muted mt-8">
                <span>{t('dash_activity')}</span>
                <span>{t('common_ready')}</span>
              </div>
            </div>

            <div className="card panel">
              <div className="panel-head">
                <h3>{t('dash_exam_bank')}</h3>
                <button className="link-arrow" onClick={() => navigate('exams')}>{t('exams_build')} <span>→</span></button>
              </div>
              {attempts.slice(0, 5).map((a, i) => (
                <div key={i} className="attempt-row">
                  <span className="fs-82">{t(`subj_${a.subject}`)}</span>
                  <span className="ar-date">{new Date(a.at).toLocaleDateString(lang === 'fa' ? 'fa-IR' : undefined)}</span>
                  <span className="fs-76 muted">{a.correct}/{a.total}</span>
                  <span className="ar-score" style={{ color: a.score >= 50 ? 'var(--mint)' : 'var(--coral)' }}>{a.score}</span>
                </div>
              ))}
              {!attempts.length && <p className="fs-82 muted">{t('dash_no_attempts')}</p>}
            </div>
          </div>

          <aside className="stack">
            <div className="card panel">
              <div className="panel-head">
                <h3>{t('dash_upcoming')}</h3>
                <button className="link-arrow" onClick={() => navigate('groups')}>{t('common_view_all')} <span>→</span></button>
              </div>
              {myGroups.slice(0, 2).map((g) => {
                const board = [...g.members].sort((a, b) => b.xp - a.xp);
                const gc = COUNTRY_BY_CODE[g.country];
                return (
                  <div key={g.id} className="mb-16">
                    <div className="row-between mb-8">
                      <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{gc?.flag} {g.name}</span>
                      <span className="pill pill-iris" style={{ fontSize: 10 }}>{g.members.length} {t('groups_members')}</span>
                    </div>
                    {board.slice(0, 3).map((m, i) => (
                      <div key={m.id} className="member-row" style={{ padding: '6px 0' }}>
                        <span className="m-rank">{i + 1}</span>
                        <Avatar name={m.name} size="sm" />
                        <span className="m-name">{m.name}</span>
                        <span className="m-xp">{m.xp.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                );
              })}
              {!myGroups.length && (
                <button className="btn btn-ghost btn-block" onClick={() => navigate('groups')}>
                  <Ico name="users" size={15} /> {t('groups_create')}
                </button>
              )}
            </div>

            <div className="card panel">
              <div className="panel-head">
                <h3>{t('dash_next_exam')}</h3>
              </div>
              <div className="row" style={{ gap: 14 }}>
                <Ring value={avg || 0} size={72} stroke={6} color="var(--iris)">{avg || 0}%</Ring>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{t(`subj_${nextExam.subject}`)}</div>
                  <div className="fs-76 muted">{c?.exams?.[0]?.name[lang] || c?.exams?.[0]?.name.en || '—'}</div>
                </div>
              </div>
              <button className="btn btn-primary btn-sm btn-block mt-16" onClick={() => navigate('exams', { subject: nextExam.subject, country })}>
                <Ico name="bolt" size={14} /> {t('dash_take')}
              </button>
            </div>

            <div className="tip-card">
              <div className="tc-label"><Ico name="sparkle" size={12} style={{ verticalAlign: '-2px' }} /> {t('dash_tips')}</div>
              {pick(tip)}
            </div>

            <div className="card panel">
              <div className="panel-head">
                <h3>{t('nav_country')} · {t('exams_level')}</h3>
              </div>
              <div className="chips">
                {[...new Set(LESSONS.filter((l) => l.country === country).map((l) => l.level))].map((lv) => (
                  <span key={lv} className="pill">{t(`level_${lv}`)}</span>
                ))}
              </div>
              <div className="row mt-16">
                <button className="chip" onClick={() => navigate('library', { country })}>{t('globe_open')}</button>
                <button className="chip" onClick={() => navigate('home')}>
                  <Ico name="globe" size={12} style={{ verticalAlign: '-2px', marginInlineEnd: 4 }} /> {t('nav_countries')}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
