import { BookOpenCheck, CheckCircle2, Circle } from 'lucide-react';
import type { SurahProgressStatus } from '../types';
import type { UIStrings } from '../data/translations';

interface SurahProgressControlProps {
  status: SurahProgressStatus;
  onChange: (nextStatus: SurahProgressStatus) => void;
  ui: UIStrings;
  compact?: boolean;
}

export function SurahProgressControl({
  status,
  onChange,
  ui,
  compact = false,
}: SurahProgressControlProps) {
  const options: Array<{
    value: SurahProgressStatus;
    label: string;
    icon: typeof Circle;
  }> = [
    { value: 'unread', label: ui.progressUnread, icon: Circle },
    { value: 'in_progress', label: ui.progressInProgress, icon: BookOpenCheck },
    { value: 'completed', label: ui.progressCompleted, icon: CheckCircle2 },
  ];

  if (compact) {
    // Quick cycle button for the 114-Surah directory row
    const nextMap: Record<SurahProgressStatus, SurahProgressStatus> = {
      unread: 'in_progress',
      in_progress: 'completed',
      completed: 'unread',
    };

    const currentOpt = options.find((o) => o.value === status) ?? options[0];
    const Icon = currentOpt.icon;

    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onChange(nextMap[status]);
        }}
        title={`${ui.progressTitle}: ${currentOpt.label}`}
        aria-label={`${ui.progressTitle}: ${currentOpt.label}`}
        className={`min-h-[38px] px-2.5 py-1.5 rounded-lg border text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
          status === 'completed'
            ? 'border-emerald-700/40 bg-emerald-800/10 text-emerald-900 dark:border-emerald-400/40 dark:bg-emerald-500/15 dark:text-emerald-300'
            : status === 'in_progress'
            ? 'border-[#B4832C]/45 bg-[#B4832C]/10 text-[#8A6118] dark:border-[#E5BE53]/40 dark:bg-[#E5BE53]/15 dark:text-[#E5BE53]'
            : 'border-[#E5DFD2] dark:border-[#23352E] text-[#6B756F] dark:text-[#8E9C95] hover:border-emerald-700/40 hover:text-emerald-800 dark:hover:text-emerald-300'
        }`}
      >
        <Icon className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{currentOpt.label}</span>
      </button>
    );
  }

  // Full 3-state segmented control for the Surah detail reader
  return (
    <div
      role="group"
      aria-label={ui.progressTitle}
      className="inline-flex items-center p-1 rounded-xl bg-[#F3EFE6] dark:bg-[#16241F] border border-[#E5DFD2] dark:border-[#23352E]"
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = status === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={active}
            className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${
              active
                ? opt.value === 'completed'
                  ? 'bg-emerald-800 text-white dark:bg-emerald-500 dark:text-[#0B1210]'
                  : opt.value === 'in_progress'
                  ? 'bg-[#9A6E1F] text-white dark:bg-[#E5BE53] dark:text-[#0B1210]'
                  : 'bg-white dark:bg-[#0B1210] text-[#1A221E] dark:text-[#F2EFE9] shadow-sm'
                : 'text-[#5A6560] dark:text-[#9BA8A2] hover:text-[#1A221E] dark:hover:text-white'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
