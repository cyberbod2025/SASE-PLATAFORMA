import {
  BarChart3,
  CheckCircle2,
  Clock3,
  FileCheck2,
  LineChart,
  LockKeyhole,
  Route,
  ShieldCheck,
  UsersRound
} from 'lucide-react';

import { type AppRoute } from '../app/routes';
import { roleLabels } from '../app/roles';
import { EmptyState } from '../components/ui/EmptyState';
import { ModuleCard } from '../components/ui/ModuleCard';
import { RoleBadge } from '../components/ui/RoleBadge';
import { StatusBadge } from '../components/ui/StatusBadge';

type ModulePlaceholderProps = {
  route: AppRoute;
};

export function ModulePlaceholder({ route }: ModulePlaceholderProps) {
  const [primaryRole] = route.allowedRoles;

  return (
    <section className="grid gap-5">
      <div className="luminous-panel overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-950 px-5 py-5 text-white sm:px-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-normal text-cyan-200">{route.module}</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-normal sm:text-4xl">{route.label}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">{route.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge label={route.status} />
              <StatusBadge label="Fase inicial" tone="initial" />
              <StatusBadge label="Sin datos reales todavía" tone="empty" />
            </div>
          </div>
        </div>

        <div className="grid gap-4 p-5 sm:p-6 2xl:grid-cols-[1fr_320px]">
          <div className="grid gap-4 md:grid-cols-3">
            <ModuleCard
              title={route.checkpoints[0] ?? 'Preparación institucional'}
              description="Estructura visual lista para conectar datos reales en fases posteriores."
              icon={<BarChart3 aria-hidden="true" size={20} />}
            />
            <ModuleCard
              title={route.checkpoints[1] ?? 'Seguimiento controlado'}
              description="Espacio reservado para flujos operativos con permisos y trazabilidad."
              icon={<LineChart aria-hidden="true" size={20} />}
            />
            <ModuleCard
              title={route.checkpoints[2] ?? 'Alertas institucionales'}
              description="Preparado para estados institucionales sin simular información real."
              icon={<ShieldCheck aria-hidden="true" size={20} />}
            />
          </div>

          <div className="luminous-card p-4">
            <h3 className="text-sm font-semibold text-slate-950">Roles previstos</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {route.allowedRoles.map((role) => (
                <RoleBadge key={role} label={roleLabels[role]} compact />
              ))}
            </div>
            {primaryRole ? (
              <p className="mt-4 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm leading-6 text-emerald-950">
                Vista inicial orientada a {roleLabels[primaryRole]}.
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <div className="luminous-panel p-5 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-normal text-blue-800">Próximas capacidades</p>
              <h3 className="mt-1 text-xl font-semibold text-slate-950">Base lista, operación real pendiente</h3>
            </div>
            <StatusBadge label="Sin datos reales todavía" tone="empty" />
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {route.nextCapabilities.map((capability) => (
              <div key={capability} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 text-emerald-700" size={18} />
                <span className="text-sm font-medium text-slate-700">{capability}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          <EmptyState
            title="Sin datos reales todavía"
            description="Esta fase solo mejora la identidad visual. La conexión a Supabase, RLS y datos institucionales queda para fases posteriores."
          />
          <div className="luminous-card grid gap-4 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-100 bg-cyan-50 text-cyan-800">
                <Clock3 aria-hidden="true" size={18} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-950">Estado de módulo</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">Placeholder institucional, no operativo.</p>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <Route aria-hidden="true" className="text-blue-800" size={17} />
                Ruta conservada: {route.path}
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <LockKeyhole aria-hidden="true" className="text-emerald-700" size={17} />
                Permisos visuales, sin RBAC real todavía
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <FileCheck2 aria-hidden="true" className="text-amber-700" size={17} />
                Sin escritura ni integración externa
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-700">
                <UsersRound aria-hidden="true" className="text-violet-700" size={17} />
                Navegación preparada por rol
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
