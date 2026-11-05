/* Lesson shelf. Every country carries a signature lesson that only its
   curriculum has; general lessons cover the stages shared worldwide.
   Content is bilingual (fa / en) — used as the study-language source. */

const L = (o) => o;

export const LESSONS = [
  /* ————— Iran ————— */
  L({
    id: 'ir-lit-aruz', country: 'IR', level: 'high', subject: 'literature', minutes: 14, special: true,
    title: { fa: 'عروض و اختیارات شاعری برای کنکور', en: 'Persian prosody & poetic metre for Konkur' },
    summary: {
      fa: 'در کنکور ادبیات، تشخیص وزن یک بیت با تقطیع شنیداری سریع‌تر از حفظ کردن ۲۳ بحر است. اول هجاها را بشمار، بعد بحر را تطبیق بده.',
      en: 'In Iran’s Konkur, scanning a distich by ear beats memorising 23 metres. Count syllables first, then match the metre.',
    },
    points: {
      fa: [
        'هر بحر از «وتد» و «سبب» ساخته می‌شود؛ اگر پایه‌های ارکان را بشناسی، تقطیع ذهنی ممکن می‌شود.',
        'دو بیت هم‌وزن، اختیارات مشترک دارند: وصل، خبن، قصر — تغییرات مجاز را در کنار بحر یاد بگیر.',
        'قافیه و ردیف را جدا تحلیل کن؛ ردیف تکراری، آزمون «رَوی» است و در تست‌ها بیشتر از قافیه به کار می‌آید.',
      ],
      en: [
        'Every metre is built from watad and sabab units; know those units and you can scan in your head.',
        'Two distichs sharing a metre share permitted variations: wasl, khabn, qasr — learn them beside the metre.',
        'Analyse rhyme (qafiya) and radif separately; a repeated radif is your fastest shortcut in multiple-choice items.',
      ],
    },
    example: {
      fa: 'بیت «رسید مژده که ایام غم نخواهد ماند» را بلند بخوان: هجاهای بلند و کوتاه را با دست بزن؛ الگوی «مفعولُ فاعلاتُ مفاعیلُ فاعلن» (هزج) بیرون می‌آید.',
      en: 'Read “resid mozhde ke ayyām-e gham nakhāhad mānd” aloud and tap the long/short beats; the pattern resolves to hazaj (maf’ūlu fā’ilātu mafā’īlu fā’ilun).',
    },
    check: {
      q: { fa: 'ردیف در بیت «ای ایران ای مرز پرگهر / ای خاکت سرچشمهٔ هنر» کدام است؟', en: 'In the distich “O Iran, land of gems / O your soil, source of art”, what is the radif?' },
      opts: { fa: ['ای', 'پرگهر', 'هنر', 'ردیف ندارد'], en: ['“O”', '“full of gems”', '“art”', 'no radif'] },
      answer: 0,
      why: { fa: '«ای» واژهٔ تکراری پس از قافیه است و ردیف محسوب می‌شود؛ «پرگهر» و «هنر» قافیه‌اند.', en: '“O” repeats after the rhyme word, so it is the radif; “gems” and “art” are the rhyme.' },
    },
  }),
  L({
    id: 'ir-math-derivative', country: 'IR', level: 'high', subject: 'math', minutes: 16,
    title: { fa: 'مشتق و کاربردش در سؤال‌های کنکور', en: 'Derivatives: the Konkur workhorse' },
    summary: {
      fa: 'بیشتر تست‌های مشتق با سه ابزار حل می‌شوند: تعریف حدی، قاعدهٔ زنجیره‌ای و جدول علامت. اولی را فقط وقتی لازم است بنویس.',
      en: 'Most derivative items fall to three tools: the limit definition, the chain rule and a sign table. Reach for the definition last.',
    },
    points: {
      fa: ['برای یکنوایی، ریشه‌های f′ و علامت آن را روی محور بزن، نه مقدار f را.', 'مشتق ضمنی را وقتی به کار ببر که y قابل جدا شدن نیست.', 'در سؤال اکسترمم مطلق، نقاط مرزی بازه را جدا بررسی کن.'],
      en: ['For monotonicity, plot the roots and sign of f′, not values of f.', 'Use implicit differentiation when y cannot be isolated.', 'For absolute extrema, always test the interval endpoints separately.'],
    },
    example: {
      fa: 'f(x)=x³−3x: مشتق 3(x²−1) است؛ ریشه‌ها ±1 و علامت‌ها + − + → صعودی تا 1−، نزولی بین، صعودی بعد از 1. پس بیشینهٔ محلی در 1− برابر 2.',
      en: 'f(x)=x³−3x gives f′=3(x²−1); sign pattern + − + around ±1, so a local maximum of 2 sits at x=−1.',
    },
    check: {
      q: { fa: 'مشتق f(x)=sin(3x²) چیست؟', en: 'What is the derivative of f(x)=sin(3x²)?' },
      opts: { fa: ['6x·cos(3x²)', 'cos(3x²)', '3x·cos(3x²)', '6x·sin(3x²)'], en: ['6x·cos(3x²)', 'cos(3x²)', '3x·cos(3x²)', '6x·sin(3x²)'] },
      answer: 0,
      why: { fa: 'قاعدهٔ زنجیره‌ای: مشتق بیرونی cos(3x²) ضرب در مشتق درونی 6x.', en: 'Chain rule: outer derivative cos(3x²) times inner derivative 6x.' },
    },
  }),

  /* ————— Germany ————— */
  L({
    id: 'de-physics-abitur', country: 'DE', level: 'high', subject: 'physics', minutes: 18, special: true,
    title: { fa: 'فیزیک تجربی آبی‌تور: آزمایش، خطا، تفسیر', en: 'Abitur physics: experiment, error, interpretation' },
    summary: {
      fa: 'در آبی‌تور فقط جواب عددی کافی نیست؛ باید روش، خطای اندازه‌گیری و تفسیر فیزیکی را در «Erwartungshorizont» بنویسی.',
      en: 'The Abitur rewards method, measurement uncertainty and physical interpretation — not just the number.',
    },
    points: {
      fa: ['هر محاسبه را با واحد بنویس؛ نمرهٔ فرمول بدون واحد کم می‌شود.', 'خطای نسبی را جدا از خطای مطلق گزارش کن.', 'نمودار را با شیب و واحد شیب تفسیر کن، نه فقط با شکل خط.'],
      en: ['Write every quantity with its unit; formula-only answers lose marks.', 'Report relative uncertainty separately from absolute uncertainty.', 'Interpret a graph by slope and slope unit, not by “it looks linear”.'],
    },
    example: {
      fa: 'در آزمایش آونگ، T=2π√(l/g). اگر l=1.00±0.01 m و T=2.01 s باشد، g≈9.77 m/s² با خطای نسبی حدود ۱٪ — همان‌قدر که لازم است بنویسی.',
      en: 'Pendulum: T=2π√(l/g). With l=1.00±0.01 m and T=2.01 s you get g≈9.77 m/s² at ~1% relative uncertainty — state it explicitly.',
    },
    check: {
      q: { fa: 'کدام گزارش در آبی‌تور کامل‌تر است؟', en: 'Which report is Abitur-complete?' },
      opts: { fa: ['g = 9.8', 'g = 9.77 m/s² ± 1%', 'g ≈ 10', 'g = 9.7712'], en: ['g = 9.8', 'g = 9.77 m/s² ± 1%', 'g ≈ 10', 'g = 9.7712'] },
      answer: 1,
      why: { fa: 'مقدار، واحد و عدم قطعیت هر سه لازم‌اند؛ ارقام اضافی بدون خطا معنا ندارد.', en: 'Value, unit and uncertainty together; extra digits without uncertainty are meaningless.' },
    },
  }),

  /* ————— United States ————— */
  L({
    id: 'us-sat-reading', country: 'US', level: 'high', subject: 'english', minutes: 15, special: true,
    title: { fa: 'خواندن مبتنی بر شواهد در SAT', en: 'Evidence-based reading for the SAT' },
    summary: {
      fa: 'هر پاسخ در SAT باید با یک «شاهد» در متن پشتیبانی شود. اول سؤال را بخوان، بعد جملهٔ دارای شاهد را پیدا کن، بعد گزینه‌ها را حذف کن.',
      en: 'Every SAT answer needs a line of evidence. Read the question, locate the evidence sentence, then eliminate options.',
    },
    points: {
      fa: ['گزینه‌های «درست اما بی‌ربط» رایج‌ترین تله‌اند.', 'کلمات مطلق (always, never) بیشتر غلط‌اند.', 'در سؤال‌های داده‌نما، ابتدا محورها و واحدها را بخوان.'],
      en: ['“True but irrelevant” is the most common trap.', 'Absolute words (always, never) usually mark wrong options.', 'For data questions, read axes and units before the prose.'],
    },
    example: {
      fa: 'اگر متن بگوید «بیشتر مطالعات کاهش را نشان می‌دهند»، گزینهٔ «دانشمندان اثبات کردند» غلط است چون از «بیشتر» به «همه» پرش کرده.',
      en: 'If the passage says “most studies show a decline”, an option claiming scientists proved it is wrong — it jumps from most to all.',
    },
    check: {
      q: { fa: 'متن: «بیشتر شهرها بودجه را کاهش دادند.» کدام نتیجه معتبر است؟', en: 'Passage: “Most cities cut the budget.” Which inference holds?' },
      opts: { fa: ['همهٔ شهرها کاهش دادند', 'برخی شهرها کاهش دادند', 'هیچ شهری افزایش نداد', 'بودجه بی‌اثر شد'], en: ['All cities cut it', 'Some cities cut it', 'No city raised it', 'The budget had no effect'] },
      answer: 1,
      why: { fa: '«بیشتر» فقط وجود «برخی» را تضمین می‌کند؛ بقیه گزینه‌ها فراتر از متن‌اند.', en: '“Most” guarantees only “some”; the rest overreach the text.' },
    },
  }),

  /* ————— United Kingdom ————— */
  L({
    id: 'gb-history-source', country: 'GB', level: 'high', subject: 'history', minutes: 16, special: true,
    title: { fa: 'تحلیل منبع تاریخی برای A-Level', en: 'Source analysis for A-Level history' },
    summary: {
      fa: 'در A-Level منبع را بر اساس «منشأ، هدف، ارزش و محدودیت» (Provenance, Purpose, Value, Limitation) بخوان؛ نتیجه‌گیری بی‌شاهد نمره نمی‌گیرد.',
      en: 'Read sources through provenance, purpose, value and limitation; conclusions without evidence earn nothing.',
    },
    points: {
      fa: ['تاریخ نگارش و نویسنده را قبل از محتوا ببین.', 'بین «سند معتبر» و «سند مفید» فرق بگذار.', 'هر پاراگراف: ادعا، شاهد از منبع، توضیح، داوری.'],
      en: ['Check date and author before content.', 'Separate “reliable” from “useful”.', 'Each paragraph: claim, evidence from the source, explanation, judgement.'],
    },
    example: {
      fa: 'یک پوستر تبلیغاتی ۱۹۱۵ دربارهٔ سربازگیری: برای «نگرش عمومی» مفید است، برای «آمار تلفات» بی‌ارزش.',
      en: 'A 1915 recruitment poster is useful for public attitudes, worthless for casualty statistics.',
    },
    check: {
      q: { fa: 'کدام پرسش دربارهٔ «منشأ» منبع است؟', en: 'Which question concerns provenance?' },
      opts: { fa: ['نویسنده کیست؟', 'متن چه می‌گوید؟', 'چند صفحه است؟', 'آیا جالب است؟'], en: ['Who wrote it?', 'What does it say?', 'How long is it?', 'Is it interesting?'] },
      answer: 0,
      why: { fa: 'منشأ یعنی نویسنده، زمان و جایگاه؛ محتوا پرسش جداگانه است.', en: 'Provenance means author, date and position; content is a separate question.' },
    },
  }),

  /* ————— France ————— */
  L({
    id: 'fr-bac-philo', country: 'FR', level: 'high', subject: 'national', minutes: 20, special: true,
    title: { fa: 'رسالهٔ فلسفی باکالوریا: طرح سه‌بخشی', en: 'The Bac philosophy dissertation' },
    summary: {
      fa: 'رسالهٔ فلسفه چهار ساعت وقت دارد و ساختار «تز، آنتی‌تز، سنتز» را می‌خواهد؛ اما بدون ارجاع دقیق به یک فیلسوف، نمرهٔ بالا نمی‌گیرد.',
      en: 'Four hours, thesis–antithesis–synthesis — but without precise reference to a philosopher, the copy stays average.',
    },
    points: {
      fa: ['مقدمه: مسئله‌سازی، نه تعریف لغت.', 'هر بخش یک مثال concret داشته باشد.', 'نتیجه‌گیری باید پاسخ شخصی مستدل باشد، نه تکرار مقدمه.'],
      en: ['Introduction: problematise, do not define dictionary words.', 'Every part needs one concrete example.', 'Conclusion: a reasoned personal answer, not a repeat of the intro.'],
    },
    example: {
      fa: 'پرسش «آیا آزادی یعنی نبود مانع؟»: تز (آزادی منفی، هابز)، آنتی‌تز (آزادی مثبت، روسو)، سنتز (آزادی موقعیتی، سارتر).',
      en: '“Is freedom the absence of obstacles?”: negative liberty (Hobbes), positive liberty (Rousseau), situated freedom (Sartre).',
    },
    check: {
      q: { fa: 'مقدمهٔ رسالهٔ فلسفی باید با چه چیزی تمام شود؟', en: 'A philosophy introduction should end with…' },
      opts: { fa: ['تعریف لغت‌نامه‌ای', 'بیان مسئله و طرح حرکت', 'نقل قول طولانی', 'فهرست منابع'], en: ['a dictionary definition', 'the problem and the plan', 'a long quotation', 'a bibliography'] },
      answer: 1,
      why: { fa: 'مسئله‌سازی + اعلام مسیر، معیار اصلی ارزشیابی است.', en: 'Problematising plus announcing the route is the marking criterion.' },
    },
  }),

  /* ————— India ————— */
  L({
    id: 'in-vedic-math', country: 'IN', level: 'high', subject: 'math', minutes: 13, special: true,
    title: { fa: 'ریاضی ذهنی وِدیک برای JEE', en: 'Vedic mental maths for JEE' },
    summary: {
      fa: 'در JEE هر ثانیه شمرده می‌شود. تکنیک‌های وِدیک (مثل «نزدیک به پایه») ضرب و تقسیم را بدون کاغذ ممکن می‌کنند.',
      en: 'JEE counts seconds. Vedic “base” techniques let you multiply and divide without paper.',
    },
    points: {
      fa: ['برای ضرب اعداد نزدیک ۱۰۰: اختلاف‌ها را از ۱۰۰ کم کن و ضرب کن.', 'مربع اعدادی که به ۵ ختم می‌شوند: n(n+1) سپس ۲۵.', 'پیش از محاسبه، گزینه‌ها را تخمین بزن؛ در MCQ با نمرهٔ منفی، تخمین نجات‌دهنده است.'],
      en: ['Near 100: subtract each from 100, cross-add for the left part, multiply the deficits for the right.', 'Squares ending in 5: n(n+1) then append 25.', 'Estimate before computing; with negative marking, estimation saves you.'],
    },
    example: {
      fa: '۹۷×۹۶: اختلاف‌ها ۳ و ۴ → سمت چپ ۹۷−۴=۹۳، سمت راست ۱۲ → ۹۳۱۲.', en: '97×96: deficits 3 and 4 → left 97−4=93, right 3×4=12 → 9312.',
    },
    check: {
      q: { fa: 'مربع ۶۵ چند است؟', en: 'What is 65²?' },
      opts: { fa: ['۴۲۲۵', '۳۶۲۵', '۴۲۲۰', '۴۵۲۵'], en: ['4225', '3625', '4220', '4525'] },
      answer: 0,
      why: { fa: '۶×۷=۴۲ و بعد ۲۵ → ۴۲۲۵.', en: '6×7=42 then 25 → 4225.' },
    },
  }),

  /* ————— China ————— */
  L({
    id: 'cn-gaokao-geometry', country: 'CN', level: 'high', subject: 'math', minutes: 19, special: true,
    title: { fa: 'هندسهٔ تحلیلی گائوکائو: روش «تنظیم و محاسبه»', en: 'Gaokao analytic geometry: set up, then grind' },
    summary: {
      fa: 'سؤال‌های بیضی و سهمی در گائوکائو با یک الگوی ثابت حل می‌شوند: فرض نقطه، نوشتن معادلهٔ خط، جای‌گذاری، استفاده از روابط ویتا.',
      en: 'Ellipse and parabola items follow one pattern: parametrise, write the line, substitute, then use Vieta’s relations.',
    },
    points: {
      fa: ['همیشه Δ>0 را برای خط و منحنی بررسی کن.', 'نسبت‌های طول را با پارامتر بنویس تا جبر ساده شود.', 'در نبود زمان، مرحلهٔ معادله‌سازی نمرهٔ جزئی دارد.'],
      en: ['Always check Δ>0 for the line–curve intersection.', 'Write length ratios with a parameter to simplify algebra.', 'If time runs out, the setup alone still earns partial marks.'],
    },
    example: {
      fa: 'بیضی x²/4+y²=1 و خط y=kx+1: جای‌گذاری می‌دهد (1+4k²)x²+8kx=0؛ ریشه‌ها با ویتا و نسبت‌ها از همین‌جا می‌آیند.',
      en: 'Ellipse x²/4+y²=1 with y=kx+1 gives (1+4k²)x²+8kx=0; roots and ratios follow from Vieta.',
    },
    check: {
      q: { fa: 'پیش از استفاده از ویتا در تقاطع خط و منحنی، چه چیزی الزامی است؟', en: 'Before using Vieta on a line–curve intersection you must…' },
      opts: { fa: ['رسم دقیق', 'بررسی Δ>0', 'محاسبهٔ مساحت', 'یافتن مرکز'], en: ['draw it accurately', 'check Δ>0', 'compute area', 'find the centre'] },
      answer: 1,
      why: { fa: 'اگر تقاطع واقعی نباشد، ریشه‌های ویتا بی‌معنا هستند.', en: 'If there is no real intersection, Vieta roots are meaningless.' },
    },
  }),

  /* ————— Japan ————— */
  L({
    id: 'jp-soroban', country: 'JP', level: 'middle', subject: 'math', minutes: 11, special: true,
    title: { fa: 'چرتکه (سوروبان) و حساب ذهنی', en: 'Soroban and mental arithmetic' },
    summary: {
      fa: 'در مدارس ژاپن چرتکه ابزار visualizing است: ذهن تصویر مهره‌ها را نگه می‌دارد و محاسبه از حافظهٔ دیداری می‌آید.',
      en: 'Japanese schools use the soroban as a visualisation tool: the mind holds the bead image and arithmetic runs on visual memory.',
    },
    points: {
      fa: ['مهرهٔ بالایی ۵ و چهار مهرهٔ پایینی ۱ ارزش دارند.', 'برای جمع ۸+۷: ابتدا ۱۰ بردار و ۲ برگردان (مکمل ۱۰).', 'روزی ۵ دقیقه تمرین ذهنی از یک ساعت حفظ فرمول مؤثرتر است.'],
      en: ['One upper bead is 5, four lower beads are 1 each.', 'For 8+7: add 10, subtract 3 — complements of ten.', 'Five daily minutes of mental imaging beats an hour of memorised tables.'],
    },
    example: {
      fa: '۳۴+۲۸: ده‌گان ۵، یکان ۱۲ → انتقال ۱ ده‌گان → ۶۲.', en: '34+28: tens 5, units 12 → carry one ten → 62.',
    },
    check: {
      q: { fa: 'در چرتکه، مهرهٔ بالایی چه ارزشی دارد؟', en: 'On a soroban the upper bead is worth…' },
      opts: { fa: ['۱', '۵', '۱۰', '۵۰'], en: ['1', '5', '10', '50'] },
      answer: 1,
      why: { fa: 'ساختار ۵-۱: یک مهرهٔ بالا (۵) و چهار مهرهٔ پایین (هر یک ۱).', en: 'The 5–1 structure: one upper bead worth 5, four lower beads worth 1 each.' },
    },
  }),

  /* ————— South Korea ————— */
  L({
    id: 'kr-suneung-literature', country: 'KR', level: 'high', subject: 'language', minutes: 17, special: true,
    title: { fa: 'ادبیات کره‌ای در سونه‌ونگ: خواندن ساختاری', en: 'Suneung Korean literature: structural reading' },
    summary: {
      fa: 'در بخش ادبیات سونه‌ونگ، ۴۵ سؤال در ۸۰ دقیقه؛ سرعت از «خواندن ساختاری» می‌آید: پیدا کردن گوینده، زمان و تحول عاطفی.',
      en: '45 literature items in 80 minutes; speed comes from structural reading — speaker, time frame and emotional turn.',
    },
    points: {
      fa: ['قبل از متن، گزینه‌ها را بخوان تا بدانی چه چیزی را شکار می‌کنی.', 'محور عاطفی شعر (افزایش/کاهش) را با علامت حاشیه ثبت کن.', 'در نثر کلاسیک، پایان جمله‌ها نشانهٔ گوینده است.'],
      en: ['Read the options first so you know what to hunt.', 'Mark the emotional axis (rising/falling) in the margin.', 'In classical prose, sentence endings signal the speaker.'],
    },
    example: {
      fa: 'اگر غزل با شکوه آغاز و با حسرت تمام شود، گزینه‌ای که «شادی پایدار» می‌گوید حذف می‌شود.', en: 'If a poem opens in praise and closes in longing, an option claiming lasting joy is out.',
    },
    check: {
      q: { fa: 'مهم‌ترین کار پیش از خواندن متن در آزمون ادبیات؟', en: 'First move before reading the passage?' },
      opts: { fa: ['حفظ لغت', 'خواندن گزینه‌ها', 'نوشتن خلاصه', 'شمارش بیت‌ها'], en: ['memorise vocabulary', 'read the options', 'write a summary', 'count the lines'] },
      answer: 1,
      why: { fa: 'گزینه‌ها به تو می‌گویند دنبال چه نشانه‌ای باشی.', en: 'Options tell you which signals to look for.' },
    },
  }),

  /* ————— Türkiye ————— */
  L({
    id: 'tr-yks-history', country: 'TR', level: 'high', subject: 'national', minutes: 15, special: true,
    title: { fa: 'تاریخ و جغرافیای ترکیه در YKS', en: 'Turkish history & geography for YKS' },
    summary: {
      fa: 'در AYT، پرسش‌های تاریخ اغلب «علت و نتیجه» را می‌خواهند؛ پرسش‌های جغرافیا با نقشه و اقلیم گره خورده‌اند.',
      en: 'AYT history items ask cause and consequence; geography items hang on maps and climate.',
    },
    points: {
      fa: ['گاه‌شمار جنگ استقلال را با تاریخ‌های کلیدی (۱۹۱۹، ۱۹۲۰، ۱۹۲۳) به خاطر بسپار.', 'قاعدهٔ اقلیم: عرض جغرافیایی، ارتفاع، فاصله از دریا.', 'در سؤال نقشه، ابتدا مقیاس و جهت‌ها را بخوان.'],
      en: ['Anchor the War of Independence on 1919, 1920 and 1923.', 'Climate rule: latitude, altitude, distance to sea.', 'On map items, read the scale and orientation first.'],
    },
    example: {
      fa: 'پرسش «چرا آنکارا مرکز شد؟» پاسخ موقعیت مرکزی، امنیت و دسترسی راه‌آهن است، نه جمعیت.', en: '“Why did Ankara become the capital?” Central position, security and rail access — not population.',
    },
    check: {
      q: { fa: 'کدام عامل بیشترین اثر را بر اقلیم شرق آناتولی دارد؟', en: 'Which factor most shapes eastern Anatolia’s climate?' },
      opts: { fa: ['عرض جغرافیایی', 'ارتفاع', 'فاصله از دریا', 'طول جغرافیایی'], en: ['latitude', 'altitude', 'distance to sea', 'longitude'] },
      answer: 1,
      why: { fa: 'ارتفاع بالا باعث زمستان‌های سخت و تابستان‌های خنک می‌شود.', en: 'High altitude drives hard winters and cool summers.' },
    },
  }),

  /* ————— Egypt ————— */
  L({
    id: 'eg-arabic-balagha', country: 'EG', level: 'high', subject: 'language', minutes: 16, special: true,
    title: { fa: 'بلاغت و نحو عربی برای ثانویهٔ عامه', en: 'Arabic rhetoric & grammar for Thanaweya Amma' },
    summary: {
      fa: 'در ثانویهٔ عامه، بخش نحو با «اعراب» و بلاغت با «تشخیص آرایه» سنجیده می‌شود؛ الگوها تکرارشونده‌اند.',
      en: 'Egypt’s national finals test grammar through case marking and rhetoric through figure identification — the patterns repeat.',
    },
    points: {
      fa: ['برای تشخیص استعاره، ببین یکی از دو طرف تشبیه حذف شده است.', 'در اعراب، ابتدا عامل (فعل/حرف) را پیدا کن، بعد نقش.', 'سؤال «تقدیم و تأخیر» به بلاغت (تأکید) وصل می‌شود.'],
      en: ['A metaphor shows one side of a comparison withheld.', 'For case endings, find the operator first, then the role.', 'Fronting questions almost always point to emphasis.'],
    },
    example: {
      fa: '«العلم نور» استعاره است: مشبه‌به (نور) برای علم به کار رفته و ادات تشبیه حذف شده.', en: '“Knowledge is light” is a metaphor: light is borrowed for knowledge with the comparison particle dropped.',
    },
    check: {
      q: { fa: '«رأیتُ أسداً يخطب» چه آرایه‌ای دارد؟', en: '“I saw a lion giving a speech” contains…' },
      opts: { fa: ['استعاره', 'تشبیه', 'کنایه', 'جناس'], en: ['metaphor', 'simile', 'metonymy', 'paronomasia'] },
      answer: 0,
      why: { fa: 'واژهٔ «اسد» برای انسان شجاع به عاریت رفته، بدون ادات تشبیه.', en: 'The word “lion” is borrowed for a brave man with no comparison particle.' },
    },
  }),

  /* ————— Saudi Arabia ————— */
  L({
    id: 'sa-qudurat-quant', country: 'SA', level: 'high', subject: 'math', minutes: 14, special: true,
    title: { fa: 'استدلال کمی قدرات', en: 'Qudurat quantitative reasoning' },
    summary: {
      fa: 'قدرات آزمون استعداد است، نه درس؛ بیشتر سؤال‌ها با نسبت، درصد و استدلال منطقی حل می‌شوند.',
      en: 'Qudurat measures aptitude, not syllabus content; ratios, percentages and logic carry most items.',
    },
    points: {
      fa: ['در سؤال درصد، «از چه چیزی» را مشخص کن.', 'برای نسبت‌ها، همه را به یک واحد مشترک ببر.', 'گزینه‌ها را با تخمین حذف کن؛ محاسبهٔ دقیق اغلب لازم نیست.'],
      en: ['For percentages, fix the base explicitly.', 'For ratios, bring everything to a common unit.', 'Eliminate by estimation; exact computation is usually unnecessary.'],
    },
    example: {
      fa: 'اگر قیمت ۲۰٪ گران و بعد ۲۰٪ ارزان شود، قیمت نهایی ۴٪ کمتر از اول است — چون پایه‌ها متفاوت‌اند.',
      en: 'A 20% rise then a 20% fall ends 4% below the start, because the bases differ.',
    },
    check: {
      q: { fa: 'قیمتی ۲۵٪ افزایش و سپس ۲۰٪ کاهش می‌یابد. نتیجه؟', en: 'A price rises 25% then falls 20%. Result?' },
      opts: { fa: ['بدون تغییر', '۲.۵٪ بیشتر', '۵٪ کمتر', '۲.۵٪ کمتر'], en: ['unchanged', '2.5% higher', '5% lower', '2.5% lower'] },
      answer: 0,
      why: { fa: '۱.۲۵×۰.۸=۱.۰۰ یعنی بازگشت به قیمت اول.', en: '1.25 × 0.8 = 1.00, back to the original price.' },
    },
  }),

  /* ————— Brazil ————— */
  L({
    id: 'br-enem-essay', country: 'BR', level: 'high', subject: 'language', minutes: 18, special: true,
    title: { fa: 'انشای ENEM: پنج معیار، یک ساختار', en: 'The ENEM dissertation: five criteria, one shape' },
    summary: {
      fa: 'انشای ENEM پنج معیار ارزشیابی دارد و «پیشنهاد مداخله» (proposta de intervenção) شرط نمرهٔ کامل است.',
      en: 'The ENEM essay carries five competencies, and a full score requires a concrete intervention proposal.',
    },
    points: {
      fa: ['ساختار: مقدمه (تز)، دو پاراگراف استدلال، نتیجه با پیشنهاد.', 'پیشنهاد باید عامل، کنش، رسانه، هدف و جزئیات داشته باشد.', 'از ضمیر اول‌شخص استفاده نکن؛ لحن باید بی‌طرف باشد.'],
      en: ['Shape: intro with thesis, two argument paragraphs, conclusion with proposal.', 'The proposal needs agent, action, medium, purpose and detail.', 'Never use first person; keep an impersonal register.'],
    },
    example: {
      fa: '«وزارت آموزش باید کارگاه‌های سواد رسانه‌ای را در دبیرستان‌ها اجباری کند تا…» — پنج عنصر را یک‌جا دارد.',
      en: '“The Ministry of Education should make media-literacy workshops mandatory in high schools so that…” — all five elements in one line.',
    },
    check: {
      q: { fa: 'کدام جزء در پیشنهاد مداخلهٔ ENEM الزامی است؟', en: 'Which part is mandatory in an ENEM proposal?' },
      opts: { fa: ['نقل قول فیلسوف', 'عامل و کنش مشخص', 'آمار دقیق', 'بیت شعر'], en: ['a philosopher quote', 'a defined agent and action', 'exact statistics', 'a poem'] },
      answer: 1,
      why: { fa: 'بدون عامل و کنش مشخص، پیشنهاد ناقص و نمره کم می‌شود.', en: 'Without a defined agent and action the proposal is incomplete and scores lower.' },
    },
  }),

  /* ————— Mexico ————— */
  L({
    id: 'mx-history', country: 'MX', level: 'high', subject: 'history', minutes: 15, special: true,
    title: { fa: 'تاریخ مکزیک: سه انقلاب، یک تداوم', en: 'Mexican history: three ruptures, one continuity' },
    summary: {
      fa: 'آزمون UNAM تاریخ را بر محور ۱۸۱۰، ۱۹۱۰ و ۲۰۰۰ می‌سنجد؛ کلید پاسخ‌ها پیوند «زمین و قدرت» است.',
      en: 'UNAM frames history around 1810, 1910 and 2000; the through-line is land and power.',
    },
    points: {
      fa: ['استقلال (۱۸۱۰) و انقلاب (۱۹۱۰) هر دو ریشهٔ روستایی داشتند.', 'قانون اساسی ۱۹۱۷ نخستین قانون با حقوق اجتماعی بود.', 'در سؤال تمدن‌ها، سه‌گانهٔ مایا، آزتک و اولمک را از هم جدا کن.'],
      en: ['Independence (1810) and Revolution (1910) both had rural roots.', 'The 1917 Constitution was the first with social rights.', 'Keep Maya, Aztec and Olmec timelines distinct.'],
    },
    example: {
      fa: 'پرسش «چرا اصل ۲۷ قانون ۱۹۱۷ مهم است؟» پاسخ: مالکیت زمین و حقوق کارگران را در سطح قانون اساسی آورد.',
      en: '“Why does Article 27 of 1917 matter?” It put land ownership and labour rights into the constitution itself.',
    },
    check: {
      q: { fa: 'کدام سند حقوق اجتماعی را وارد قانون اساسی مکزیک کرد؟', en: 'Which document brought social rights into Mexico’s constitution?' },
      opts: { fa: ['قانون ۱۸۵۷', 'قانون ۱۹۱۷', 'پیمان گوادالوپه', 'فرمان ۱۸۱۰'], en: ['1857 Constitution', '1917 Constitution', 'Treaty of Guadalupe', '1810 decree'] },
      answer: 1,
      why: { fa: 'قانون ۱۹۱۷ پس از انقلاب، حقوق کار و زمین را تضمین کرد.', en: 'The post-revolutionary 1917 Constitution guaranteed labour and land rights.' },
    },
  }),

  /* ————— Nigeria ————— */
  L({
    id: 'ng-waec-chem', country: 'NG', level: 'high', subject: 'chemistry', minutes: 16, special: true,
    title: { fa: 'شیمی عملی WAEC: تیتراسیون بدون ترس', en: 'WAEC practical chemistry: titration without fear' },
    summary: {
      fa: 'در بخش عملی WAEC، دقت خواندن بورت و محاسبهٔ مول مهم‌تر از سرعت است؛ جدول نتایج باید کامل باشد.',
      en: 'In WAEC practicals, burette reading and mole arithmetic matter more than speed — and the results table must be complete.',
    },
    points: {
      fa: ['میانگین حجم را از ران‌های سازگار بگیر، نه از همه.', 'معادلهٔ بالانس‌شده را قبل از نسبت مولی بنویس.', 'برای شناسایی یون، رنگ رسوب و انحلال‌پذیری را ثبت کن.'],
      en: ['Average only concordant titres.', 'Balance the equation before the mole ratio.', 'For ion tests, record precipitate colour and solubility.'],
    },
    example: {
      fa: '۲۵ سانتی‌متر مکعب NaOH ۰.۱ مولار با ۲۰ سانتی‌متر مکعب HCl؛ نسبت ۱:۱ پس غلظت اسید ۰.۱۲۵ مولار است.',
      en: '25 cm³ of 0.1 M NaOH with 20 cm³ HCl at 1:1 gives 0.125 M acid.',
    },
    check: {
      q: { fa: 'کدام تیتر را در میانگین می‌آوریم؟', en: 'Which titres go into the average?' },
      opts: { fa: ['همه', 'فقط سازگارها', 'اولی', 'بزرگ‌ترین'], en: ['all', 'concordant ones only', 'the first', 'the largest'] },
      answer: 1,
      why: { fa: 'تیترهای ناسازگار خطای آزمایشی دارند و میانگین را خراب می‌کنند.', en: 'Non-concordant titres carry experimental error and corrupt the mean.' },
    },
  }),

  /* ————— Kenya ————— */
  L({
    id: 'ke-savanna-ecology', country: 'KE', level: 'high', subject: 'biology', minutes: 17, special: true,
    title: { fa: 'بوم‌شناسی ساوانا در زیست KCSE', en: 'Savanna ecology in KCSE biology' },
    summary: {
      fa: 'KCSE بوم‌شناسی را با مثال‌های محلی می‌سنجد: چرخهٔ چرا، آتش، و سازگاری آکاسیا.',
      en: 'KCSE tests ecology through local cases: grazing cycles, fire and acacia adaptation.',
    },
    points: {
      fa: ['هر زنجیرهٔ غذایی با تولیدکننده شروع می‌شود و انرژی در هر سطح ≈۹۰٪ کم می‌شود.', 'آکاسیا با خار و تانن، گیاه‌خواری را کم می‌کند.', 'آتش دوره‌ای، تنوع علفی را بازنشانی می‌کند.'],
      en: ['Each food chain starts with a producer and loses about 90% of energy per level.', 'Acacia reduces herbivory with thorns and tannins.', 'Periodic fire resets grass diversity.'],
    },
    example: {
      fa: 'اگر انرژی علف ۱۰۰۰۰ کیلوژول باشد، در سطح سوم (گوشت‌خوار) حدود ۱۰ کیلوژول می‌ماند — دلیل کوچک بودن جمعیت‌ها.',
      en: 'With 10,000 kJ of grass, roughly 10 kJ remains at the third level — why top populations stay small.',
    },
    check: {
      q: { fa: 'حدود چه سهمی از انرژی به سطح بعدی می‌رسد؟', en: 'About what share of energy reaches the next trophic level?' },
      opts: { fa: ['۱۰٪', '۵۰٪', '۹۰٪', '۱۰۰٪'], en: ['10%', '50%', '90%', '100%'] },
      answer: 0,
      why: { fa: 'قاعدهٔ ده‌درصد: بیشتر انرژی در تنفس و گرما هدر می‌رود.', en: 'The ten-percent rule: most energy is lost to respiration and heat.' },
    },
  }),

  /* ————— South Africa ————— */
  L({
    id: 'za-matric-geo', country: 'ZA', level: 'high', subject: 'geography', minutes: 15, special: true,
    title: { fa: 'اقلیم‌شناسی و GIS در ماتریک', en: 'Climatology & GIS for Matric' },
    summary: {
      fa: 'جغرافیای ماتریک دو ستون دارد: تفسیر سینوپتیک (نقشه‌های هواشناسی) و مهارت GIS.',
      en: 'Matric geography rests on two pillars: synoptic chart interpretation and GIS skills.',
    },
    points: {
      fa: ['پرفشار (H) هوا را پایین می‌آورد و آسمان صاف می‌سازد.', 'خطوط هم‌فشار نزدیک = باد تند.', 'در GIS، لایه (raster/vector) و مقیاس را با هم بخوان.'],
      en: ['High pressure subsides air and clears skies.', 'Tight isobars mean strong wind.', 'In GIS, read layer type (raster/vector) with scale.'],
    },
    example: {
      fa: 'اگر ایزوبارها در ساحل دوربان ۲ hPa در ۵۰ کیلومتر فشرده شوند، بادهای تند جنوب‌غربی انتظار می‌رود.',
      en: 'If isobars near Durban pack 2 hPa per 50 km, expect strong south-westerlies.',
    },
    check: {
      q: { fa: 'ایزوبارهای نزدیک به هم نشانهٔ چیست؟', en: 'Closely spaced isobars indicate…' },
      opts: { fa: ['باد تند', 'باران شدید', 'دمای بالا', 'فشار ثابت'], en: ['strong wind', 'heavy rain', 'high temperature', 'constant pressure'] },
      answer: 0,
      why: { fa: 'گرادیان فشار تند = نیروی بیشتر = باد تندتر.', en: 'Steep pressure gradient, greater force, stronger wind.' },
    },
  }),

  /* ————— Pakistan ————— */
  L({
    id: 'pk-pak-studies', country: 'PK', level: 'high', subject: 'national', minutes: 13, special: true,
    title: { fa: 'مطالعات پاکستان: پاسخ نمره‌بگیر', en: 'Pakistan Studies: the mark-earning answer' },
    summary: {
      fa: 'در FSc پاسخ‌های سه‌بخشی می‌خواهند: تعریف، دو مثال، نتیجه‌گیری. حاشیه‌نویسی «افق ۱۹۴۷» کمک بزرگی است.',
      en: 'FSc answers want three beats: definition, two examples, conclusion. Anchoring every topic to 1947 helps.',
    },
    points: {
      fa: ['قانون اساسی ۱۹۷۳ را با ساختار فدرال و حقوق بنیادی به یاد بسپار.', 'در سؤال کشمیر، گاه‌شمار قطعنامه‌های سازمان ملل را بگو.', 'هر پاسخ با یک جملهٔ نتیجه تمام شود.'],
      en: ['Remember the 1973 Constitution for federal structure and fundamental rights.', 'For Kashmir, cite the UN resolution timeline.', 'Close every answer with a one-line conclusion.'],
    },
    example: {
      fa: 'سؤال «اهمیت ۱۹۷۳»: تعریف قانون، دو نمونه (فدرالیسم، حقوق بنیادی)، نتیجه (ثبات نهادی).',
      en: '“Significance of 1973”: define it, give two examples (federalism, fundamental rights), conclude with institutional stability.',
    },
    check: {
      q: { fa: 'کدام قانون اساسی پاکستان هنوز معتبر است؟', en: 'Which constitution of Pakistan is still in force?' },
      opts: { fa: ['۱۹۵۶', '۱۹۶۲', '۱۹۷۳', '۱۹۸۵'], en: ['1956', '1962', '1973', '1985'] },
      answer: 2,
      why: { fa: 'قانون ۱۹۷۳ با اصلاحیه‌ها معتبر است.', en: 'The 1973 Constitution, as amended, remains in force.' },
    },
  }),

  /* ————— Indonesia ————— */
  L({
    id: 'id-archipelago-bio', country: 'ID', level: 'high', subject: 'biology', minutes: 16, special: true,
    title: { fa: 'تنوع زیستی مجمع‌الجزایر برای SNBT', en: 'Archipelago biodiversity for SNBT' },
    summary: {
      fa: 'اندونزی روی خط والاس نشسته است؛ آزمون‌ها تفاوت زیست‌جغرافیایی دو سوی خط را دوست دارند.',
      en: 'Indonesia straddles the Wallace Line; exams love the biogeographic split across it.',
    },
    points: {
      fa: ['غرب خط (سوماترا، جاوا): پستانداران آسیایی؛ شرق (پاپوآ): کیسه‌داران و پرندگان بهشتی.', 'جنگل مانگرو، سد ساحلی و مهد آبزیان است.', 'گونهٔ بومی (endemik) یعنی فقط در یک ناحیه زندگی می‌کند.'],
      en: ['West of the line (Sumatra, Java): Asian mammals. East (Papua): marsupials and birds of paradise.', 'Mangroves are coastal barriers and nurseries.', 'Endemic means restricted to one region.'],
    },
    example: {
      fa: 'Komodo فقط در جزایر کوچک سوندا زندگی می‌کند؛ نمونهٔ کلاسیک گونهٔ بومی.', en: 'The Komodo dragon lives only in the Lesser Sunda islands — a classic endemic species.',
    },
    check: {
      q: { fa: 'خط والاس چه چیزی را جدا می‌کند؟', en: 'The Wallace Line separates…' },
      opts: { fa: ['دو اقلیم', 'دو ناحیهٔ زیست‌جغرافیایی', 'دو اقیانوس', 'دو جزیره'], en: ['two climates', 'two biogeographic realms', 'two oceans', 'two islands'] },
      answer: 1,
      why: { fa: 'مرز بین fauna آسیایی و استرالیایی است.', en: 'It is the boundary between Asian and Australian fauna.' },
    },
  }),

  /* ————— Russia ————— */
  L({
    id: 'ru-ege-physics', country: 'RU', level: 'high', subject: 'physics', minutes: 18, special: true,
    title: { fa: 'مسائل ЕГЭ فیزیک: بخش دوم', en: 'EGE physics, part two' },
    summary: {
      fa: 'بخش دوم ЕГЭ نمرهٔ کامل نمی‌دهد مگر استدلال فیزیکی نوشته شود؛ پاسخ عددی تنها یک سوم نمره است.',
      en: 'EGE part two only pays in full when the physical reasoning is written; a bare number earns a third.',
    },
    points: {
      fa: ['نمودار آزاد جسم را قبل از هر معادله بکش.', 'برای گاز، از معادلهٔ حالت و قانون اول ترمودینامیک استفاده کن.', 'در مدارها، جهت جریان را قبل از علامت‌گذاری EMF مشخص کن.'],
      en: ['Draw the free-body diagram before any equation.', 'For gases, use the state equation plus the first law.', 'In circuits, fix current direction before assigning EMF signs.'],
    },
    example: {
      fa: 'برای گلوله‌ای که از ارتفاع h رها می‌شود: mgh = ½mv² + Q؛ Q گرمای اتلافی است، همان چیزی که داوران دنبالش‌اند.',
      en: 'A ball dropped from h: mgh = ½mv² + Q where Q is dissipated heat — exactly what markers look for.',
    },
    check: {
      q: { fa: 'پیش از نوشتن معادلات حرکت، چه چیزی لازم است؟', en: 'Before writing equations of motion you need…' },
      opts: { fa: ['نمودار آزاد جسم', 'ماشین‌حساب', 'جدول', 'نمودار سرعت'], en: ['a free-body diagram', 'a calculator', 'a table', 'a velocity graph'] },
      answer: 0,
      why: { fa: 'بدون نیروهای مشخص، علامت‌ها اشتباه می‌شوند.', en: 'Without identified forces the signs go wrong.' },
    },
  }),

  /* ————— Australia ————— */
  L({
    id: 'au-outback-geo', country: 'AU', level: 'high', subject: 'geography', minutes: 14, special: true,
    title: { fa: 'جغرافیای استرالیا: خشکی، آب، صخره', en: 'Australian geography: aridity, water, reef' },
    summary: {
      fa: 'جغرافیای ATAR با سه پدیدهٔ بومی سنجیده می‌شود: خشکی مرکزی، شوری خاک و سفیدشدن مرجان‌ها.',
      en: 'ATAR geography tests three local phenomena: interior aridity, soil salinity and coral bleaching.',
    },
    points: {
      fa: ['کمربندهای فشار جنب‌حاره‌ای علت خشکی مرکز است.', 'آبیاری مازاد، سطح آب زیرزمینی را بالا و خاک را شور می‌کند.', 'سفیدشدن مرجان = اخراج زوگزانتلا به‌دلیل گرما.'],
      en: ['Subtropical high-pressure belts explain the dry interior.', 'Over-irrigation raises the water table and salinises soil.', 'Bleaching is heat-driven expulsion of zooxanthellae.'],
    },
    example: {
      fa: 'اگر دمای آب ۱ درجه بالا برود، مرجان ۴ تا ۸ هفته مقاومت می‌کند؛ بعد رنگ می‌بازد.', en: 'At +1 °C, coral holds for four to eight weeks before losing colour.',
    },
    check: {
      q: { fa: 'علت اصلی سفیدشدن مرجان چیست؟', en: 'Main cause of coral bleaching?' },
      opts: { fa: ['گرمای آب', 'شوری کم', 'باد', 'جزر و مد'], en: ['water heat', 'low salinity', 'wind', 'tides'] },
      answer: 0,
      why: { fa: 'تنش گرمایی، هم‌زیستی جلبک و مرجان را می‌شکند.', en: 'Heat stress breaks the algae–coral symbiosis.' },
    },
  }),

  /* ————— Canada ————— */
  L({
    id: 'ca-civics', country: 'CA', level: 'middle', subject: 'national', minutes: 12, special: true,
    title: { fa: 'شهروندی کانادا: سه سطح، یک منشور', en: 'Canadian civics: three levels, one charter' },
    summary: {
      fa: 'شهروندی کانادا با تقسیم قدرت فدرال/استانی/شهری و منشور حقوق و آزادی‌ها شناخته می‌شود.',
      en: 'Canadian civics is built on federal/provincial/municipal division and the Charter of Rights and Freedoms.',
    },
    points: {
      fa: ['آموزش و بهداشت وظیفهٔ استان است، دفاع و پول فدرال.', 'منشور ۱۹۸۲ بر قانون اساسی سوار شد.', 'بند «محدودیت معقول» (بند ۱) اجازهٔ تعدیل حقوق را می‌دهد.'],
      en: ['Education and health are provincial; defence and currency federal.', 'The 1982 Charter was entrenched in the constitution.', 'Section 1 allows “reasonable limits” on rights.'],
    },
    example: {
      fa: 'اگر استانی برنامهٔ درسی را تغییر دهد، این کار در صلاحیت استانی است — پاسخ کلاسیک آزمون.', en: 'If a province changes its curriculum, that is provincial jurisdiction — the classic exam answer.',
    },
    check: {
      q: { fa: 'آموزش عمومی در کانادا در صلاحیت کیست؟', en: 'Public education in Canada falls to…' },
      opts: { fa: ['فدرال', 'استانی', 'شهری', 'مدارس خصوصی'], en: ['federal', 'provincial', 'municipal', 'private boards'] },
      answer: 1,
      why: { fa: 'قانون اساسی آموزش را به استان‌ها سپرده است.', en: 'The constitution assigns education to the provinces.' },
    },
  }),

  /* ————— Italy ————— */
  L({
    id: 'it-art-heritage', country: 'IT', level: 'high', subject: 'art', minutes: 16, special: true,
    title: { fa: 'میراث هنری ایتالیا برای ماتوریتا', en: 'Italian art heritage for the Maturità' },
    summary: {
      fa: 'در ماتوریتا تحلیل اثر هنری با «خواندن سه‌لایه» نمره می‌گیرد: فرم، معنا، زمینهٔ تاریخی.',
      en: 'The Maturità rewards three-layer reading of an artwork: form, meaning, historical context.',
    },
    points: {
      fa: ['پرسپکتیو خطی را با نقطهٔ گریز نشان بده، نه با توصیف کلی.', 'نور در کاراواجو ابزار روایت است، نه تزئین.', 'باروک را با ضداصلاح دینی پیوند بده.'],
      en: ['Show linear perspective through the vanishing point, not adjectives.', 'Caravaggio’s light is narrative, not decoration.', 'Anchor the Baroque to the Counter-Reformation.'],
    },
    example: {
      fa: 'در «ندای متی» کاراواجو، پرتو نور هم سمت متی را می‌سازد و هم انتخاب الهی را روایت می‌کند.',
      en: 'In Caravaggio’s Calling of St Matthew the light beam both locates Matthew and narrates divine choice.',
    },
    check: {
      q: { fa: 'در تحلیل نقاشی رنسانس، کدام شاهد عینی‌تر است؟', en: 'Which is the most objective evidence in Renaissance analysis?' },
      opts: { fa: ['حس زیبایی', 'نقطهٔ گریز', 'شهرت نقاش', 'اندازهٔ بوم'], en: ['a feeling of beauty', 'the vanishing point', 'the painter’s fame', 'the canvas size'] },
      answer: 1,
      why: { fa: 'نقطهٔ گریز قابل اندازه‌گیری و توصیف است.', en: 'The vanishing point can be measured and described.' },
    },
  }),

  /* ————— Spain ————— */
  L({
    id: 'es-literature', country: 'ES', level: 'high', subject: 'literature', minutes: 15, special: true,
    title: { fa: 'ادبیات اسپانیایی در EBAU: تفسیر متنی', en: 'Spanish literature in EBAU: commentary' },
    summary: {
      fa: 'در EBAU تفسیر متن سه بخش دارد: موضوع و ساختار، تحلیل سبک، جایگاه در جنبش ادبی.',
      en: 'EBAU commentary has three parts: theme and structure, stylistic analysis, place in the literary movement.',
    },
    points: {
      fa: ['موضوع را با یک جمله بنویس، نه با خلاصهٔ داستان.', 'برای سبک، دو آرایه با نقل قول مستقیم بیاور.', 'نسل ۲۷ و نسل ۹۸ را از نظر فرم و موضوع جدا کن.'],
      en: ['State the theme in one sentence, not a plot summary.', 'For style, quote two devices directly.', 'Separate Generation of ’27 from ’98 by form and theme.'],
    },
    example: {
      fa: 'در لورکا، تکرار (estribillo) هم موسیقی می‌سازد و هم حس تقدیر را تقویت می‌کند.', en: 'In Lorca the refrain builds music and reinforces a sense of fate.',
    },
    check: {
      q: { fa: 'بهترین شروع تفسیر متنی؟', en: 'Best opening for a commentary?' },
      opts: { fa: ['شرح زندگی نویسنده', 'بیان موضوع در یک جمله', 'نقل کامل شعر', 'تاریخ انتشار'], en: ['author biography', 'the theme in one sentence', 'the full poem', 'publication date'] },
      answer: 1,
      why: { fa: 'موضوع، ستون تفسیر است؛ بقیه پشتیبان آن‌اند.', en: 'The theme is the spine; everything else supports it.' },
    },
  }),

  /* ————— Netherlands ————— */
  L({
    id: 'nl-applied-math', country: 'NL', level: 'high', subject: 'math', minutes: 14, special: true,
    title: { fa: 'ریاضی کاربردی هلندی: مدل‌سازی واقعی', en: 'Dutch applied maths: real-world modelling' },
    summary: {
      fa: 'در هلند ریاضی «کاربردی» با مسئله‌های واقعی سنجیده می‌شود؛ مدل‌سازی و تفسیر جواب مهم‌تر از جبر است.',
      en: 'Dutch applied maths tests real contexts; building and interpreting a model outweighs algebra drills.',
    },
    points: {
      fa: ['ابتدا متغیرها را تعریف کن و واحدشان را بنویس.', 'مدل خطی را فقط وقتی به کار ببر که نرخ تغییر ثابت است.', 'پاسخ را در بافت مسئله تفسیر کن (مثلاً «حداکثر ۴۰ نفر»).'],
      en: ['Define variables with units first.', 'Use a linear model only when the rate is constant.', 'Interpret the answer in context (e.g. “at most 40 people”).'],
    },
    example: {
      fa: 'اجارهٔ خودرو: ۳۰ یورو ثابت + ۰٫۲۰ به کیلومتر → C=30+0.2k؛ اگر بودجه ۷۰ یورو باشد، حداکثر ۲۰۰ کیلومتر.',
      en: 'Car rental: €30 fixed + €0.20/km → C=30+0.2k; with a €70 budget you can drive 200 km.',
    },
    check: {
      q: { fa: 'کِی مدل نمایی مناسب‌تر از خطی است؟', en: 'When is an exponential model better than linear?' },
      opts: { fa: ['نرخ ثابت', 'رشد نسبی ثابت', 'دادهٔ کم', 'بدون واحد'], en: ['constant rate', 'constant relative growth', 'little data', 'no units'] },
      answer: 1,
      why: { fa: 'رشد نسبی ثابت یعنی ضریب ثابت، که نمایی است.', en: 'Constant relative growth means a constant factor — exponential.' },
    },
  }),

  /* ————— Sweden ————— */
  L({
    id: 'se-programming', country: 'SE', level: 'middle', subject: 'cs', minutes: 15, special: true,
    title: { fa: 'برنامه‌نویسی در مدرسهٔ سوئد: تفکر الگوریتمی', en: 'Programming in Swedish schools: algorithmic thinking' },
    summary: {
      fa: 'برنامهٔ درسی سوئد برنامه‌نویسی را از کلاس چهارم با «الگوریتم و اشکال‌زدایی» شروع می‌کند، نه با نحو زبان.',
      en: 'Sweden starts programming in grade four with algorithms and debugging, not syntax.',
    },
    points: {
      fa: ['الگوریتم = دنبالهٔ گام‌های معین و پایان‌پذیر.', 'اشکال‌زدایی با کوچک‌ترین ورودی شروع می‌شود.', 'حلقه را وقتی بزن که تعداد تکرار نامعلوم است.'],
      en: ['An algorithm is a finite, deterministic sequence of steps.', 'Debugging starts from the smallest failing input.', 'Use a loop when the repetition count is unknown.'],
    },
    example: {
      fa: 'مرتب‌سازی حبابی روی [3,1,2]: مقایسه و جابه‌جایی تا وقتی تعویضی رخ دهد — همیشه پایان می‌پذیرد.',
      en: 'Bubble sort on [3,1,2]: compare and swap until no swap occurs — it always terminates.',
    },
    check: {
      q: { fa: 'کدام ویژگی برای «الگوریتم» الزامی است؟', en: 'Which property is required of an algorithm?' },
      opts: { fa: ['پایان‌پذیری', 'سرعت بالا', 'زبان برنامه‌نویسی', 'حافظهٔ کم'], en: ['termination', 'high speed', 'a programming language', 'low memory'] },
      answer: 0,
      why: { fa: 'الگوریتم باید پس از تعداد متناهی گام تمام شود.', en: 'It must finish after a finite number of steps.' },
    },
  }),

  /* ————— Morocco ————— */
  L({
    id: 'ma-bac-lang', country: 'MA', level: 'high', subject: 'language', minutes: 14, special: true,
    title: { fa: 'دوزبانگی مراکش: عربی و فرانسه در باکالوریا', en: 'Moroccan bilingualism: Arabic and French in the Bac' },
    summary: {
      fa: 'باکالوریای مراکش دو زبان رسمی آموزشی دارد؛ ترجمهٔ مفهومی، نه واژه‌به‌واژه، کلید نمره است.',
      en: 'The Moroccan Bac runs on two teaching languages; conceptual, not literal, translation is the key.',
    },
    points: {
      fa: ['اصطلاحات علمی را در هر دو زبان جفت‌جفت حفظ کن.', 'در انشا، ساختار سه‌بخشی فرانسه را با بلاغت عربی قاطی نکن؛ یکی را انتخاب کن.', 'خواندن سریع متن فرانسه با پیش‌بینی واژگان از بافت.'],
      en: ['Memorise scientific terms in paired sets across both languages.', 'Do not mix the French three-part essay with Arabic rhetorical structure — pick one.', 'Speed-read French by predicting vocabulary from context.'],
    },
    example: {
      fa: '«photosynthèse» = «التركيب الضوئي»؛ اگر جفت آن را بلد باشی، از سؤال دوزبانه نمی‌ترسی.', en: '“photosynthèse” = “التركيب الضوئي”; paired terms remove the fear of bilingual questions.',
    },
    check: {
      q: { fa: 'بهترین راه مطالعهٔ دوزبانه؟', en: 'Best way to study bilingually?' },
      opts: { fa: ['حفظ جدا', 'جفت‌سازی اصطلاحات', 'ترجمهٔ واژه‌به‌واژه', 'فقط فرانسه'], en: ['separately', 'pairing terms', 'literal translation', 'French only'] },
      answer: 1,
      why: { fa: 'جفت‌سازی، بازیابی متقابل را ممکن می‌کند.', en: 'Pairing enables cross-retrieval.' },
    },
  }),

  /* ————— General / cross-stage ————— */
  L({
    id: 'gen-k-literacy', country: 'GLOBAL', level: 'kindergarten', subject: 'language', minutes: 8,
    title: { fa: 'پیش‌سواد با بازی: صدا، نه حرف', en: 'Pre-literacy through play: sounds before letters' },
    summary: {
      fa: 'پیش از شناخت حروف، کودک باید «آواشناسی» را با گوش یاد بگیرد: قافیه، هجای اول، صداهای آغازین.',
      en: 'Before letters, children need phonemic awareness by ear: rhymes, first syllables, initial sounds.',
    },
    points: {
      fa: ['روزی ۵ دقیقه بازی قافیه، بیشتر از یک ساعت کارت الفبا اثر دارد.', 'صدا را با حرکت بدن گره بزن (پرش برای هر هجا).', 'خواندن با صدای بلند روزانه، پایهٔ واژگان است.'],
      en: ['Five minutes of rhyme play beats an hour of flashcards.', 'Bind sounds to movement (a jump per syllable).', 'Daily read-aloud is the base of vocabulary.'],
    },
    example: {
      fa: 'بازی «همان صدا»: «توپ، تاج، تخت» — کودک صداهای آغازین یکسان را پیدا می‌کند.', en: '“Same sound” game: “ball, bat, bed” — the child finds the matching initial sound.',
    },
    check: {
      q: { fa: 'کدام مهارت پیش از حروف می‌آید؟', en: 'Which skill comes before letters?' },
      opts: { fa: ['آگاهی آوایی', 'دست‌نویسی', 'املا', 'خواندن روان'], en: ['phonemic awareness', 'handwriting', 'spelling', 'fluent reading'] },
      answer: 0,
      why: { fa: 'گوش باید صداها را از هم جدا کند تا حرف معنا پیدا کند.', en: 'The ear must separate sounds before letters mean anything.' },
    },
  }),
  L({
    id: 'gen-primary-placevalue', country: 'GLOBAL', level: 'primary', subject: 'math', minutes: 10,
    title: { fa: 'ارزش مکانی: کلید همهٔ حساب', en: 'Place value: the key to all arithmetic' },
    summary: {
      fa: 'بیشتر خطاهای جمع و تفریق از ارزش مکانی می‌آید. کار با میله‌های ده‌تایی و جدول ارزش مکانی این را درمان می‌کند.',
      en: 'Most addition errors are place-value errors. Ten-rods and a place-value table cure them.',
    },
    points: {
      fa: ['همیشه از یکان شروع کن، نه از چپ.', 'رقم‌ها را در ستون درست بنویس، ممیزها را هم‌تراز کن.', 'تخمین قبل از محاسبه، خطا را آشکار می‌کند.'],
      en: ['Always start from the ones column, not the left.', 'Line digits up by column, and align decimal points.', 'Estimate before computing to expose errors.'],
    },
    example: {
      fa: '۳۴۷+۲۸۵: یکان ۱۲ → ۲ با انتقال ۱؛ ده‌گان ۱۳ → ۳ با انتقال ۱؛ صدگان ۶ → پاسخ ۶۳۲.',
      en: '347+285: ones 12 → write 2 carry 1; tens 13 → write 3 carry 1; hundreds 6 → 632.',
    },
    check: {
      q: { fa: '۴۰۵−۱۲۸ چند است؟', en: 'What is 405 − 128?' },
      opts: { fa: ['۲۷۷', '۳۲۳', '۲۸۷', '۳۷۷'], en: ['277', '323', '287', '377'] },
      answer: 0,
      why: { fa: '۵−۸ نیاز به قرض از ده‌گان دارد: ۴۰۵−۱۲۸=۲۷۷.', en: '5 − 8 needs a borrow: 405 − 128 = 277.' },
    },
  }),
  L({
    id: 'gen-middle-memory', country: 'GLOBAL', level: 'middle', subject: 'national', minutes: 11,
    title: { fa: 'مرور فاصله‌دار و بازیابی فعال', en: 'Spaced repetition & active recall' },
    summary: {
      fa: 'دو ساعت مطالعهٔ دوباره‌خوانی کم‌اثر است؛ ۲۰ دقیقه آزمون از خود، مؤثرتر است. مرور را در روزهای ۱، ۳، ۷ و ۲۱ بگذار.',
      en: 'Two hours of re-reading is weak; 20 minutes of self-testing is strong. Review on days 1, 3, 7 and 21.',
    },
    points: {
      fa: ['از خودت بپرس، بعد جواب را ببین (retrieval practice).', 'کارت‌های اشتباه را جدا نگه دار؛ همان‌ها نمره‌اند.', 'بین جلسه‌ها فاصله بگذار، حتی اگر روزی دو بار بخوانی.'],
      en: ['Ask, then check — retrieval before review.', 'Keep an error deck; those cards are your marks.', 'Space sessions out, even across one day.'],
    },
    example: {
      fa: 'یک درس ۱۰ صفحه‌ای: ۱۵ دقیقه خواندن، ۵ دقیقه پرسش، ۲۴ ساعت بعد ۵ دقیقه یادآوری.', en: 'A ten-page lesson: 15 min read, 5 min quiz, 5 min recall a day later.',
    },
    check: {
      q: { fa: 'مؤثرترین روش تثبیت؟', en: 'Most effective consolidation method?' },
      opts: { fa: ['دوباره‌خوانی', 'بازیابی فعال', 'هایلایت', 'خلاصه‌نویسی زیبا'], en: ['re-reading', 'active recall', 'highlighting', 'pretty notes'] },
      answer: 1,
      why: { fa: 'بازیابی، حافظه را می‌سازد؛ خواندن دوباره فقط آشنايی می‌دهد.', en: 'Recall builds memory; re-reading only builds familiarity.' },
    },
  }),
  L({
    id: 'gen-high-exam-strategy', country: 'GLOBAL', level: 'high', subject: 'national', minutes: 12,
    title: { fa: 'استراتژی روز آزمون', en: 'Exam-day strategy' },
    summary: {
      fa: 'سه قانون: اول آسان‌ها، بعد متوسط‌ها، آخر سخت‌ها؛ هر ۲۰ دقیقه یک نفس و یک بازبینی؛ هرگز پرسش خالی نگذار مگر نمرهٔ منفی.',
      en: 'Three rules: easy first, medium next, hard last; every 20 minutes breathe and re-scan; never leave blanks unless there is negative marking.',
    },
    points: {
      fa: ['۳۰ ثانیه برای هر سؤال؛ اگر نرفت، علامت بزن و برو.', 'در نمرهٔ منفی، فقط وقتی حدس بزن که یک گزینه را حذف کرده باشی.', '۱۰ دقیقهٔ آخر را برای انتقال پاسخ‌ها نگه دار.'],
      en: ['Thirty seconds per item; if stuck, flag and move.', 'With negative marking, guess only after eliminating one option.', 'Reserve the last ten minutes for transfers and checks.'],
    },
    example: {
      fa: 'در آزمون ۶۰ سؤالی با ۹۰ دقیقه: ۴۵ دقیقه دور اول، ۳۰ دقیقه دور دوم، ۱۵ دقیقه بازبینی.', en: 'A 60-item, 90-minute paper: 45 min first pass, 30 min second, 15 min review.',
    },
    check: {
      q: { fa: 'با نمرهٔ منفی چه زمانی حدس بزنیم؟', en: 'With negative marking, when do you guess?' },
      opts: { fa: ['همیشه', 'هرگز', 'پس از حذف یک گزینه', 'فقط سؤال آخر'], en: ['always', 'never', 'after eliminating one option', 'only the last item'] },
      answer: 2,
      why: { fa: 'از ۳ گزینه، احتمال انتظاری مثبت می‌شود.', en: 'With three options left the expected value turns positive.' },
    },
  }),
  L({
    id: 'gen-uni-research', country: 'GLOBAL', level: 'university', subject: 'cs', minutes: 18,
    title: { fa: 'روش پژوهش: از پرسش تا اعتبار', en: 'Research methods: question to validity' },
    summary: {
      fa: 'هر پژوهش با یک پرسش قابل‌سنجش شروع می‌شود، با روش متناسب ادامه می‌یابد و با تهدیدهای اعتبار سنجیده می‌شود.',
      en: 'Research starts with a measurable question, continues with a fitting method, and is judged by threats to validity.',
    },
    points: {
      fa: ['فرضیه باید ابطال‌پذیر باشد.', 'نمونه‌گیری را قبل از جمع‌آوری داده مستند کن.', 'سه تهدید: سوگیری انتخاب، متغیر مخدوش، سوگیری گزارش.'],
      en: ['A hypothesis must be falsifiable.', 'Document sampling before collecting data.', 'Three threats: selection bias, confounding, reporting bias.'],
    },
    example: {
      fa: 'علت و معلول نیاز به تصادفی‌سازی دارد؛ همبستگی تنها کافی نیست.', en: 'Causal claims need randomisation; correlation alone is not enough.',
    },
    check: { q: { fa: 'برای ادعای علّی چه چیزی لازم است؟', en: 'What does a causal claim require?' }, opts: { fa: ['همبستگی', 'تصادفی‌سازی', 'نمونهٔ بزرگ', 'پرسش‌نامه'], en: ['correlation', 'randomisation', 'a big sample', 'a questionnaire'] }, answer: 1, why: { fa: 'تصادفی‌سازی متغیرهای مخدوش را متعادل می‌کند.', en: 'Randomisation balances confounders.' } },
  }),
  L({
    id: 'gen-life-language', country: 'GLOBAL', level: 'lifelong', subject: 'english', minutes: 12,
    title: { fa: 'یادگیری زبان در بزرگسالی: ورودی قابل‌فهم', en: 'Adult language learning: comprehensible input' },
    summary: {
      fa: 'زبان با «ورودی قابل‌فهم + تکرار فاصله‌دار + تولید» ساخته می‌شود؛ گرامر ابزار است، نه هدف.',
      en: 'Language grows from comprehensible input, spaced repetition and output; grammar is a tool, not the goal.',
    },
    points: {
      fa: ['روزی ۲۰ دقیقه شنیدن، پایهٔ گوش است.', '۲۰۰۰ واژهٔ پرتکرار ≈ ۸۰٪ گفتار روزمره.', 'اشتباه را در تولید بپذیر؛ توقف، بزرگ‌ترین دشمن است.'],
      en: ['Twenty minutes of listening daily trains the ear.', 'The top 2000 words cover roughly 80% of speech.', 'Accept errors in output; freezing is the real enemy.'],
    },
    example: {
      fa: 'برای مکالمهٔ کاری، ۳۰۰ واژهٔ حوزهٔ خودت را در جمله‌های کامل تمرین کن، نه در لیست.', en: 'For work conversation, drill 300 domain words inside full sentences, not in lists.',
    },
    check: { q: { fa: 'مهم‌ترین عامل پیشرفت در زبان؟', en: 'The biggest driver of language progress?' }, opts: { fa: ['حفظ گرامر', 'ورودی فراوان و قابل‌فهم', 'ترجمه', 'تست‌های گرامر'], en: ['grammar memorisation', 'abundant comprehensible input', 'translation', 'grammar tests'] }, answer: 1, why: { fa: 'مغز از الگوهای تکرارشدهٔ معنادار، قاعده می‌سازد.', en: 'The brain derives rules from repeated meaningful patterns.' } },
  }),
  L({
    id: 'gen-art-composition', country: 'GLOBAL', level: 'middle', subject: 'art', minutes: 9,
    title: { fa: 'ترکیب‌بندی بصری در سه قانون', en: 'Visual composition in three rules' },
    summary: {
      fa: 'ترکیب خوب با سه ابزار کنترل می‌شود: سلسله‌مراتب، فضای منفی و خط راهنما.',
      en: 'Good composition is controlled by hierarchy, negative space and leading lines.',
    },
    points: {
      fa: ['یک نقطهٔ تمرکز داشته باش، نه پنج.', 'فضای خالی، تنفس اثر است.', 'کنتراست، چشم را هدایت می‌کند.'],
      en: ['One focal point, not five.', 'Negative space is the artwork breathing.', 'Contrast steers the eye.'],
    },
    example: { fa: 'در پوستر، تیتر بزرگ + تصویر کوچک + فضای خالی زیاد = تمرکز فوری.', en: 'Poster: big headline, small image, generous white space — instant focus.' },
    check: { q: { fa: 'فضای منفی چه کاری می‌کند؟', en: 'What does negative space do?' }, opts: { fa: ['پر کردن صفحه', 'تنفس و تمرکز', 'افزودن رنگ', 'کاهش کنتراست'], en: ['fills the canvas', 'gives breathing and focus', 'adds colour', 'cuts contrast'] }, answer: 1, why: { fa: 'خلأ، وزن بصری عناصر را بیشتر می‌کند.', en: 'Emptiness increases the visual weight of elements.' } },
  }),

  L({
    id: 'gen-k-counting', country: 'GLOBAL', level: 'kindergarten', subject: 'math', minutes: 7,
    title: { fa: 'شمردن با بدن: عدد تا ۲۰', en: 'Counting with the body: numbers to 20' },
    summary: {
      fa: 'کودک عدد را با حرکت و لمس یاد می‌گیرد، نه با تکرار شفاهی. هر شمارش باید یک شیء و یک حرکت داشته باشد.',
      en: 'Children learn number through movement and touch, not chanting. Every count needs one object and one motion.',
    },
    points: {
      fa: ['«یک‌به‌یک متناظر»: هر انگشت به یک شیء. اگر دو بار یک شیء شمرده شد، همان‌جا اصلاح کن.', 'الگوها را قبل از عدد بشمار: قرمز-آبی-قرمز-آبی.', 'بازی «۵ تا بیشتر»: از ۷ شروع کن و با انگشت پنج تا جلو برو.'],
      en: ['One-to-one correspondence: one finger, one object. Fix double-counting on the spot.', 'Patterns before numerals: red-blue-red-blue.', 'Play “five more”: start at 7 and hop five forward with fingers.'],
    },
    example: { fa: 'دانه‌های لوبیا را در خط بچین؛ با هر دانه یک قدم جلو برو و بلند بشمار. تعداد، تبدیل به مسیر می‌شود.', en: 'Line up beans and take one step per bean while counting aloud — quantity becomes a path.' },
    check: { q: { fa: 'کدام مهارت پایهٔ شمارش است؟', en: 'Which skill is the base of counting?' }, opts: { fa: ['یک‌به‌یک متناظر', 'نوشتن عدد', 'جمع', 'ضرب'], en: ['one-to-one correspondence', 'writing numerals', 'addition', 'multiplication'] }, answer: 0, why: { fa: 'بدون تناظر یک‌به‌یک، عدد فقط یک کلمه است.', en: 'Without one-to-one matching a number is just a word.' } },
  }),
  L({
    id: 'gen-primary-science', country: 'GLOBAL', level: 'primary', subject: 'biology', minutes: 9,
    title: { fa: 'چرخهٔ آب با یک لیوان', en: 'The water cycle in a glass' },
    summary: {
      fa: 'تبخیر، میعان و بارش را می‌توان در ۲۰ دقیقه روی طاقچه دید: آب گرم + پوشش سرد.',
      en: 'Evaporation, condensation and precipitation are visible in twenty minutes on a windowsill: warm water plus a cold lid.',
    },
    points: {
      fa: ['گرما انرژی تبخیر می‌دهد؛ بدون گرما، چرخه می‌ایستد.', 'قطره‌های روی درپوش سرد همان «ابر» است.', 'آب هیچ‌گاه از بین نمی‌رود، فقط جابه‌جا می‌شود.'],
      en: ['Heat supplies the energy to evaporate; without it the cycle stops.', 'Droplets on the cold lid are the cloud.', 'Water is never destroyed, only moved.'],
    },
    example: { fa: 'لیوان آب گرم را با بشقاب سرد بپوشان؛ قطرات زیر بشقاب، بارش مینیاتوری است.', en: 'Cover warm water with a cold plate; the droplets underneath are miniature rain.' },
    check: { q: { fa: 'قطره‌های روی درپوش سرد نشانهٔ چیست؟', en: 'Droplets on a cold lid show…' }, opts: { fa: ['میعان', 'تبخیر', 'انحلال', 'سوختن'], en: ['condensation', 'evaporation', 'dissolving', 'burning'] }, answer: 0, why: { fa: 'بخار آب در تماس با سطح سرد، مایع می‌شود.', en: 'Vapour turns liquid on contact with a cold surface.' } },
  }),
  L({
    id: 'gen-primary-reading', country: 'GLOBAL', level: 'primary', subject: 'language', minutes: 10,
    title: { fa: 'خواندن جفتی: روان‌خوانی بدون فشار', en: 'Paired reading: fluency without pressure' },
    summary: {
      fa: 'خواندن هم‌زمان کودک و بزرگ‌تر، خطاها را بی‌آنکه کودک خجالت بکشد کم می‌کند؛ بعد نوبتی ادامه بدهید.',
      en: 'Reading aloud together cuts errors without embarrassment; then alternate turns.',
    },
    points: { fa: ['۵ دقیقه با هم، ۵ دقیقه نوبتی.', 'خطا را وسط خواندن اصلاح نکن؛ همان جمله را بعداً تکرار کن.', 'برای هر صفحه یک پرسش «چرا» بپرس.'], en: ['Five minutes together, five minutes taking turns.', 'Do not correct mid-sentence; revisit the sentence after.', 'Ask one “why” question per page.'] },
    example: { fa: 'جمله‌ای که سخت بود را با هم بخوانید، بعد کودک تنها — بدون امتیاز و بدون عجله.', en: 'Read the hard sentence together, then the child alone — no scoring, no rush.' },
    check: { q: { fa: 'بهترین واکنش به خطای خواندن؟', en: 'Best response to a reading error?' }, opts: { fa: ['اصلاح فوری', 'تکرار همان جمله بعد از پایان', 'ندیده گرفتن کامل', 'توقف درس'], en: ['immediate correction', 'repeat the sentence afterwards', 'ignore it forever', 'stop the lesson'] }, answer: 1, why: { fa: 'تکرار بعدی، روانی را حفظ و خطا را اصلاح می‌کند.', en: 'Later repetition keeps fluency and fixes the error.' } },
  }),
  L({
    id: 'gen-primary-multiply', country: 'GLOBAL', level: 'primary', subject: 'math', minutes: 9,
    title: { fa: 'ضرب یعنی آرایه، نه حفظ', en: 'Multiplication is an array, not a chant' },
    summary: {
      fa: '۳×۴ یعنی سه ردیف چهارتایی. وقتی کودک آرایه را ببیند، جدول ضرب دیگر حفظی نیست.',
      en: '3 × 4 means three rows of four. Once the child sees the array, tables stop being memorisation.',
    },
    points: { fa: ['جابه‌جایی: ۳×۴ همان ۴×۳ است — آرایه را بچرخان.', 'ضرب در ۱۰ یعنی یک صفر اضافه.', 'ضرب در ۵ یعنی نصفِ ضرب در ۱۰.'],
      en: ['Commutativity: 3 × 4 = 4 × 3 — rotate the array.', 'Times ten appends a zero.', 'Times five is half of times ten.'] },
    example: { fa: '۶×۷: آرایهٔ ۶ در ۷ بساز؛ یا ۶×۷ = ۶×۵ + ۶×۲ = ۳۰ + ۱۲ = ۴۲.', en: '6 × 7: build a 6-by-7 array, or 6×5 + 6×2 = 30 + 12 = 42.' },
    check: { q: { fa: '۷×۸ چند است؟', en: 'What is 7 × 8?' }, opts: { fa: ['۵۶', '۴۸', '۶۴', '۵۴'], en: ['56', '48', '64', '54'] }, answer: 0, why: { fa: '۷×۸ = ۷×۱۰ − ۷×۲ = ۷۰ − ۱۴ = ۵۶.', en: '7×8 = 7×10 − 7×2 = 70 − 14 = 56.' } },
  }),
  L({
    id: 'gen-middle-chem-atom', country: 'GLOBAL', level: 'middle', subject: 'chemistry', minutes: 12,
    title: { fa: 'اتم، عنصر، جدول تناوبی', en: 'Atoms, elements and the periodic table' },
    summary: {
      fa: 'جدول تناوبی نقشهٔ رفتار ماده است: ستون = ویژگی شیمیایی، سطر = تعداد لایه.',
      en: 'The periodic table is a behaviour map: column gives chemistry, row gives shell count.',
    },
    points: { fa: ['شمارهٔ اتمی = تعداد پروتون، و هویت عنصر.', 'الکترون لایهٔ آخر رفتار واکنش را تعیین می‌کند.', 'فلزها الکترون می‌دهند، نافلزها می‌گیرند.'],
      en: ['Atomic number = protons, and that is the element’s identity.', 'Outer-shell electrons decide reactivity.', 'Metals lose electrons, non-metals gain them.'] },
    example: { fa: 'سدیم (۱ الکترون لایهٔ آخر) + کلر (۷ الکترون) → NaCl با پیوند یونی.', en: 'Sodium (1 outer electron) plus chlorine (7) gives ionic NaCl.' },
    check: { q: { fa: 'هویت یک عنصر با چه چیزی تعیین می‌شود؟', en: 'An element’s identity is set by…' }, opts: { fa: ['تعداد پروتون', 'تعداد نوترون', 'جرم', 'تعداد لایه'], en: ['proton count', 'neutron count', 'mass', 'shell count'] }, answer: 0, why: { fa: 'تغییر پروتون، عنصر را تغییر می‌دهد؛ نوترون فقط ایزوتوپ می‌سازد.', en: 'Changing protons changes the element; neutrons only make isotopes.' } },
  }),
  L({
    id: 'gen-middle-geo-maps', country: 'GLOBAL', level: 'middle', subject: 'geography', minutes: 11,
    title: { fa: 'مقیاس نقشه: از کاغذ به واقعیت', en: 'Map scale: paper to terrain' },
    summary: {
      fa: 'مقیاس نسبت است، نه فاصله: ۱:۵۰۰۰۰ یعنی هر ۱ سانتی‌متر، نیم کیلومتر واقعی.',
      en: 'Scale is a ratio, not a distance: 1:50,000 means one centimetre is half a kilometre.',
    },
    points: { fa: ['مقیاس بزرگ = جزئیات بیشتر و مساحت کمتر.', 'برای مساحت، نسبت را به توان دو برسان.', 'شمال نقشه را با قطب‌نما بررسی کن، نه با فرض.'],
      en: ['Large scale = more detail over less area.', 'For area, square the ratio.', 'Check north with a compass, never assume it.'] },
    example: { fa: 'فاصلهٔ ۴ سانتی‌متر روی نقشهٔ ۱:۵۰۰۰۰ می‌شود ۲ کیلومتر واقعی.', en: 'Four centimetres on a 1:50,000 map is two real kilometres.' },
    check: { q: { fa: 'روی نقشهٔ ۱:۲۵۰۰۰، ۴ سانتی‌متر چند متر است؟', en: 'On a 1:25,000 map, 4 cm equals how many metres?' }, opts: { fa: ['۱۰۰۰ متر', '۲۵۰ متر', '۱۰۰ متر', '۲۵۰۰ متر'], en: ['1000 m', '250 m', '100 m', '2500 m'] }, answer: 0, why: { fa: '۴ × ۲۵۰۰۰ = ۱۰۰٬۰۰۰ سانتی‌متر = ۱۰۰۰ متر.', en: '4 × 25,000 = 100,000 cm = 1000 m.' } },
  }),
  L({
    id: 'gen-middle-english-tenses', country: 'GLOBAL', level: 'middle', subject: 'english', minutes: 12,
    title: { fa: 'زمان‌ها با یک خط زمان', en: 'Tenses on one timeline' },
    summary: {
      fa: 'جای زمان‌ها را روی یک خط بگذار: گذشتهٔ ساده (نقطه)، حال کامل (پل تا حال)، حال استمراری (پنجرهٔ باز).',
      en: 'Place tenses on one line: past simple (a point), present perfect (a bridge to now), present continuous (an open window).',
    },
    points: { fa: ['since = نقطهٔ شروع، for = مدت.', 'already / yet / just نشانگر حال کامل‌اند.', 'گذشتهٔ ساده با زمان مشخص می‌آید (yesterday, in 2019).'],
      en: ['Since marks a start point; for marks duration.', 'Already / yet / just signal the perfect.', 'Past simple takes a finished time (yesterday, in 2019).'] },
    example: { fa: '«I have lived here for three years» (ادامه دارد) در برابر «I lived there in 2019» (تمام‌شده).', en: '“I have lived here for three years” (ongoing) versus “I lived there in 2019” (finished).' },
    check: { q: { fa: 'کدام جمله درست است؟', en: 'Which sentence is correct?' }, opts: { en: ['I have seen him yesterday.', 'I saw him yesterday.', 'I have saw him yesterday.', 'I see him yesterday.'], fa: ['I have seen him yesterday.', 'I saw him yesterday.', 'I have saw him yesterday.', 'I see him yesterday.'] }, answer: 1, why: { en: 'A finished past time takes the past simple.', fa: 'زمان گذشتهٔ مشخص، گذشتهٔ ساده می‌خواهد.' } },
  }),
  L({
    id: 'gen-high-econ-curves', country: 'GLOBAL', level: 'high', subject: 'economics', minutes: 14,
    title: { fa: 'عرضه، تقاضا و نقطهٔ تعادل', en: 'Supply, demand and equilibrium' },
    summary: {
      fa: 'قیمت جایی می‌ایستد که مقدار عرضه‌شده با مقدار تقاضاشده برابر شود؛ هر شوک، یکی از دو منحنی را جابه‌جا می‌کند.',
      en: 'Price settles where quantity supplied meets quantity demanded; shocks shift one curve.',
    },
    points: { fa: ['حرکت روی منحنی = تغییر قیمت؛ جابه‌جایی منحنی = تغییر عوامل دیگر.', 'کشش قیمتی نشان می‌دهد مصرف‌کننده چقدر حساس است.', 'سقف قیمت زیر تعادل، کمبود می‌سازد.'],
      en: ['Movement along a curve follows price; shifting the curve needs another factor.', 'Elasticity measures consumer sensitivity.', 'A price ceiling below equilibrium creates shortage.'] },
    example: { fa: 'افزایش مالیات بر تولید، عرضه را به چپ می‌برد: قیمت بالاتر، مقدار کمتر.', en: 'A production tax shifts supply left: higher price, lower quantity.' },
    check: { q: { fa: 'سقف قیمت زیر قیمت تعادل چه نتیجه‌ای دارد؟', en: 'A price ceiling below equilibrium produces…' }, opts: { fa: ['کمبود', 'مازاد', 'تعادل', 'تورم صفر'], en: ['shortage', 'surplus', 'equilibrium', 'zero inflation'] }, answer: 0, why: { fa: 'تقاضا بیشتر از عرضه می‌شود، پس صف و کمبود می‌آید.', en: 'Demand exceeds supply, so queues and shortage appear.' } },
  }),
  L({
    id: 'gen-uni-stats', country: 'GLOBAL', level: 'university', subject: 'math', minutes: 16,
    title: { fa: 'p-value و معناداری آماری', en: 'p-values and statistical significance' },
    summary: {
      fa: 'p-value احتمال دیدن دادهٔ به‌این‌شدی افراطی است، اگر فرض صفر درست باشد؛ اندازهٔ اثر را نمی‌سنجد.',
      en: 'A p-value is the chance of data this extreme if the null is true; it is not an effect size.',
    },
    points: { fa: ['p کوچک = ناسازگاری با فرض صفر، نه اثبات فرضیه.', 'نمونهٔ بزرگ، تفاوت‌های بی‌اهمیت را معنادار می‌کند.', 'همیشه فاصلهٔ اطمینان و اندازهٔ اثر را گزارش کن.'],
      en: ['A small p means incompatibility with the null, not proof.', 'Big samples make trivial differences significant.', 'Always report confidence intervals and effect size.'] },
    example: { fa: 'p = 0.03 با نمونهٔ ۵۰٬۰۰۰ نفر ممکن است یعنی ۰٫۲٪ بهبود — معنادار اما بی‌اهمیت.', en: 'p = 0.03 with 50,000 people may mean a 0.2% improvement — significant but trivial.' },
    check: { q: { fa: 'p-value چه چیزی را نشان می‌دهد؟', en: 'What does a p-value express?' }, opts: { fa: ['احتمال داده به‌شرط فرض صفر', 'احتمال درست بودن فرضیه', 'اندازهٔ اثر', 'قدرت آزمون'], en: ['P(data | null)', 'P(hypothesis is true)', 'effect size', 'test power'] }, answer: 0, why: { fa: 'تعریف دقیق، احتمال شرطی داده است نه فرضیه.', en: 'It is a conditional probability of the data, not of the hypothesis.' } },
  }),
  L({
    id: 'gen-uni-literature', country: 'GLOBAL', level: 'university', subject: 'literature', minutes: 15,
    title: { fa: 'خوانش نزدیک: پنج پرسش', en: 'Close reading: five questions' },
    summary: {
      fa: 'خوانش نزدیک با پنج پرسش شروع می‌شود: چه کسی می‌گوید، به چه ترتیبی، چه چیزی حذف شده، چه واژه‌ای تکرار شده، و چرا این‌جا؟',
      en: 'Close reading starts with five questions: who speaks, in what order, what is omitted, what repeats, and why here?',
    },
    points: { fa: ['تکرار واژه، نشانهٔ فشار معنایی است.', 'سکوت و حذف هم ساختار دارند.', 'تفسیر را با نقل قول مستقیم پشتیبانی کن.'],
      en: ['Repetition marks semantic pressure.', 'Silence and omission are structured too.', 'Support interpretation with direct quotation.'] },
    example: { fa: 'اگر در یک پاراگراف سه بار «دست» تکرار شود، احتمالاً بدن و قدرت موضوع است.', en: 'If “hand” appears three times in a paragraph, body and power are likely at stake.' },
    check: { q: { fa: 'کدام شاهد در تفسیر پذیرفته‌تر است؟', en: 'Which evidence is most acceptable in interpretation?' }, opts: { fa: ['نقل قول مستقیم از متن', 'حس شخصی', 'زندگینامهٔ نویسنده', 'نظر دوستان'], en: ['a direct quotation', 'personal feeling', 'author biography', 'friends’ opinions'] }, answer: 0, why: { fa: 'استدلال ادبی باید به متن بازگردد.', en: 'Literary argument must return to the text.' } },
  }),
  L({
    id: 'gen-life-spreadsheet', country: 'GLOBAL', level: 'lifelong', subject: 'cs', minutes: 13,
    title: { fa: 'از صفحه‌گسترده تا نخستین اسکریپت', en: 'From spreadsheet to your first script' },
    summary: {
      fa: 'هر کاری که در اکسل تکرار می‌کنی، یک اسکریپت کوچک می‌تواند انجام دهد؛ مسیر یادگیری از همان فایل آشنا شروع می‌شود.',
      en: 'Anything you repeat in a spreadsheet can become a small script; start from the file you already know.',
    },
    points: { fa: ['اول ستون‌ها را نام‌گذاری کن؛ دادهٔ تمیز، نیمی از کار است.', 'یک وظیفه را خودکار کن، نه ده تا.', 'خروجی را با یک چک دستی مقایسه کن.'],
      en: ['Name columns first; clean data is half the work.', 'Automate one task, not ten.', 'Compare the output with a manual check.'] },
    example: { fa: 'فایل فروش ماهانه → جمع ستون مبلغ → ذخیرهٔ گزارش در پوشهٔ خروجی، با ۲۰ خط پایتون.', en: 'Monthly sales file → sum the amount column → write a report file, in twenty lines of Python.' },
    check: { q: { fa: 'بهترین اولین قدم برای خودکارسازی؟', en: 'Best first step for automation?' }, opts: { fa: ['انتخاب زبان جدید', 'انتخاب یک وظیفهٔ تکراری مشخص', 'خرید دورهٔ بلند', 'نوشتن ده اسکریپت'], en: ['pick a new language', 'pick one clear repeated task', 'buy a long course', 'write ten scripts'] }, answer: 1, why: { fa: 'یک وظیفهٔ مشخص، انگیزه و بازخورد فوری می‌دهد.', en: 'One concrete task gives motivation and immediate feedback.' } },
  }),
];

export const LESSON_BY_ID = Object.fromEntries(LESSONS.map((l) => [l.id, l]));

export const TIPS = [
  { fa: 'پیش از حفظ کردن، بفهم: یک مفهوم فهمیده‌شده، سه برابر دیرتر فراموش می‌شود.', en: 'Understand before memorising: a understood concept decays three times slower.' },
  { fa: '۲۵ دقیقه تمرکز + ۵ دقیقه استراحت، از دو ساعت پراکنده بهتر است.', en: '25 focused minutes plus a 5-minute break beats two scattered hours.' },
  { fa: 'اشتباه‌هایت را در یک دفتر جدا بنویس؛ همان‌ها نمرهٔ آزمون بعدی‌اند.', en: 'Keep a separate error notebook; those pages are your next exam marks.' },
  { fa: 'به کسی درس بده؛ تدریس، عمیق‌ترین شکل بازیابی است.', en: 'Teach someone else — explanation is the deepest form of recall.' },
  { fa: 'خواب کمتر از ۷ ساعت، حافظهٔ امروز را فردا پاک می‌کند.', en: 'Under seven hours of sleep erases today’s memory by tomorrow.' },
  { fa: 'در مطالعهٔ متن، اول سؤال‌ها را بخوان؛ مغز شکارچی می‌شود.', en: 'Read the questions first when studying a text; the brain turns hunter.' },
  { fa: 'یک درس را در سه روز مختلف مرور کن، نه سه بار در یک روز.', en: 'Review a lesson on three different days, not three times in one day.' },
];
