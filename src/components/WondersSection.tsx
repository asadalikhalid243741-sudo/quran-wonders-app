import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft, BookOpen, Search } from 'lucide-react';
import type { Language, OppositeWordPair, SharePayload, WonderCategory, WonderItem } from '../types';
import type { UIStrings } from '../data/translations';
import { OPPOSITE_WORD_PAIRS } from '../data/wordPairs';
import { OppositeWordsTable } from './OppositeWordsTable';
import { PrayerTimesWidget } from './PrayerTimesWidget';
import { WonderCard } from './WonderCard';

interface WondersSectionProps {
  wonders: WonderItem[];
  wordPairs?: OppositeWordPair[];
  language: Language;
  ui: UIStrings;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onShare: (payload: SharePayload) => void;
  onNavigateToTilawat: () => void;
  onOpenSurah: (surahNumber: number) => void;
}

const HERO_IMAGE = '/src/assets/images/hero_islamic_sanctuary_1795226533550.jpg';

export function WondersSection({
  wonders,
  wordPairs = OPPOSITE_WORD_PAIRS,
  language,
  ui,
  bookmarks,
  onToggleBookmark,
  onShare,
  onNavigateToTilawat,
  onOpenSurah,
}: WondersSectionProps) {
  const [category, setCategory] = useState<WonderCategory>('all');
  const [query, setQuery] = useState('');
  const [imgFailed, setImgFailed] = useState(false);

  const dailySpotlight = useMemo(
    () => wonders.find((w) => w.category === 'daily') ?? wonders[0],
    [wonders]
  );

  const filteredWonders = useMemo(() => {
    const q = query.trim().toLowerCase();
    return wonders.filter((item) => {
      const matchesCat = category === 'all' || item.category === category;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        item.title[language].toLowerCase().includes(q) ||
        item.explanation[language].toLowerCase().includes(q) ||
        item.detailedReflection[language].toLowerCase().includes(q) ||
        item.surahName[language].toLowerCase().includes(q) ||
        item.verseRef.toLowerCase().includes(q) ||
        item.arabicText.includes(q)
      );
    });
  }, [wonders, category, query, language]);

  const filterTabs: Array<{ id: WonderCategory; label: string }> = [
    { id: 'all', label: ui.filterAll },
    { id: 'daily', label: ui.filterDaily },
    { id: 'nature', label: ui.filterNature },
    { id: 'language', label: ui.filterLanguage },
  ];

  const isRtl = language !== 'en';
  const DirectionalArrow = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-10">
      {/* Editorial Hero Split */}
      <section className="rounded-3xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 dark:text-emerald-400">
                <span>{ui.dailyWonderLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums text-[#9A6E1F] dark:text-[#E5BE53]">
                  {ui.surahLabel} {dailySpotlight.surahName[language]} ({dailySpotlight.verseRef})
                </span>
              </div>

              <h1
                className={`font-semibold text-[#1A221E] dark:text-[#F2EFE9] [text-wrap:balance] ${
                  language === 'en'
                    ? 'font-display text-3xl sm:text-5xl leading-[1.12]'
                    : language === 'ur'
                    ? 'font-urdu text-2xl sm:text-4xl leading-[2.05]'
                    : 'font-arabic text-2xl sm:text-4xl leading-[1.7]'
                }`}
              >
                {ui.heroTitle}
              </h1>

              <p
                className={`max-w-2xl text-[#4E5A54] dark:text-[#BAC6C0] ${
                  language === 'ur'
                    ? 'font-urdu text-base leading-[2.3]'
                    : language === 'ar'
                    ? 'font-arabic text-base leading-[2.0]'
                    : 'text-base leading-relaxed'
                }`}
              >
                {ui.heroLead}
              </p>
            </div>

            {/* Daily Featured Ayah Preview */}
            <div className="rounded-2xl bg-[#F8F5ED] dark:bg-[#0D1613] border border-[#EAE3D4] dark:border-[#1E2F29] p-5">
              <p
                dir="rtl"
                lang="ar"
                className="font-arabic text-xl sm:text-2xl text-[#14201A] dark:text-[#F5F1E8] text-right leading-[2.1] mb-2"
              >
                {dailySpotlight.arabicText}
              </p>
              <p className="text-xs sm:text-sm text-[#5A6560] dark:text-[#9BA8A2]">
                {dailySpotlight.title[language]} — {dailySpotlight.highlightNote[language]}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onNavigateToTilawat}
                className="min-h-[44px] px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-[#0B1210] text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <BookOpen className="w-4 h-4" />
                <span>{ui.exploreSurahsCta}</span>
                <DirectionalArrow className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full bg-[#E9E3D5] dark:bg-[#16241F]">
            {!imgFailed ? (
              <img
                src={HERO_IMAGE}
                alt="Tranquil Islamic courtyard with carved mashrabiya lattice and golden morning light"
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className="w-full h-full lg:absolute lg:inset-0 object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center p-8 bg-gradient-to-br from-emerald-900 to-[#0B291F] text-[#E5BE53]">
                <p className="font-arabic text-2xl text-center">سَنُرِيهِمْ آيَاتِنَا فِي الْآفَاقِ</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Location-Based Daily Prayer Times Strip */}
      <PrayerTimesWidget language={language} ui={ui} />

      {/* Filter & Search Toolbar */}
      <section aria-label="Quranic Wonders Explorer" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Wonder categories"
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#EFECE3] dark:bg-[#16241F] border border-[#E5DFD2] dark:border-[#23352E] w-fit"
          >
            {filterTabs.map((tab) => {
              const active = category === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={active}
                  type="button"
                  onClick={() => setCategory(tab.id)}
                  className={`min-h-[38px] px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                    active
                      ? 'bg-white dark:bg-[#0B1210] text-emerald-900 dark:text-emerald-300 shadow-sm'
                      : 'text-[#5A6560] dark:text-[#9BA8A2] hover:text-[#1A221E] dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#6B756F] dark:text-[#9BA8A2] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={ui.searchWondersPlaceholder}
              className="w-full min-h-[44px] ps-10 pe-4 py-2 rounded-xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] text-sm text-[#1A221E] dark:text-[#F2EFE9] placeholder:text-[#7A847E] focus:outline-none focus:ring-2 focus:ring-emerald-700"
            />
          </div>
        </div>

        {filteredWonders.length === 0 ? (
          <div className="rounded-2xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] p-10 text-center">
            <h3 className="text-base font-semibold text-[#1A221E] dark:text-[#F2EFE9] mb-1">
              {ui.noResultsTitle}
            </h3>
            <p className="text-sm text-[#5A6560] dark:text-[#9BA8A2]">{ui.noResultsDesc}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredWonders.map((wonder, index) => (
              <motion.div
                key={wonder.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.22,
                  delay: Math.min(index * 0.04, 0.24),
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <WonderCard
                  wonder={wonder}
                  language={language}
                  ui={ui}
                  isBookmarked={bookmarks.includes(wonder.id)}
                  onToggleBookmark={onToggleBookmark}
                  onShare={onShare}
                  onOpenSurah={onOpenSurah}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Opposite Words Equal Counts & Ayah Correlations Table */}
      <OppositeWordsTable
        pairs={wordPairs}
        language={language}
        ui={ui}
        onOpenSurah={onOpenSurah}
      />
    </div>
  );
}
