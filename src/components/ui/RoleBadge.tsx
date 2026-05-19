import { ShieldCheck } from 'lucide-react';

type RoleBadgeProps = {
  label: string;
  compact?: boolean;
};

export function RoleBadge({ label, compact = false }: RoleBadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 font-semibold text-emerald-950',
        compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'
      ].join(' ')}
    >
      <ShieldCheck aria-hidden="true" size={compact ? 14 : 16} />
      {label}
    </span>
  );
}
