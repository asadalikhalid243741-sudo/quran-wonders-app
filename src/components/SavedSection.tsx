import { motion } from 'motion/react';
import { Bookmark } from 'lucide-react';
import type { Language, SharePayload, StoryItem, WonderItem } from '../types';
import type { UIStrings } from '../data/translations';
import { StoryCard } from './StoryCard';
import { WonderCard } from './WonderCard';

interface SavedSectionProps {
  wonders: WonderItem[];
  stories: StoryItem[];
  bookmarks: string[];
  language: Language;
  ui: UIStrings;
  onToggleBookmark: (id: string) => void;
  onShare: (payload: SharePayload) => void;
  onOpenSurah: (surahNumber: number) => void;
}

export function SavedSection({
  wonders,
  stories,
  bookmarks,
  language,
  ui,
  onToggleBookmark,
  onShare,
  onOpenSurah,
}: SavedSectionProps) {
  const savedWonders = wonders.filter((w) => bookmarks.includes(w.id));
  const savedStories = stories.filter((s) => bookmarks.includes(s.id));
  const isEmpty = savedWonders.length === 0 && savedStories.length === 0;

  return (
    <div className="space-y-8">
      <div className="border-b border-[#E5DFD2] dark:border-[#23352E] pb-5">
        <h1
          className={`font-semibold text-[#1A221E] dark:text-[#F2EFE9] ${
            language === 'en'
              ? 'font-display text-3xl sm:text-4xl'
              : language === 'ur'
              ? 'font-urdu text-2xl sm:text-3xl leading-[2.1]'
              : 'font-arabic text-2xl sm:text-3xl leading-[1.8]'
          }`}
        >
          {ui.savedTitle}
        </h1>
      </div>

      {isEmpty ? (
        <div className="rounded-2xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] p-10 sm:p-14 text-center max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#F4EFE4] dark:bg-[#182822] border border-[#E5DFD2] dark:border-[#23352E] flex items-center justify-center mx-auto mb-4 text-emerald-800 dark:text-emerald-400">
            <Bookmark className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-semibold text-[#1A221E] dark:text-[#F2EFE9] mb-2">
            {ui.savedEmptyTitle}
          </h2>
          <p className="text-sm text-[#5A6560] dark:text-[#9BA8A2] leading-relaxed">
            {ui.savedEmptyDesc}
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {savedWonders.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-base font-semibold text-[#1A221E] dark:text-[#F2EFE9]">
                {ui.savedWondersHeading}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {savedWonders.map((wonder, index) => (
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
                      isBookmarked
                      onToggleBookmark={onToggleBookmark}
                      onShare={onShare}
                      onOpenSurah={onOpenSurah}
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {savedStories.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-base font-semibold text-[#1A221E] dark:text-[#F2EFE9]">
                {ui.savedStoriesHeading}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {savedStories.map((story, index) => (
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
                      isBookmarked
                      onToggleBookmark={onToggleBookmark}
                      onShare={onShare}
                      onOpenSurah={onOpenSurah}
                    />
                  </motion.div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
