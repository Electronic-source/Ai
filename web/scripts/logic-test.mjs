import { buildExam, gradeAttempt, mulberry32 } from '../src/lib/exam.js';
import { COUNTRIES, SUBJECTS } from '../src/data/countries.js';
import { LESSONS } from '../src/data/curriculum.js';
import { LEVELS } from '../src/data/i18n.js';

let problems = 0;
const fail = (m) => { console.log('FAIL', m); problems++; };

// lessons integrity
for (const l of LESSONS) {
  for (const k of ['title','summary','points','example','check']) if (!l[k]) fail(`lesson ${l.id} missing ${k}`);
  if (!l.check.opts.en || l.check.opts.en.length !== l.check.opts.fa.length) fail(`lesson ${l.id} opts mismatch`);
  if (l.check.answer < 0 || l.check.answer >= l.check.opts.en.length) fail(`lesson ${l.id} answer out of range`);
  if (l.country !== 'GLOBAL' && !COUNTRIES.find(c => c.code === l.country)) fail(`lesson ${l.id} unknown country`);
}
console.log('lessons', LESSONS.length, 'special', LESSONS.filter(l=>l.special).length);

// exam generation sweep
let total = 0;
for (const country of COUNTRIES.map(c => c.code)) {
  for (const level of LEVELS) {
    for (const subject of SUBJECTS) {
      const ex = buildExam({ country, level, subject, count: 10, seed: 1000 + total, difficulty: 2 });
      total++;
      if (ex.questions.length !== 10) fail(`${country}/${level}/${subject}: got ${ex.questions.length}`);
      ex.questions.forEach((q, i) => {
        if (!q.q?.en || !q.q?.fa) fail(`${country}/${level}/${subject} q${i} missing text`);
        if (!q.opts || q.opts.length < 3) fail(`${country}/${level}/${subject} q${i} opts ${q.opts?.length}`);
        if (q.a == null || q.a < 0 || q.a >= q.opts.length) fail(`${country}/${level}/${subject} q${i} bad answer ${q.a}`);
        const labels = q.opts.map(o => o.en);
        if (new Set(labels).size !== labels.length) fail(`${country}/${level}/${subject} q${i} duplicate options: ${labels.join(' | ')}`);
        if (`${labels[q.a]}`.includes('NaN')) fail(`${country}/${level}/${subject} q${i} NaN option`);
        if (!q.why?.en) fail(`${country}/${level}/${subject} q${i} no explanation`);
      });
      const answers = ex.questions.map(q => q.a);
      const graded = gradeAttempt(ex, answers);
      if (graded.score !== 100) fail(`${country}/${level}/${subject} full-marks score ${graded.score}`);
      const blank = gradeAttempt(ex, []);
      if (blank.score !== 0 || blank.skipped !== 10) fail(`${country}/${level}/${subject} blank grading`);
    }
  }
}
console.log('exam combos tested:', total);
console.log(problems ? `${problems} problems` : 'all logic checks passed');
