# Próxima Acción Segura

- **Recomendación inmediata**: Cerrar/completar la rama `feat/data-adapter-v1`. No abrir nuevas tareas funcionales (ni de Feria, ni de Emergencia) hasta que la base de datos esté conectada al MVP.
- **Pasos pequeños para cerrar `data-adapter-v1`**:
  1. Revisar qué código existe ya en `src/repositories/` y asegurar que hacen llamadas a Supabase.
  2. Sustituir la importación de `mockData.ts` en `DashboardMvp`, `StudentList` y `StudentRecord` por llamadas asíncronas a los repositorios correspondientes.
  3. Validar que los datos se leen y escriben en Supabase (o en un backend local dev) correctamente.
  4. Añadir a stage, commitear y hacer push de los cambios actuales.
- **Checklist antes de tocar código**:
  - [ ] Revisar esquema real de base de datos para coincidir con las interfaces de TypeScript.
  - [ ] Verificar conexión activa a Supabase configurada en `.env`.
  - [ ] Evitar refactorizaciones visuales: enfocar esfuerzos estrictamente en cambiar la capa de datos subyacente.
