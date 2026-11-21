import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { BookOpen, Bookmark, ChevronDown, Share2 } from 'lucide-react';
import type { Language, SharePayload, StoryItem } from '../types';
import type { UIStrings } from '../data/translations';

interface StoryCardProps {
  story: StoryItem;
  language: Language;
  ui: UIStrings;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onShare: (payload: SharePayload) => void;
  onOpenSurah?: (surahNumber: number) => void;
}

export function StoryCard({
  story,
  language,
  ui,
  isBookmarked,
  onToggleBookmark,
  onShare,
  onOpenSurah,
}: StoryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const surahText = `${ui.surahLabel} ${story.surahName[language]}`;

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] p-6 transition-colors hover:border-[#C9BFA9] dark:hover:border-[#344E44]">
      <div>
        {/* Clean Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#6B756F] dark:text-[#9BA8A2] mb-3">
          <span className="font-medium text-emerald-800 dark:text-emerald-400">
            {story.eraLabel[language]}
          </span>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={() => onOpenSurah?.(story.surahNumber)}
            className="hover:underline tabular-nums focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded"
          >
            {surahText} ({story.verseRef})
          </button>
        </div>

        {/* Title */}
        <h2
          className={`font-semibold text-[#1A221E] dark:text-[#F2EFE9] mb-4 ${
            language === 'en'
              ? 'font-display text-2xl leading-snug'
              : language === 'ur'
              ? 'font-urdu text-xl leading-[2.1]'
              : 'font-arabic text-xl leading-[1.9]'
          }`}
        >
          {story.title[language]}
        </h2>

        {/* Arabic Verse */}
        <div
          dir="rtl"
          lang="ar"
          className="rounded-xl bg-[#F8F5ED] dark:bg-[#0E1814] border border-[#EAE3D4] dark:border-[#1E2F29] px-4 py-4 mb-4"
        >
          <p className="font-arabic text-xl sm:text-2xl text-[#14201A] dark:text-[#F5F1E8] text-right leading-[2.2]">
            {story.arabicText}
          </p>
        </div>

        {/* Summary */}
        <p
          className={`text-[#3C4641] dark:text-[#C5D0CB] mb-3 ${
            language === 'ur'
              ? 'font-urdu text-base leading-[2.3]'
              : language === 'ar'
              ? 'font-arabic text-base leading-[2.0]'
              : 'text-[15px] leading-relaxed'
          }`}
        >
          {story.summary[language]}
        </p>

        {/* Expandable Deeper Context */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 pt-4 border-t border-[#EFEAE0] dark:border-[#1D2D27] space-y-3"
            >
              <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-400">
                {ui.deeperContextLabel}
              </p>
              <p
                className={`text-[#3C4641] dark:text-[#C5D0CB] ${
                  language === 'ur'
                    ? 'font-urdu text-base leading-[2.3]'
                    : language === 'ar'
                    ? 'font-arabic text-base leading-[2.0]'
                    : 'text-[14.5px] leading-relaxed'
                }`}
              >
                {story.detailedReflection[language]}
              </p>
              {onOpenSurah && (
                <button
                  type="button"
                  onClick={() => onOpenSurah(story.surahNumber)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 dark:text-emerald-300 hover:underline pt-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{ui.openSurahLink}</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pt-4 mt-4 border-t border-[#EFEAE0] dark:border-[#1D2D27] space-y-4">
        <p className="text-xs sm:text-sm text-[#8A6118] dark:text-[#E5BE53]">
          <span className="font-semibold">{ui.reflectionLabel}: </span>
          {story.lesson[language]}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="min-h-[40px] px-3 py-1.5 rounded-lg border border-[#E5DFD2] dark:border-[#23352E] text-xs font-medium text-emerald-900 dark:text-emerald-300 hover:bg-[#F4EFE4] dark:hover:bg-[#16241F] inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <span>{expanded ? ui.readLess : ui.readMore}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                expanded ? 'rotate-180' : ''
              }`}
            />
          </button>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleBookmark(story.id)}
              aria-pressed={isBookmarked}
              className={`min-h-[40px] px-3 py-1.5 rounded-lg border text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                isBookmarked
                  ? 'border-emerald-700 bg-emerald-800/10 text-emerald-900 dark:border-emerald-400/50 dark:bg-emerald-500/15 dark:text-emerald-300'
                  : 'border-[#E5DFD2] dark:border-[#23352E] text-[#4E5A54] dark:text-[#B4C0BB] hover:border-emerald-700/40'
              }`}
            >
              <Bookmark
                className="w-3.5 h-3.5"
                fill={isBookmarked ? 'currentColor' : 'none'}
              />
              <span>{isBookmarked ? ui.bookmarkSaved : ui.bookmarkSave}</span>
            </button>

            <button
              type="button"
              onClick={() =>
                onShare({
                  title: story.title[language],
                  surahLabel: surahText,
                  verseRef: story.verseRef,
                  arabicText: story.arabicText,
                  explanation: `${story.summary[language]}\n\n${story.detailedReflection[language]}`,
                  kindLabel: story.eraLabel[language],
                })
              }
              className="min-h-[40px] px-3 py-1.5 rounded-lg border border-[#E5DFD2] dark:border-[#23352E] text-xs font-medium text-[#4E5A54] dark:text-[#B4C0BB] hover:text-emerald-800 dark:hover:text-emerald-300 hover:border-emerald-700/40 inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{ui.shareCard}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
