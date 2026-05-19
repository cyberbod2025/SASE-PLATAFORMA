# Supabase Schema Guard

Para Fase 2:

Permitido:
- crear supabase/migrations/
- crear schema SQL
- crear seed ficticio
- documentar relaciones

Prohibido:
- service_role en frontend
- datos reales
- RLS permisivo tipo true para tablas sensibles
- conectar UI antes de aprobar schema
- meter Auth real antes de Fase 4

Cada tabla debe tener:
- id uuid primary key
- created_at
- updated_at si aplica
- created_by si aplica
- relaciones claras
- índices básicos
