# Arquitectura Core (SASE FULL)

- **Propósito**: Plataforma institucional completa del sistema escolar SASE-310 (Dirección, Secretaría, Docentes, Prefectura, Orientación, Trabajo Social, Médico Escolar, UDEII).
- **Stack Técnico**: React, Vite, Tailwind CSS, TypeScript, Supabase (PostgreSQL + Auth + Storage).
- **Regla Principal**: NO construir nuevos módulos (Feria, SOS, Diagnóstico) encima de mocks. Reemplazar `mockData.ts` por data fetching real antes de escalar.
- **Roles Institucionales Previstos**: `directivo`, `secretaria`, `docente`, `prefectura`, `orientacion`, `trabajo_social`, `medico_escolar`, `udeii`, `developer`, `system_admin`.
- **Regla de Seguridad**: Supabase Auth y RLS (Role Level Security) son obligatorios antes de cualquier uso institucional real.
- **Regla de Auditoría**: No simular la "Caja Negra" en UI. Debe ser una tabla inmutable de Supabase con triggers de base de datos reales.
