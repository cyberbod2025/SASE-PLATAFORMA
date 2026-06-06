# Módulo: Expediente Institucional

- **Estado actual**: Parcialmente maquetado. Contiene un formulario de agregar incidente que opera sobre estado local.
- **Formulario de incidentes**: Existe la UI, pero guarda los datos efímeramente en memoria local.
- **Qué debe escribir en Supabase**:
  - Nuevos incidentes (descripción, fecha, gravedad, categoría).
- **Qué debe leer de Supabase**:
  - Información general del alumno.
  - Historial institucional de incidentes y acciones registradas.
- **Advertencia Crítica**: Guardar en el estado local de React o en un store simulado **NO cuenta como persistencia real**. El módulo no está listo hasta que la inserción (`insert`) viaje y se almacene en Supabase.
