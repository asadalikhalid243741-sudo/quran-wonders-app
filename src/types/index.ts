export type Language = 'en' | 'ur' | 'ar';
export type ThemeMode = 'light' | 'dark';
export type ActiveTab = 'wonders' | 'stories' | 'tilawat' | 'saved';

export type WonderCategory = 'all' | 'daily' | 'nature' | 'language';
export type StoryCategory = 'all' | 'prophets' | 'signs' | 'faith';

export interface LocalizedText {
  en: string;
  ur: string;
  ar: string;
}

export interface WonderItem {
  id: string;
  category: Exclude<WonderCategory, 'all'>;
  surahNumber: number;
  surahName: LocalizedText;
  verseRef: string;
  arabicText: string;
  title: LocalizedText;
  explanation: LocalizedText;
  detailedReflection: LocalizedText;
  highlightNote: LocalizedText;
}

export interface StoryItem {
  id: string;
  category: Exclude<StoryCategory, 'all'>;
  surahNumber: number;
  surahName: LocalizedText;
  verseRef: string;
  arabicText: string;
  title: LocalizedText;
  eraLabel: LocalizedText;
  summary: LocalizedText;
  detailedReflection: LocalizedText;
  lesson: LocalizedText;
}

export interface SurahInfo {
  number: number;
  nameArabic: string;
  nameUrdu: string;
  nameEnglish: string;
  meaningEnglish: string;
  versesCount: number;
  revelationType: 'Meccan' | 'Medinan';
}

export interface AyahItem {
  numberInSurah: number;
  arabic: string;
  urduKanzulIman: string;
  english: string;
}

export type SurahProgressStatus = 'unread' | 'in_progress' | 'completed';

export interface SurahProgressEntry {
  status: SurahProgressStatus;
  lastAyah?: number;
  updatedAt: number;
}

export type SurahProgressMap = Record<number, SurahProgressEntry>;

export interface ReciterInfo {
  id: string;
  name: LocalizedText;
  getAudioUrl: (surahNumber: number) => string;
}

export interface SharePayload {
  title: string;
  surahLabel: string;
  verseRef: string;
  arabicText: string;
  explanation: string;
  kindLabel: string;
}

export interface AyahReference {
  surahNumber: number;
  ref: string;
}

export interface OppositeWordPair {
  id: string;
  wordArabic: string;
  wordLabel: LocalizedText;
  oppositeArabic: string;
  oppositeLabel: LocalizedText;
  equalCount: number;
  ayahRefs: AyahReference[];
  correlationNote: LocalizedText;
}
