import { Navigate, Route, Routes } from 'react-router-dom';

import { appRoutes, getDefaultRouteForRole } from './app/routes';
import { type InstitutionalRole } from './app/roles';
import { InstitutionalLayout } from './layouts/InstitutionalLayout';
import { ModulePlaceholder } from './pages/ModulePlaceholder';

const previewRole: InstitutionalRole = 'directivo';

export function App() {
  const defaultRoute = getDefaultRouteForRole(previewRole);

  return (
    <Routes>
      <Route element={<InstitutionalLayout activeRole={previewRole} />}>
        <Route index element={<Navigate to={defaultRoute.path} replace />} />
        {appRoutes.map((route) => (
          <Route key={route.path} path={route.path.slice(1)} element={<ModulePlaceholder route={route} />} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to={defaultRoute.path} replace />} />
    </Routes>
  );
}
