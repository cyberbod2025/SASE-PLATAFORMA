import {
  Activity,
  Bell,
  BriefcaseBusiness,
  FileText,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  LucideIcon,
  Settings,
  ShieldAlert,
  Sparkles,
  UserRoundCheck,
  UsersRound
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { type AppRoute, type RouteSection } from '../app/routes';

type SidebarProps = {
  routes: AppRoute[];
};

const routeIcons: Record<string, LucideIcon> = {
  '/dashboard': LayoutDashboard,
  '/alumnos': UsersRound,
  '/direccion': LayoutDashboard,
  '/secretaria': UsersRound,
  '/prefectura': ShieldAlert,
  '/orientacion': UserRoundCheck,
  '/trabajo-social': BriefcaseBusiness,
  '/medico': HeartPulse,
  '/udeii': Sparkles,
  '/docente': GraduationCap,
  '/expediente': FileText,
  '/documentos': FileText,
  '/notificaciones': Bell,
  '/admin': Settings
};

const sections: RouteSection[] = ['MVP Vertical', 'Operación diaria', 'Atención institucional', 'Sistema'];

export function Sidebar({ routes }: SidebarProps) {
  return (
    <aside className="luminous-card h-fit p-3 lg:sticky lg:top-24">
      <div className="mb-4 flex items-center gap-2 border-b border-slate-200 px-2 pb-4 text-sm font-semibold text-slate-800">
        <Activity aria-hidden="true" size={16} />
        Módulos institucionales
      </div>
      <nav className="grid gap-5" aria-label="Navegación institucional">
        {sections.map((section) => {
          const sectionRoutes = routes.filter((route) => route.section === section);

          if (sectionRoutes.length === 0) {
            return null;
          }

          return (
            <div key={section} className="grid gap-1">
              <p className="px-2 pb-1 text-xs font-bold uppercase tracking-normal text-slate-500">{section}</p>
              {sectionRoutes.map((route) => {
                const Icon = routeIcons[route.path] ?? Activity;

                return (
                  <NavLink
                    key={route.path}
                    to={route.path}
                    className={({ isActive }) =>
                      [
                        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500',
                        isActive
                          ? 'bg-blue-800 text-white shadow-[0_10px_24px_rgba(30,64,175,0.22)]'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-950'
                      ].join(' ')
                    }
                  >
                    <Icon aria-hidden="true" size={17} />
                    <span className="min-w-0 truncate">{route.label}</span>
                  </NavLink>
                );
              })}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
