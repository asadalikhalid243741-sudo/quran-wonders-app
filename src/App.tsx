import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { WifiOff } from 'lucide-react';
import { QURAN_STORIES } from './data/stories';
import { ALL_SURAHS, RECITERS } from './data/surahs';
import { UI_STRINGS } from './data/translations';
import { OPPOSITE_WORD_PAIRS } from './data/wordPairs';
import { QURAN_WONDERS } from './data/wonders';
import type {
  ActiveTab,
  Language,
  SharePayload,
  SurahProgressMap,
  SurahProgressStatus,
  ThemeMode,
} from './types';
import {
  loadEssentialContentFromStorage,
  syncEssentialContentToStorage,
} from './utils/offlineCache';
import { AudioPlayer } from './components/AudioPlayer';
import { Navbar } from './components/Navbar';
import { SavedSection } from './components/SavedSection';
import { ShareModal } from './components/ShareModal';
import { StoriesSection } from './components/StoriesSection';
import { TilawatSection } from './components/TilawatSection';
import { WondersSection } from './components/WondersSection';

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [language, setLanguage] = useState<Language>(() =>
    readStorage<Language>('qw_language', 'en')
  );
  const [theme, setTheme] = useState<ThemeMode>(() =>
    readStorage<ThemeMode>('qw_theme', 'light')
  );
  const [activeTab, setActiveTab] = useState<ActiveTab>('wonders');
  const [bookmarks, setBookmarks] = useState<string[]>(() =>
    readStorage<string[]>('qw_bookmarks', [])
  );
  const [surahProgress, setSurahProgress] = useState<SurahProgressMap>(() =>
    readStorage<SurahProgressMap>('qw_surah_progress', {})
  );
  const [sharePayload, setSharePayload] = useState<SharePayload | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // Hydrate essential text data from LocalStorage cache (and keep synced for offline access)
  const cachedContent = useMemo(
    () =>
      loadEssentialContentFromStorage(
        QURAN_WONDERS,
        QURAN_STORIES,
        OPPOSITE_WORD_PAIRS
      ),
    []
  );

  useEffect(() => {
    syncEssentialContentToStorage(
      QURAN_WONDERS,
      QURAN_STORIES,
      OPPOSITE_WORD_PAIRS
    );
  }, []);

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  // Tilawat & Audio state
  const [selectedSurahNumber, setSelectedSurahNumber] = useState<number | null>(null);
  const [audioSurahNumber, setAudioSurahNumber] = useState<number>(1);
  const [reciterId, setReciterId] = useState<string>(RECITERS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioError, setAudioError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isRepeatRef = useRef(isRepeat);
  isRepeatRef.current = isRepeat;

  const ui = UI_STRINGS[language];

  const currentReciter = useMemo(
    () => RECITERS.find((r) => r.id === reciterId) ?? RECITERS[0],
    [reciterId]
  );

  const activeAudioSurah = useMemo(
    () => ALL_SURAHS.find((s) => s.number === audioSurahNumber) ?? ALL_SURAHS[0],
    [audioSurahNumber]
  );

  // Sync document lang & dir (LTR for EN, RTL for UR/AR)
  useEffect(() => {
    const html = document.documentElement;
    html.lang = language;
    html.dir = language === 'en' ? 'ltr' : 'rtl';
    try {
      localStorage.setItem('qw_language', JSON.stringify(language));
    } catch {
      // ignore
    }
  }, [language]);

  // Sync Tailwind v4 dark class
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('dark', theme === 'dark');
    try {
      localStorage.setItem('qw_theme', JSON.stringify(theme));
    } catch {
      // ignore
    }
  }, [theme]);

  // Persist bookmarks & Surah reading progress
  useEffect(() => {
    try {
      localStorage.setItem('qw_bookmarks', JSON.stringify(bookmarks));
    } catch {
      // ignore
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('qw_surah_progress', JSON.stringify(surahProgress));
    } catch {
      // ignore
    }
  }, [surahProgress]);

  const loadAndPlay = useCallback(
    (surahNum: number, reciterObj = currentReciter, shouldAutoPlay = true) => {
      const audio = audioRef.current;
      if (!audio) return;

      setAudioError(null);
      setCurrentTime(0);
      setDuration(0);
      audio.src = reciterObj.getAudioUrl(surahNum);
      audio.load();

      if (shouldAutoPlay) {
        setIsBuffering(true);
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setIsBuffering(false);
          })
          .catch(() => {
            setIsPlaying(false);
            setIsBuffering(false);
            setAudioError('unavailable');
          });
      } else {
        setIsPlaying(false);
        setIsBuffering(false);
      }
    },
    [currentReciter]
  );

  // Initialize Audio element listeners once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audio.src = RECITERS[0].getAudioUrl(1);
    audioRef.current = audio;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime || 0);
    const onLoadedMetadata = () => setDuration(audio.duration || 0);
    const onWaiting = () => setIsBuffering(true);
    const onCanPlay = () => setIsBuffering(false);
    const onPlay = () => {
      setIsPlaying(true);
      setAudioError(null);
    };
    const onPause = () => setIsPlaying(false);
    const onError = () => {
      setIsPlaying(false);
      setIsBuffering(false);
      setAudioError('unavailable');
    };
    const onEnded = () => {
      if (isRepeatRef.current) {
        audio.currentTime = 0;
        audio.play().catch(() => setIsPlaying(false));
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const handleTogglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      return;
    }

    setAudioError(null);
    setIsBuffering(true);
    if (!audio.src || audio.error) {
      audio.src = currentReciter.getAudioUrl(audioSurahNumber);
      audio.load();
    }
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
        setIsBuffering(false);
      })
      .catch(() => {
        setIsPlaying(false);
        setIsBuffering(false);
        setAudioError('unavailable');
      });
  };

  const handlePlaySurah = (surahNum: number) => {
    setAudioSurahNumber(surahNum);
    loadAndPlay(surahNum, currentReciter, true);
  };

  const handleSeek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handlePrevSurah = () => {
    if (audioSurahNumber <= 1) return;
    const prev = audioSurahNumber - 1;
    setAudioSurahNumber(prev);
    if (selectedSurahNumber !== null) setSelectedSurahNumber(prev);
    loadAndPlay(prev, currentReciter, isPlaying);
  };

  const handleNextSurah = () => {
    if (audioSurahNumber >= 114) return;
    const next = audioSurahNumber + 1;
    setAudioSurahNumber(next);
    if (selectedSurahNumber !== null) setSelectedSurahNumber(next);
    loadAndPlay(next, currentReciter, isPlaying);
  };

  const handleSelectReciter = (nextId: string) => {
    const rec = RECITERS.find((r) => r.id === nextId) ?? RECITERS[0];
    setReciterId(rec.id);
    loadAndPlay(audioSurahNumber, rec, isPlaying);
  };

  const handleSwitchNextReciter = () => {
    const idx = RECITERS.findIndex((r) => r.id === reciterId);
    const nextReciter = RECITERS[(idx + 1) % RECITERS.length];
    setReciterId(nextReciter.id);
    loadAndPlay(audioSurahNumber, nextReciter, true);
  };

  const handleRetryAudio = () => {
    loadAndPlay(audioSurahNumber, currentReciter, true);
  };

  const handleToggleBookmark = (id: string) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleUpdateSurahProgress = (
    surahNumber: number,
    status: SurahProgressStatus,
    lastAyah?: number
  ) => {
    setSurahProgress((prev) => {
      if (status === 'unread') {
        const copy = { ...prev };
        delete copy[surahNumber];
        return copy;
      }
      return {
        ...prev,
        [surahNumber]: {
          status,
          lastAyah: status === 'completed' ? undefined : lastAyah ?? prev[surahNumber]?.lastAyah,
          updatedAt: Date.now(),
        },
      };
    });
  };

  const handleOpenSurahFromContent = (surahNumber: number) => {
    setSelectedSurahNumber(surahNumber);
    setAudioSurahNumber(surahNumber);
    setActiveTab('tilawat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-[#1A221E] dark:bg-[#0B1210] dark:text-[#F2EFE9] pb-20 md:pb-0">
      <Navbar
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        toggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        savedCount={bookmarks.length}
        ui={ui}
      />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        {/* Clean Offline Mode Banner when connection is unavailable */}
        {!isOnline && (
          <div
            role="status"
            className="rounded-xl border border-[#D8CEB8] dark:border-[#2E4239] bg-[#F5EFE1] dark:bg-[#13221C] px-4 py-2.5 flex items-center gap-2.5 text-xs font-medium text-[#5A4618] dark:text-[#E5BE53]"
          >
            <WifiOff className="w-4 h-4 shrink-0" />
            <span>{ui.offlineNotice}</span>
          </div>
        )}

        {/* Inline mini-player shown when listening while browsing Wonders/Stories/Saved */}
        {activeTab !== 'tilawat' && (isPlaying || currentTime > 0) && (
          <AudioPlayer
            compactMini
            surah={activeAudioSurah}
            reciter={currentReciter}
            reciters={RECITERS}
            isPlaying={isPlaying}
            isBuffering={isBuffering}
            isRepeat={isRepeat}
            currentTime={currentTime}
            duration={duration}
            audioError={audioError}
            language={language}
            ui={ui}
            onTogglePlay={handleTogglePlay}
            onSeek={handleSeek}
            onPrevSurah={handlePrevSurah}
            onNextSurah={handleNextSurah}
            onToggleRepeat={() => setIsRepeat((r) => !r)}
            onSelectReciter={handleSelectReciter}
            onRetryAudio={handleRetryAudio}
            onSwitchNextReciter={handleSwitchNextReciter}
            onOpenSurahDetail={(num) => {
              setSelectedSurahNumber(num);
              setActiveTab('tilawat');
            }}
          />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'wonders' && (
              <WondersSection
                wonders={cachedContent.wonders}
                wordPairs={cachedContent.wordPairs}
                language={language}
                ui={ui}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onShare={setSharePayload}
                onNavigateToTilawat={() => setActiveTab('tilawat')}
                onOpenSurah={handleOpenSurahFromContent}
              />
            )}

            {activeTab === 'stories' && (
              <StoriesSection
                stories={cachedContent.stories}
                language={language}
                ui={ui}
                bookmarks={bookmarks}
                onToggleBookmark={handleToggleBookmark}
                onShare={setSharePayload}
                onOpenSurah={handleOpenSurahFromContent}
              />
            )}

            {activeTab === 'tilawat' && (
              <TilawatSection
                surahs={ALL_SURAHS}
                selectedSurahNumber={selectedSurahNumber}
                onSelectSurah={(num) => {
                  setSelectedSurahNumber(num);
                  if (num !== null && !isPlaying) {
                    setAudioSurahNumber(num);
                    loadAndPlay(num, currentReciter, false);
                  }
                }}
                audioSurahNumber={audioSurahNumber}
                onPlaySurah={handlePlaySurah}
                reciter={currentReciter}
                reciters={RECITERS}
                isPlaying={isPlaying}
                isBuffering={isBuffering}
                isRepeat={isRepeat}
                currentTime={currentTime}
                duration={duration}
                audioError={audioError}
                onTogglePlay={handleTogglePlay}
                onSeek={handleSeek}
                onPrevSurah={handlePrevSurah}
                onNextSurah={handleNextSurah}
                onToggleRepeat={() => setIsRepeat((r) => !r)}
                onSelectReciter={handleSelectReciter}
                onRetryAudio={handleRetryAudio}
                onSwitchNextReciter={handleSwitchNextReciter}
                surahProgress={surahProgress}
                onUpdateSurahProgress={handleUpdateSurahProgress}
                language={language}
                theme={theme}
                ui={ui}
              />
            )}

            {activeTab === 'saved' && (
              <SavedSection
                wonders={cachedContent.wonders}
                stories={cachedContent.stories}
                bookmarks={bookmarks}
                language={language}
                ui={ui}
                onToggleBookmark={handleToggleBookmark}
                onShare={setSharePayload}
                onOpenSurah={handleOpenSurahFromContent}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-[#E5DFD2] dark:border-[#23352E] py-6 px-4 text-center text-xs text-[#6B756F] dark:text-[#8E9C95]">
        {ui.footerNote}
      </footer>

      <ShareModal
        payload={sharePayload}
        language={language}
        ui={ui}
        onClose={() => setSharePayload(null)}
      />
    </div>
    </MotionConfig>
  );
}
