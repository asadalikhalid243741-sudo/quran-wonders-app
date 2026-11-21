import {
  AlertCircle,
  Loader2,
  Pause,
  Play,
  RefreshCw,
  Repeat,
  SkipBack,
  SkipForward,
  Volume2,
} from 'lucide-react';
import type { Language, ReciterInfo, SurahInfo } from '../types';
import type { UIStrings } from '../data/translations';

interface AudioPlayerProps {
  surah: SurahInfo;
  reciter: ReciterInfo;
  reciters: ReciterInfo[];
  isPlaying: boolean;
  isBuffering: boolean;
  isRepeat: boolean;
  currentTime: number;
  duration: number;
  audioError: string | null;
  language: Language;
  ui: UIStrings;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onPrevSurah: () => void;
  onNextSurah: () => void;
  onToggleRepeat: () => void;
  onSelectReciter: (reciterId: string) => void;
  onRetryAudio: () => void;
  onSwitchNextReciter: () => void;
  onOpenSurahDetail?: (surahNumber: number) => void;
  compactMini?: boolean;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const hrs = Math.floor(mins / 60);
  const remMins = mins % 60;
  if (hrs > 0) {
    return `${hrs}:${String(remMins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${String(remMins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function AudioPlayer({
  surah,
  reciter,
  reciters,
  isPlaying,
  isBuffering,
  isRepeat,
  currentTime,
  duration,
  audioError,
  language,
  ui,
  onTogglePlay,
  onSeek,
  onPrevSurah,
  onNextSurah,
  onToggleRepeat,
  onSelectReciter,
  onRetryAudio,
  onSwitchNextReciter,
  onOpenSurahDetail,
  compactMini = false,
}: AudioPlayerProps) {
  const isRtl = language !== 'en';
  const PrevIcon = isRtl ? SkipForward : SkipBack;
  const NextIcon = isRtl ? SkipBack : SkipForward;

  const surahDisplayName =
    language === 'ar'
      ? surah.nameArabic
      : language === 'ur'
      ? surah.nameUrdu
      : `${surah.number}. ${surah.nameEnglish}`;

  if (compactMini) {
    return (
      <div className="rounded-xl border border-[#E5DFD2] dark:border-[#23352E] bg-white/95 dark:bg-[#111C18]/95 backdrop-blur-md px-4 py-2.5 flex items-center justify-between gap-3 shadow-sm">
        <button
          type="button"
          onClick={() => onOpenSurahDetail?.(surah.number)}
          className="flex items-center gap-3 min-w-0 text-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded"
        >
          <Volume2 className="w-4 h-4 text-emerald-800 dark:text-emerald-400 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-[#1A221E] dark:text-[#F2EFE9] truncate">
              {surahDisplayName}
            </p>
            <p className="text-xs text-[#5A6560] dark:text-[#9BA8A2] truncate">
              {reciter.name[language]} · <span className="tabular-nums">{formatTime(currentTime)}</span>
            </p>
          </div>
        </button>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onPrevSurah}
            disabled={surah.number <= 1}
            aria-label={ui.previousSurah}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-[#4E5A54] dark:text-[#B4C0BB] hover:bg-[#EFECE3] dark:hover:bg-[#1C2D26] disabled:opacity-40 transition-colors"
          >
            <PrevIcon className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? ui.pauseAudio : ui.playAudio}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg bg-emerald-800 text-white dark:bg-emerald-500 dark:text-[#0B1210] transition-colors"
          >
            {isBuffering ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </button>

          <button
            type="button"
            onClick={onNextSurah}
            disabled={surah.number >= 114}
            aria-label={ui.nextSurah}
            className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg text-[#4E5A54] dark:text-[#B4C0BB] hover:bg-[#EFECE3] dark:hover:bg-[#1C2D26] disabled:opacity-40 transition-colors"
          >
            <NextIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="Tilawat Audio Player"
      className="rounded-2xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] p-5 sm:p-6 space-y-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-xs text-[#9A6E1F] dark:text-[#E5BE53] font-medium mb-1">
            <span>{ui.navTilawat}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {surah.number} / 114
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-lg sm:text-xl font-semibold text-[#1A221E] dark:text-[#F2EFE9]">
              {surahDisplayName}
            </h2>
            <span className="font-arabic text-xl text-emerald-800 dark:text-emerald-400">
              {surah.nameArabic}
            </span>
          </div>
        </div>

        {/* Reciter Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <label
            htmlFor="reciter-select"
            className="text-xs font-medium text-[#5A6560] dark:text-[#9BA8A2] whitespace-nowrap"
          >
            {ui.reciterLabel}
          </label>
          <select
            id="reciter-select"
            value={reciter.id}
            onChange={(e) => onSelectReciter(e.target.value)}
            className="min-h-[42px] px-3 py-1.5 rounded-xl border border-[#E5DFD2] dark:border-[#23352E] bg-[#FBF9F4] dark:bg-[#0D1613] text-xs sm:text-sm text-[#1A221E] dark:text-[#F2EFE9] focus:outline-none focus:ring-2 focus:ring-emerald-700"
          >
            {reciters.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name[language]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audio Error Handling Banner */}
      {audioError && (
        <div
          role="alert"
          className="rounded-xl border border-amber-300 dark:border-amber-700/50 bg-amber-50/90 dark:bg-amber-950/35 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div className="flex items-start gap-2.5 text-amber-950 dark:text-amber-200">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-700 dark:text-amber-400" />
            <div>
              <p className="text-sm font-semibold">{ui.audioErrorTitle}</p>
              <p className="text-xs opacity-90 mt-0.5">{ui.audioErrorMessage}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onRetryAudio}
              className="min-h-[38px] px-3 py-1.5 rounded-lg border border-amber-400/60 dark:border-amber-600/60 text-xs font-medium text-amber-950 dark:text-amber-100 hover:bg-amber-100 dark:hover:bg-amber-900/40 inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{ui.retryAudio}</span>
            </button>
            <button
              type="button"
              onClick={onSwitchNextReciter}
              className="min-h-[38px] px-3 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white text-xs font-medium whitespace-nowrap"
            >
              {ui.switchReciter}
            </button>
          </div>
        </div>
      )}

      {/* Timeline Scrubber */}
      <div className="space-y-1.5">
        <input
          type="range"
          min={0}
          max={duration > 0 ? duration : 100}
          value={duration > 0 ? currentTime : 0}
          disabled={duration <= 0}
          aria-label="Audio timeline"
          onChange={(e) => onSeek(Number(e.target.value))}
          style={{
            background:
              duration > 0
                ? `linear-gradient(to ${isRtl ? 'left' : 'right'}, #065f46 ${(currentTime / duration) * 100}%, rgba(140, 150, 145, 0.28) ${(currentTime / duration) * 100}%)`
                : 'rgba(140, 150, 145, 0.25)',
          }}
          className="quran-slider w-full h-1.5 rounded-full"
        />
        <div className="flex items-center justify-between text-xs text-[#6B756F] dark:text-[#9BA8A2] tabular-nums">
          <span>{formatTime(currentTime)}</span>
          <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
        </div>
      </div>

      {/* Transport Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrevSurah}
            disabled={surah.number <= 1}
            aria-label={ui.previousSurah}
            title={ui.previousSurah}
            className="min-h-[44px] px-3 rounded-xl border border-[#E5DFD2] dark:border-[#23352E] text-[#3C4641] dark:text-[#C5D0CB] hover:border-emerald-700/40 disabled:opacity-40 inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <PrevIcon className="w-4 h-4" />
            <span className="hidden sm:inline">{ui.previousSurah}</span>
          </button>

          <button
            type="button"
            onClick={onTogglePlay}
            className="min-h-[44px] px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-[#0B1210] text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            {isBuffering ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            <span>{isPlaying ? ui.pauseAudio : ui.playAudio}</span>
          </button>

          <button
            type="button"
            onClick={onNextSurah}
            disabled={surah.number >= 114}
            aria-label={ui.nextSurah}
            title={ui.nextSurah}
            className="min-h-[44px] px-3 rounded-xl border border-[#E5DFD2] dark:border-[#23352E] text-[#3C4641] dark:text-[#C5D0CB] hover:border-emerald-700/40 disabled:opacity-40 inline-flex items-center gap-1.5 text-xs font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
          >
            <span className="hidden sm:inline">{ui.nextSurah}</span>
            <NextIcon className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={onToggleRepeat}
          aria-pressed={isRepeat}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
            isRepeat
              ? 'border-emerald-700 bg-emerald-800/10 text-emerald-900 dark:border-emerald-400/50 dark:bg-emerald-500/15 dark:text-emerald-300'
              : 'border-[#E5DFD2] dark:border-[#23352E] text-[#5A6560] dark:text-[#9BA8A2] hover:border-emerald-700/40'
          }`}
        >
          <Repeat className="w-3.5 h-3.5" />
          <span>{isRepeat ? ui.repeatOn : ui.repeatOff}</span>
        </button>
      </div>
    </section>
  );
}
