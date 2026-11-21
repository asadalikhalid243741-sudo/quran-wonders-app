import { useMemo, useState } from 'react';
import { ArrowLeftRight, Search } from 'lucide-react';
import type { Language, OppositeWordPair } from '../types';
import type { UIStrings } from '../data/translations';

interface OppositeWordsTableProps {
  pairs: OppositeWordPair[];
  language: Language;
  ui: UIStrings;
  onOpenSurah: (surahNumber: number) => void;
}

export function OppositeWordsTable({
  pairs,
  language,
  ui,
  onOpenSurah,
}: OppositeWordsTableProps) {
  const [search, setSearch] = useState('');

  const filteredPairs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return pairs;
    return pairs.filter((pair) => {
      return (
        pair.wordArabic.includes(q) ||
        pair.oppositeArabic.includes(q) ||
        pair.wordLabel[language].toLowerCase().includes(q) ||
        pair.oppositeLabel[language].toLowerCase().includes(q) ||
        pair.correlationNote[language].toLowerCase().includes(q) ||
        String(pair.equalCount) === q ||
        pair.ayahRefs.some((r) => r.ref.toLowerCase().includes(q))
      );
    });
  }, [pairs, search, language]);

  return (
    <section
      aria-label={ui.wordPairsTitle}
      className="rounded-2xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] p-5 sm:p-7 space-y-5"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 dark:text-emerald-400">
            <ArrowLeftRight className="w-3.5 h-3.5" />
            <span>{ui.filterLanguage}</span>
          </div>
          <h2
            className={`font-semibold text-[#1A221E] dark:text-[#F2EFE9] ${
              language === 'en'
                ? 'font-display text-2xl sm:text-3xl'
                : language === 'ur'
                ? 'font-urdu text-xl sm:text-2xl leading-[2.1]'
                : 'font-arabic text-xl sm:text-2xl leading-[1.8]'
            }`}
          >
            {ui.wordPairsTitle}
          </h2>
          <p
            className={`text-xs sm:text-sm text-[#5A6560] dark:text-[#9BA8A2] ${
              language === 'ur' ? 'font-urdu text-sm leading-[2.2]' : ''
            }`}
          >
            {ui.wordPairsSubtitle}
          </p>
        </div>

        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-[#6B756F] dark:text-[#9BA8A2] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={ui.wordPairsSearchPlaceholder}
            className="w-full min-h-[42px] ps-10 pe-4 py-2 rounded-xl border border-[#E5DFD2] dark:border-[#23352E] bg-[#FBF9F4] dark:bg-[#0D1613] text-sm text-[#1A221E] dark:text-[#F2EFE9] placeholder:text-[#7A847E] focus:outline-none focus:ring-2 focus:ring-emerald-700"
          />
        </div>
      </div>

      {filteredPairs.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm font-medium text-[#1A221E] dark:text-[#F2EFE9]">
            {ui.noResultsTitle}
          </p>
          <p className="text-xs text-[#5A6560] dark:text-[#9BA8A2] mt-1">{ui.noResultsDesc}</p>
        </div>
      ) : (
        <div className="overflow-x-auto -mx-2 px-2">
          <table className="w-full border-collapse text-start min-w-[760px]">
            <thead>
              <tr className="border-b border-[#E5DFD2] dark:border-[#23352E] text-xs font-semibold text-[#5A6560] dark:text-[#9BA8A2]">
                <th className="py-3 pe-3 text-start w-10">#</th>
                <th className="py-3 px-3 text-start">{ui.colWordOne}</th>
                <th className="py-3 px-3 text-start">{ui.colWordOpposite}</th>
                <th className="py-3 px-3 text-start whitespace-nowrap">{ui.colOccurrences}</th>
                <th className="py-3 px-3 text-start">{ui.colAyahRefs}</th>
                <th className="py-3 ps-3 text-start">{ui.colCorrelation}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFEAE0] dark:divide-[#1D2D27] text-sm">
              {filteredPairs.map((pair, idx) => (
                <tr
                  key={pair.id}
                  className="hover:bg-[#FAF7F0] dark:hover:bg-[#15241E]/70 transition-colors align-top"
                >
                  <td className="py-4 pe-3 text-xs font-medium text-[#6B756F] dark:text-[#8E9C95] tabular-nums">
                    {idx + 1}
                  </td>

                  <td className="py-4 px-3">
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-xl text-emerald-900 dark:text-emerald-300 leading-normal"
                    >
                      {pair.wordArabic}
                    </p>
                    <p className="text-xs text-[#5A6560] dark:text-[#9BA8A2] mt-0.5">
                      {pair.wordLabel[language]}
                    </p>
                  </td>

                  <td className="py-4 px-3">
                    <p
                      dir="rtl"
                      lang="ar"
                      className="font-arabic text-xl text-[#8A6118] dark:text-[#E5BE53] leading-normal"
                    >
                      {pair.oppositeArabic}
                    </p>
                    <p className="text-xs text-[#5A6560] dark:text-[#9BA8A2] mt-0.5">
                      {pair.oppositeLabel[language]}
                    </p>
                  </td>

                  <td className="py-4 px-3 whitespace-nowrap">
                    <span className="text-base font-semibold text-[#1A221E] dark:text-[#F2EFE9] tabular-nums">
                      {pair.equalCount}
                    </span>
                    <span className="text-xs text-[#6B756F] dark:text-[#9BA8A2] ms-1.5">
                      {ui.timesEachSuffix}
                    </span>
                  </td>

                  <td className="py-4 px-3">
                    <div className="flex flex-wrap gap-1.5">
                      {pair.ayahRefs.map((refObj) => (
                        <button
                          key={refObj.ref}
                          type="button"
                          onClick={() => onOpenSurah(refObj.surahNumber)}
                          className="px-2 py-1 rounded-md border border-[#E5DFD2] dark:border-[#23352E] bg-[#FBF9F4] dark:bg-[#0D1613] text-xs font-medium tabular-nums text-emerald-800 dark:text-emerald-300 hover:border-emerald-700/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                        >
                          {refObj.ref}
                        </button>
                      ))}
                    </div>
                  </td>

                  <td
                    className={`py-4 ps-3 text-xs sm:text-[13px] text-[#3C4641] dark:text-[#C5D0CB] max-w-xs ${
                      language === 'ur'
                        ? 'font-urdu text-sm leading-[2.15]'
                        : 'leading-relaxed'
                    }`}
                  >
                    {pair.correlationNote[language]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
