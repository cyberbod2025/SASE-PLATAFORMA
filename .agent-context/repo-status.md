# Estado del Repositorio (SASE FULL)

- **Rama actual**: `feat/data-adapter-v1`
- **Estado de Git**: Working tree sucio (cambios sin stasear ni commitear).
- **Commits recientes**:
  - `dfe6269` feat: add MVP vertical student incident flow (#2)
  - `e7a17ca` feat: add SASE full Supabase base schema (#1)
  - `2898f34` feat: scaffold SASE full institutional base
- **Archivos modificados sin commit**:
  - `src/pages/DashboardMvp.tsx`
  - `src/pages/StudentList.tsx`
  - `src/pages/StudentRecord.tsx`
  - `src/store/mockData.ts`
- **Archivos/carpetas sin trackear**:
  - `src/repositories/`
- **Riesgos inmediatos**:
  - Deuda técnica acumulada en la rama actual. Si se cambia de rama, se podría perder el progreso de los repositorios y la adaptación de datos.
  - Los componentes UI (MVP) están mutando estado local (mocks) en lugar de persistir de forma real.
