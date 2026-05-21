import { Navigate, Route, Routes } from 'react-router-dom';

import { appRoutes } from './app/routes';
import { InstitutionalLayout } from './layouts/InstitutionalLayout';
import { DashboardMvp } from './pages/DashboardMvp';
import { ModulePlaceholder } from './pages/ModulePlaceholder';
import { StudentList } from './pages/StudentList';
import { StudentRecord } from './pages/StudentRecord';

const mvpPaths = new Set(['/dashboard', '/alumnos']);

const pageForPath: Record<string, React.ComponentType> = {
  '/dashboard': DashboardMvp,
  '/alumnos': StudentList,
};

export function App() {
  return (
    <Routes>
      <Route element={<InstitutionalLayout activeRole="directivo" />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        {appRoutes.map((route) => {
          if (mvpPaths.has(route.path)) {
            const Page = pageForPath[route.path];
            return <Route key={route.path} path={route.path.slice(1)} element={<Page />} />;
          }
          return <Route key={route.path} path={route.path.slice(1)} element={<ModulePlaceholder route={route} />} />;
        })}
        <Route path="alumnos/:id" element={<StudentRecord />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
