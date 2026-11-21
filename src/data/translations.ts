import type { Language } from '../types';

export interface UIStrings {
  appTitle: string;
  appSubtitle: string;
  navWonders: string;
  navStories: string;
  navTilawat: string;
  navSaved: string;
  langEnglish: string;
  langUrdu: string;
  langArabic: string;
  toggleDark: string;
  toggleLight: string;
  heroTitle: string;
  heroLead: string;
  dailyWonderLabel: string;
  exploreSurahsCta: string;
  searchWondersPlaceholder: string;
  searchStoriesPlaceholder: string;
  searchSurahsPlaceholder: string;
  filterAll: string;
  filterDaily: string;
  filterNature: string;
  filterLanguage: string;
  storyFilterAll: string;
  storyFilterProphets: string;
  storyFilterSigns: string;
  storyFilterFaith: string;
  bookmarkSave: string;
  bookmarkSaved: string;
  shareCard: string;
  shareModalTitle: string;
  copyText: string;
  copiedText: string;
  downloadImage: string;
  closeModal: string;
  surahLabel: string;
  verseLabel: string;
  versesCountLabel: string;
  meccan: string;
  medinan: string;
  all114Surahs: string;
  revelationFilterAll: string;
  backToSurahs: string;
  arabicFontSize: string;
  urduTranslationToggle: string;
  urduTranslationSublabel: string;
  englishTranslationToggle: string;
  bismillah: string;
  loadingVerses: string;
  versesFallbackNotice: string;
  retryLoad: string;
  playAudio: string;
  pauseAudio: string;
  previousSurah: string;
  nextSurah: string;
  repeatOn: string;
  repeatOff: string;
  reciterLabel: string;
  audioErrorTitle: string;
  audioErrorMessage: string;
  retryAudio: string;
  switchReciter: string;
  savedTitle: string;
  savedEmptyTitle: string;
  savedEmptyDesc: string;
  savedWondersHeading: string;
  savedStoriesHeading: string;
  storiesHeroTitle: string;
  storiesHeroLead: string;
  reflectionLabel: string;
  progressTitle: string;
  progressUnread: string;
  progressInProgress: string;
  progressCompleted: string;
  progressCompletedCount: string;
  progressInProgressCount: string;
  progressFilterAll: string;
  markLastAyah: string;
  lastReadAyahLabel: string;
  noResultsTitle: string;
  noResultsDesc: string;
  footerNote: string;
  readMore: string;
  readLess: string;
  deeperContextLabel: string;
  openSurahLink: string;
  chartViewByRange: string;
  chartViewByRevelation: string;
  progressRemaining: string;
  progressTotalChapters: string;
  prayerTimesTitle: string;
  prayerFajr: string;
  prayerDhuhr: string;
  prayerAsr: string;
  prayerMaghrib: string;
  prayerIsha: string;
  prayerNextLabel: string;
  prayerDetectLocation: string;
  prayerChangeCity: string;
  prayerCityPlaceholder: string;
  prayerCountryPlaceholder: string;
  prayerApplyCity: string;
  prayerCancel: string;
  prayerLoading: string;
  prayerError: string;
  prayerRetry: string;
  prayerLocationDenied: string;
  wordPairsTitle: string;
  wordPairsSubtitle: string;
  wordPairsSearchPlaceholder: string;
  colWordOne: string;
  colWordOpposite: string;
  colOccurrences: string;
  colAyahRefs: string;
  colCorrelation: string;
  timesEachSuffix: string;
  offlineNotice: string;
}

export const UI_STRINGS: Record<Language, UIStrings> = {
  en: {
    appTitle: 'Quran Wonders & Tilawat',
    appSubtitle: 'Contemplation, Sacred Narratives & Complete Recitation',
    navWonders: 'Wonders',
    navStories: 'Stories',
    navTilawat: 'Tilawat',
    navSaved: 'Saved',
    langEnglish: 'English',
    langUrdu: 'اردو',
    langArabic: 'العربية',
    toggleDark: 'Switch to dark mode',
    toggleLight: 'Switch to light mode',
    heroTitle: 'Signs in the Horizons and Within',
    heroLead:
      'Discover timeless Quranic wonders, prophetic narratives, and listen to the complete recitation of all 114 Surahs with clarity and reverence.',
    dailyWonderLabel: 'Daily Wonder Spotlight',
    exploreSurahsCta: 'Listen to 114 Surahs',
    searchWondersPlaceholder: 'Search wonders by topic, Surah, or verse...',
    searchStoriesPlaceholder: 'Search Quranic stories or prophets...',
    searchSurahsPlaceholder: 'Search all 114 Surahs by name or number...',
    filterAll: 'All Wonders',
    filterDaily: 'Daily Wonder',
    filterNature: 'Nature & Science',
    filterLanguage: 'Language & Balance',
    storyFilterAll: 'All Narratives',
    storyFilterProphets: 'Prophets',
    storyFilterSigns: 'Historical Signs',
    storyFilterFaith: 'Steadfast Faith',
    bookmarkSave: 'Save',
    bookmarkSaved: 'Saved',
    shareCard: 'Share Card',
    shareModalTitle: 'Share Quranic Reflection',
    copyText: 'Copy Text',
    copiedText: 'Copied to clipboard',
    downloadImage: 'Download Card PNG',
    closeModal: 'Close',
    surahLabel: 'Surah',
    verseLabel: 'Verse',
    versesCountLabel: 'Ayahs',
    meccan: 'Meccan',
    medinan: 'Medinan',
    all114Surahs: 'All 114 Surahs',
    revelationFilterAll: 'All',
    backToSurahs: 'All 114 Surahs',
    arabicFontSize: 'Arabic Size',
    urduTranslationToggle: 'Urdu Translation',
    urduTranslationSublabel: 'Kanz-ul-Iman / Kanz-ul-Irfan Style',
    englishTranslationToggle: 'English Translation',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    loadingVerses: 'Loading Surah verses...',
    versesFallbackNotice:
      'Showing offline summary excerpt. Connect to the internet to load the full Ayah-by-Ayah Uthmani script for this Surah.',
    retryLoad: 'Retry',
    playAudio: 'Play Tilawat',
    pauseAudio: 'Pause Tilawat',
    previousSurah: 'Previous Surah',
    nextSurah: 'Next Surah',
    repeatOn: 'Repeat: On',
    repeatOff: 'Repeat: Off',
    reciterLabel: 'Reciter',
    audioErrorTitle: 'Audio stream unavailable',
    audioErrorMessage:
      'The recitation stream could not be reached right now. Please try another reciter or retry.',
    retryAudio: 'Retry Stream',
    switchReciter: 'Try Next Reciter',
    savedTitle: 'Saved Reflections & Bookmarks',
    savedEmptyTitle: 'No saved reflections yet',
    savedEmptyDesc:
      'Bookmark Quranic wonders or stories as you read to revisit them anytime in your personal collection.',
    savedWondersHeading: 'Saved Quranic Wonders',
    savedStoriesHeading: 'Saved Stories & Events',
    storiesHeroTitle: 'Quranic Stories & Preserved Signs',
    storiesHeroLead:
      'Read authentic accounts from the Noble Quran—narrated with reverence, Arabic verses, and clear reflection across English, Urdu, and Arabic.',
    reflectionLabel: 'Key Reflection',
    progressTitle: 'Reading Progress',
    progressUnread: 'Unread',
    progressInProgress: 'Partially Read',
    progressCompleted: 'Completed',
    progressCompletedCount: 'Completed',
    progressInProgressCount: 'In Progress',
    progressFilterAll: 'All Progress',
    markLastAyah: 'Mark as last read ayah',
    lastReadAyahLabel: 'Paused at Ayah',
    noResultsTitle: 'No matching entries found',
    noResultsDesc: 'Try adjusting your search query or selecting another filter.',
    footerNote: 'Quran Wonders & Tilawat · Presented with reverence and clarity',
    readMore: 'Read More',
    readLess: 'Show Less',
    deeperContextLabel: 'Deeper Context & Reflection',
    openSurahLink: 'Read full Surah in Tilawat',
    chartViewByRange: 'By Surah Range',
    chartViewByRevelation: 'Completed vs. Total',
    progressRemaining: 'Remaining',
    progressTotalChapters: 'Total Surahs',
    prayerTimesTitle: 'Daily Prayer Times',
    prayerFajr: 'Fajr',
    prayerDhuhr: 'Dhuhr',
    prayerAsr: 'Asr',
    prayerMaghrib: 'Maghrib',
    prayerIsha: 'Isha',
    prayerNextLabel: 'Next',
    prayerDetectLocation: 'Use My Location',
    prayerChangeCity: 'Change City',
    prayerCityPlaceholder: 'City (e.g. Lahore)',
    prayerCountryPlaceholder: 'Country (e.g. Pakistan)',
    prayerApplyCity: 'Update',
    prayerCancel: 'Cancel',
    prayerLoading: 'Fetching prayer times...',
    prayerError: 'Unable to load prayer times right now. Please check your connection or city name.',
    prayerRetry: 'Retry',
    prayerLocationDenied: 'Location access was unavailable. Showing city prayer times instead.',
    wordPairsTitle: 'Opposite Words with Equal Counts & Ayah Correlations',
    wordPairsSubtitle:
      'Lexical pairs of contrasting meanings occurring the exact same number of times in the Noble Quran, alongside their paired Ayah and Surah references.',
    wordPairsSearchPlaceholder: 'Filter pairs by word, number, or Ayah...',
    colWordOne: 'Word',
    colWordOpposite: 'Opposite Word',
    colOccurrences: 'Equal Count',
    colAyahRefs: 'Correlated Ayahs',
    colCorrelation: 'Ayah & Structural Correlation',
    timesEachSuffix: 'each',
    offlineNotice: 'Offline mode — Wonders, Stories & cached Surahs remain available.',
  },
  ur: {
    appTitle: 'عجائباتِ قرآن و تلاوت',
    appSubtitle: 'تدبرِ قرآن، قرآنی واقعات اور مکمل تلاوتِ کلامِ پاک',
    navWonders: 'عجائبات',
    navStories: 'واقعات',
    navTilawat: 'تلاوت',
    navSaved: 'محفوظ',
    langEnglish: 'English',
    langUrdu: 'اردو',
    langArabic: 'العربية',
    toggleDark: 'تاریک موڈ آن کریں',
    toggleLight: 'روشن موڈ آن کریں',
    heroTitle: 'آفاق و انفس میں اللہ کی نشانیاں',
    heroLead:
      'قرآن مجید کے حیرت انگیز حقائق، انبیاء کرام کے واقعات اور تمام ۱۱۴ سورتوں کی پرسکون تلاوت مع اردو ترجمہ سماعت و مطالعہ کریں۔',
    dailyWonderLabel: 'آج کا قرآنی عجوبہ',
    exploreSurahsCta: '۱۱۴ سورتوں کی تلاوت سنیں',
    searchWondersPlaceholder: 'موضوع، سورۃ یا آیت کے ذریعے تلاش کریں...',
    searchStoriesPlaceholder: 'قرآنی قصے یا انبیاء کے واقعات تلاش کریں...',
    searchSurahsPlaceholder: 'نام یا نمبر سے ۱۱۴ سورتیں تلاش کریں...',
    filterAll: 'تمام عجائبات',
    filterDaily: 'روزمرہ کا عجوبہ',
    filterNature: 'قدرت و سائنس',
    filterLanguage: 'لسانی توازن',
    storyFilterAll: 'تمام واقعات',
    storyFilterProphets: 'انبیاء کرام',
    storyFilterSigns: 'تاریخی نشانیاں',
    storyFilterFaith: 'استقامتِ ایمان',
    bookmarkSave: 'محفوظ کریں',
    bookmarkSaved: 'محفوظ شدہ',
    shareCard: 'شیئر کارڈ',
    shareModalTitle: 'قرآنی پیغام شیئر کریں',
    copyText: 'متن کاپی کریں',
    copiedText: 'کاپی ہو گیا',
    downloadImage: 'کارڈ تصویر ڈاؤن لوڈ کریں',
    closeModal: 'بند کریں',
    surahLabel: 'سورۃ',
    verseLabel: 'آیت',
    versesCountLabel: 'آیات',
    meccan: 'مکی',
    medinan: 'مدنی',
    all114Surahs: 'تمام ۱۱۴ سورتیں',
    revelationFilterAll: 'تمام',
    backToSurahs: 'تمام سورتوں کی فہرست',
    arabicFontSize: 'عربی خط کا سائز',
    urduTranslationToggle: 'دعوتِ اسلامی اردو ترجمہ',
    urduTranslationSublabel: 'کنز الایمان / کنز العرفان طرز',
    englishTranslationToggle: 'انگریزی ترجمہ',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    loadingVerses: 'سورۃ کی آیات لوڈ ہو رہی ہیں...',
    versesFallbackNotice:
      'آف لائن منتخب آیات دکھائی جا رہی ہیں۔ مکمل آیات لوڈ کرنے کے لیے انٹرنیٹ سے منسلک ہوں۔',
    retryLoad: 'دوبارہ کوشش کریں',
    playAudio: 'تلاوت چلائیں',
    pauseAudio: 'تلاوت روکیں',
    previousSurah: 'پچھلی سورۃ',
    nextSurah: 'اگلی سورۃ',
    repeatOn: 'دہرائیں: آن',
    repeatOff: 'دہرائیں: آف',
    reciterLabel: 'قاری منتخب کریں',
    audioErrorTitle: 'آڈیو دستیاب نہیں',
    audioErrorMessage:
      'اس وقت تلاوت کی آڈیو لوڈ نہیں ہو سکی۔ براہِ کرم دوسرے قاری کا انتخاب کریں یا دوبارہ کوشش کریں۔',
    retryAudio: 'دوبارہ کوشش',
    switchReciter: 'دوسرے قاری آزمائیں',
    savedTitle: 'محفوظ شدہ عجائبات و واقعات',
    savedEmptyTitle: 'ابھی کوئی چیز محفوظ نہیں کی گئی',
    savedEmptyDesc:
      'مطالعہ کے دوران اپنے پسندیدہ قرآنی عجائبات اور واقعات کو محفوظ کریں تاکہ بعد میں آسانی سے پڑھ سکیں۔',
    savedWondersHeading: 'محفوظ قرآنی عجائبات',
    savedStoriesHeading: 'محفوظ قرآنی واقعات',
    storiesHeroTitle: 'قرآنی قصے اور عبرت ناک نشانیاں',
    storiesHeroLead:
      'قرآنِ پاک میں بیان کردہ سچے تاریخی واقعات اور انبیاء کرام کے تذکرے، عربی آیات اور بصیرت افروز وضاحت کے ساتھ۔',
    reflectionLabel: 'اہم سبق و بصیرت',
    progressTitle: 'تلاوت و مطالعہ کی پیش رفت',
    progressUnread: 'غیر خواندہ',
    progressInProgress: 'جزوی پڑھی گئی',
    progressCompleted: 'مکمل',
    progressCompletedCount: 'مکمل شدہ',
    progressInProgressCount: 'جاری',
    progressFilterAll: 'تمام حالتیں',
    markLastAyah: 'آخری پڑھی گئی آیت نشان زد کریں',
    lastReadAyahLabel: 'آخری پڑھی گئی آیت',
    noResultsTitle: 'کوئی نتیجہ نہیں ملا',
    noResultsDesc: 'براہِ کرم تلاش کے الفاظ یا فلٹر تبدیل کر کے دیکھیں۔',
    footerNote: 'عجائباتِ قرآن و تلاوت · احترام اور خلوص کے ساتھ پیش کردہ',
    readMore: 'مزید پڑھیں',
    readLess: 'کم دکھائیں',
    deeperContextLabel: 'تفصیلی وضاحت اور تدبر',
    openSurahLink: 'مکمل سورۃ تلاوت میں پڑھیں',
    chartViewByRange: 'سورتوں کے حصے',
    chartViewByRevelation: 'مکمل بمقابلہ کل',
    progressRemaining: 'باقی',
    progressTotalChapters: 'کل سورتیں',
    prayerTimesTitle: 'اوقاتِ نماز',
    prayerFajr: 'فجر',
    prayerDhuhr: 'ظہر',
    prayerAsr: 'عصر',
    prayerMaghrib: 'مغرب',
    prayerIsha: 'عشاء',
    prayerNextLabel: 'اگلی نماز',
    prayerDetectLocation: 'میرا مقام استعمال کریں',
    prayerChangeCity: 'شہر تبدیل کریں',
    prayerCityPlaceholder: 'شہر (مثلاً لاہور)',
    prayerCountryPlaceholder: 'ملک (مثلاً پاکستان)',
    prayerApplyCity: 'اپ ڈیٹ',
    prayerCancel: 'منسوخ',
    prayerLoading: 'اوقاتِ نماز لوڈ ہو رہے ہیں...',
    prayerError: 'اس وقت اوقاتِ نماز دستیاب نہیں ہو سکے۔ براہِ کرم انٹرنیٹ یا شہر کا نام چیک کریں۔',
    prayerRetry: 'دوبارہ کوشش',
    prayerLocationDenied: 'مقام تک رسائی دستیاب نہیں۔ منتخب شہر کے اوقات دکھائے جا رہے ہیں۔',
    wordPairsTitle: 'متضاد الفاظ کا برابر عددی توازن اور آیات سے ربط',
    wordPairsSubtitle:
      'قرآن مجید میں متضاد معنی رکھنے والے الفاظ کے جوڑے جو بالکل برابر تعداد میں آئے ہیں، متعلقہ آیات اور سورتوں کے حوالہ جات کے ساتھ۔',
    wordPairsSearchPlaceholder: 'لفظ، عدد یا آیت نمبر تلاش کریں...',
    colWordOne: 'پہلا لفظ',
    colWordOpposite: 'متضاد لفظ',
    colOccurrences: 'برابر تعداد',
    colAyahRefs: 'متعلقہ آیات',
    colCorrelation: 'آیت اور عددی ربط',
    timesEachSuffix: 'ہر ایک',
    offlineNotice: 'آف لائن موڈ — محفوظ عجائبات، واقعات اور سورتیں دستیاب ہیں۔',
  },
  ar: {
    appTitle: 'عجائب القرآن والتلاوة',
    appSubtitle: 'تدبر الآيات، قصص القرآن، وتلاوة السور كاملةً',
    navWonders: 'العجائب',
    navStories: 'القصص',
    navTilawat: 'التلاوة',
    navSaved: 'المحفوظات',
    langEnglish: 'English',
    langUrdu: 'اردو',
    langArabic: 'العربية',
    toggleDark: 'تفعيل الوضع الداكن',
    toggleLight: 'تفعيل الوضع الفاتح',
    heroTitle: 'سنريهم آياتنا في الآفاق وفي أنفسهم',
    heroLead:
      'تأمل في عجائب القرآن الكريم، وقصص الأنبياء والآيات البينات، واستمع إلى تلاوة جميع السور الـ ١١٤ بخشوع ووضوح.',
    dailyWonderLabel: 'تأمل اليوم القرآني',
    exploreSurahsCta: 'استمع إلى ١١٤ سورة',
    searchWondersPlaceholder: 'ابحث في العجائب باسم السورة أو الموضوع...',
    searchStoriesPlaceholder: 'ابحث في قصص القرآن والأنبياء...',
    searchSurahsPlaceholder: 'ابحث في السور الـ ١١٤ بالاسم أو الرقم...',
    filterAll: 'جميع العجائب',
    filterDaily: 'تأمل يومي',
    filterNature: 'الطبيعة والعلم',
    filterLanguage: 'الإعجاز البياني والتوازن',
    storyFilterAll: 'جميع القصص',
    storyFilterProphets: 'قصص الأنبياء',
    storyFilterSigns: 'الآيات والتاريخ',
    storyFilterFaith: 'ثبات الإيمان',
    bookmarkSave: 'حفظ',
    bookmarkSaved: 'محفوظ',
    shareCard: 'بطاقة مشاركة',
    shareModalTitle: 'مشاركة تأمل قرآني',
    copyText: 'نسخ النص',
    copiedText: 'تم النسخ',
    downloadImage: 'تحميل البطاقة PNG',
    closeModal: 'إغلاق',
    surahLabel: 'سورة',
    verseLabel: 'الآية',
    versesCountLabel: 'آية',
    meccan: 'مكية',
    medinan: 'مدنية',
    all114Surahs: 'جميع السور الـ ١١٤',
    revelationFilterAll: 'الكل',
    backToSurahs: 'العودة إلى قائمة السور',
    arabicFontSize: 'حجم الخط العربي',
    urduTranslationToggle: 'الترجمة الأردية (كنز الإيمان)',
    urduTranslationSublabel: 'أسلوب دعوة إسلامي / كنز العرفان',
    englishTranslationToggle: 'الترجمة الإنجليزية',
    bismillah: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    loadingVerses: 'جارٍ تحميل آيات السورة...',
    versesFallbackNotice:
      'يتم عرض آيات مختارة دون اتصال. اتصل بالإنترنت لعرض السورة كاملةً بالرسم العثماني.',
    retryLoad: 'إعادة المحاولة',
    playAudio: 'تشغيل التلاوة',
    pauseAudio: 'إيقاف مؤقت',
    previousSurah: 'السورة السابقة',
    nextSurah: 'السورة التالية',
    repeatOn: 'التكرار: مفعل',
    repeatOff: 'التكرار: متوقف',
    reciterLabel: 'القارئ',
    audioErrorTitle: 'تعذر تشغيل الصوت',
    audioErrorMessage:
      'تعذر الوصول إلى ملف التلاوة حاليًا. يرجى المحاولة مرة أخرى أو اختيار قارئ آخر.',
    retryAudio: 'إعادة المحاولة',
    switchReciter: 'تجربة قارئ آخر',
    savedTitle: 'التأملات والقصص المحفوظة',
    savedEmptyTitle: 'لا توجد محفوظات بعد',
    savedEmptyDesc:
      'احفظ عجائب القرآن وقصصه أثناء القراءة لتعود إليها في أي وقت.',
    savedWondersHeading: 'العجائب المحفوظة',
    savedStoriesHeading: 'القصص المحفوظة',
    storiesHeroTitle: 'قصص القرآن والآيات البينات',
    storiesHeroLead:
      'اقرأ قصص القرآن الكريم والعبر التاريخية الموثقة بالآيات القرآنية والشرح الميسر بثلاث لغات.',
    reflectionLabel: 'العبرة والتدبر',
    progressTitle: 'تقدم القراءة والتلاوة',
    progressUnread: 'غير مقروءة',
    progressInProgress: 'قراءة جزئية',
    progressCompleted: 'مكتملة',
    progressCompletedCount: 'مكتملة',
    progressInProgressCount: 'قيد القراءة',
    progressFilterAll: 'كل الحالات',
    markLastAyah: 'تحديد كآخر آية مقروءة',
    lastReadAyahLabel: 'توقفت عند الآية',
    noResultsTitle: 'لم يتم العثور على نتائج',
    noResultsDesc: 'يرجى تعديل كلمة البحث أو اختيار تصنيف آخر.',
    footerNote: 'عجائب القرآن والتلاوة · تصميم هادئ لتدبر كلام الله',
    readMore: 'اقرأ المزيد',
    readLess: 'عرض أقل',
    deeperContextLabel: 'تفصيل وتدبر أعمق',
    openSurahLink: 'قراءة السورة كاملة في التلاوة',
    chartViewByRange: 'حسب نطاق السور',
    chartViewByRevelation: 'المكتمل مقابل الإجمالي',
    progressRemaining: 'المتبقي',
    progressTotalChapters: 'إجمالي السور',
    prayerTimesTitle: 'مواقيت الصلاة اليومية',
    prayerFajr: 'الفجر',
    prayerDhuhr: 'الظهر',
    prayerAsr: 'العصر',
    prayerMaghrib: 'المغرب',
    prayerIsha: 'العشاء',
    prayerNextLabel: 'التالية',
    prayerDetectLocation: 'استخدام موقعي',
    prayerChangeCity: 'تغيير المدينة',
    prayerCityPlaceholder: 'المدينة (مثلاً الرياض)',
    prayerCountryPlaceholder: 'الدولة (مثلاً السعودية)',
    prayerApplyCity: 'تحديث',
    prayerCancel: 'إلغاء',
    prayerLoading: 'جارٍ تحميل مواقيت الصلاة...',
    prayerError: 'تعذر تحميل مواقيت الصلاة حالياً. يرجى التحقق من الاتصال أو اسم المدينة.',
    prayerRetry: 'إعادة المحاولة',
    prayerLocationDenied: 'تعذر الوصول للموقع الجغرافي، يتم عرض مواقيت المدينة المختارة.',
    wordPairsTitle: 'الكلمات المتضادة المتساوية في العدد وارتباطها بالآيات',
    wordPairsSubtitle:
      'جدول يوضح أزواج الألفاظ المتقابلة في المعنى التي تكررت بالعدد نفسه في القرآن الكريم مع شواهدها من أرقام الآيات والسور.',
    wordPairsSearchPlaceholder: 'ابحث بالكلمة أو العدد أو رقم الآية...',
    colWordOne: 'الكلمة',
    colWordOpposite: 'المقابل المضاد',
    colOccurrences: 'التكرار المتساوي',
    colAyahRefs: 'شواهد الآيات',
    colCorrelation: 'الارتباط بالآيات والسور',
    timesEachSuffix: 'لكلٍّ منهما',
    offlineNotice: 'وضع عدم الاتصال — العجائب والقصص والسور المحفوظة متاحة للقراءة.',
  },
};
