import { Bell, LifeBuoy, School } from 'lucide-react';

import { type InstitutionalRole, roleLabels } from '../app/roles';
import { RoleBadge } from './ui/RoleBadge';
import { StatusBadge } from './ui/StatusBadge';

type TopBarProps = {
  activeRole: InstitutionalRole;
};

export function TopBar({ activeRole }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-cyan-100 shadow-luminous">
            <School aria-hidden="true" size={24} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold uppercase tracking-normal text-blue-800">SASE-310</p>
            <h1 className="truncate text-lg font-semibold text-slate-950 sm:text-xl">Plataforma institucional escolar</h1>
            <p className="hidden text-sm text-slate-600 sm:block">Sistema de Atención y Seguimiento Escolar</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <RoleBadge label={roleLabels[activeRole]} />
            <StatusBadge label="Fase inicial" tone="initial" />
          </div>
          <button
            type="button"
            disabled
            className="inline-flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-400 opacity-60 shadow-sm"
            aria-label="Notificaciones en preparación"
            title="Notificaciones en preparación"
          >
            <Bell aria-hidden="true" size={18} />
          </button>
          <button
            type="button"
            disabled
            className="inline-flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-red-200 bg-red-50 text-red-400 opacity-60 shadow-sm"
            aria-label="SOS institucional en preparación"
            title="SOS institucional en preparación"
          >
            <LifeBuoy aria-hidden="true" size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
