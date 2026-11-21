import type { AyahItem, ReciterInfo, SurahInfo } from '../types';
import { cacheSurahVerses, getCachedSurahVerses } from '../utils/offlineCache';

export const ALL_SURAHS: SurahInfo[] = [
  { number: 1, nameArabic: 'الفاتحة', nameUrdu: 'سورۃ الفاتحہ', nameEnglish: 'Al-Fatihah', meaningEnglish: 'The Opening', versesCount: 7, revelationType: 'Meccan' },
  { number: 2, nameArabic: 'البقرة', nameUrdu: 'سورۃ البقرہ', nameEnglish: 'Al-Baqarah', meaningEnglish: 'The Cow', versesCount: 286, revelationType: 'Medinan' },
  { number: 3, nameArabic: 'آل عمران', nameUrdu: 'سورۃ آلِ عمران', nameEnglish: 'Ali ‘Imran', meaningEnglish: 'Family of Imran', versesCount: 200, revelationType: 'Medinan' },
  { number: 4, nameArabic: 'النساء', nameUrdu: 'سورۃ النساء', nameEnglish: 'An-Nisa', meaningEnglish: 'The Women', versesCount: 176, revelationType: 'Medinan' },
  { number: 5, nameArabic: 'المائدة', nameUrdu: 'سورۃ المائدہ', nameEnglish: 'Al-Ma’idah', meaningEnglish: 'The Table Spread', versesCount: 120, revelationType: 'Medinan' },
  { number: 6, nameArabic: 'الأنعام', nameUrdu: 'سورۃ الانعام', nameEnglish: 'Al-An‘am', meaningEnglish: 'The Cattle', versesCount: 165, revelationType: 'Meccan' },
  { number: 7, nameArabic: 'الأعراف', nameUrdu: 'سورۃ الاعراف', nameEnglish: 'Al-A‘raf', meaningEnglish: 'The Heights', versesCount: 206, revelationType: 'Meccan' },
  { number: 8, nameArabic: 'الأنفال', nameUrdu: 'سورۃ الانفال', nameEnglish: 'Al-Anfal', meaningEnglish: 'The Spoils of War', versesCount: 75, revelationType: 'Medinan' },
  { number: 9, nameArabic: 'التوبة', nameUrdu: 'سورۃ التوبہ', nameEnglish: 'At-Tawbah', meaningEnglish: 'The Repentance', versesCount: 129, revelationType: 'Medinan' },
  { number: 10, nameArabic: 'يونس', nameUrdu: 'سورۃ یونس', nameEnglish: 'Yunus', meaningEnglish: 'Jonah', versesCount: 109, revelationType: 'Meccan' },
  { number: 11, nameArabic: 'هود', nameUrdu: 'سورۃ ہود', nameEnglish: 'Hud', meaningEnglish: 'Hud', versesCount: 123, revelationType: 'Meccan' },
  { number: 12, nameArabic: 'يوسف', nameUrdu: 'سورۃ یوسف', nameEnglish: 'Yusuf', meaningEnglish: 'Joseph', versesCount: 111, revelationType: 'Meccan' },
  { number: 13, nameArabic: 'الرعد', nameUrdu: 'سورۃ الرعد', nameEnglish: 'Ar-Ra‘d', meaningEnglish: 'The Thunder', versesCount: 43, revelationType: 'Medinan' },
  { number: 14, nameArabic: 'إبراهيم', nameUrdu: 'سورۃ ابراہیم', nameEnglish: 'Ibrahim', meaningEnglish: 'Abraham', versesCount: 52, revelationType: 'Meccan' },
  { number: 15, nameArabic: 'الحجر', nameUrdu: 'سورۃ الحجر', nameEnglish: 'Al-Hijr', meaningEnglish: 'The Rocky Tract', versesCount: 99, revelationType: 'Meccan' },
  { number: 16, nameArabic: 'النحل', nameUrdu: 'سورۃ النحل', nameEnglish: 'An-Nahl', meaningEnglish: 'The Bee', versesCount: 128, revelationType: 'Meccan' },
  { number: 17, nameArabic: 'الإسراء', nameUrdu: 'سورۃ بنی اسرائیل', nameEnglish: 'Al-Isra', meaningEnglish: 'The Night Journey', versesCount: 111, revelationType: 'Meccan' },
  { number: 18, nameArabic: 'الكهف', nameUrdu: 'سورۃ الکہف', nameEnglish: 'Al-Kahf', meaningEnglish: 'The Cave', versesCount: 110, revelationType: 'Meccan' },
  { number: 19, nameArabic: 'مريم', nameUrdu: 'سورۃ مریم', nameEnglish: 'Maryam', meaningEnglish: 'Mary', versesCount: 98, revelationType: 'Meccan' },
  { number: 20, nameArabic: 'طه', nameUrdu: 'سورۃ طٰہٰ', nameEnglish: 'Ta-Ha', meaningEnglish: 'Ta-Ha', versesCount: 135, revelationType: 'Meccan' },
  { number: 21, nameArabic: 'الأنبياء', nameUrdu: 'سورۃ الانبیاء', nameEnglish: 'Al-Anbiya', meaningEnglish: 'The Prophets', versesCount: 112, revelationType: 'Meccan' },
  { number: 22, nameArabic: 'الحج', nameUrdu: 'سورۃ الحج', nameEnglish: 'Al-Hajj', meaningEnglish: 'The Pilgrimage', versesCount: 78, revelationType: 'Medinan' },
  { number: 23, nameArabic: 'المؤمنون', nameUrdu: 'سورۃ المؤمنون', nameEnglish: 'Al-Mu’minun', meaningEnglish: 'The Believers', versesCount: 118, revelationType: 'Meccan' },
  { number: 24, nameArabic: 'النور', nameUrdu: 'سورۃ النور', nameEnglish: 'An-Nur', meaningEnglish: 'The Light', versesCount: 64, revelationType: 'Medinan' },
  { number: 25, nameArabic: 'الفرقان', nameUrdu: 'سورۃ الفرقان', nameEnglish: 'Al-Furqan', meaningEnglish: 'The Criterion', versesCount: 77, revelationType: 'Meccan' },
  { number: 26, nameArabic: 'الشعراء', nameUrdu: 'سورۃ الشعراء', nameEnglish: 'Ash-Shu‘ara', meaningEnglish: 'The Poets', versesCount: 227, revelationType: 'Meccan' },
  { number: 27, nameArabic: 'النمل', nameUrdu: 'سورۃ النمل', nameEnglish: 'An-Naml', meaningEnglish: 'The Ant', versesCount: 93, revelationType: 'Meccan' },
  { number: 28, nameArabic: 'القصص', nameUrdu: 'سورۃ القصص', nameEnglish: 'Al-Qasas', meaningEnglish: 'The Stories', versesCount: 88, revelationType: 'Meccan' },
  { number: 29, nameArabic: 'العنكبوت', nameUrdu: 'سورۃ العنکبوت', nameEnglish: 'Al-‘Ankabut', meaningEnglish: 'The Spider', versesCount: 69, revelationType: 'Meccan' },
  { number: 30, nameArabic: 'الروم', nameUrdu: 'سورۃ الروم', nameEnglish: 'Ar-Rum', meaningEnglish: 'The Romans', versesCount: 60, revelationType: 'Meccan' },
  { number: 31, nameArabic: 'لقمان', nameUrdu: 'سورۃ لقمان', nameEnglish: 'Luqman', meaningEnglish: 'Luqman', versesCount: 34, revelationType: 'Meccan' },
  { number: 32, nameArabic: 'السجدة', nameUrdu: 'سورۃ السجدہ', nameEnglish: 'As-Sajdah', meaningEnglish: 'The Prostration', versesCount: 30, revelationType: 'Meccan' },
  { number: 33, nameArabic: 'الأحزاب', nameUrdu: 'سورۃ الاحزاب', nameEnglish: 'Al-Ahzab', meaningEnglish: 'The Combined Forces', versesCount: 73, revelationType: 'Medinan' },
  { number: 34, nameArabic: 'سبأ', nameUrdu: 'سورۃ سبا', nameEnglish: 'Saba', meaningEnglish: 'Sheba', versesCount: 54, revelationType: 'Meccan' },
  { number: 35, nameArabic: 'فاطر', nameUrdu: 'سورۃ فاطر', nameEnglish: 'Fatir', meaningEnglish: 'Originator', versesCount: 45, revelationType: 'Meccan' },
  { number: 36, nameArabic: 'يس', nameUrdu: 'سورۃ یٰسین', nameEnglish: 'Ya-Sin', meaningEnglish: 'Ya Sin', versesCount: 83, revelationType: 'Meccan' },
  { number: 37, nameArabic: 'الصافات', nameUrdu: 'سورۃ الصافات', nameEnglish: 'As-Saffat', meaningEnglish: 'Those Ranged in Ranks', versesCount: 182, revelationType: 'Meccan' },
  { number: 38, nameArabic: 'ص', nameUrdu: 'سورۃ ص', nameEnglish: 'Sad', meaningEnglish: 'The Letter Sad', versesCount: 88, revelationType: 'Meccan' },
  { number: 39, nameArabic: 'الزمر', nameUrdu: 'سورۃ الزمر', nameEnglish: 'Az-Zumar', meaningEnglish: 'The Troops', versesCount: 75, revelationType: 'Meccan' },
  { number: 40, nameArabic: 'غافر', nameUrdu: 'سورۃ المؤمن', nameEnglish: 'Ghafir', meaningEnglish: 'The Forgiver', versesCount: 85, revelationType: 'Meccan' },
  { number: 41, nameArabic: 'فصلت', nameUrdu: 'سورۃ حٰم السجدہ', nameEnglish: 'Fussilat', meaningEnglish: 'Explained in Detail', versesCount: 54, revelationType: 'Meccan' },
  { number: 42, nameArabic: 'الشورى', nameUrdu: 'سورۃ الشوریٰ', nameEnglish: 'Ash-Shura', meaningEnglish: 'The Consultation', versesCount: 53, revelationType: 'Meccan' },
  { number: 43, nameArabic: 'الزخرف', nameUrdu: 'سورۃ الزخرف', nameEnglish: 'Az-Zukhruf', meaningEnglish: 'Ornaments of Gold', versesCount: 89, revelationType: 'Meccan' },
  { number: 44, nameArabic: 'الدخان', nameUrdu: 'سورۃ الدخان', nameEnglish: 'Ad-Dukhan', meaningEnglish: 'The Smoke', versesCount: 59, revelationType: 'Meccan' },
  { number: 45, nameArabic: 'الجاثية', nameUrdu: 'سورۃ الجاثیہ', nameEnglish: 'Al-Jathiyah', meaningEnglish: 'The Crouching', versesCount: 37, revelationType: 'Meccan' },
  { number: 46, nameArabic: 'الأحقاف', nameUrdu: 'سورۃ الاحقاف', nameEnglish: 'Al-Ahqaf', meaningEnglish: 'The Wind-Curved Sandhills', versesCount: 35, revelationType: 'Meccan' },
  { number: 47, nameArabic: 'محمد', nameUrdu: 'سورۃ محمد', nameEnglish: 'Muhammad', meaningEnglish: 'Muhammad', versesCount: 38, revelationType: 'Medinan' },
  { number: 48, nameArabic: 'الفتح', nameUrdu: 'سورۃ الفتح', nameEnglish: 'Al-Fath', meaningEnglish: 'The Victory', versesCount: 29, revelationType: 'Medinan' },
  { number: 49, nameArabic: 'الحجرات', nameUrdu: 'سورۃ الحجرات', nameEnglish: 'Al-Hujurat', meaningEnglish: 'The Rooms', versesCount: 18, revelationType: 'Medinan' },
  { number: 50, nameArabic: 'ق', nameUrdu: 'سورۃ ق', nameEnglish: 'Qaf', meaningEnglish: 'The Letter Qaf', versesCount: 45, revelationType: 'Meccan' },
  { number: 51, nameArabic: 'الذاريات', nameUrdu: 'سورۃ الذاریات', nameEnglish: 'Adh-Dhariyat', meaningEnglish: 'The Winnowing Winds', versesCount: 60, revelationType: 'Meccan' },
  { number: 52, nameArabic: 'الطور', nameUrdu: 'سورۃ الطور', nameEnglish: 'At-Tur', meaningEnglish: 'The Mount', versesCount: 49, revelationType: 'Meccan' },
  { number: 53, nameArabic: 'النجم', nameUrdu: 'سورۃ النجم', nameEnglish: 'An-Najm', meaningEnglish: 'The Star', versesCount: 62, revelationType: 'Meccan' },
  { number: 54, nameArabic: 'القمر', nameUrdu: 'سورۃ القمر', nameEnglish: 'Al-Qamar', meaningEnglish: 'The Moon', versesCount: 55, revelationType: 'Meccan' },
  { number: 55, nameArabic: 'الرحمن', nameUrdu: 'سورۃ الرحمٰن', nameEnglish: 'Ar-Rahman', meaningEnglish: 'The Beneficent', versesCount: 78, revelationType: 'Medinan' },
  { number: 56, nameArabic: 'الواقعة', nameUrdu: 'سورۃ الواقعہ', nameEnglish: 'Al-Waqi‘ah', meaningEnglish: 'The Inevitable', versesCount: 96, revelationType: 'Meccan' },
  { number: 57, nameArabic: 'الحديد', nameUrdu: 'سورۃ الحدید', nameEnglish: 'Al-Hadid', meaningEnglish: 'The Iron', versesCount: 29, revelationType: 'Medinan' },
  { number: 58, nameArabic: 'المجادلة', nameUrdu: 'سورۃ المجادلہ', nameEnglish: 'Al-Mujadila', meaningEnglish: 'The Pleading Woman', versesCount: 22, revelationType: 'Medinan' },
  { number: 59, nameArabic: 'الحشر', nameUrdu: 'سورۃ الحشر', nameEnglish: 'Al-Hashr', meaningEnglish: 'The Exile', versesCount: 24, revelationType: 'Medinan' },
  { number: 60, nameArabic: 'الممتحنة', nameUrdu: 'سورۃ الممتحنہ', nameEnglish: 'Al-Mumtahanah', meaningEnglish: 'She That is to be Examined', versesCount: 13, revelationType: 'Medinan' },
  { number: 61, nameArabic: 'الصف', nameUrdu: 'سورۃ الصف', nameEnglish: 'As-Saf', meaningEnglish: 'The Ranks', versesCount: 14, revelationType: 'Medinan' },
  { number: 62, nameArabic: 'الجمعة', nameUrdu: 'سورۃ الجمعہ', nameEnglish: 'Al-Jumu‘ah', meaningEnglish: 'The Congregation, Friday', versesCount: 11, revelationType: 'Medinan' },
  { number: 63, nameArabic: 'المنافقون', nameUrdu: 'سورۃ المنافقون', nameEnglish: 'Al-Munafiqun', meaningEnglish: 'The Hypocrites', versesCount: 11, revelationType: 'Medinan' },
  { number: 64, nameArabic: 'التغابن', nameUrdu: 'سورۃ التغابن', nameEnglish: 'At-Taghabun', meaningEnglish: 'The Mutual Disillusion', versesCount: 18, revelationType: 'Medinan' },
  { number: 65, nameArabic: 'الطلاق', nameUrdu: 'سورۃ الطلاق', nameEnglish: 'At-Talaq', meaningEnglish: 'The Divorce', versesCount: 12, revelationType: 'Medinan' },
  { number: 66, nameArabic: 'التحريم', nameUrdu: 'سورۃ التحریم', nameEnglish: 'At-Tahrim', meaningEnglish: 'The Prohibition', versesCount: 12, revelationType: 'Medinan' },
  { number: 67, nameArabic: 'الملك', nameUrdu: 'سورۃ الملک', nameEnglish: 'Al-Mulk', meaningEnglish: 'The Sovereignty', versesCount: 30, revelationType: 'Meccan' },
  { number: 68, nameArabic: 'القلم', nameUrdu: 'سورۃ القلم', nameEnglish: 'Al-Qalam', meaningEnglish: 'The Pen', versesCount: 52, revelationType: 'Meccan' },
  { number: 69, nameArabic: 'الحاقة', nameUrdu: 'سورۃ الحاقہ', nameEnglish: 'Al-Haqqah', meaningEnglish: 'The Reality', versesCount: 52, revelationType: 'Meccan' },
  { number: 70, nameArabic: 'المعارج', nameUrdu: 'سورۃ المعارج', nameEnglish: 'Al-Ma‘arij', meaningEnglish: 'The Ascending Stairways', versesCount: 44, revelationType: 'Meccan' },
  { number: 71, nameArabic: 'نوح', nameUrdu: 'سورۃ نوح', nameEnglish: 'Nuh', meaningEnglish: 'Noah', versesCount: 28, revelationType: 'Meccan' },
  { number: 72, nameArabic: 'الجن', nameUrdu: 'سورۃ الجن', nameEnglish: 'Al-Jinn', meaningEnglish: 'The Jinn', versesCount: 28, revelationType: 'Meccan' },
  { number: 73, nameArabic: 'المزمل', nameUrdu: 'سورۃ المزمل', nameEnglish: 'Al-Muzzammil', meaningEnglish: 'The Enshrouded One', versesCount: 20, revelationType: 'Meccan' },
  { number: 74, nameArabic: 'المدثر', nameUrdu: 'سورۃ المدثر', nameEnglish: 'Al-Muddaththir', meaningEnglish: 'The Cloaked One', versesCount: 56, revelationType: 'Meccan' },
  { number: 75, nameArabic: 'القيامة', nameUrdu: 'سورۃ القیامہ', nameEnglish: 'Al-Qiyamah', meaningEnglish: 'The Resurrection', versesCount: 40, revelationType: 'Meccan' },
  { number: 76, nameArabic: 'الإنسان', nameUrdu: 'سورۃ الدہر', nameEnglish: 'Al-Insan', meaningEnglish: 'The Man', versesCount: 31, revelationType: 'Medinan' },
  { number: 77, nameArabic: 'المرسلات', nameUrdu: 'سورۃ المرسلات', nameEnglish: 'Al-Mursalat', meaningEnglish: 'The Emissaries', versesCount: 50, revelationType: 'Meccan' },
  { number: 78, nameArabic: 'النبأ', nameUrdu: 'سورۃ النبا', nameEnglish: 'An-Naba', meaningEnglish: 'The Tidings', versesCount: 40, revelationType: 'Meccan' },
  { number: 79, nameArabic: 'النازعات', nameUrdu: 'سورۃ النازعات', nameEnglish: 'An-Nazi‘at', meaningEnglish: 'Those Who Drag Forth', versesCount: 46, revelationType: 'Meccan' },
  { number: 80, nameArabic: 'عبس', nameUrdu: 'سورۃ عبس', nameEnglish: '‘Abasa', meaningEnglish: 'He Frowned', versesCount: 42, revelationType: 'Meccan' },
  { number: 81, nameArabic: 'التكوير', nameUrdu: 'سورۃ التکویر', nameEnglish: 'At-Takwir', meaningEnglish: 'The Overthrowing', versesCount: 29, revelationType: 'Meccan' },
  { number: 82, nameArabic: 'الانفطار', nameUrdu: 'سورۃ الانفطار', nameEnglish: 'Al-Infitar', meaningEnglish: 'The Cleaving', versesCount: 19, revelationType: 'Meccan' },
  { number: 83, nameArabic: 'المطففين', nameUrdu: 'سورۃ المطففین', nameEnglish: 'Al-Mutaffifin', meaningEnglish: 'The Defrauding', versesCount: 36, revelationType: 'Meccan' },
  { number: 84, nameArabic: 'الانشقاق', nameUrdu: 'سورۃ الانشقاق', nameEnglish: 'Al-Inshiqaq', meaningEnglish: 'The Sundering', versesCount: 25, revelationType: 'Meccan' },
  { number: 85, nameArabic: 'البروج', nameUrdu: 'سورۃ البروج', nameEnglish: 'Al-Buruj', meaningEnglish: 'The Mansions of the Stars', versesCount: 22, revelationType: 'Meccan' },
  { number: 86, nameArabic: 'الطارق', nameUrdu: 'سورۃ الطارق', nameEnglish: 'At-Tariq', meaningEnglish: 'The Nightcomer', versesCount: 17, revelationType: 'Meccan' },
  { number: 87, nameArabic: 'الأعلى', nameUrdu: 'سورۃ الاعلیٰ', nameEnglish: 'Al-A‘la', meaningEnglish: 'The Most High', versesCount: 19, revelationType: 'Meccan' },
  { number: 88, nameArabic: 'الغاشية', nameUrdu: 'سورۃ الغاشیہ', nameEnglish: 'Al-Ghashiyah', meaningEnglish: 'The Overwhelming', versesCount: 26, revelationType: 'Meccan' },
  { number: 89, nameArabic: 'الفجر', nameUrdu: 'سورۃ الفجر', nameEnglish: 'Al-Fajr', meaningEnglish: 'The Dawn', versesCount: 30, revelationType: 'Meccan' },
  { number: 90, nameArabic: 'البلد', nameUrdu: 'سورۃ البلد', nameEnglish: 'Al-Balad', meaningEnglish: 'The City', versesCount: 20, revelationType: 'Meccan' },
  { number: 91, nameArabic: 'الشمس', nameUrdu: 'سورۃ الشمس', nameEnglish: 'Ash-Shams', meaningEnglish: 'The Sun', versesCount: 15, revelationType: 'Meccan' },
  { number: 92, nameArabic: 'الليل', nameUrdu: 'سورۃ اللیل', nameEnglish: 'Al-Layl', meaningEnglish: 'The Night', versesCount: 21, revelationType: 'Meccan' },
  { number: 93, nameArabic: 'الضحى', nameUrdu: 'سورۃ الضحیٰ', nameEnglish: 'Ad-Duha', meaningEnglish: 'The Morning Hours', versesCount: 11, revelationType: 'Meccan' },
  { number: 94, nameArabic: 'الشرح', nameUrdu: 'سورۃ الم نشرح', nameEnglish: 'Ash-Sharh', meaningEnglish: 'The Relief', versesCount: 8, revelationType: 'Meccan' },
  { number: 95, nameArabic: 'التين', nameUrdu: 'سورۃ التین', nameEnglish: 'At-Tin', meaningEnglish: 'The Fig', versesCount: 8, revelationType: 'Meccan' },
  { number: 96, nameArabic: 'العلق', nameUrdu: 'سورۃ العلق', nameEnglish: 'Al-‘Alaq', meaningEnglish: 'The Clot', versesCount: 19, revelationType: 'Meccan' },
  { number: 97, nameArabic: 'القدر', nameUrdu: 'سورۃ القدر', nameEnglish: 'Al-Qadr', meaningEnglish: 'The Power', versesCount: 5, revelationType: 'Meccan' },
  { number: 98, nameArabic: 'البينة', nameUrdu: 'سورۃ البینہ', nameEnglish: 'Al-Bayyinah', meaningEnglish: 'The Clear Proof', versesCount: 8, revelationType: 'Medinan' },
  { number: 99, nameArabic: 'الزلزلة', nameUrdu: 'سورۃ الزلزال', nameEnglish: 'Az-Zalzalah', meaningEnglish: 'The Earthquake', versesCount: 8, revelationType: 'Medinan' },
  { number: 100, nameArabic: 'العاديات', nameUrdu: 'سورۃ العادیات', nameEnglish: 'Al-‘Adiyat', meaningEnglish: 'The Courser', versesCount: 11, revelationType: 'Meccan' },
  { number: 101, nameArabic: 'القارعة', nameUrdu: 'سورۃ القارعہ', nameEnglish: 'Al-Qari‘ah', meaningEnglish: 'The Calamity', versesCount: 11, revelationType: 'Meccan' },
  { number: 102, nameArabic: 'التكاثر', nameUrdu: 'سورۃ التکاثر', nameEnglish: 'At-Takathur', meaningEnglish: 'The Rivalry in World Increase', versesCount: 8, revelationType: 'Meccan' },
  { number: 103, nameArabic: 'العصر', nameUrdu: 'سورۃ العصر', nameEnglish: 'Al-‘Asr', meaningEnglish: 'The Declining Day', versesCount: 3, revelationType: 'Meccan' },
  { number: 104, nameArabic: 'الهمزة', nameUrdu: 'سورۃ الہمزہ', nameEnglish: 'Al-Humazah', meaningEnglish: 'The Traducer', versesCount: 9, revelationType: 'Meccan' },
  { number: 105, nameArabic: 'الفيل', nameUrdu: 'سورۃ الفیل', nameEnglish: 'Al-Fil', meaningEnglish: 'The Elephant', versesCount: 5, revelationType: 'Meccan' },
  { number: 106, nameArabic: 'قريش', nameUrdu: 'سورۃ قریش', nameEnglish: 'Quraysh', meaningEnglish: 'Quraysh', versesCount: 4, revelationType: 'Meccan' },
  { number: 107, nameArabic: 'الماعون', nameUrdu: 'سورۃ الماعون', nameEnglish: 'Al-Ma‘un', meaningEnglish: 'The Small Kindnesses', versesCount: 7, revelationType: 'Meccan' },
  { number: 108, nameArabic: 'الكوثر', nameUrdu: 'سورۃ الکوثر', nameEnglish: 'Al-Kawthar', meaningEnglish: 'The Abundance', versesCount: 3, revelationType: 'Meccan' },
  { number: 109, nameArabic: 'الكافرون', nameUrdu: 'سورۃ الکافرون', nameEnglish: 'Al-Kafirun', meaningEnglish: 'The Disbelievers', versesCount: 6, revelationType: 'Meccan' },
  { number: 110, nameArabic: 'النصر', nameUrdu: 'سورۃ النصر', nameEnglish: 'An-Nasr', meaningEnglish: 'The Divine Support', versesCount: 3, revelationType: 'Medinan' },
  { number: 111, nameArabic: 'المسد', nameUrdu: 'سورۃ اللہب', nameEnglish: 'Al-Masad', meaningEnglish: 'The Palm Fiber', versesCount: 5, revelationType: 'Meccan' },
  { number: 112, nameArabic: 'الإخلاص', nameUrdu: 'سورۃ الاخلاص', nameEnglish: 'Al-Ikhlas', meaningEnglish: 'The Sincerity', versesCount: 4, revelationType: 'Meccan' },
  { number: 113, nameArabic: 'الفلق', nameUrdu: 'سورۃ الفلق', nameEnglish: 'Al-Falaq', meaningEnglish: 'The Daybreak', versesCount: 5, revelationType: 'Meccan' },
  { number: 114, nameArabic: 'الناس', nameUrdu: 'سورۃ الناس', nameEnglish: 'An-Nas', meaningEnglish: 'Mankind', versesCount: 6, revelationType: 'Meccan' },
];

const pad3 = (n: number) => String(n).padStart(3, '0');

export const RECITERS: ReciterInfo[] = [
  {
    id: 'alafasy',
    name: {
      en: 'Mishary Rashid Alafasy',
      ur: 'قاری مشاری راشد العفاسی',
      ar: 'مشاري راشد العفاسي',
    },
    getAudioUrl: (surah) => `https://server8.mp3quran.net/afs/${pad3(surah)}.mp3`,
  },
  {
    id: 'abdulbasit',
    name: {
      en: 'Abdul Basit Abdul Samad',
      ur: 'قاری عبدالباسط عبدالصمد',
      ar: 'عبد الباسط عبد الصمد',
    },
    getAudioUrl: (surah) => `https://server7.mp3quran.net/basit/${pad3(surah)}.mp3`,
  },
  {
    id: 'husary',
    name: {
      en: 'Mahmoud Khalil Al-Husary',
      ur: 'قاری محمود خلیل الحصری',
      ar: 'محمود خليل الحصري',
    },
    getAudioUrl: (surah) => `https://server13.mp3quran.net/husr/${pad3(surah)}.mp3`,
  },
  {
    id: 'ghamdi',
    name: {
      en: 'Saad Al-Ghamdi',
      ur: 'قاری سعد الغامدی',
      ar: 'سعد الغامدي',
    },
    getAudioUrl: (surah) => `https://server7.mp3quran.net/s_gmd/${pad3(surah)}.mp3`,
  },
  {
    id: 'sudais',
    name: {
      en: 'Abdur-Rahman as-Sudais',
      ur: 'قاری عبدالرحمٰن السدیس',
      ar: 'عبد الرحمن السديس',
    },
    getAudioUrl: (surah) => `https://server11.mp3quran.net/sds/${pad3(surah)}.mp3`,
  },
];

// Built-in offline-ready Surahs with authentic Arabic & Kanz-ul-Iman / Kanz-ul-Irfan style Urdu translation
export const BUILTIN_SURAH_VERSES: Record<number, AyahItem[]> = {
  1: [
    {
      numberInSurah: 1,
      arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      urduKanzulIman: 'اللہ کے نام سے شروع جو بہت مہربان رحمت والا۔',
      english: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
    },
    {
      numberInSurah: 2,
      arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      urduKanzulIman: 'سب خوبیاں اللہ کو جو مالک سارے جہان والوں کا۔',
      english: 'All praise is due to Allah, Lord of the worlds.',
    },
    {
      numberInSurah: 3,
      arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
      urduKanzulIman: 'بہت مہربان رحمت والا۔',
      english: 'The Entirely Merciful, the Especially Merciful.',
    },
    {
      numberInSurah: 4,
      arabic: 'مَالِكِ يَوْمِ الدِّينِ',
      urduKanzulIman: 'روزِ جزا کا مالک۔',
      english: 'Sovereign of the Day of Recompense.',
    },
    {
      numberInSurah: 5,
      arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      urduKanzulIman: 'ہم تجھی کو پوجیں اور تجھی سے مدد چاہیں۔',
      english: 'It is You we worship and You we ask for help.',
    },
    {
      numberInSurah: 6,
      arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      urduKanzulIman: 'ہم کو سیدھا راستہ چلا۔',
      english: 'Guide us to the straight path.',
    },
    {
      numberInSurah: 7,
      arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
      urduKanzulIman: 'راستہ ان کا جن پر تو نے احسان کیا، نہ ان کا جن پر غضب ہوا اور نہ بہکے ہوؤں کا۔',
      english: 'The path of those upon whom You have bestowed favor, not of those who have evoked anger or of those who are astray.',
    },
  ],
  97: [
    {
      numberInSurah: 1,
      arabic: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ',
      urduKanzulIman: 'بے شک ہم نے اس قرآن کو شبِ قدر میں اتارا۔',
      english: 'Indeed, We sent the Quran down during the Night of Decree.',
    },
    {
      numberInSurah: 2,
      arabic: 'وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ',
      urduKanzulIman: 'اور تم نے کیا جانا کیا ہے شبِ قدر۔',
      english: 'And what can make you know what is the Night of Decree?',
    },
    {
      numberInSurah: 3,
      arabic: 'لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ',
      urduKanzulIman: 'شبِ قدر ہزار مہینوں سے بہتر۔',
      english: 'The Night of Decree is better than a thousand months.',
    },
    {
      numberInSurah: 4,
      arabic: 'تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ',
      urduKanzulIman: 'اس میں فرشتے اور جبریل اترتے ہیں اپنے رب کے حکم سے ہر کام کے لیے۔',
      english: 'The angels and the Spirit descend therein by permission of their Lord for every matter.',
    },
    {
      numberInSurah: 5,
      arabic: 'سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ',
      urduKanzulIman: 'وہ سلامتی ہے صبح چمکنے تک۔',
      english: 'Peace it is until the emergence of dawn.',
    },
  ],
  103: [
    {
      numberInSurah: 1,
      arabic: 'وَالْعَصْرِ',
      urduKanzulIman: 'اس زمانہ کی قسم۔',
      english: 'By time,',
    },
    {
      numberInSurah: 2,
      arabic: 'إِنَّ الْإِنسَانَ لَفِي خُسْرٍ',
      urduKanzulIman: 'بے شک آدمی ضرور نقصان میں ہے۔',
      english: 'Indeed, mankind is in loss,',
    },
    {
      numberInSurah: 3,
      arabic: 'إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ',
      urduKanzulIman: 'مگر جو ایمان لائے اور اچھے کام کیے اور ایک دوسرے کو حق کی تاکید کی اور ایک دوسرے کو صبر کی وصیت کی۔',
      english: 'Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience.',
    },
  ],
  105: [
    {
      numberInSurah: 1,
      arabic: 'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَابِ الْفِيلِ',
      urduKanzulIman: 'اے محبوب! کیا تم نے نہ دیکھا تمہارے رب نے ان ہاتھی والوں کا کیا حال کیا۔',
      english: 'Have you not considered how your Lord dealt with the companions of the elephant?',
    },
    {
      numberInSurah: 2,
      arabic: 'أَلَمْ يَجْعَلْ كَيْدَهُمْ فِي تَضْلِيلٍ',
      urduKanzulIman: 'کیا ان کا داؤ تباہی میں نہ ڈالا۔',
      english: 'Did He not make their plan into misguidance?',
    },
    {
      numberInSurah: 3,
      arabic: 'وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ',
      urduKanzulIman: 'اور ان پر پرندوں کی ٹولیاں بھیجیں۔',
      english: 'And He sent against them birds in flocks,',
    },
    {
      numberInSurah: 4,
      arabic: 'تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ',
      urduKanzulIman: 'کہ انہیں کنکر کے پتھروں سے مارتے تھے۔',
      english: 'Striking them with stones of hard clay,',
    },
    {
      numberInSurah: 5,
      arabic: 'فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍ',
      urduKanzulIman: 'تو انہیں کر ڈالا جیسے کھائی ہوئی کھیتی کی پتی۔',
      english: 'And He made them like eaten straw.',
    },
  ],
  108: [
    {
      numberInSurah: 1,
      arabic: 'إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ',
      urduKanzulIman: 'اے محبوب! بے شک ہم نے تمہیں بے شمار خوبیاں عطا فرمائیں۔',
      english: 'Indeed, We have granted you Al-Kawthar.',
    },
    {
      numberInSurah: 2,
      arabic: 'فَصَلِّ لِرَبِّكَ وَانْحَرْ',
      urduKanzulIman: 'تو تم اپنے رب کے لیے نماز پڑھو اور قربانی کرو۔',
      english: 'So pray to your Lord and sacrifice.',
    },
    {
      numberInSurah: 3,
      arabic: 'إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ',
      urduKanzulIman: 'بے شک جو تمہارا دشمن ہے وہی ہر خیر سے محروم ہے۔',
      english: 'Indeed, your enemy is the one cut off.',
    },
  ],
  110: [
    {
      numberInSurah: 1,
      arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ',
      urduKanzulIman: 'جب اللہ کی مدد اور فتح آئے۔',
      english: 'When the victory of Allah has come and the conquest,',
    },
    {
      numberInSurah: 2,
      arabic: 'وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا',
      urduKanzulIman: 'اور تم لوگوں کو دیکھو کہ اللہ کے دین میں فوج در فوج داخل ہوتے ہیں۔',
      english: 'And you see the people entering into the religion of Allah in multitudes,',
    },
    {
      numberInSurah: 3,
      arabic: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا',
      urduKanzulIman: 'تو اپنے رب کی ثنا کرتے ہوئے اس کی پاکی بولو اور اس سے بخشش چاہو بے شک وہ بہت توبہ قبول کرنے والا ہے۔',
      english: 'Then exalt Him with praise of your Lord and ask forgiveness of Him. Indeed, He is ever Accepting of repentance.',
    },
  ],
  112: [
    {
      numberInSurah: 1,
      arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
      urduKanzulIman: 'تم فرماؤ وہ اللہ ہے وہ ایک ہے۔',
      english: 'Say, "He is Allah, who is One,',
    },
    {
      numberInSurah: 2,
      arabic: 'اللَّهُ الصَّمَدُ',
      urduKanzulIman: 'اللہ بے نیاز ہے۔',
      english: 'Allah, the Eternal Refuge.',
    },
    {
      numberInSurah: 3,
      arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
      urduKanzulIman: 'نہ اس کی کوئی اولاد اور نہ وہ کسی سے پیدا ہوا۔',
      english: 'He neither begets nor is born,',
    },
    {
      numberInSurah: 4,
      arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      urduKanzulIman: 'اور نہ اس کے جوڑ کا کوئی۔',
      english: 'Nor is there to Him any equivalent."',
    },
  ],
  113: [
    {
      numberInSurah: 1,
      arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
      urduKanzulIman: 'تم فرماؤ میں اس کی پناہ لیتا ہوں جو صبح کا پیدا کرنے والا ہے۔',
      english: 'Say, "I seek refuge in the Lord of daybreak',
    },
    {
      numberInSurah: 2,
      arabic: 'مِن شَرِّ مَا خَلَقَ',
      urduKanzulIman: 'اس کی ساری مخلوق کے شر سے۔',
      english: 'From the evil of that which He created',
    },
    {
      numberInSurah: 3,
      arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
      urduKanzulIman: 'اور اندھیری رات کے شر سے جب وہ چھا جائے۔',
      english: 'And from the evil of darkness when it settles',
    },
    {
      numberInSurah: 4,
      arabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
      urduKanzulIman: 'اور ان عورتوں کے شر سے جو گرہوں میں پھونکتی ہیں۔',
      english: 'And from the evil of the blowers in knots',
    },
    {
      numberInSurah: 5,
      arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
      urduKanzulIman: 'اور حسد والے کے شر سے جب وہ مجھ سے جلے۔',
      english: 'And from the evil of an envier when he envies."',
    },
  ],
  114: [
    {
      numberInSurah: 1,
      arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
      urduKanzulIman: 'تم فرماؤ میں پناہ لیتا ہوں سب لوگوں کے رب کی۔',
      english: 'Say, "I seek refuge in the Lord of mankind,',
    },
    {
      numberInSurah: 2,
      arabic: 'مَلِكِ النَّاسِ',
      urduKanzulIman: 'سب لوگوں کے بادشاہ کی۔',
      english: 'The Sovereign of mankind,',
    },
    {
      numberInSurah: 3,
      arabic: 'إِلَٰهِ النَّاسِ',
      urduKanzulIman: 'سب لوگوں کے معبود کی۔',
      english: 'The God of mankind,',
    },
    {
      numberInSurah: 4,
      arabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
      urduKanzulIman: 'اس کے شر سے جو دل میں برے خطرے ڈالے اور پیچھے ہٹ جائے۔',
      english: 'From the evil of the retreating whisperer',
    },
    {
      numberInSurah: 5,
      arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
      urduKanzulIman: 'وہ جو لوگوں کے دلوں میں وسوسے ڈالتے ہیں۔',
      english: 'Who whispers into the breasts of mankind',
    },
    {
      numberInSurah: 6,
      arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
      urduKanzulIman: 'جنوں میں سے اور آدمیوں میں سے۔',
      english: 'From among the jinn and mankind."',
    },
  ],
};

interface AlQuranEdition {
  ayahs: Array<{
    numberInSurah: number;
    text: string;
  }>;
}

const versesCache = new Map<number, { ayahs: AyahItem[]; isFallback: boolean }>();

export async function fetchSurahVerses(
  surahNumber: number
): Promise<{ ayahs: AyahItem[]; isFallback: boolean }> {
  const cached = versesCache.get(surahNumber);
  if (cached) return cached;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 9000);

    const response = await fetch(
      `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,ur.kanzuliman,en.sahih`,
      { signal: controller.signal }
    );
    clearTimeout(timer);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const json = (await response.json()) as {
      code: number;
      data?: AlQuranEdition[];
    };

    if (json.code === 200 && Array.isArray(json.data) && json.data.length >= 3) {
      const [arEd, urEd, enEd] = json.data;
      const ayahs: AyahItem[] = arEd.ayahs.map((ayah, idx) => {
        // Strip leading Bismillah from Ayah 1 in Surahs 2..114 (except 9) if API includes it,
        // since the Bismillah header is rendered cleanly above the verses.
        let arabicText = ayah.text;
        if (surahNumber !== 1 && surahNumber !== 9 && ayah.numberInSurah === 1) {
          arabicText = arabicText
            .replace(/^بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ\s*/, '')
            .replace(/^بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ\s*/, '')
            .trim();
        }
        return {
          numberInSurah: ayah.numberInSurah,
          arabic: arabicText || ayah.text,
          urduKanzulIman: urEd.ayahs[idx]?.text ?? '',
          english: enEd.ayahs[idx]?.text ?? '',
        };
      });

      const result = { ayahs, isFallback: false };
      versesCache.set(surahNumber, result);
      cacheSurahVerses(surahNumber, ayahs);
      return result;
    }

    throw new Error('Unexpected API payload');
  } catch {
    const storedAyahs = getCachedSurahVerses(surahNumber);
    if (storedAyahs) {
      const result = { ayahs: storedAyahs, isFallback: false };
      versesCache.set(surahNumber, result);
      return result;
    }

    const builtin = BUILTIN_SURAH_VERSES[surahNumber];
    if (builtin) {
      const result = { ayahs: builtin, isFallback: false };
      versesCache.set(surahNumber, result);
      return result;
    }

    // Respectful fallback excerpt for offline environments
    const surahMeta = ALL_SURAHS.find((s) => s.number === surahNumber);
    const fallback: AyahItem[] = [
      {
        numberInSurah: 1,
        arabic:
          surahNumber === 9
            ? 'بَرَاءَةٌ مِّنَ اللَّهِ وَرَسُولِهِ إِلَى الَّذِينَ عَاهَدتُّم مِّنَ الْمُشْرِكِينَ'
            : 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        urduKanzulIman:
          surahNumber === 9
            ? 'بیزاری کا اعلان ہے اللہ اور اس کے رسول کی طرف سے ان مشرکوں سے جن سے تم نے معاہدہ کیا تھا۔'
            : `${surahMeta?.nameUrdu ?? 'سورۃ'} — اللہ کے نام سے شروع جو بہت مہربان رحمت والا۔`,
        english:
          surahNumber === 9
            ? 'Freedom from obligation is proclaimed from Allah and His Messenger to those with whom you had made a treaty among the polytheists.'
            : `${surahMeta?.nameEnglish ?? 'Surah'} — In the name of Allah, the Entirely Merciful, the Especially Merciful.`,
      },
    ];
    return { ayahs: fallback, isFallback: true };
  }
}
