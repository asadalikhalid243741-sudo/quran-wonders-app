import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  BookmarkCheck,
  Loader2,
  Minus,
  Play,
  Plus,
  RefreshCw,
  Search,
  Volume2,
} from 'lucide-react';
import type {
  AyahItem,
  Language,
  ReciterInfo,
  SurahInfo,
  SurahProgressMap,
  SurahProgressStatus,
  ThemeMode,
} from '../types';
import type { UIStrings } from '../data/translations';
import { fetchSurahVerses } from '../data/surahs';
import { AudioPlayer } from './AudioPlayer';
import { SurahProgressControl } from './SurahProgressControl';
import { TilawatProgressChart } from './TilawatProgressChart';

interface TilawatSectionProps {
  surahs: SurahInfo[];
  selectedSurahNumber: number | null;
  onSelectSurah: (surahNumber: number | null) => void;
  audioSurahNumber: number;
  onPlaySurah: (surahNumber: number) => void;
  reciter: ReciterInfo;
  reciters: ReciterInfo[];
  isPlaying: boolean;
  isBuffering: boolean;
  isRepeat: boolean;
  currentTime: number;
  duration: number;
  audioError: string | null;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onPrevSurah: () => void;
  onNextSurah: () => void;
  onToggleRepeat: () => void;
  onSelectReciter: (reciterId: string) => void;
  onRetryAudio: () => void;
  onSwitchNextReciter: () => void;
  surahProgress: SurahProgressMap;
  onUpdateSurahProgress: (
    surahNumber: number,
    status: SurahProgressStatus,
    lastAyah?: number
  ) => void;
  language: Language;
  theme: ThemeMode;
  ui: UIStrings;
}

export function TilawatSection({
  surahs,
  selectedSurahNumber,
  onSelectSurah,
  audioSurahNumber,
  onPlaySurah,
  reciter,
  reciters,
  isPlaying,
  isBuffering,
  isRepeat,
  currentTime,
  duration,
  audioError,
  onTogglePlay,
  onSeek,
  onPrevSurah,
  onNextSurah,
  onToggleRepeat,
  onSelectReciter,
  onRetryAudio,
  onSwitchNextReciter,
  surahProgress,
  onUpdateSurahProgress,
  language,
  theme,
  ui,
}: TilawatSectionProps) {
  const [search, setSearch] = useState('');
  const [revFilter, setRevFilter] = useState<'all' | 'Meccan' | 'Medinan'>('all');
  const [progressFilter, setProgressFilter] = useState<'all' | SurahProgressStatus>('all');

  const [arabicFontSize, setArabicFontSize] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('qw_arabic_font_size');
      return saved ? Math.min(44, Math.max(20, Number(saved))) : 28;
    } catch {
      return 28;
    }
  });
  const [showUrduKanzulIman, setShowUrduKanzulIman] = useState<boolean>(true);
  const [showEnglish, setShowEnglish] = useState<boolean>(language === 'en');

  const [verses, setVerses] = useState<AyahItem[]>([]);
  const [versesLoading, setVersesLoading] = useState(false);
  const [versesFallback, setVersesFallback] = useState(false);

  const selectedSurah = useMemo(
    () => surahs.find((s) => s.number === selectedSurahNumber) ?? null,
    [surahs, selectedSurahNumber]
  );

  const activeAudioSurah = useMemo(
    () => surahs.find((s) => s.number === audioSurahNumber) ?? surahs[0],
    [surahs, audioSurahNumber]
  );

  useEffect(() => {
    try {
      localStorage.setItem('qw_arabic_font_size', String(arabicFontSize));
    } catch {
      // ignore storage errors
    }
  }, [arabicFontSize]);

  useEffect(() => {
    if (!selectedSurahNumber) return;
    let cancelled = false;
    setVersesLoading(true);
    fetchSurahVerses(selectedSurahNumber).then((res) => {
      if (cancelled) return;
      setVerses(res.ayahs);
      setVersesFallback(res.isFallback);
      setVersesLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [selectedSurahNumber]);

  const reloadSelectedVerses = () => {
    if (!selectedSurahNumber) return;
    setVersesLoading(true);
    fetchSurahVerses(selectedSurahNumber).then((res) => {
      setVerses(res.ayahs);
      setVersesFallback(res.isFallback);
      setVersesLoading(false);
    });
  };

  const filteredSurahs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return surahs.filter((s) => {
      if (revFilter !== 'all' && s.revelationType !== revFilter) return false;
      const status = surahProgress[s.number]?.status ?? 'unread';
      if (progressFilter !== 'all' && status !== progressFilter) return false;
      if (!q) return true;
      return (
        String(s.number) === q ||
        s.nameEnglish.toLowerCase().includes(q) ||
        s.meaningEnglish.toLowerCase().includes(q) ||
        s.nameArabic.includes(q) ||
        s.nameUrdu.includes(q)
      );
    });
  }, [surahs, search, revFilter, progressFilter, surahProgress]);

  const isRtl = language !== 'en';
  const BackIcon = isRtl ? ArrowRight : ArrowLeft;

  // SURAH DETAIL / READER VIEW
  if (selectedSurah) {
    const progressEntry = surahProgress[selectedSurah.number];
    const currentStatus: SurahProgressStatus = progressEntry?.status ?? 'unread';
    const lastAyah = progressEntry?.lastAyah;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={`surah-detail-${selectedSurah.number}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
        {/* Top Detail Bar: Back + Progress Control */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => onSelectSurah(null)}
            className="min-h-[42px] px-3.5 py-2 rounded-xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] text-sm font-medium text-[#1A221E] dark:text-[#F2EFE9] hover:border-emerald-700/40 inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <BackIcon className="w-4 h-4" />
            <span>{ui.backToSurahs}</span>
          </button>

          <div className="flex flex-wrap items-center gap-3">
            {lastAyah && (
              <span className="text-xs font-medium text-[#8A6118] dark:text-[#E5BE53] tabular-nums">
                {ui.lastReadAyahLabel} {lastAyah} / {selectedSurah.versesCount}
              </span>
            )}
            <SurahProgressControl
              status={currentStatus}
              onChange={(next) => onUpdateSurahProgress(selectedSurah.number, next, lastAyah)}
              ui={ui}
            />
          </div>
        </div>

        {/* Audio Player synced to current Surah */}
        <AudioPlayer
          surah={activeAudioSurah}
          reciter={reciter}
          reciters={reciters}
          isPlaying={isPlaying}
          isBuffering={isBuffering}
          isRepeat={isRepeat}
          currentTime={currentTime}
          duration={duration}
          audioError={audioError}
          language={language}
          ui={ui}
          onTogglePlay={onTogglePlay}
          onSeek={onSeek}
          onPrevSurah={onPrevSurah}
          onNextSurah={onNextSurah}
          onToggleRepeat={onToggleRepeat}
          onSelectReciter={onSelectReciter}
          onRetryAudio={onRetryAudio}
          onSwitchNextReciter={onSwitchNextReciter}
        />

        {/* Surah Header & Reader Settings Toolbar */}
        <section className="rounded-2xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#EFEAE0] dark:border-[#1D2D27]">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#6B756F] dark:text-[#9BA8A2] mb-1.5">
                <span className="tabular-nums font-medium text-emerald-800 dark:text-emerald-400">
                  {ui.surahLabel} {selectedSurah.number}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {selectedSurah.revelationType === 'Meccan' ? ui.meccan : ui.medinan}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">
                  {selectedSurah.versesCount} {ui.versesCountLabel}
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h1 className="font-display text-3xl sm:text-4xl font-semibold text-[#1A221E] dark:text-[#F2EFE9]">
                  {selectedSurah.nameEnglish}
                </h1>
                <span className="text-sm text-[#5A6560] dark:text-[#9BA8A2]">
                  {selectedSurah.meaningEnglish}
                </span>
              </div>
              <p className="font-urdu text-lg text-[#4E5A54] dark:text-[#BAC6C0] mt-1">
                {selectedSurah.nameUrdu}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <p className="font-arabic text-3xl sm:text-4xl text-emerald-800 dark:text-emerald-300">
                {selectedSurah.nameArabic}
              </p>
              {audioSurahNumber !== selectedSurah.number && (
                <button
                  type="button"
                  onClick={() => onPlaySurah(selectedSurah.number)}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-[#0B1210] text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{ui.playAudio}</span>
                </button>
              )}
            </div>
          </div>

          {/* Reader Controls: Arabic Font Size (+/-) & Dawat-e-Islami Urdu Translation Switch */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Arabic Font Size +/- */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-[#5A6560] dark:text-[#9BA8A2]">
                {ui.arabicFontSize}
              </span>
              <div className="inline-flex items-center rounded-xl border border-[#E5DFD2] dark:border-[#23352E] bg-[#FBF9F4] dark:bg-[#0D1613] p-0.5">
                <button
                  type="button"
                  onClick={() => setArabicFontSize((s) => Math.max(20, s - 2))}
                  aria-label="Decrease Arabic font size"
                  className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-[#1A221E] dark:text-[#F2EFE9] hover:bg-[#EFECE3] dark:hover:bg-[#192A23] transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-2.5 text-xs font-medium tabular-nums text-[#4E5A54] dark:text-[#BAC6C0]">
                  {arabicFontSize}px
                </span>
                <button
                  type="button"
                  onClick={() => setArabicFontSize((s) => Math.min(44, s + 2))}
                  aria-label="Increase Arabic font size"
                  className="min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-[#1A221E] dark:text-[#F2EFE9] hover:bg-[#EFECE3] dark:hover:bg-[#192A23] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Translation Toggle Switches */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Dawat-e-Islami Urdu Translation Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={showUrduKanzulIman}
                onClick={() => setShowUrduKanzulIman((v) => !v)}
                className="min-h-[42px] flex items-center gap-3 px-3.5 py-2 rounded-xl border border-[#E5DFD2] dark:border-[#23352E] bg-[#FBF9F4] dark:bg-[#0D1613] hover:border-emerald-700/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <span
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                    showUrduKanzulIman
                      ? 'bg-emerald-800 dark:bg-emerald-500 justify-end'
                      : 'bg-[#D6CFC0] dark:bg-[#2A3B34] justify-start'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm" />
                </span>
                <div className="text-start">
                  <p className="text-xs font-semibold text-[#1A221E] dark:text-[#F2EFE9] whitespace-nowrap">
                    {ui.urduTranslationToggle}
                  </p>
                  <p className="text-[11px] text-[#6B756F] dark:text-[#9BA8A2] whitespace-nowrap">
                    {ui.urduTranslationSublabel}
                  </p>
                </div>
              </button>

              {/* English Translation Switch */}
              <button
                type="button"
                role="switch"
                aria-checked={showEnglish}
                onClick={() => setShowEnglish((v) => !v)}
                className="min-h-[42px] flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-[#E5DFD2] dark:border-[#23352E] bg-[#FBF9F4] dark:bg-[#0D1613] hover:border-emerald-700/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
              >
                <span
                  className={`w-10 h-6 rounded-full p-0.5 transition-colors flex items-center ${
                    showEnglish
                      ? 'bg-emerald-800 dark:bg-emerald-500 justify-end'
                      : 'bg-[#D6CFC0] dark:bg-[#2A3B34] justify-start'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-white shadow-sm" />
                </span>
                <span className="text-xs font-semibold text-[#1A221E] dark:text-[#F2EFE9] whitespace-nowrap">
                  {ui.englishTranslationToggle}
                </span>
              </button>
            </div>
          </div>

          {/* Bismillah Header (Omitted for Surah 9 At-Tawbah & Surah 1 where Ayah 1 is Bismillah) */}
          {selectedSurah.number !== 9 && selectedSurah.number !== 1 && (
            <div
              dir="rtl"
              lang="ar"
              className="py-5 text-center border-y border-[#EFEAE0] dark:border-[#1D2D27]"
            >
              <p className="font-arabic text-2xl sm:text-3xl text-emerald-900 dark:text-emerald-300">
                {ui.bismillah}
              </p>
            </div>
          )}

          {/* Verses List */}
          {versesLoading ? (
            <div className="py-12 flex flex-col items-center justify-center gap-3 text-[#5A6560] dark:text-[#9BA8A2]">
              <Loader2 className="w-6 h-6 animate-spin text-emerald-800 dark:text-emerald-400" />
              <p className="text-sm">{ui.loadingVerses}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {versesFallback && (
                <div className="rounded-xl border border-[#E5DFD2] dark:border-[#23352E] bg-[#F8F5ED] dark:bg-[#0E1814] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs text-[#5A6560] dark:text-[#9BA8A2]">
                    {ui.versesFallbackNotice}
                  </p>
                  <button
                    type="button"
                    onClick={reloadSelectedVerses}
                    className="min-h-[36px] px-3 py-1 rounded-lg border border-[#D8D0C0] dark:border-[#2A4037] text-xs font-medium text-[#1A221E] dark:text-[#F2EFE9] inline-flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>{ui.retryLoad}</span>
                  </button>
                </div>
              )}

              <div className="divide-y divide-[#EFEAE0] dark:divide-[#1D2D27]">
                {verses.map((ayah) => {
                  const isLastRead = lastAyah === ayah.numberInSurah;
                  const isFinalAyah = ayah.numberInSurah === selectedSurah.versesCount;
                  return (
                    <div
                      key={ayah.numberInSurah}
                      className={`py-6 first:pt-2 last:pb-2 transition-colors rounded-xl px-2 sm:px-4 ${
                        isLastRead ? 'bg-[#F6F1E5]/80 dark:bg-[#15241E]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#D8CEB8] dark:border-[#2A4037] text-xs font-semibold tabular-nums text-[#8A6118] dark:text-[#E5BE53]">
                          {ayah.numberInSurah}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            onUpdateSurahProgress(
                              selectedSurah.number,
                              isFinalAyah ? 'completed' : 'in_progress',
                              ayah.numberInSurah
                            )
                          }
                          title={ui.markLastAyah}
                          aria-label={`${ui.markLastAyah} ${ayah.numberInSurah}`}
                          className={`min-h-[38px] px-2.5 py-1 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                            isLastRead
                              ? 'text-[#8A6118] dark:text-[#E5BE53] bg-[#9A6E1F]/10 dark:bg-[#E5BE53]/15'
                              : 'text-[#6B756F] dark:text-[#8E9C95] hover:text-emerald-800 dark:hover:text-emerald-300'
                          }`}
                        >
                          <BookmarkCheck className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            {isLastRead ? ui.lastReadAyahLabel : ui.markLastAyah}
                          </span>
                        </button>
                      </div>

                      <p
                        dir="rtl"
                        lang="ar"
                        style={{ fontSize: `${arabicFontSize}px` }}
                        className="font-arabic text-right text-[#14201A] dark:text-[#F5F1E8] leading-[2.25] mb-4"
                      >
                        {ayah.arabic}
                      </p>

                      {showUrduKanzulIman && ayah.urduKanzulIman && (
                        <p
                          dir="rtl"
                          lang="ur"
                          className="font-urdu text-right text-base sm:text-lg text-[#2E3C35] dark:text-[#CFD9D4] leading-[2.45] mb-3"
                        >
                          {ayah.urduKanzulIman}
                        </p>
                      )}

                      {showEnglish && ayah.english && (
                        <p
                          dir="ltr"
                          lang="en"
                          className="text-sm sm:text-[15px] text-[#4E5A54] dark:text-[#9BA8A2] leading-relaxed"
                        >
                          {ayah.english}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
        </motion.div>
      </AnimatePresence>
    );
  }

  // DIRECTORY OF ALL 114 SURAHS
  return (
    <motion.div
      key="surah-directory"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-6"
    >
      {/* Persistent Audio Player */}
      <AudioPlayer
        surah={activeAudioSurah}
        reciter={reciter}
        reciters={reciters}
        isPlaying={isPlaying}
        isBuffering={isBuffering}
        isRepeat={isRepeat}
        currentTime={currentTime}
        duration={duration}
        audioError={audioError}
        language={language}
        ui={ui}
        onTogglePlay={onTogglePlay}
        onSeek={onSeek}
        onPrevSurah={onPrevSurah}
        onNextSurah={onNextSurah}
        onToggleRepeat={onToggleRepeat}
        onSelectReciter={onSelectReciter}
        onRetryAudio={onRetryAudio}
        onSwitchNextReciter={onSwitchNextReciter}
        onOpenSurahDetail={(num) => onSelectSurah(num)}
      />

      {/* Recharts Quran Progress Dashboard */}
      <TilawatProgressChart
        surahs={surahs}
        surahProgress={surahProgress}
        theme={theme}
        ui={ui}
      />

      {/* Search & Filters for 114 Surahs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Revelation Filter */}
          <div
            role="group"
            aria-label="Revelation type"
            className="inline-flex items-center p-1 rounded-xl bg-[#EFECE3] dark:bg-[#16241F] border border-[#E5DFD2] dark:border-[#23352E]"
          >
            {(
              [
                { id: 'all', label: ui.revelationFilterAll },
                { id: 'Meccan', label: ui.meccan },
                { id: 'Medinan', label: ui.medinan },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setRevFilter(opt.id)}
                className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  revFilter === opt.id
                    ? 'bg-white dark:bg-[#0B1210] text-emerald-900 dark:text-emerald-300 shadow-sm'
                    : 'text-[#5A6560] dark:text-[#9BA8A2] hover:text-[#1A221E] dark:hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Progress Filter */}
          <div
            role="group"
            aria-label={ui.progressTitle}
            className="inline-flex items-center p-1 rounded-xl bg-[#EFECE3] dark:bg-[#16241F] border border-[#E5DFD2] dark:border-[#23352E]"
          >
            {(
              [
                { id: 'all', label: ui.progressFilterAll },
                { id: 'in_progress', label: ui.progressInProgress },
                { id: 'completed', label: ui.progressCompleted },
                { id: 'unread', label: ui.progressUnread },
              ] as const
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setProgressFilter(opt.id)}
                className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  progressFilter === opt.id
                    ? 'bg-white dark:bg-[#0B1210] text-emerald-900 dark:text-emerald-300 shadow-sm'
                    : 'text-[#5A6560] dark:text-[#9BA8A2] hover:text-[#1A221E] dark:hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="w-4 h-4 text-[#6B756F] dark:text-[#9BA8A2] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={ui.searchSurahsPlaceholder}
            className="w-full min-h-[44px] ps-10 pe-4 py-2 rounded-xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] text-sm text-[#1A221E] dark:text-[#F2EFE9] placeholder:text-[#7A847E] focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>
      </div>

      {/* 114 Surahs Grid */}
      {filteredSurahs.length === 0 ? (
        <div className="rounded-2xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] p-10 text-center">
          <h3 className="text-base font-semibold text-[#1A221E] dark:text-[#F2EFE9] mb-1">
            {ui.noResultsTitle}
          </h3>
          <p className="text-sm text-[#5A6560] dark:text-[#9BA8A2]">{ui.noResultsDesc}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredSurahs.map((surah, index) => {
            const progress = surahProgress[surah.number];
            const status: SurahProgressStatus = progress?.status ?? 'unread';
            const isAudioActive = audioSurahNumber === surah.number;

            return (
              <motion.div
                key={surah.number}
                role="button"
                tabIndex={0}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.2,
                  delay: Math.min((index % 18) * 0.02, 0.22),
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -2 }}
                onClick={() => onSelectSurah(surah.number)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectSurah(surah.number);
                  }
                }}
                className={`group rounded-2xl border p-4 sm:p-5 text-start cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                  isAudioActive
                    ? 'border-emerald-700/60 dark:border-emerald-400/50 bg-white dark:bg-[#13221C]'
                    : 'border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] hover:border-[#C9BFA9] dark:hover:border-[#344E44]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <span className="w-10 h-10 rounded-xl bg-[#F4EFE4] dark:bg-[#182822] border border-[#E5DFD2] dark:border-[#23352E] flex items-center justify-center text-xs font-semibold tabular-nums text-emerald-900 dark:text-emerald-300 shrink-0">
                      {surah.number}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-[#1A221E] dark:text-[#F2EFE9] group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors truncate">
                        {language === 'ar'
                          ? surah.nameArabic
                          : language === 'ur'
                          ? surah.nameUrdu
                          : surah.nameEnglish}
                      </h3>
                      <p className="text-xs text-[#5A6560] dark:text-[#9BA8A2] truncate">
                        {language === 'en'
                          ? surah.meaningEnglish
                          : `${surah.nameEnglish} · ${surah.meaningEnglish}`}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#6B756F] dark:text-[#8E9C95] mt-1.5 tabular-nums">
                        <span>{surah.revelationType === 'Meccan' ? ui.meccan : ui.medinan}</span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {surah.versesCount} {ui.versesCountLabel}
                        </span>
                        {progress?.lastAyah && status === 'in_progress' && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-[#8A6118] dark:text-[#E5BE53] font-medium">
                              {ui.verseLabel} {progress.lastAyah}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="font-arabic text-xl text-emerald-900 dark:text-emerald-300 shrink-0">
                    {surah.nameArabic}
                  </p>
                </div>

                {/* Progress & Quick Play Action Row */}
                <div className="mt-4 pt-3 border-t border-[#F1ECE1] dark:border-[#1D2D27] flex items-center justify-between gap-2">
                  <SurahProgressControl
                    compact
                    status={status}
                    onChange={(nextStatus) =>
                      onUpdateSurahProgress(surah.number, nextStatus, progress?.lastAyah)
                    }
                    ui={ui}
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isAudioActive) {
                        onTogglePlay();
                      } else {
                        onPlaySurah(surah.number);
                      }
                    }}
                    aria-label={isAudioActive && isPlaying ? ui.pauseAudio : ui.playAudio}
                    className={`min-h-[38px] px-3 py-1.5 rounded-lg border text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                      isAudioActive && isPlaying
                        ? 'border-emerald-700 bg-emerald-800 text-white dark:bg-emerald-500 dark:text-[#0B1210]'
                        : 'border-[#E5DFD2] dark:border-[#23352E] text-[#4E5A54] dark:text-[#B4C0BB] hover:border-emerald-700/40 hover:text-emerald-800 dark:hover:text-emerald-300'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isAudioActive && isPlaying ? ui.pauseAudio : ui.playAudio}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
