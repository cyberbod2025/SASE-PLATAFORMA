import { type ReactNode } from 'react';

type ModuleCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  meta?: string;
};

export function ModuleCard({ title, description, icon, meta = 'Fase inicial' }: ModuleCardProps) {
  return (
    <article className="luminous-card group grid min-h-36 gap-4 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-luminous">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-100 bg-cyan-50 text-cyan-800">
          {icon}
        </div>
        <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600">{meta}</span>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </article>
  );
}
