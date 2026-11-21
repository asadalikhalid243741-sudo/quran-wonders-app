import { BookOpen, Bookmark, Compass, Moon, ScrollText, Sun } from 'lucide-react';
import type { ActiveTab, Language, ThemeMode } from '../types';
import type { UIStrings } from '../data/translations';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  savedCount: number;
  ui: UIStrings;
}

export function Navbar({
  language,
  setLanguage,
  theme,
  toggleTheme,
  activeTab,
  setActiveTab,
  savedCount,
  ui,
}: NavbarProps) {
  const navItems: Array<{ id: ActiveTab; label: string; icon: typeof Compass }> = [
    { id: 'wonders', label: ui.navWonders, icon: Compass },
    { id: 'stories', label: ui.navStories, icon: ScrollText },
    { id: 'tilawat', label: ui.navTilawat, icon: BookOpen },
    {
      id: 'saved',
      label: savedCount > 0 ? `${ui.navSaved} (${savedCount})` : ui.navSaved,
      icon: Bookmark,
    },
  ];

  const langOptions: Array<{ code: Language; label: string }> = [
    { code: 'en', label: 'EN' },
    { code: 'ur', label: 'اردو' },
    { code: 'ar', label: 'عربي' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 h-14 md:h-16 border-b border-[#E5DFD2] dark:border-[#23352E] bg-[#FBF9F4]/92 dark:bg-[#0B1210]/92 backdrop-blur-md">
        <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <button
            type="button"
            onClick={() => setActiveTab('wonders')}
            className={`text-start font-semibold tracking-tight text-[#1A221E] dark:text-[#F2EFE9] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-md px-1 py-1 ${
              language === 'en' ? 'font-display text-xl md:text-2xl' : 'text-lg md:text-xl'
            }`}
          >
            {ui.appTitle}
          </button>

          {/* Zone 2: Desktop Single-Line Navigation Links */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded ${
                    isActive
                      ? 'text-emerald-800 dark:text-emerald-300'
                      : 'text-[#5A6560] dark:text-[#9BA8A2] hover:text-[#1A221E] dark:hover:text-[#F2EFE9]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-[1px] h-0.5 bg-emerald-800 dark:bg-emerald-400 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language Switcher & Theme Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              role="group"
              aria-label="Language selector"
              className="flex items-center p-0.5 rounded-lg bg-[#EFECE3] dark:bg-[#16241F] border border-[#E5DFD2] dark:border-[#23352E]"
            >
              {langOptions.map((opt) => {
                const active = language === opt.code;
                return (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => setLanguage(opt.code)}
                    aria-pressed={active}
                    className={`min-h-[34px] px-2.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                      active
                        ? 'bg-emerald-800 text-white dark:bg-emerald-500 dark:text-[#0B1210]'
                        : 'text-[#4E5A54] dark:text-[#A9B5B0] hover:text-[#1A221E] dark:hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? ui.toggleLight : ui.toggleDark}
              title={theme === 'dark' ? ui.toggleLight : ui.toggleDark}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg border border-[#E5DFD2] dark:border-[#23352E] bg-white/70 dark:bg-[#16241F] text-[#1A221E] dark:text-[#F2EFE9] hover:border-emerald-700/40 dark:hover:border-emerald-400/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#E5BE53]" /> : <Moon className="w-4 h-4 text-emerald-800" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 h-16 bg-[#FBF9F4]/95 dark:bg-[#0B1210]/95 backdrop-blur-md border-t border-[#E5DFD2] dark:border-[#23352E]"
      >
        <div className="grid grid-cols-4 h-full max-w-md mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`min-h-[44px] flex flex-col items-center justify-center gap-0.5 px-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
                  isActive
                    ? 'text-emerald-800 dark:text-emerald-400 font-semibold'
                    : 'text-[#5A6560] dark:text-[#9BA8A2]'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2.2 : 1.75} />
                <span className="text-[11px] leading-tight whitespace-nowrap truncate max-w-full">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
