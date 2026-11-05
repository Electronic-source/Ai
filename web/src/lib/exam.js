/* Deterministic exam engine: seeded RNG, numeric question generators and a
   composer that mixes curated items, country items and generated items. */

import { QUESTION_BANK } from '../data/questions.js';
import { LESSONS } from '../data/curriculum.js';

/* ---------- seeded randomness ---------- */
export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const ri = (rng, min, max) => Math.floor(rng() * (max - min + 1)) + min;
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];
export function shuffle(rng, arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const fmt = (n) => {
  if (!Number.isFinite(n)) return String(n);
  const r = Math.round(n * 1000) / 1000;
  return String(r);
};

/* ---------- numeric generators ---------- */
const G = {
  primary(rng) {
    const kind = pick(rng, ['add', 'sub', 'mul', 'div', 'missing', 'perimeter']);
    if (kind === 'add') {
      const a = ri(rng, 24, 89), b = ri(rng, 24, 89), s = a + b;
      return q(`What is ${a} + ${b}?`, `${a} + ${b} چند است؟`, s, [s + 10, s - 10, s + 1], `Add the ones, carry, then add the tens: ${a} + ${b} = ${s}.`, `یکان‌ها را جمع کن، انتقال بده و سپس ده‌گان‌ها را جمع کن: ${a} + ${b} = ${s}.`);
    }
    if (kind === 'sub') {
      const a = ri(rng, 60, 120), b = ri(rng, 11, 45), s = a - b;
      return q(`What is ${a} − ${b}?`, `${a} − ${b} چند است؟`, s, [s + 9, s - 9, s + 20], `Borrow from the tens column: ${a} − ${b} = ${s}.`, `از ستون ده‌گان قرض بگیر: ${a} − ${b} = ${s}.`);
    }
    if (kind === 'mul') {
      const a = ri(rng, 3, 9), b = ri(rng, 4, 12), s = a * b;
      return q(`What is ${a} × ${b}?`, `${a} × ${b} چند است؟`, s, [s + a, s - a, s + b], `${a} groups of ${b} make ${s}.`, `${a} گروهِ ${b} تایی می‌شود ${s}.`);
    }
    if (kind === 'div') {
      const b = ri(rng, 3, 9), s = ri(rng, 4, 12), a = b * s;
      return q(`What is ${a} ÷ ${b}?`, `${a} ÷ ${b} چند است؟`, s, [s + 1, s - 1, s + 2], `${b} × ${s} = ${a}, so the quotient is ${s}.`, `${b} × ${s} = ${a}، پس خارج‌قسمت ${s} است.`);
    }
    if (kind === 'missing') {
      const s = ri(rng, 30, 80), b = ri(rng, 11, 29), a = s - b;
      return q(`☐ + ${b} = ${s}. The missing number is…`, `☐ + ${b} = ${s}. عدد گمشده چند است؟`, a, [a + 5, a - 5, s + b], `Subtract: ${s} − ${b} = ${a}.`, `تفریق کن: ${s} − ${b} = ${a}.`);
    }
    const a = ri(rng, 4, 12), b = ri(rng, 3, 9), p = 2 * (a + b);
    return q(`A rectangle is ${a} cm by ${b} cm. Its perimeter is…`, `مستطیلی ${a} در ${b} سانتی‌متر است. محیطش چند است؟`, p, [a * b, p + 4, p - 2], `P = 2(a + b) = 2(${a} + ${b}) = ${p} cm.`, `P = ۲(a+b) = ۲(${a}+${b}) = ${p} سانتی‌متر.`);
  },

  middle(rng) {
    const kind = pick(rng, ['percent', 'linear', 'area', 'ratio', 'negative', 'average']);
    if (kind === 'percent') {
      const p = pick(rng, [10, 15, 20, 25, 40]), n = ri(rng, 4, 20) * 20, s = (p / 100) * n;
      return q(`${p}% of ${n} is…`, `${p}٪ از ${n} چند است؟`, s, [s / 2, s + p, s - 10], `${p}% = ${p}/100; × ${n} = ${s}.`, `${p}٪ = ${p}/۱۰۰؛ ضرب در ${n} می‌شود ${s}.`);
    }
    if (kind === 'linear') {
      const a = ri(rng, 2, 7), x = ri(rng, 2, 9), b = ri(rng, 1, 15), c = a * x + b;
      return q(`Solve for x: ${a}x + ${b} = ${c}`, `x را بیاب: ${a}x + ${b} = ${c}`, x, [x + 2, x - 1, c], `Subtract ${b}, then divide by ${a}: x = ${x}.`, `${b} را کم کن و بر ${a} تقسیم کن: x = ${x}.`);
    }
    if (kind === 'area') {
      const b = ri(rng, 4, 16), h = ri(rng, 3, 12), s = (b * h) / 2;
      return q(`A triangle has base ${b} cm and height ${h} cm. Its area is…`, `مثلثی قاعدهٔ ${b} و ارتفاع ${h} سانتی‌متر دارد. مساحتش چند است؟`, s, [b * h, s + b, s - 1], `A = ½ · b · h = ${fmt(s)} cm².`, `A = ½×b×h = ${fmt(s)} سانتی‌متر مربع.`);
    }
    if (kind === 'ratio') {
      const k = ri(rng, 2, 6), a = 2 * k, b = 3 * k;
      return q(`Share ${a + b} in the ratio 2 : 3. The larger share is…`, `${a + b} را به نسبت ۲:۳ تقسیم کن. سهم بزرگ‌تر چند است؟`, b, [a, b + 3, a + b], `Total parts = 5, one part = ${fmt((a + b) / 5)}, larger = 3 parts = ${b}.`, `مجموع بخش‌ها ۵، هر بخش ${fmt((a + b) / 5)} و سهم بزرگ‌تر ۳ بخش = ${b}.`);
    }
    if (kind === 'negative') {
      const a = -ri(rng, 2, 12), b = ri(rng, 3, 15), s = a + b;
      return q(`What is (${a}) + ${b}?`, `(${a}) + ${b} چند است؟`, s, [a - b, s + 4, -s], `Move right ${b} from ${a} on the number line: ${s}.`, `روی محور از ${a} به اندازهٔ ${b} به راست برو: ${s}.`);
    }
    const xs = Array.from({ length: 5 }, () => ri(rng, 4, 20));
    const s = xs.reduce((x, y) => x + y, 0) / 5;
    return q(`The mean of ${xs.join(', ')} is…`, `میانگین ${xs.join('، ')} چند است؟`, s, [s + 2, s - 1, xs.reduce((x, y) => x + y, 0)], `Sum = ${xs.reduce((x, y) => x + y, 0)}; ÷ 5 = ${fmt(s)}.`, `مجموع = ${xs.reduce((x, y) => x + y, 0)}؛ تقسیم بر ۵ = ${fmt(s)}.`);
  },

  high(rng) {
    const kind = pick(rng, ['quadratic', 'derivative', 'log', 'trig', 'probability', 'sequence']);
    if (kind === 'quadratic') {
      const p = ri(rng, 1, 8), r = p + ri(rng, 1, 7);
      return q(`The roots of x² − ${p + r}x + ${p * r} = 0 are…`, `ریشه‌های x² − ${p + r}x + ${p * r} = 0 کدام‌اند؟`, `${p} and ${r}`, [`${p} and ${p * r}`, `${p + r} and ${p}`, `${-p} and ${-r}`], `Vieta: sum = ${p + r}, product = ${p * r} → x = ${p}, ${r}.`, `ویِتا: مجموع ${p + r} و حاصل‌ضرب ${p * r} → x = ${p} و ${r}.`);
    }
    if (kind === 'derivative') {
      const a = ri(rng, 2, 6), n = ri(rng, 2, 5);
      return q(`d/dx (${a}x^${n}) = ?`, `مشتق (${a}x^${n}) چیست؟`, `${a * n}x^${n - 1}`, [`${a}x^${n - 1}`, `${a * n}x^${n}`, `${n}x^${a}`], `Power rule: multiply by n, then reduce the exponent by one.`, `قاعدهٔ توان: ضرب در n و کاهش توان به اندازهٔ یک.`);
    }
    if (kind === 'log') {
      const k = ri(rng, 2, 6);
      return q(`log₂(${2 ** k}) = ?`, `log₂(${2 ** k}) چند است؟`, k, [k + 1, 2 * k, k - 1], `2^${k} = ${2 ** k}, so the exponent is ${k}.`, `۲^${k} = ${2 ** k}، پس نمای آن ${k} است.`);
    }
    if (kind === 'trig') {
      const t = pick(rng, [
        { a: 30, v: '1/2', d: ['√3/2', '√2/2', '1'] },
        { a: 45, v: '√2/2', d: ['1/2', '√3/2', '0'] },
        { a: 60, v: '√3/2', d: ['1/2', '√2/2', '1'] },
      ]);
      return q(`sin ${t.a}° = ?`, `sin ${t.a}° چند است؟`, t.v, t.d, `Standard special angle: sin ${t.a}° = ${t.v}.`, `زاویهٔ خاص استاندارد: sin ${t.a}° = ${t.v}.`);
    }
    if (kind === 'probability') {
      const r = ri(rng, 1, 4), b = ri(rng, 1, 4);
      return q(`A bag has ${r} red and ${b} blue balls. P(red) = ?`, `کیسه‌ای ${r} توپ قرمز و ${b} توپ آبی دارد. P(قرمز) = ؟`, `${r}/${r + b}`, [`${b}/${r + b}`, `${r}/${b}`, `${r + b}/${r}`], `Favourable ÷ total = ${r}/${r + b}.`, `تعداد مطلوب تقسیم بر کل = ${r}/${r + b}.`);
    }
    const a = ri(rng, 2, 6), d = ri(rng, 2, 7);
    return q(`An arithmetic sequence starts at ${a} with difference ${d}. The 10th term is…`, `دنبالهٔ حسابی با جملهٔ اول ${a} و قدر نسبت ${d}. جملهٔ دهم چند است؟`, a + 9 * d, [a + 10 * d, a + d * 9 + 1, a * d], `aₙ = a + (n − 1)d = ${a} + 9 × ${d} = ${a + 9 * d}.`, `aₙ = a + (n−۱)d = ${a} + ۹×${d} = ${a + 9 * d}.`);
  },

  university(rng) {
    const kind = pick(rng, ['integral', 'limit', 'det', 'product', 'binomial']);
    if (kind === 'integral') {
      const a = ri(rng, 1, 5), n = ri(rng, 1, 4);
      return q(`∫₀¹ ${a * (n + 1)}x^${n} dx = ?`, `∫₀¹ ${a * (n + 1)}x^${n} dx چند است؟`, a, [`${a * (n + 1)}`, `${a}/(${n + 1})`, `${a + 1}`], `Antiderivative ${a}x^${n + 1}; evaluate 0→1 gives ${a}.`, `پادمشتق ${a}x^${n + 1}؛ از ۰ تا ۱ می‌شود ${a}.`);
    }
    if (kind === 'limit') {
      const a = ri(rng, 2, 7);
      return q(`lim(x→${a}) (x² − ${a * a}) / (x − ${a}) = ?`, `lim(x→${a}) (x² − ${a * a}) / (x − ${a}) چند است؟`, 2 * a, [a, a * a, 1], `Factor: (x − ${a})(x + ${a}); cancel, substitute → ${2 * a}.`, `تجزیه: (x−${a})(x+${a})؛ حذف و جای‌گذاری → ${2 * a}.`);
    }
    if (kind === 'det') {
      const a = ri(rng, 1, 5), b = ri(rng, 1, 5), c = ri(rng, 1, 5), d = ri(rng, 1, 5);
      return q(`det [[${a}, ${b}], [${c}, ${d}]] = ?`, `دترمینان [[${a}, ${b}], [${c}, ${d}]] چند است؟`, a * d - b * c, [a * b - c * d, a * d + b * c, a + d - b - c], `ad − bc = ${a * d} − ${b * c} = ${a * d - b * c}.`, `ad − bc = ${a * d} − ${b * c} = ${a * d - b * c}.`);
    }
    if (kind === 'product') {
      const a = ri(rng, 2, 6), b = ri(rng, 2, 6);
      return q(`d/dx (${a}x · e^(${b}x)) = ?`, `مشتق (${a}x · e^(${b}x)) چیست؟`, `${a}(1 + ${b}x)e^(${b}x)`, [`${a * b}e^(${b}x)`, `${a}e^(${b}x)`, `${a}x e^(${b}x)`], `Product rule: ${a}e^(${b}x) + ${a}x · ${b}e^(${b}x).`, `قاعدهٔ ضرب: ${a}e^(${b}x) + ${a}x·${b}e^(${b}x).`);
    }
    const n = ri(rng, 4, 7), k = ri(rng, 1, n - 1);
    const C = (n, k) => { let r = 1; for (let i = 1; i <= k; i++) r = (r * (n - i + 1)) / i; return r; };
    return q(`C(${n}, ${k}) = ?`, `C(${n}, ${k}) چند است؟`, C(n, k), [C(n, k) + n, n * k, C(n, k) - k], `n!/(k!(n−k)!) = ${C(n, k)}.`, `n!/(k!(n−k)!) = ${C(n, k)}.`);
  },
};

function q(textEn, textFa, answer, distractors, whyEn, whyFa) {
  const opts = [answer];
  const seen = new Set([String(answer)]);
  const add = (v) => {
    const key = String(v);
    if (!seen.has(key) && opts.length < 4) {
      seen.add(key);
      opts.push(v);
    }
  };
  distractors.forEach(add);
  if (typeof answer === 'number') {
    let delta = 1;
    while (opts.length < 4 && delta < 40) {
      add(answer + delta);
      add(answer - delta);
      delta++;
    }
  } else {
    const pool = ['0', '1', '2', '3', '4', 'none of these', 'not defined'];
    for (const p of pool) if (opts.length < 4) add(p);
  }
  return {
    q: { en: textEn, fa: textFa },
    opts: opts.map((o) => ({ en: fmt(o), fa: fmt(o) })),
    a: 0,
    why: { en: whyEn, fa: whyFa },
    generated: true,
  };
}

function generateNumeric(level, rng) {
  const gen = G[level] || G.middle;
  const base = gen(rng);
  // rotate the correct answer away from index 0
  const n = base.opts.length;
  const shift = Math.floor(rng() * n);
  const opts = base.opts.map((_, i) => base.opts[(i + shift) % n]);
  const a = (n - shift) % n;
  return { q: base.q, opts, a, why: base.why, generated: true };
}

/* ---------- composer ---------- */
const LEVEL_ORDER = ['kindergarten', 'primary', 'middle', 'high', 'university', 'lifelong'];

function normalizeBank(item, lang) {
  return {
    id: item.id,
    from: item.country ? `country:${item.country}` : 'bank',
    country: item.country,
    q: item.q,
    opts: item.opts.en.map((_, i) => ({ en: item.opts.en[i], fa: (item.opts.fa || item.opts.en)[i] })),
    a: item.a,
    why: item.why,
  };
}

function fromLessonCheck(lesson) {
  const c = lesson.check;
  const opts = c.opts.en.map((_, i) => ({ en: c.opts.en[i], fa: (c.opts.fa || c.opts.en)[i] }));
  return {
    id: `check:${lesson.id}`,
    from: 'lesson',
    country: lesson.country,
    subject: lesson.subject,
    level: lesson.level,
    q: c.q,
    opts,
    a: c.answer,
    why: c.why,
  };
}

export function buildExam({ country, level, subject, count = 10, seed = Date.now(), difficulty = 2, lang = 'en' }) {
  const rng = mulberry32(seed);
  const out = [];
  const seen = new Set();

  const pushItem = (item) => {
    if (!item || seen.has(item.id)) return;
    seen.add(item.id);
    out.push(item);
  };

  /* 1 — national specialities from the country’s lessons (always included) */
  const countryLessons = LESSONS.filter((l) => l.country === country);
  const countryChecks = countryLessons.filter((l) => l.subject === subject || subject === 'national' || l.level === level);
  for (const l of shuffle(rng, countryChecks).slice(0, 2)) pushItem(fromLessonCheck(l));

  /* 2 — curated bank, closest level first */
  const li = LEVEL_ORDER.indexOf(level);
  const bank = QUESTION_BANK.filter((b) => b.subject === subject && b.diff <= difficulty + 1);
  const sorted = shuffle(rng, bank).sort((a, b) => {
    const da = Math.abs(LEVEL_ORDER.indexOf(a.level) - li);
    const db = Math.abs(LEVEL_ORDER.indexOf(b.level) - li);
    return da - db;
  });
  for (const b of sorted) {
    if (out.length >= Math.ceil(count * 0.6)) break;
    pushItem(normalizeBank(b));
  }

  /* 3 — widen to nearby levels of any subject before falling back to generators */
  if (out.length < count) {
    const cross = shuffle(rng, QUESTION_BANK.filter((b) => Math.abs(LEVEL_ORDER.indexOf(b.level) - li) <= 1));
    for (const b of cross) {
      if (out.length >= count) break;
      pushItem(normalizeBank(b));
    }
  }
  if (out.length < count) {
    const lessonPool = shuffle(rng, LESSONS.filter((l) => Math.abs(LEVEL_ORDER.indexOf(l.level) - li) <= 1));
    for (const l of lessonPool) {
      if (out.length >= count) break;
      pushItem(fromLessonCheck(l));
    }
  }

  /* 4 — numeric generators guarantee the count */
  const numericLevel = level === 'lifelong' || level === 'kindergarten' ? 'primary' : level;
  let guard = 0;
  while (out.length < count && guard < 60) {
    guard++;
    const g = generateNumeric(numericLevel, rng);
    g.id = `gen:${seed}:${out.length}:${guard}`;
    g.from = 'generated';
    pushItem(g);
  }

  const questions = out.slice(0, count).map((item) => {
    const shift = Math.floor(rng() * item.opts.length);
    const opts = item.opts.map((_, i) => item.opts[(i + shift) % item.opts.length]);
    const a = (item.a - shift + item.opts.length) % item.opts.length;
    return { ...item, opts, a, explanation: item.why };
  });

  return { seed, country, level, subject, count: questions.length, difficulty, questions };
}

export function gradeAttempt(exam, answers) {
  let correct = 0, wrong = 0, skipped = 0;
  const detail = exam.questions.map((question, i) => {
    const picked = answers[i];
    if (picked === undefined || picked === null) { skipped++; return { i, picked: null, ok: false }; }
    const ok = picked === question.a;
    ok ? correct++ : wrong++;
    return { i, picked, ok };
  });
  const total = exam.questions.length;
  const score = total ? Math.round((correct / total) * 100) : 0;
  return { correct, wrong, skipped, total, score, passed: score >= 50, detail, xp: correct * 10 + (score >= 80 ? 40 : 0) };
}

export function clock(sec) {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
