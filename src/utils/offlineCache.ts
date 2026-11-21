import type { AyahItem, OppositeWordPair, StoryItem, WonderItem } from '../types';

const CONTENT_CACHE_KEY = 'qw_offline_content_v1';
const VERSES_CACHE_KEY = 'qw_offline_verses_v1';

interface CachedContentBundle {
  version: number;
  updatedAt: number;
  wonders: WonderItem[];
  stories: StoryItem[];
  wordPairs: OppositeWordPair[];
}

export function syncEssentialContentToStorage(
  wonders: WonderItem[],
  stories: StoryItem[],
  wordPairs: OppositeWordPair[]
): void {
  try {
    const bundle: CachedContentBundle = {
      version: 1,
      updatedAt: Date.now(),
      wonders,
      stories,
      wordPairs,
    };
    localStorage.setItem(CONTENT_CACHE_KEY, JSON.stringify(bundle));
  } catch {
    // ignore quota errors gracefully
  }
}

export function loadEssentialContentFromStorage(
  fallbackWonders: WonderItem[],
  fallbackStories: StoryItem[],
  fallbackPairs: OppositeWordPair[]
): {
  wonders: WonderItem[];
  stories: StoryItem[];
  wordPairs: OppositeWordPair[];
  cachedAt: number | null;
} {
  try {
    const raw = localStorage.getItem(CONTENT_CACHE_KEY);
    if (!raw) {
      return {
        wonders: fallbackWonders,
        stories: fallbackStories,
        wordPairs: fallbackPairs,
        cachedAt: null,
      };
    }
    const parsed = JSON.parse(raw) as Partial<CachedContentBundle>;
    return {
      wonders:
        Array.isArray(parsed.wonders) && parsed.wonders.length >= fallbackWonders.length
          ? parsed.wonders
          : fallbackWonders,
      stories:
        Array.isArray(parsed.stories) && parsed.stories.length >= fallbackStories.length
          ? parsed.stories
          : fallbackStories,
      wordPairs:
        Array.isArray(parsed.wordPairs) && parsed.wordPairs.length >= fallbackPairs.length
          ? parsed.wordPairs
          : fallbackPairs,
      cachedAt: typeof parsed.updatedAt === 'number' ? parsed.updatedAt : null,
    };
  } catch {
    return {
      wonders: fallbackWonders,
      stories: fallbackStories,
      wordPairs: fallbackPairs,
      cachedAt: null,
    };
  }
}

export function getCachedSurahVerses(surahNumber: number): AyahItem[] | null {
  try {
    const raw = localStorage.getItem(VERSES_CACHE_KEY);
    if (!raw) return null;
    const map = JSON.parse(raw) as Record<string, AyahItem[]>;
    const entry = map[String(surahNumber)];
    return Array.isArray(entry) && entry.length > 0 ? entry : null;
  } catch {
    return null;
  }
}

export function cacheSurahVerses(surahNumber: number, ayahs: AyahItem[]): void {
  try {
    const raw = localStorage.getItem(VERSES_CACHE_KEY);
    const map: Record<string, AyahItem[]> = raw ? (JSON.parse(raw) as Record<string, AyahItem[]>) : {};
    map[String(surahNumber)] = ayahs;

    // Keep cached Surah count bounded (~20 Surahs) to respect localStorage quotas
    const keys = Object.keys(map);
    if (keys.length > 20) {
      delete map[keys[0]];
    }
    localStorage.setItem(VERSES_CACHE_KEY, JSON.stringify(map));
  } catch {
    // ignore storage quota errors
  }
}
