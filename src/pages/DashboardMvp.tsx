import { useNavigate } from 'react-router-dom';

import { getActividadReciente, getStats } from '../store/mockData';

export function DashboardMvp() {
  const navigate = useNavigate();
  const stats = getStats();
  const actividad = getActividadReciente(6);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Panel de control</h1>
        <p className="text-sm text-slate-500">Resumen institucional — datos ficticios</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <KpiCard label="Total alumnos" value={stats.totalAlumnos} tone="blue" />
        <KpiCard label="Incidencias registradas" value={stats.totalIncidencias} tone="amber" />
        <KpiCard label="Casos abiertos" value={stats.casosAbiertos} tone="red" />
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-3 text-lg font-semibold text-slate-800">Actividad reciente</h2>
        {actividad.length === 0 ? (
          <p className="text-sm text-slate-400">Sin actividad registrada.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {actividad.map((e) => (
              <li key={e.id} className="flex items-start gap-3 py-2.5 text-sm">
                <span className="mt-0.5 size-2 shrink-0 rounded-full bg-cyan-500" />
                <div className="min-w-0 flex-1">
                  <p className="text-slate-700">{e.descripcion}</p>
                  <p className="text-xs text-slate-400">
                    {e.usuario} &middot; {new Date(e.fecha).toLocaleString('es-MX')}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => navigate('/alumnos')}
          className="rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
        >
          Ver alumnos
        </button>
      </div>
    </div>
  );
}

function KpiCard({ label, value, tone }: { label: string; value: number; tone: 'blue' | 'amber' | 'red' }) {
  const borderColor = {
    blue: 'border-l-blue-500',
    amber: 'border-l-amber-500',
    red: 'border-l-red-500',
  }[tone];

  return (
    <div className={`rounded-xl border border-slate-200 border-l-4 bg-white p-5 ${borderColor}`}>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
