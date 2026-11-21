import type { OppositeWordPair } from '../types';

export const OPPOSITE_WORD_PAIRS: OppositeWordPair[] = [
  {
    id: 'pair-dunya-akhirah',
    wordArabic: 'الدُّنْيَا',
    wordLabel: {
      en: 'This World (Ad-Dunya)',
      ur: 'دنیا',
      ar: 'الحياة الدنيا',
    },
    oppositeArabic: 'الْآخِرَة',
    oppositeLabel: {
      en: 'The Hereafter (Al-Akhirah)',
      ur: 'آخرت',
      ar: 'الآخرة',
    },
    equalCount: 115,
    ayahRefs: [
      { surahNumber: 2, ref: '2:201' },
      { surahNumber: 3, ref: '3:145' },
      { surahNumber: 28, ref: '28:77' },
    ],
    correlationNote: {
      en: 'Both appear 115 times each across the Quran; paired directly in balanced supplications such as 2:201 and 28:77.',
      ur: 'دونوں الفاظ قرآن میں ۱۱۵، ۱۱۵ مرتبہ آئے ہیں؛ آیت ۲:۲۰۱ اور ۲۸:۷۷ میں دونوں کا حسین توازن کے ساتھ ایک ساتھ ذکر ہے۔',
      ar: 'تكرر كلٌّ منهما ١١٥ مرة بالضبط؛ واجتمعا معاً في آيات جامعة للدعاء والتوازن مثل (٢:٢٠١) و(٢٨:٧٧).',
    },
  },
  {
    id: 'pair-malaikah-shayatin',
    wordArabic: 'الْمَلَائِكَة',
    wordLabel: {
      en: 'Angels (Al-Mala’ikah)',
      ur: 'فرشتے (الملائکہ)',
      ar: 'الملائكة',
    },
    oppositeArabic: 'الشَّيَاطِين',
    oppositeLabel: {
      en: 'Devils (Ash-Shayatin)',
      ur: 'شیاطین',
      ar: 'الشياطين',
    },
    equalCount: 88,
    ayahRefs: [
      { surahNumber: 2, ref: '2:102' },
      { surahNumber: 2, ref: '2:34' },
      { surahNumber: 88, ref: '88:1–16' },
    ],
    correlationNote: {
      en: '88 occurrences each; contrasted directly in 2:102, while Surah 88 (Al-Ghashiyah) contrasts the two ultimate destinies.',
      ur: '۸۸، ۸۸ مرتبہ ذکر؛ آیت ۲:۱۰۲ میں دونوں کا تقابل ہے اور سورۃ نمبر ۸۸ (الغاشیہ) میں بھی دو متضاد انجام بیان ہوئے ہیں۔',
      ar: 'ورد كل منهما ٨٨ مرة؛ وتقابلا في الآية (٢:١٠٢)، كما يوافق العدد ٨٨ ترتيب سورة الغاشية التي تقابل بين وجوه الفريقين.',
    },
  },
  {
    id: 'pair-hayat-mawt',
    wordArabic: 'الْحَيَاة',
    wordLabel: {
      en: 'Life (Al-Hayat)',
      ur: 'حیات (زندگی)',
      ar: 'الحياة',
    },
    oppositeArabic: 'الْمَوْت',
    oppositeLabel: {
      en: 'Death (Al-Mawt)',
      ur: 'موت',
      ar: 'الموت',
    },
    equalCount: 145,
    ayahRefs: [
      { surahNumber: 67, ref: '67:2' },
      { surahNumber: 2, ref: '2:28' },
      { surahNumber: 45, ref: '45:26' },
    ],
    correlationNote: {
      en: '145 occurrences each across their Quranic forms; united directly in 67:2 ("Who created death and life") and 2:28.',
      ur: '۱۴۵، ۱۴۵ مرتبہ؛ سورۃ الملک ۶۷:۲ («جس نے موت اور زندگی کو پیدا کیا») اور ۲:۲۸ میں دونوں ساتھ بیان ہوئے ہیں۔',
      ar: '١٤٥ مرة لكلٍّ منهما بمشتقاتهما؛ واجتمعا معاً في (٦٧:٢) «الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ» وفي (٢:٢٨).',
    },
  },
  {
    id: 'pair-nafa-fasad',
    wordArabic: 'النَّفْع',
    wordLabel: {
      en: 'Benefit (An-Naf‘)',
      ur: 'نفع (فائدہ)',
      ar: 'النفع',
    },
    oppositeArabic: 'الْفَسَاد',
    oppositeLabel: {
      en: 'Corruption (Al-Fasad)',
      ur: 'فساد (خرابی)',
      ar: 'الفساد',
    },
    equalCount: 50,
    ayahRefs: [
      { surahNumber: 2, ref: '2:102' },
      { surahNumber: 28, ref: '28:77' },
      { surahNumber: 30, ref: '30:41' },
    ],
    correlationNote: {
      en: '50 occurrences each; 28:77 pairs seeking the Hereafter with avoiding Fasad, and 30:41 links Fasad to accountability.',
      ur: '۵۰، ۵۰ مرتبہ؛ ۲۸:۷۷ میں بھلائی کی جستجو اور فساد سے ممانعت، جبکہ ۳۰:۴۱ میں خشکی و تری میں فساد کے نتائج بیان ہیں۔',
      ar: '٥٠ مرة لكلٍّ منهما؛ وتقابل الآية (٢٨:٧٧) الإحسان بالنهي عن الفساد، كما تربط (٣٠:٤١) الفساد بعاقبة الأعمال.',
    },
  },
  {
    id: 'pair-iman-kufr',
    wordArabic: 'الْإِيمَان',
    wordLabel: {
      en: 'Faith (Al-Iman)',
      ur: 'ایمان',
      ar: 'الإيمان',
    },
    oppositeArabic: 'الْكُفْر',
    oppositeLabel: {
      en: 'Disbelief (Al-Kufr)',
      ur: 'کفر',
      ar: 'الكفر',
    },
    equalCount: 17,
    ayahRefs: [
      { surahNumber: 49, ref: '49:7' },
      { surahNumber: 3, ref: '3:167' },
      { surahNumber: 17, ref: '17:9' },
    ],
    correlationNote: {
      en: 'The definite nouns Al-Iman and Al-Kufr appear 17 times each; contrasted directly in 49:7 and echoed by Surah 17 (Al-Isra).',
      ur: 'الفاظِ «الْإِيمَان» اور «الْكُفْر» ۱۷، ۱۷ مرتبہ آئے ہیں؛ ۴۹:۷ میں ان کا براہِ راست تقابل ہے اور ۱۷ویں سورۃ (الاسراء) رہنمائی بیان کرتی ہے۔',
      ar: 'ورد لفظا «الْإِيمَان» و«الْكُفْر» المعرفان ١٧ مرة لكلٍّ منهما؛ وتقابلا صراحةً في (٤٩:٧)، ويوافق العدد ١٧ سورة الإسراء.',
    },
  },
  {
    id: 'pair-rajul-marah',
    wordArabic: 'الرَّجُل',
    wordLabel: {
      en: 'Man (Ar-Rajul)',
      ur: 'مرد (الرجل)',
      ar: 'الرجل',
    },
    oppositeArabic: 'الْمَرْأَة',
    oppositeLabel: {
      en: 'Woman (Al-Mar’ah)',
      ur: 'عورت (المرأۃ)',
      ar: 'المرأة',
    },
    equalCount: 24,
    ayahRefs: [
      { surahNumber: 24, ref: '24:26' },
      { surahNumber: 4, ref: '4:12' },
      { surahNumber: 4, ref: '4:128' },
    ],
    correlationNote: {
      en: '24 singular occurrences each—matching Surah 24 (An-Nur), which establishes equal moral honor and modesty for men and women.',
      ur: '۲۴، ۲۴ مرتبہ (واحد صیغے)؛ یہ عدد سورۃ نمبر ۲۴ (النور) سے مطابقت رکھتا ہے جو مرد و عورت کے اخلاقی وقار کو بیان کرتی ہے۔',
      ar: '٢٤ مرة لكلٍّ منهما بصيغة المفرد؛ وهو ما يوافق ترتيب سورة النور (٢٤) التي ترسّخ العفة والكرامة للرجال والنساء معاً.',
    },
  },
  {
    id: 'pair-raghbah-rahbah',
    wordArabic: 'الرَّغْبَة',
    wordLabel: {
      en: 'Hope / Longing (Raghbah)',
      ur: 'رغبت (امید)',
      ar: 'الرغبة',
    },
    oppositeArabic: 'الرَّهْبَة',
    oppositeLabel: {
      en: 'Reverential Fear (Rahbah)',
      ur: 'رہبت (خوف)',
      ar: 'الرهبة',
    },
    equalCount: 8,
    ayahRefs: [
      { surahNumber: 21, ref: '21:90' },
      { surahNumber: 7, ref: '7:154' },
      { surahNumber: 28, ref: '28:32' },
    ],
    correlationNote: {
      en: '8 occurrences each; paired together inside 21:90 ("They used to call upon Us in hope and fear") describing sincere prophets.',
      ur: '۸، ۸ مرتبہ؛ آیت ۲۱:۹۰ («وہ امید اور خوف دونوں کے ساتھ ہمیں پکارتے تھے») میں انبیاء کرام کی متوازن کیفیت بیان ہوئی ہے۔',
      ar: '٨ مرات لكلٍّ منهما؛ واجتمعا معاً في وصف الأنبياء في الآية (٢١:٩٠) «يَدْعُونَنَا رَغَبًا وَرَهَبًا».',
    },
  },
  {
    id: 'pair-shita-sayf',
    wordArabic: 'الشِّتَاء',
    wordLabel: {
      en: 'Winter (Ash-Shita’)',
      ur: 'سردی (الشتاء)',
      ar: 'الشتاء',
    },
    oppositeArabic: 'الصَّيْف',
    oppositeLabel: {
      en: 'Summer (As-Sayf)',
      ur: 'گرمی (الصیف)',
      ar: 'الصيف',
    },
    equalCount: 1,
    ayahRefs: [{ surahNumber: 106, ref: '106:2' }],
    correlationNote: {
      en: '1 occurrence each in the entire Quran—appearing side by side inside the single balanced verse 106:2 (Surah Quraysh).',
      ur: 'پورے قرآن میں ۱، ۱ مرتبہ آئے ہیں اور دونوں ایک ہی متوازن آیت ۱۰۶:۲ (سورۃ قریش) میں ایک ساتھ موجود ہیں۔',
      ar: 'ورد كل منهما مرة واحدة فقط في القرآن كله؛ واجتمعا معاً في آية واحدة متوازنة هي (١٠٦:٢) من سورة قريش.',
    },
  },
];
