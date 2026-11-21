import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { SurahInfo, SurahProgressMap, ThemeMode } from '../types';
import type { UIStrings } from '../data/translations';

interface TilawatProgressChartProps {
  surahs: SurahInfo[];
  surahProgress: SurahProgressMap;
  theme: ThemeMode;
  ui: UIStrings;
}

interface ChartDatum {
  name: string;
  completed: number;
  inProgress: number;
  remaining: number;
  total: number;
}

export function TilawatProgressChart({
  surahs,
  surahProgress,
  theme,
  ui,
}: TilawatProgressChartProps) {
  const [chartMode, setChartMode] = useState<'overview' | 'sections'>('overview');

  const summary = useMemo(() => {
    let completed = 0;
    let inProgress = 0;
    let meccanCompleted = 0;
    let meccanInProgress = 0;
    let medinanCompleted = 0;
    let medinanInProgress = 0;

    for (const s of surahs) {
      const status = surahProgress[s.number]?.status ?? 'unread';
      if (status === 'completed') {
        completed++;
        if (s.revelationType === 'Meccan') meccanCompleted++;
        else medinanCompleted++;
      } else if (status === 'in_progress') {
        inProgress++;
        if (s.revelationType === 'Meccan') meccanInProgress++;
        else medinanInProgress++;
      }
    }

    const total = surahs.length;
    const remaining = total - completed - inProgress;
    const percent = Math.round((completed / total) * 100);

    return {
      total,
      completed,
      inProgress,
      remaining,
      percent,
      meccanCompleted,
      meccanInProgress,
      medinanCompleted,
      medinanInProgress,
    };
  }, [surahs, surahProgress]);

  const overviewData: ChartDatum[] = useMemo(() => {
    const meccanTotal = 86;
    const medinanTotal = 28;
    return [
      {
        name: ui.all114Surahs,
        completed: summary.completed,
        inProgress: summary.inProgress,
        remaining: Math.max(0, summary.total - summary.completed - summary.inProgress),
        total: summary.total,
      },
      {
        name: ui.meccan,
        completed: summary.meccanCompleted,
        inProgress: summary.meccanInProgress,
        remaining: Math.max(0, meccanTotal - summary.meccanCompleted - summary.meccanInProgress),
        total: meccanTotal,
      },
      {
        name: ui.medinan,
        completed: summary.medinanCompleted,
        inProgress: summary.medinanInProgress,
        remaining: Math.max(0, medinanTotal - summary.medinanCompleted - summary.medinanInProgress),
        total: medinanTotal,
      },
    ];
  }, [summary, ui]);

  // 6 equal ranges of 19 Surahs each (6 x 19 = 114 Surahs)
  const sectionsData: ChartDatum[] = useMemo(() => {
    const ranges = [
      [1, 19],
      [20, 38],
      [39, 57],
      [58, 76],
      [77, 95],
      [96, 114],
    ] as const;

    return ranges.map(([start, end]) => {
      let comp = 0;
      let prog = 0;
      const total = end - start + 1;
      for (let n = start; n <= end; n++) {
        const st = surahProgress[n]?.status ?? 'unread';
        if (st === 'completed') comp++;
        else if (st === 'in_progress') prog++;
      }
      return {
        name: `${start}–${end}`,
        completed: comp,
        inProgress: prog,
        remaining: Math.max(0, total - comp - prog),
        total,
      };
    });
  }, [surahProgress]);

  const activeData = chartMode === 'overview' ? overviewData : sectionsData;
  const isDark = theme === 'dark';

  const colors = {
    completed: isDark ? '#10B981' : '#065F46',
    inProgress: isDark ? '#E5BE53' : '#B4832C',
    remaining: isDark ? '#23352E' : '#E5DFD2',
    grid: isDark ? '#1E2F28' : '#EFEAE0',
    axisText: isDark ? '#9BA8A2' : '#5A6560',
  };

  return (
    <section
      aria-label={ui.progressTitle}
      className="rounded-2xl border border-[#E5DFD2] dark:border-[#23352E] bg-white dark:bg-[#111C18] p-5 sm:p-6 space-y-5"
    >
      {/* Top Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-[#1A221E] dark:text-[#F2EFE9]">
            {ui.progressTitle}
          </h2>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#6B756F] dark:text-[#9BA8A2] mt-1 tabular-nums">
            <span className="font-semibold text-emerald-800 dark:text-emerald-400">
              {summary.completed} / {summary.total} {ui.progressCompletedCount} ({summary.percent}%)
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {summary.inProgress} {ui.progressInProgressCount}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              {summary.remaining} {ui.progressRemaining}
            </span>
          </div>
        </div>

        <div
          role="group"
          aria-label="Chart view"
          className="inline-flex items-center p-1 rounded-xl bg-[#EFECE3] dark:bg-[#16241F] border border-[#E5DFD2] dark:border-[#23352E] w-fit"
        >
          <button
            type="button"
            onClick={() => setChartMode('overview')}
            aria-pressed={chartMode === 'overview'}
            className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              chartMode === 'overview'
                ? 'bg-white dark:bg-[#0B1210] text-emerald-900 dark:text-emerald-300 shadow-sm'
                : 'text-[#5A6560] dark:text-[#9BA8A2] hover:text-[#1A221E] dark:hover:text-white'
            }`}
          >
            {ui.chartViewByRevelation}
          </button>
          <button
            type="button"
            onClick={() => setChartMode('sections')}
            aria-pressed={chartMode === 'sections'}
            className={`min-h-[36px] px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              chartMode === 'sections'
                ? 'bg-white dark:bg-[#0B1210] text-emerald-900 dark:text-emerald-300 shadow-sm'
                : 'text-[#5A6560] dark:text-[#9BA8A2] hover:text-[#1A221E] dark:hover:text-white'
            }`}
          >
            {ui.chartViewByRange}
          </button>
        </div>
      </div>

      {/* Recharts BarChart (dir=ltr ensures SVG coordinates & tooltips render cleanly even in RTL languages) */}
      <div dir="ltr" className="w-full h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={activeData}
            margin={{ top: 8, right: 12, left: -12, bottom: 4 }}
            barCategoryGap="24%"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.grid} />
            <XAxis
              dataKey="name"
              tick={{ fill: colors.axisText, fontSize: 12 }}
              axisLine={{ stroke: colors.grid }}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              domain={[0, chartMode === 'overview' ? 114 : 19]}
              tick={{ fill: colors.axisText, fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(6,95,70,0.05)' }}
              content={({ active, payload, label }) => {
                if (!active || !payload || payload.length === 0) return null;
                const row = payload[0]?.payload as ChartDatum | undefined;
                if (!row) return null;
                return (
                  <div className="rounded-xl border border-[#E5DFD2] dark:border-[#23352E] bg-[#FBF9F4] dark:bg-[#0B1210] px-3.5 py-2.5 shadow-lg text-xs space-y-1.5 tabular-nums">
                    <p className="font-semibold text-[#1A221E] dark:text-[#F2EFE9]">{label}</p>
                    <div className="flex items-center justify-between gap-4 text-emerald-800 dark:text-emerald-400">
                      <span>{ui.progressCompleted}</span>
                      <span className="font-semibold">{row.completed}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-[#8A6118] dark:text-[#E5BE53]">
                      <span>{ui.progressInProgress}</span>
                      <span className="font-semibold">{row.inProgress}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-[#5A6560] dark:text-[#9BA8A2]">
                      <span>{ui.progressRemaining}</span>
                      <span className="font-semibold">{row.remaining}</span>
                    </div>
                    <div className="pt-1 border-t border-[#E5DFD2] dark:border-[#23352E] flex items-center justify-between gap-4 text-[#1A221E] dark:text-[#F2EFE9]">
                      <span>{ui.progressTotalChapters}</span>
                      <span className="font-semibold">{row.total}</span>
                    </div>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="completed"
              stackId="chapters"
              fill={colors.completed}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="inProgress"
              stackId="chapters"
              fill={colors.inProgress}
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="remaining"
              stackId="chapters"
              fill={colors.remaining}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Clean Legend */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1 text-xs text-[#5A6560] dark:text-[#9BA8A2]">
        <span className="inline-flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm shrink-0"
            style={{ backgroundColor: colors.completed }}
          />
          <span>{ui.progressCompleted}</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm shrink-0"
            style={{ backgroundColor: colors.inProgress }}
          />
          <span>{ui.progressInProgress}</span>
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-sm shrink-0"
            style={{ backgroundColor: colors.remaining }}
          />
          <span>{ui.progressRemaining}</span>
        </span>
      </div>
    </section>
  );
}
