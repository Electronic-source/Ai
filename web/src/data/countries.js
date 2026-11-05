/* Country curricula: national exam systems, stage names and signature subjects.
   Coordinates are used to place markers on the 3D globe. */

export const SUBJECTS = [
  'math', 'physics', 'chemistry', 'biology', 'literature', 'history',
  'geography', 'english', 'cs', 'economics', 'art', 'national', 'language',
];

export const SUBJECT_META = {
  math: { icon: '∑', hue: 168, accent: '#7cf6c4' },
  physics: { icon: '⚛', hue: 268, accent: '#a393ff' },
  chemistry: { icon: '⚗', hue: 200, accent: '#7fd4ff' },
  biology: { icon: '❦', hue: 142, accent: '#8ef0a6' },
  literature: { icon: '❞', hue: 24, accent: '#ffb27a' },
  history: { icon: '⌛', hue: 36, accent: '#f7d774' },
  geography: { icon: '◍', hue: 188, accent: '#79e6d6' },
  english: { icon: 'A', hue: 214, accent: '#8fb8ff' },
  cs: { icon: '⌘', hue: 282, accent: '#c79bff' },
  economics: { icon: '⇅', hue: 46, accent: '#ffd479' },
  art: { icon: '✺', hue: 330, accent: '#ff9ec4' },
  national: { icon: '✦', hue: 8, accent: '#ff9a72' },
  language: { icon: 'ع', hue: 158, accent: '#7ee7c1' },
};

export const COUNTRIES = [
  {
    code: 'IR', atlas: 'Iran', flag: '🇮🇷', lat: 32, lon: 53, langs: ['fa'],
    name: { fa: 'ایران', en: 'Iran' },
    exams: [
      { id: 'konkur', name: { fa: 'کنکور سراسری', en: 'Konkur (national entrance)' }, level: 'high', format: '۴ گزینه · نمرهٔ منفی ندارد' },
      { id: 'nahayi', name: { fa: 'امتحانات نهایی دوازدهم', en: 'Grade-12 Finals' }, level: 'high', format: 'تشریحی و چندگزینه‌ای' },
    ],
    signature: { subject: 'literature', title: { fa: 'ادبیات فارسی و عروض', en: 'Persian literature & prosody' } },
    stageNames: { primary: 'دبستان', middle: 'متوسطهٔ اول', high: 'متوسطهٔ دوم' },
  },
  {
    code: 'US', atlas: 'United States of America', flag: '🇺🇸', lat: 39, lon: -98, langs: ['en'],
    name: { fa: 'آمریکا', en: 'United States' },
    exams: [
      { id: 'sat', name: { fa: 'SAT', en: 'SAT' }, level: 'high', format: 'Adaptive, 2 sections' },
      { id: 'ap', name: { fa: 'AP', en: 'AP Exams' }, level: 'high', format: 'Subject-specific, 1–5 scale' },
    ],
    signature: { subject: 'english', title: { fa: 'خواندن تحلیلی SAT', en: 'SAT evidence-based reading' } },
    stageNames: { primary: 'Elementary', middle: 'Middle school', high: 'High school' },
  },
  {
    code: 'GB', atlas: 'United Kingdom', flag: '🇬🇧', lat: 54, lon: -2, langs: ['en'],
    name: { fa: 'بریتانیا', en: 'United Kingdom' },
    exams: [
      { id: 'gcse', name: { fa: 'GCSE', en: 'GCSE' }, level: 'middle', format: '9–1 grades, terminal exams' },
      { id: 'alevel', name: { fa: 'A-Level', en: 'A-Level' }, level: 'high', format: 'Essay + problem papers' },
    ],
    signature: { subject: 'history', title: { fa: 'مطالعهٔ منبع تاریخی', en: 'Source-based history' } },
    stageNames: { primary: 'Primary', middle: 'Key Stage 3–4', high: 'Sixth form' },
  },
  {
    code: 'DE', atlas: 'Germany', flag: '🇩🇪', lat: 51, lon: 10, langs: ['de'],
    name: { fa: 'آلمان', en: 'Germany' },
    exams: [
      { id: 'abitur', name: { fa: 'آبی‌تور', en: 'Abitur' }, level: 'high', format: 'Klausur, 3–5 h' },
      { id: 'msa', name: { fa: 'MSA', en: 'MSA' }, level: 'middle', format: 'Written + oral' },
    ],
    signature: { subject: 'physics', title: { fa: 'فیزیک تجربی آبی‌تور', en: 'Abitur experimental physics' } },
    stageNames: { primary: 'Grundschule', middle: 'Sekundarstufe I', high: 'Gymnasiale Oberstufe' },
  },
  {
    code: 'FR', atlas: 'France', flag: '🇫🇷', lat: 46.5, lon: 2.4, langs: ['fr'],
    name: { fa: 'فرانسه', en: 'France' },
    exams: [
      { id: 'bac', name: { fa: 'باکالوریا', en: 'Baccalauréat' }, level: 'high', format: 'Épreuves + grand oral' },
      { id: 'brevet', name: { fa: 'بروه', en: 'Brevet' }, level: 'middle', format: 'Written papers' },
    ],
    signature: { subject: 'national', title: { fa: 'فلسفهٔ باکالوریا', en: 'Bac philosophy dissertation' } },
    stageNames: { primary: 'École primaire', middle: 'Collège', high: 'Lycée' },
  },
  {
    code: 'IN', atlas: 'India', flag: '🇮🇳', lat: 22, lon: 79, langs: ['hi', 'en'],
    name: { fa: 'هند', en: 'India' },
    exams: [
      { id: 'jee', name: { fa: 'JEE', en: 'JEE Main / Advanced' }, level: 'high', format: 'MCQ + numerical, negative marking' },
      { id: 'cbse', name: { fa: 'CBSE', en: 'CBSE Board' }, level: 'high', format: 'Board papers, 80 marks' },
      { id: 'neet', name: { fa: 'NEET', en: 'NEET' }, level: 'high', format: '180 MCQs, 3 h 20 m' },
    ],
    signature: { subject: 'math', title: { fa: 'ریاضی ذهنی وِدیک', en: 'Vedic mental mathematics' } },
    stageNames: { primary: 'Primary', middle: 'Middle school', high: 'Class 11–12' },
  },
  {
    code: 'CN', atlas: 'China', flag: '🇨🇳', lat: 35, lon: 104, langs: ['zh'],
    name: { fa: 'چین', en: 'China' },
    exams: [
      { id: 'gaokao', name: { fa: 'گائوکائو', en: 'Gaokao' }, level: 'high', format: '9 h across 2–4 days' },
      { id: 'zhongkao', name: { fa: 'ژونگ‌کائو', en: 'Zhongkao' }, level: 'middle', format: 'City-level exam' },
    ],
    signature: { subject: 'math', title: { fa: 'هندسهٔ گائوکائو', en: 'Gaokao analytic geometry' } },
    stageNames: { primary: '小学', middle: '初中', high: '高中' },
  },
  {
    code: 'JP', atlas: 'Japan', flag: '🇯🇵', lat: 36.5, lon: 138, langs: ['ja', 'en'],
    name: { fa: 'ژاپن', en: 'Japan' },
    exams: [
      { id: 'common', name: { fa: 'آزمون مشترک', en: 'Common Test' }, level: 'high', format: 'Mark-sheet, 900 pts' },
      { id: 'eiken', name: { fa: 'آیکن', en: 'Eiken' }, level: 'middle', format: '4-skill English bands' },
    ],
    signature: { subject: 'math', title: { fa: 'محاسبهٔ چرتکه‌ای', en: 'Soroban calculation' } },
    stageNames: { primary: '小学校', middle: '中学校', high: '高校' },
  },
  {
    code: 'KR', atlas: 'South Korea', flag: '🇰🇷', lat: 36.5, lon: 127.8, langs: ['ko'],
    name: { fa: 'کرهٔ جنوبی', en: 'South Korea' },
    exams: [
      { id: 'suneung', name: { fa: 'سونه‌ونگ', en: 'Suneung (CSAT)' }, level: 'high', format: '8 h, 5 subjects' },
    ],
    signature: { subject: 'language', title: { fa: 'ادبیات کره‌ای در سونه‌ونگ', en: 'Suneung Korean literature' } },
    stageNames: { primary: '초등학교', middle: '중학교', high: '고등학교' },
  },
  {
    code: 'TR', atlas: 'Turkey', flag: '🇹🇷', lat: 39, lon: 35, langs: ['tr'],
    name: { fa: 'ترکیه', en: 'Türkiye' },
    exams: [
      { id: 'yks', name: { fa: 'YKS', en: 'YKS' }, level: 'high', format: 'TYT + AYT, 2 sessions' },
      { id: 'lgs', name: { fa: 'LGS', en: 'LGS' }, level: 'middle', format: '90 questions, 155 min' },
    ],
    signature: { subject: 'national', title: { fa: 'تاریخ و جغرافیای ترکیه', en: 'Turkish history & geography' } },
    stageNames: { primary: 'İlkokul', middle: 'Ortaokul', high: 'Lise' },
  },
  {
    code: 'EG', atlas: 'Egypt', flag: '🇪🇬', lat: 26.8, lon: 30.8, langs: ['ar'],
    name: { fa: 'مصر', en: 'Egypt' },
    exams: [
      { id: 'thanaweya', name: { fa: 'ثانویهٔ عامه', en: 'Thanaweya Amma' }, level: 'high', format: 'National finals + score sheet' },
    ],
    signature: { subject: 'language', title: { fa: 'زبان عربی و بلاغت', en: 'Arabic rhetoric & grammar' } },
    stageNames: { primary: 'الابتدائية', middle: 'الإعدادية', high: 'الثانوية' },
  },
  {
    code: 'SA', atlas: 'Saudi Arabia', flag: '🇸🇦', lat: 24, lon: 45, langs: ['ar'],
    name: { fa: 'عربستان سعودی', en: 'Saudi Arabia' },
    exams: [
      { id: 'qudurat', name: { fa: 'قدرات', en: 'Qudurat' }, level: 'high', format: 'Ability test, percentile' },
      { id: 'tahsili', name: { fa: 'تحصیلی', en: 'Tahsili' }, level: 'high', format: 'Achievement subjects' },
    ],
    signature: { subject: 'math', title: { fa: 'استدلال کمی قدرات', en: 'Qudurat quantitative reasoning' } },
    stageNames: { primary: 'المرحلة الابتدائية', middle: 'المرحلة المتوسطة', high: 'المرحلة الثانوية' },
  },
  {
    code: 'BR', atlas: 'Brazil', flag: '🇧🇷', lat: -10, lon: -52, langs: ['pt'],
    name: { fa: 'برزیل', en: 'Brazil' },
    exams: [
      { id: 'enem', name: { fa: 'ENEM', en: 'ENEM' }, level: 'high', format: '180 questions + essay' },
      { id: 'fuvest', name: { fa: 'FUVEST', en: 'FUVEST' }, level: 'high', format: 'Two-phase, USP' },
    ],
    signature: { subject: 'language', title: { fa: 'انشای ENEM', en: 'ENEM dissertation' } },
    stageNames: { primary: 'Fundamental I', middle: 'Fundamental II', high: 'Ensino médio' },
  },
  {
    code: 'MX', atlas: 'Mexico', flag: '🇲🇽', lat: 23.6, lon: -102, langs: ['es'],
    name: { fa: 'مکزیک', en: 'Mexico' },
    exams: [
      { id: 'unam', name: { fa: 'آزمون UNAM', en: 'UNAM admission' }, level: 'high', format: '120 questions' },
    ],
    signature: { subject: 'history', title: { fa: 'تاریخ مکزیک و آمریکای لاتین', en: 'Mexican & Latin American history' } },
    stageNames: { primary: 'Primaria', middle: 'Secundaria', high: 'Bachillerato' },
  },
  {
    code: 'NG', atlas: 'Nigeria', flag: '🇳🇬', lat: 9.1, lon: 8.7, langs: ['en'],
    name: { fa: 'نیجریه', en: 'Nigeria' },
    exams: [
      { id: 'waec', name: { fa: 'WAEC', en: 'WASSCE (WAEC)' }, level: 'high', format: 'Objective + theory papers' },
      { id: 'jamb', name: { fa: 'JAMB', en: 'JAMB UTME' }, level: 'high', format: 'CBT, 180 questions' },
    ],
    signature: { subject: 'chemistry', title: { fa: 'شیمی عملی WAEC', en: 'WAEC practical chemistry' } },
    stageNames: { primary: 'Primary', middle: 'JSS', high: 'SSS' },
  },
  {
    code: 'KE', atlas: 'Kenya', flag: '🇰🇪', lat: 0.2, lon: 37.9, langs: ['en'],
    name: { fa: 'کنیا', en: 'Kenya' },
    exams: [
      { id: 'kcse', name: { fa: 'KCSE', en: 'KCSE' }, level: 'high', format: '8 subjects, A–E' },
    ],
    signature: { subject: 'biology', title: { fa: 'زیست کنیا و اکولوژی ساوانا', en: 'Savanna ecology field biology' } },
    stageNames: { primary: 'Primary', middle: 'Junior secondary', high: 'Senior secondary' },
  },
  {
    code: 'ZA', atlas: 'South Africa', flag: '🇿🇦', lat: -29, lon: 24.5, langs: ['en'],
    name: { fa: 'آفریقای جنوبی', en: 'South Africa' },
    exams: [
      { id: 'nsc', name: { fa: 'ماتریک (NSC)', en: 'Matric (NSC)' }, level: 'high', format: '7 subjects, 0–100' },
    ],
    signature: { subject: 'geography', title: { fa: 'جغرافیای ماتریک', en: 'Matric climatology & GIS' } },
    stageNames: { primary: 'Foundation', middle: 'Senior phase', high: 'FET' },
  },
  {
    code: 'PK', atlas: 'Pakistan', flag: '🇵🇰', lat: 30, lon: 70, langs: ['en'],
    name: { fa: 'پاکستان', en: 'Pakistan' },
    exams: [
      { id: 'fsc', name: { fa: 'FSc', en: 'FSc / HSSC' }, level: 'high', format: 'Board papers, 1100 marks' },
      { id: 'mdcat', name: { fa: 'MDCAT', en: 'MDCAT' }, level: 'high', format: '200 MCQs' },
    ],
    signature: { subject: 'national', title: { fa: 'مطالعات پاکستان', en: 'Pakistan studies' } },
    stageNames: { primary: 'Primary', middle: 'Middle', high: 'Higher secondary' },
  },
  {
    code: 'ID', atlas: 'Indonesia', flag: '🇮🇩', lat: -2, lon: 118, langs: ['id'],
    name: { fa: 'اندونزی', en: 'Indonesia' },
    exams: [
      { id: 'snbt', name: { fa: 'SNBT', en: 'SNBT' }, level: 'high', format: 'Computer-based, 4 tests' },
    ],
    signature: { subject: 'biology', title: { fa: 'زیست‌شناسی مجمع‌الجزایر', en: 'Archipelago biodiversity' } },
    stageNames: { primary: 'SD', middle: 'SMP', high: 'SMA' },
  },
  {
    code: 'RU', atlas: 'Russia', flag: '🇷🇺', lat: 58, lon: 60, langs: ['ru'],
    name: { fa: 'روسیه', en: 'Russia' },
    exams: [
      { id: 'ege', name: { fa: 'ЕГЭ (EGE)', en: 'EGE (Unified State Exam)' }, level: 'high', format: 'Part 1 short answers, part 2 full solutions' },
    ],
    signature: { subject: 'physics', title: { fa: 'مسائل ЕГЭ فیزیک', en: 'EGE physics problem sets' } },
    stageNames: { primary: 'Начальная', middle: 'Основная', high: 'Старшая' },
  },
  {
    code: 'AU', atlas: 'Australia', flag: '🇦🇺', lat: -25, lon: 134, langs: ['en'],
    name: { fa: 'استرالیا', en: 'Australia' },
    exams: [
      { id: 'atar', name: { fa: 'ATAR', en: 'ATAR / HSC' }, level: 'high', format: 'Rank + school assessment' },
    ],
    signature: { subject: 'geography', title: { fa: 'جغرافیای خشکی و اقیانوس', en: 'Outback & reef geography' } },
    stageNames: { primary: 'Primary', middle: 'Years 7–10', high: 'Senior secondary' },
  },
  {
    code: 'CA', atlas: 'Canada', flag: '🇨🇦', lat: 56, lon: -106, langs: ['en', 'fr'],
    name: { fa: 'کانادا', en: 'Canada' },
    exams: [
      { id: 'prov', name: { fa: 'دیپلم استانی', en: 'Provincial diploma' }, level: 'high', format: 'Province-specific' },
    ],
    signature: { subject: 'national', title: { fa: 'تاریخ و شهروندی کانادا', en: 'Canadian civics & history' } },
    stageNames: { primary: 'Elementary', middle: 'Intermediate', high: 'Secondary' },
  },
  {
    code: 'IT', atlas: 'Italy', flag: '🇮🇹', lat: 42.8, lon: 12.5, langs: ['it', 'en'],
    name: { fa: 'ایتالیا', en: 'Italy' },
    exams: [
      { id: 'maturita', name: { fa: 'ماتوریتا', en: 'Maturità' }, level: 'high', format: '3 papers + colloquio' },
    ],
    signature: { subject: 'art', title: { fa: 'میراث هنری ایتالیا', en: 'Italian art heritage' } },
    stageNames: { primary: 'Primaria', middle: 'Media', high: 'Liceo' },
  },
  {
    code: 'ES', atlas: 'Spain', flag: '🇪🇸', lat: 40.2, lon: -3.7, langs: ['es'],
    name: { fa: 'اسپانیا', en: 'Spain' },
    exams: [
      { id: 'ebau', name: { fa: 'EBAU', en: 'EBAU' }, level: 'high', format: '4 mandatory + 2 electives' },
    ],
    signature: { subject: 'literature', title: { fa: 'ادبیات اسپانیایی', en: 'Spanish literature' } },
    stageNames: { primary: 'Primaria', middle: 'ESO', high: 'Bachillerato' },
  },
  {
    code: 'NL', atlas: 'Netherlands', flag: '🇳🇱', lat: 52.2, lon: 5.3, langs: ['en', 'nl'],
    name: { fa: 'هلند', en: 'Netherlands' },
    exams: [
      { id: 'ce', name: { fa: 'آزمون مرکزی', en: 'Centraal Eindexamen' }, level: 'high', format: 'School + central exam' },
    ],
    signature: { subject: 'math', title: { fa: 'ریاضی کاربردی هلندی', en: 'Dutch applied mathematics' } },
    stageNames: { primary: 'Basisschool', middle: 'Onderbouw', high: 'Bovenbouw' },
  },
  {
    code: 'SE', atlas: 'Sweden', flag: '🇸🇪', lat: 60, lon: 15, langs: ['en'],
    name: { fa: 'سوئد', en: 'Sweden' },
    exams: [
      { id: 'nationella', name: { fa: 'آزمون‌های ملی', en: 'Nationella prov' }, level: 'high', format: 'National tests' },
      { id: 'hogskole', name: { fa: 'هوگسکوله‌پروِت', en: 'Högskoleprovet' }, level: 'high', format: 'Aptitude, 2 parts' },
    ],
    signature: { subject: 'cs', title: { fa: 'برنامه‌نویسی در مدرسهٔ سوئد', en: 'Programming in Swedish schools' } },
    stageNames: { primary: 'Grundskola', middle: 'Högstadiet', high: 'Gymnasium' },
  },
  {
    code: 'MA', atlas: 'Morocco', flag: '🇲🇦', lat: 31.8, lon: -7, langs: ['ar', 'fr'],
    name: { fa: 'مراکش', en: 'Morocco' },
    exams: [
      { id: 'bacma', name: { fa: 'باکالوریای مراکش', en: 'Baccalauréat marocain' }, level: 'high', format: 'National + regional' },
    ],
    signature: { subject: 'language', title: { fa: 'زبان عربی و فرانسهٔ مراکش', en: 'Moroccan Arabic & French' } },
    stageNames: { primary: 'الابتدائي', middle: 'الإعدادي', high: 'الثانوي التأهيلي' },
  },
];

export const COUNTRY_BY_CODE = Object.fromEntries(COUNTRIES.map((c) => [c.code, c]));
export const COUNTRY_BY_ATLAS = Object.fromEntries(COUNTRIES.map((c) => [c.atlas, c]));
