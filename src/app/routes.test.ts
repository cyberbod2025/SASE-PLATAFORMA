import { describe, expect, it } from 'vitest';

import { appRoutes, getDefaultRouteForRole, getVisibleRoutesForRole } from './routes';
import { institutionalRoles } from './roles';

describe('institutional route contract', () => {
  it('defines controlled placeholders for every institutional role', () => {
    expect(institutionalRoles).toEqual([
      'directivo',
      'secretaria',
      'prefectura',
      'orientacion',
      'trabajo_social',
      'medico_escolar',
      'udeii',
      'docente',
      'developer',
      'system_admin'
    ]);

    for (const role of institutionalRoles) {
      const route = getDefaultRouteForRole(role);
      expect(route.path).toMatch(/^\/[a-z0-9-]+$/);
      expect(route.status).toBe('En preparación');
      expect(route.allowedRoles).toContain(role);
    }
  });

  it('keeps docente navigation scoped away from administrative modules', () => {
    const visiblePaths = getVisibleRoutesForRole('docente').map((route) => route.path);

    expect(visiblePaths).toContain('/docente');
    expect(visiblePaths).toContain('/expediente');
    expect(visiblePaths).not.toContain('/secretaria');
    expect(visiblePaths).not.toContain('/prefectura');
    expect(visiblePaths).not.toContain('/admin');
  });

  it('marks all scaffold routes as non-operational placeholders', () => {
    expect(appRoutes.length).toBeGreaterThanOrEqual(10);
    expect(appRoutes.every((route) => route.status === 'En preparación')).toBe(true);
  });
});
