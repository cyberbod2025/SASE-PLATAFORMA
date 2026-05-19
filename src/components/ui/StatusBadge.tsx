import { CircleDot, Clock3, DatabaseZap, type LucideIcon } from 'lucide-react';

type StatusBadgeTone = 'preparation' | 'initial' | 'empty';

type StatusBadgeProps = {
  label: string;
  tone?: StatusBadgeTone;
};

const toneClasses: Record<StatusBadgeTone, string> = {
  preparation: 'border-amber-300 bg-amber-50 text-amber-950 shadow-[0_0_0_1px_rgba(245,158,11,0.12)]',
  initial: 'border-cyan-200 bg-cyan-50 text-cyan-950 shadow-[0_0_0_1px_rgba(6,182,212,0.12)]',
  empty: 'border-slate-200 bg-white text-slate-700'
};

const icons: Record<StatusBadgeTone, LucideIcon> = {
  preparation: Clock3,
  initial: CircleDot,
  empty: DatabaseZap
};

export function StatusBadge({ label, tone = 'preparation' }: StatusBadgeProps) {
  const Icon = icons[tone];

  return (
    <span
      className={[
        'inline-flex w-fit items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold tracking-normal',
        toneClasses[tone]
      ].join(' ')}
    >
      <Icon aria-hidden="true" size={15} />
      {label}
    </span>
  );
}
