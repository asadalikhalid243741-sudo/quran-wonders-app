import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';
import type { Language, SharePayload, StoryCategory, StoryItem } from '../types';
import type { UIStrings } from '../data/translations';
import { StoryCard } from './StoryCard';

interface StoriesSectionProps {
  stories: StoryItem[];
  language: Language;
  ui: UIStrings;
  bookmarks: string[];
  onToggleBookmark: (id: string) => void;
  onShare: (payload: SharePayload) => void;
  onOpenSurah: (surahNumber: number) => void;
}

const STORY_BANNER = '/src/assets/images/story_cave_sanctuary_1795226534006.jpg';

export function StoriesSection({
  stories,
  language,
  ui,
  bookmarks,
  onToggleBookmark,
  onShare,
  onOpenSurah,
}: StoriesSectionProps) {
  const [category, setCategory] = useState<StoryCategory>('all');
  const [query, setQuery] = useState('');
  const [imgFailed, setImgFailed] = useState(false);

  const filteredStories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stories.filter((story) => {
      const matchesCat = category === 'all' || story.category === category;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        story.title[language].toLowerCase().includes(q) ||
        story.summary[language].toLowerCase().includes(q) ||
        story.detailedReflection[language].toLowerCase().includes(q) ||
        story.surahName[language].toLowerCase().includes(q) ||
        story.verseRef.toLowerCase().includes(q)
      );
    });
  }, [stories, category, query, language]);

  const filterTabs: Array<{ id: StoryCategory; label: string }> = [
    { id: 'all', label: ui.storyFilterAll },
    { id: 'prophets', label: ui.storyFilterProphets },
    { id: 'signs', label: ui.storyFilterSigns },
    { id: 'faith', label: ui.storyFilterFaith },
  ];

  return (
    <div className="space-y-8">
      {/* Atmospheric Editorial Banner */}
      <section className="relative rounded-3xl overflow-hidden border border-[#E5DFD2] dark:border-[#23352E] min-h-[240px] sm:min-h-[280px] flex items-end">
        {!imgFailed ? (
          <img
            src={STORY_BANNER}
            alt="Sunlit limestone cave opening overlooking a tranquil valley"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0E3125] to-[#1A4333]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15" />

        <div className="relative z-10 p-6 sm:p-10 max-w-3xl text-white">
          <h1
            className={`font-semibold mb-3 [text-wrap:balance] ${
              language === 'en'
                ? 'font-display text-3xl sm:text-5xl leading-tight'
                : language === 'ur'
                ? 'font-urdu text-2xl sm:text-4xl leading-[2.05]'
                : 'font-arabic text-2xl sm:text-4xl leading-[1.7]'
            }`}
          >
            {ui.storiesHeroTitle}
          </h1>
          <p
            className={`text-white/90 ${
              language === 'ur'
                ? 'font-urdu text-base leading-[2.25]'
                : language === 'ar'
                ? 'font-arabic text-base leading-[1.9]'
                : 'text-sm sm:text-base leading-relaxed'
            }`}
          >
            {ui.storiesHeroLead}
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div
          role="tablist"
          aria-label="Story categories"
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
            placeholder={ui.searchStoriesPlaceholder}
            className="w-full min-h-[44px] ps-10 pe-4 py-2 rounded-xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] text-sm text-[#1A221E] dark:text-[#F2EFE9] placeholder:text-[#7A847E] focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>
      </div>

      {/* Stories List */}
      {filteredStories.length === 0 ? (
        <div className="rounded-2xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] p-10 text-center">
          <h3 className="text-base font-semibold text-[#1A221E] dark:text-[#F2EFE9] mb-1">
            {ui.noResultsTitle}
          </h3>
          <p className="text-sm text-[#5A6560] dark:text-[#9BA8A2]">{ui.noResultsDesc}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.22,
                delay: Math.min(index * 0.04, 0.24),
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <StoryCard
                story={story}
                language={language}
                ui={ui}
                isBookmarked={bookmarks.includes(story.id)}
                onToggleBookmark={onToggleBookmark}
                onShare={onShare}
                onOpenSurah={onOpenSurah}
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
