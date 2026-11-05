import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { LANGUAGES, dirOf, makeT } from '../data/i18n.js';
import { COUNTRY_BY_CODE, COUNTRIES } from '../data/countries.js';
import { LESSONS } from '../data/curriculum.js';

const KEY = 'darsa:v1';
const GUEST = 'guest';

/* ——— tiny non-cryptographic hash; this build stores data locally only ——— */
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36);
}

const today = () => new Date().toISOString().slice(0, 10);
const uid = (p = 'id') => `${p}_${Math.random().toString(36).slice(2, 9)}`;

function seedGroups() {
  return [
    {
      id: 'g_konkur', name: 'کنکور ۱۴۰۵ — ریاضی', code: 'KONKUR25', ownerId: 'seed',
      country: 'IR', level: 'high', subject: 'math',
      members: [
        { id: 'seed', name: 'سارا محمدی', xp: 1840, lessons: 26, isOwner: true },
        { id: 's2', name: 'امیر رضایی', xp: 1520, lessons: 21 },
        { id: 's3', name: 'نگار کاظمی', xp: 1310, lessons: 19 },
        { id: 's4', name: 'حسین فرهادی', xp: 980, lessons: 14 },
      ],
      exams: [{ id: 'ge1', date: '2026-10-28', subject: 'math', count: 15 }],
    },
    {
      id: 'g_abitur', name: 'Abitur Physik 2027', code: 'ABI2027', ownerId: 'seed2',
      country: 'DE', level: 'high', subject: 'physics',
      members: [
        { id: 'seed2', name: 'Lena Fischer', xp: 2110, lessons: 31, isOwner: true },
        { id: 's5', name: 'Jonas Weber', xp: 1690, lessons: 24 },
        { id: 's6', name: 'Mehmet Yilmaz', xp: 1240, lessons: 17 },
      ],
      exams: [{ id: 'ge2', date: '2026-10-30', subject: 'physics', count: 12 }],
    },
    {
      id: 'g_gaokao', name: 'Gaokao Math Sprint', code: 'GAOKAO88', ownerId: 'seed3',
      country: 'CN', level: 'high', subject: 'math',
      members: [
        { id: 'seed3', name: 'Li Wei', xp: 2350, lessons: 34, isOwner: true },
        { id: 's7', name: 'Chen Yu', xp: 1980, lessons: 28 },
        { id: 's8', name: 'Wang Fang', xp: 1470, lessons: 22 },
        { id: 's9', name: 'Zhang Min', xp: 1120, lessons: 16 },
      ],
      exams: [],
    },
    {
      id: 'g_sat', name: 'SAT Reading Circle', code: 'SATREAD', ownerId: 'seed4',
      country: 'US', level: 'high', subject: 'english',
      members: [
        { id: 'seed4', name: 'Maya Johnson', xp: 1760, lessons: 25, isOwner: true },
        { id: 's10', name: 'Diego Alvarez', xp: 1330, lessons: 20 },
      ],
      exams: [],
    },
  ];
}

const initialState = {
  lang: 'fa',
  country: 'IR',
  route: 'home',
  routeArg: null,
  users: [],
  sessionId: null,
  groups: seedGroups(),
  progress: {},
};

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initialState;
    const saved = JSON.parse(raw);
    return {
      ...initialState,
      ...saved,
      route: 'home',
      routeArg: null,
      groups: saved.groups?.length ? saved.groups : seedGroups(),
    };
  } catch {
    return initialState;
  }
}

function save(state) {
  try {
    const { users, sessionId, groups, progress, lang, country } = state;
    localStorage.setItem(KEY, JSON.stringify({ users, sessionId, groups, progress, lang, country }));
  } catch {
    /* storage unavailable — the session still works in memory */
  }
}

const blankProgress = () => ({ lessons: {}, attempts: [], xp: 0, activity: [], streak: 0 });

function withProgress(state, fn) {
  const key = state.sessionId || GUEST;
  const current = state.progress[key] || blankProgress();
  const next = fn({ ...current, lessons: { ...current.lessons }, attempts: [...current.attempts], activity: [...current.activity] });
  return { ...state, progress: { ...state.progress, [key]: next } };
}

function reducer(state, action) {
  switch (action.type) {
    case 'navigate':
      return { ...state, route: action.route, routeArg: action.arg ?? null };
    case 'lang': {
      const next = { ...state, lang: action.lang };
      return syncProfile(next, { lang: action.lang });
    }
    case 'country': {
      const next = { ...state, country: action.country };
      return syncProfile(next, { country: action.country });
    }
    case 'setLevel':
      return syncProfile({ ...state, level: action.level }, { level: action.level });
    case 'signup': {
      const user = {
        id: uid('u'),
        name: action.name,
        email: action.email.toLowerCase(),
        pass: hash(action.password),
        country: action.country,
        level: action.level,
        lang: action.lang,
        createdAt: Date.now(),
      };
      const prev = state.progress[GUEST] || blankProgress();
      const progress = { ...state.progress, [user.id]: prev };
      /* guest study groups follow the new account */
      const groups = state.groups.map((g) => ({
        ...g,
        members: g.members.map((m) => (m.id === GUEST ? { ...m, id: user.id, name: user.name } : m)),
      }));
      return { ...state, users: [...state.users, user], sessionId: user.id, progress, groups, lang: action.lang, country: action.country, route: 'dashboard' };
    }
    case 'signin':
      return { ...state, sessionId: action.id, route: 'dashboard' };
    case 'signout':
      return { ...state, sessionId: null, route: 'home' };
    case 'learn': {
      return withProgress(state, (p) => {
        const done = !p.lessons[action.lessonId];
        if (done) {
          p.lessons[action.lessonId] = Date.now();
          p.xp += 20;
          if (!p.activity.includes(today())) p.activity.push(today());
        } else {
          delete p.lessons[action.lessonId];
          p.xp = Math.max(0, p.xp - 20);
        }
        p.streak = streakOf(p.activity);
        return p;
      });
    }
    case 'attempt': {
      const next = withProgress(state, (p) => {
        p.attempts.unshift({ ...action.attempt, at: Date.now() });
        p.attempts = p.attempts.slice(0, 40);
        p.xp += action.attempt.xp;
        if (!p.activity.includes(today())) p.activity.push(today());
        p.streak = streakOf(p.activity);
        return p;
      });
      /* mirror the score into every group this learner belongs to */
      const userId = state.sessionId;
      if (!userId) return next;
      const groups = next.groups.map((g) => {
        const idx = g.members.findIndex((m) => m.id === userId);
        if (idx === -1) return g;
        const members = g.members.map((m, i) => (i === idx ? { ...m, xp: m.xp + action.attempt.xp } : m));
        const shared = action.attempt.groupId === g.id;
        const exams = shared
          ? [{ id: uid('ge'), date: today(), subject: action.attempt.subject, count: action.attempt.total, by: userId, score: action.attempt.score }, ...(g.exams || [])].slice(0, 12)
          : g.exams || [];
        return { ...g, members, exams };
      });
      return { ...next, groups };
    }
    case 'createGroup': {
      const key = state.sessionId;
      const user = state.users.find((u) => u.id === key);
      const p = state.progress[key] || blankProgress();
      const group = {
        id: uid('g'),
        name: action.name,
        code: action.code,
        ownerId: key || GUEST,
        country: action.country,
        level: action.level,
        subject: action.subject,
        members: [{ id: key || GUEST, name: user?.name || action.displayName || 'Guest', xp: p.xp, lessons: Object.keys(p.lessons).length, isOwner: true }],
        exams: [],
      };
      return { ...state, groups: [group, ...state.groups] };
    }
    case 'joinGroup': {
      const key = state.sessionId || GUEST;
      const user = state.users.find((u) => u.id === key);
      const p = state.progress[key] || blankProgress();
      const groups = state.groups.map((g) => {
        if (g.id !== action.groupId) return g;
        if (g.members.some((m) => m.id === key)) return g;
        return { ...g, members: [...g.members, { id: key, name: user?.name || 'Guest', xp: p.xp, lessons: Object.keys(p.lessons).length }] };
      });
      return { ...state, groups };
    }
    case 'groupExam': {
      const groups = state.groups.map((g) => (g.id === action.groupId ? { ...g, exams: [{ id: uid('ge'), date: today(), subject: action.subject, count: action.count, by: 'you', score: action.score }, ...(g.exams || [])] } : g));
      return { ...state, groups };
    }
    default:
      return state;
  }
}

function syncProfile(state, patch) {
  if (!state.sessionId) return state;
  return { ...state, users: state.users.map((u) => (u.id === state.sessionId ? { ...u, ...patch } : u)) };
}

function streakOf(activity) {
  if (!activity?.length) return 0;
  const set = new Set(activity);
  let streak = 0;
  const d = new Date();
  if (!set.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1);
  while (set.has(d.toISOString().slice(0, 10))) {
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

const Ctx = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load);
  const t = useMemo(() => makeT(state.lang), [state.lang]);
  const dir = dirOf(state.lang);

  useEffect(() => { save(state); }, [state]);
  useEffect(() => {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = dir;
    document.title = state.lang === 'fa' ? 'درسا · آکادمی جهانی آموزش' : 'Darsa · Global Learning Academy';
  }, [state.lang, dir]);

  const user = state.users.find((u) => u.id === state.sessionId) || null;
  const progress = state.progress[state.sessionId || GUEST] || blankProgress();

  const value = useMemo(() => {
    const pick = (obj, fallbackLang) => {
      if (!obj) return '';
      return obj[state.lang] || obj.en || obj.fa || obj[fallbackLang] || Object.values(obj)[0] || '';
    };
    const myGroups = state.groups.filter((g) => g.members.some((m) => m.id === (state.sessionId || GUEST)));
    return {
      ...state,
      user,
      progress,
      t,
      dir,
      pick,
      myGroups,
      countryData: COUNTRY_BY_CODE[state.country] || COUNTRIES[0],
      languages: LANGUAGES,
      level: user?.level || 'high',
      sessionKey: state.sessionId || GUEST,
      navigate: (route, arg) => { dispatch({ type: 'navigate', route, arg }); window.scrollTo({ top: 0, behavior: 'smooth' }); },
      setLang: (lang) => dispatch({ type: 'lang', lang }),
      setCountry: (country) => dispatch({ type: 'country', country }),
      setLevel: (level) => dispatch({ type: 'setLevel', level }),
      signOut: () => dispatch({ type: 'signout' }),
      signIn: (id) => dispatch({ type: 'signin', id }),
      signUp: (payload) => dispatch({ type: 'signup', ...payload }),
      learn: (lessonId) => dispatch({ type: 'learn', lessonId }),
      recordAttempt: (attempt) => dispatch({ type: 'attempt', attempt }),
      createGroup: (payload) => dispatch({ type: 'createGroup', ...payload }),
      joinGroup: (groupId) => dispatch({ type: 'joinGroup', groupId }),
      recordGroupExam: (payload) => dispatch({ type: 'groupExam', ...payload }),
      lessons: LESSONS,
      verify: (email, password) => {
        const u = state.users.find((x) => x.email === email.toLowerCase().trim());
        if (!u || u.pass !== hash(password)) return null;
        return u;
      },
      emailTaken: (email) => state.users.some((x) => x.email === email.toLowerCase().trim()),
    };
  }, [state, user, progress, t, dir]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useApp outside provider');
  return ctx;
}
