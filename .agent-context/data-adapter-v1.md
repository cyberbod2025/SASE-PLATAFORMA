# Objetivo: Data Adapter V1

- **Objetivo**: Conectar las vistas MVP del frontend con la base de datos real en Supabase, eliminando la dependencia de mocks locales.
- **Pantallas a conectar primero**:
  1. `DashboardMvp`
  2. `StudentList`
  3. `StudentRecord`
- **Dependencia a eliminar**: `src/store/mockData.ts` no debe ser usado en estas 3 pantallas.
- **Repositorios esperados** (en `src/repositories/`):
  - Repositorio para métricas del dashboard.
  - Repositorio para listado/búsqueda de alumnos.
  - Repositorio para expediente e incidentes.
- **Criterios de Aceptación**:
  - Las 3 pantallas leen y escriben en Supabase (o leen al menos, según corresponda).
  - Recargar la página no resetea la data.
- **Riesgos**:
  - Fallar en la conexión si el esquema base de Supabase no coincide con las interfaces de TypeScript actuales.
