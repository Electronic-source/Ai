import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../lib/store.jsx';
import { COUNTRIES, COUNTRY_BY_CODE, SUBJECTS, SUBJECT_META } from '../data/countries.js';
import { LEVELS } from '../data/i18n.js';
import { Avatar, Ico, Reveal, toast } from './ui.jsx';

const code4 = () => Math.random().toString(36).slice(2, 8).toUpperCase();

export default function Groups() {
  const app = useApp();
  const { t, lang, country, level, user, myGroups, groups, joinGroup, createGroup, navigate, progress, sessionKey } = app;
  const [openId, setOpenId] = useState(null);
  const [joinCode, setJoinCode] = useState('');
  const [pendingCode, setPendingCode] = useState(null);
  const [form, setForm] = useState({ name: '', subject: 'math', country, level });

  const openGroup = groups.find((g) => g.id === openId);
  const pendingGroup = groups.find((g) => g.code === pendingCode);

  useEffect(() => {
    if (pendingGroup) {
      setOpenId(pendingGroup.id);
      setPendingCode(null);
    }
  }, [pendingGroup]);

  const doJoin = (code, groupId) => {
    const g = groupId ? groups.find((x) => x.id === groupId) : groups.find((x) => x.code.toLowerCase() === code.trim().toLowerCase());
    if (!g) { toast(t('groups_bad_code'), 'error'); return; }
    if (g.members.some((m) => m.id === sessionKey)) { toast(t('groups_joined')); setOpenId(g.id); return; }
    joinGroup(g.id);
    toast(t('groups_joined'));
    setOpenId(g.id);
    setJoinCode('');
  };

  const doCreate = (e) => {
    e.preventDefault();
    if (form.name.trim().length < 3) return;
    const code = code4();
    createGroup({ name: form.name.trim(), code, country: form.country, level: form.level, subject: form.subject, displayName: user?.name });
    toast(`${t('groups_created')} · ${code}`);
    setForm((f) => ({ ...f, name: '' }));
    setPendingCode(code);
  };

  if (openGroup) {
    return <GroupDetail group={openGroup} onBack={() => setOpenId(null)} />;
  }

  const discover = groups.filter((g) => !g.members.some((m) => m.id === sessionKey));

  return (
    <div className="page page-fade">
      <div className="shell">
        <div className="page-head">
          <span className="kicker">{t('groups_title')}</span>
          <h1>{t('groups_title')}</h1>
          <p className="lede">{t('groups_sub')}</p>
        </div>

        <div className="groups-layout">
          <div>
            <div className="row-between mb-16">
              <h3 className="h-card">{t('groups_my')} · {myGroups.length}</h3>
              {!user && <span className="pill pill-gold">{t('groups_need_auth')}</span>}
            </div>

            <div className="group-list">
              {myGroups.map((g, i) => (
                <Reveal key={g.id} delay={Math.min(4, i + 1)}>
                  <GroupCard group={g} onOpen={() => setOpenId(g.id)} you={sessionKey} />
                </Reveal>
              ))}
              {!myGroups.length && (
                <div className="empty-state">
                  <b>◦</b>
                  {t('groups_empty')}
                </div>
              )}
            </div>

            <div className="row-between mt-32 mb-16">
              <h3 className="h-card">{t('groups_discover')}</h3>
              <span className="fs-76 muted">{discover.length} {t('common_ready')}</span>
            </div>
            <div className="group-list">
              {discover.map((g, i) => (
                <Reveal key={g.id} delay={Math.min(4, i + 1)}>
                  <GroupCard group={g} onOpen={() => setOpenId(g.id)} onJoin={() => doJoin(null, g.id)} you={sessionKey} />
                </Reveal>
              ))}
              {!discover.length && <div className="empty-state">{t('groups_empty')}</div>}
            </div>
          </div>

          <aside className="stack">
            <div className="card group-panel">
              <h5>{t('groups_join')}</h5>
              <form className="group-form" onSubmit={(e) => { e.preventDefault(); doJoin(joinCode); }}>
                <div className="field">
                  <label htmlFor="join-code">{t('groups_code')}</label>
                  <input id="join-code" className="input mono" placeholder="AB12CD" value={joinCode} onChange={(e) => setJoinCode(e.target.value.toUpperCase())} maxLength={10} />
                </div>
                <button className="btn btn-primary btn-block" type="submit">{t('groups_join_btn')} <Ico name="arrow" size={15} /></button>
              </form>
            </div>

            <div className="card group-panel">
              <h5>{t('groups_create')}</h5>
              <form className="group-form" onSubmit={doCreate}>
                <div className="field">
                  <label htmlFor="g-name">{t('groups_name')}</label>
                  <input id="g-name" className="input" placeholder={lang === 'fa' ? 'گروه ریاضی دوازدهم' : 'Grade 12 calculus crew'} value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="field">
                  <label htmlFor="g-subject">{t('groups_focus')}</label>
                  <select id="g-subject" className="select" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}>
                    {SUBJECTS.map((s) => <option key={s} value={s}>{SUBJECT_META[s]?.icon} {t(`subj_${s}`)}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="g-country">{t('groups_place')}</label>
                  <select id="g-country" className="select" value={form.country} onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}>
                    {COUNTRIES.map((c) => <option key={c.code} value={c.code}>{c.flag} {c.name[lang] || c.name.en}</option>)}
                  </select>
                </div>
                <div className="field">
                  <label htmlFor="g-level">{t('exams_level')}</label>
                  <select id="g-level" className="select" value={form.level} onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}>
                    {LEVELS.map((l) => <option key={l} value={l}>{t(`level_${l}`)}</option>)}
                  </select>
                </div>
                <button className="btn btn-primary btn-block" type="submit"><Ico name="plus" size={15} /> {t('groups_create')}</button>
              </form>
            </div>

            <div className="tip-card">
              <div className="tc-label">{t('groups_leaderboard')}</div>
              {t('groups_new_exam_note')}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function GroupCard({ group, onOpen, onJoin, you }) {
  const { t, lang } = useApp();
  const c = COUNTRY_BY_CODE[group.country];
  const isMember = group.members.some((m) => m.id === you);
  const meta = SUBJECT_META[group.subject] || {};
  return (
    <div className="group-card">
      <div className="group-top">
        <span className="group-emblem">{meta.icon || '✦'}</span>
        <div className="grow">
          <h4>{group.name}</h4>
          <small>
            {c ? `${c.flag} ${c.name[lang] || c.name.en}` : '🌍'} · {t(`subj_${group.subject}`)} · {t(`level_${group.level}`)}
          </small>
        </div>
        <span className="pill pill-iris">{group.members.length} {t('groups_members')}</span>
      </div>
      <div className="group-meta">
        <span className="group-code">{group.code}</span>
        {isMember ? (
          <button className="btn btn-sm btn-ghost" onClick={onOpen}>{t('groups_open_btn')} <Ico name="arrow" size={13} /></button>
        ) : (
          <button className="btn btn-sm btn-primary" onClick={onJoin || onOpen}>{t('groups_join_btn')}</button>
        )}
        <span className="fs-76 muted" style={{ marginInlineStart: 'auto' }}>
          {group.exams?.length || 0} {t('groups_exams')}
        </span>
      </div>
    </div>
  );
}

function GroupDetail({ group, onBack }) {
  const { t, lang, navigate, sessionKey, pick, progress } = useApp();
  const c = COUNTRY_BY_CODE[group.country];
  const meta = SUBJECT_META[group.subject] || {};
  const isMember = group.members.some((m) => m.id === sessionKey);
  const board = useMemo(() => [...group.members].sort((a, b) => b.xp - a.xp), [group]);

  return (
    <div className="page page-fade">
      <div className="shell">
        <div className="crumbs">
          <button onClick={() => navigate('groups')}>{t('groups_title')}</button> <span>/</span> <span>{group.name}</span>
        </div>

        <div className="dash-head">
          <span className="group-emblem" style={{ width: 54, height: 54, fontSize: '1.5rem' }}>{meta.icon || '✦'}</span>
          <div>
            <h1>{group.name}</h1>
            <p className="dh-sub">
              {c ? `${c.flag} ${c.name[lang] || c.name.en}` : '🌍'} · {t(`subj_${group.subject}`)} · {t(`level_${group.level}`)} · {group.members.length} {t('groups_members')}
            </p>
            <div className="row mt-8">
              <span className="group-code">{group.code}</span>
              <button className="chip" onClick={() => { navigator.clipboard?.writeText(group.code); toast(`${t('groups_code')}: ${group.code}`); }}>
                <Ico name="copy" size={12} style={{ verticalAlign: '-2px', marginInlineEnd: 4 }} /> {t('groups_code')}
              </button>
            </div>
          </div>
          <div className="dh-actions">
            <button className="btn btn-ghost btn-sm" onClick={onBack}><Ico name="back" size={14} /> {t('common_back')}</button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate('exams', { groupId: group.id, subject: group.subject })}
              disabled={!isMember}
            >
              <Ico name="bolt" size={14} /> {t('groups_run_exam')}
            </button>
          </div>
        </div>

        <div className="dash-grid">
          <div className="stack">
            <div className="card panel">
              <div className="panel-head">
                <h3><Ico name="star" size={15} style={{ verticalAlign: '-2px', color: 'var(--gold)' }} /> {t('groups_leaderboard')}</h3>
                <span className="fs-76 muted">{t('groups_rank')} · {t('groups_xp')}</span>
              </div>
              {board.map((m, i) => (
                <div key={m.id} className={`member-row ${m.id === sessionKey ? 'me' : ''}`}>
                  <span className="m-rank">{i + 1}</span>
                  <Avatar name={m.name} size="sm" />
                  <div>
                    <div className="m-name">{m.name} {m.isOwner && <span className="pill" style={{ fontSize: 9.5, padding: '1px 6px' }}>{t('groups_owner')}</span>} {m.id === sessionKey && <span className="pill pill-mint" style={{ fontSize: 9.5, padding: '1px 6px' }}>{t('groups_you')}</span>}</div>
                    <div className="m-sub">{m.lessons || 0} {t('common_lessons')}</div>
                  </div>
                  <span className="m-xp">{m.xp.toLocaleString()} XP</span>
                </div>
              ))}
            </div>

            <div className="card panel">
              <div className="panel-head">
                <h3>{t('groups_exams')}</h3>
                <span className="fs-76 muted">{group.exams?.length || 0}</span>
              </div>
              {(group.exams || []).map((e) => (
                <div key={e.id} className="attempt-row">
                  <span className="fs-82">{t(`subj_${e.subject}`)}</span>
                  <span className="ar-date">{e.date}</span>
                  <span className="fs-76 muted">{e.count} {t('common_questions')}</span>
                  <span className="ar-score" style={{ color: (e.score ?? 0) >= 50 ? 'var(--mint)' : 'var(--coral)' }}>{e.score ?? '—'}</span>
                </div>
              ))}
              {!group.exams?.length && <div className="empty-state" style={{ padding: 28 }}>{t('dash_no_attempts')}</div>}
            </div>
          </div>

          <aside className="stack">
            <div className="card panel">
              <h5 className="mini-label mb-16">{t('groups_activity')}</h5>
              {[...(group.exams || []).slice(0, 5)].map((e, i) => (
                <div key={i} className="activity-item">
                  <span className="ai-dot" />
                  <span>{t('groups_exams')} · {t(`subj_${e.subject}`)} · {e.date}</span>
                </div>
              ))}
              {!group.exams?.length && <p className="fs-82 muted">{t('groups_new_exam_note')}</p>}
            </div>

            <div className="tip-card">
              <div className="tc-label">{t('groups_run_exam')}</div>
              {t('groups_new_exam_note')}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
