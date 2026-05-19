import { Outlet } from 'react-router-dom';

import { getVisibleRoutesForRole } from '../app/routes';
import { type InstitutionalRole } from '../app/roles';
import { SasitoOrbPlaceholder } from './ai/SasitoOrbPlaceholder';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

type AppShellProps = {
  activeRole: InstitutionalRole;
};

export function AppShell({ activeRole }: AppShellProps) {
  const visibleRoutes = getVisibleRoutesForRole(activeRole);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-950">
      <div className="fixed inset-0 -z-10 bg-[linear-gradient(180deg,#f8fbff_0%,#eef4fb_48%,#f7f8fb_100%)]" />
      <TopBar activeRole={activeRole} />
      <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[290px_1fr] lg:px-8">
        <Sidebar routes={visibleRoutes} />
        <main className="min-w-0 pb-20">
          <Outlet />
        </main>
      </div>
      <SasitoOrbPlaceholder />
    </div>
  );
}
