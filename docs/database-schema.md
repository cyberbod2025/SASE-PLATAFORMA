# SASE-310-FULL Database Schema

Estado: Fase 2, schema base Supabase.

Alcance de esta fase:

- Crear estructura inicial de tablas institucionales.
- Definir relaciones, llaves foraneas, indices y comentarios SQL.
- Agregar seed ficticio para validacion local o remota controlada.

Fuera de alcance:

- RLS.
- Politicas de acceso.
- Auth real.
- Conexion del frontend a Supabase.
- Storage.
- Datos reales.
- Uso de `service_role` en frontend.

## Tablas

| Tabla | Proposito | Relaciones principales |
| --- | --- | --- |
| `perfiles_usuario` | Perfiles institucionales vinculables a Supabase Auth despues. | `auth_user_id` futuro, usado por `created_by` y responsables. |
| `grupos` | Grupos por ciclo escolar, grado y letra. | Referenciado por alumnos, docentes y diagnosticos. |
| `alumnos` | Expediente minimo de estudiantes. | Pertenece a `grupos`; puede registrar `created_by`. |
| `docentes_grupos` | Relacion docente-grupo-asignatura. | Une `perfiles_usuario` con `grupos`. |
| `incidencias` | Eventos escolares reportados. | Relaciona alumno, grupo y perfil reportante. |
| `casos_orientacion` | Casos derivados a orientacion. | Relaciona alumno, incidencia y responsable. |
| `diagnosticos_docentes` | Diagnosticos colectivos por grupo. | Relaciona docente y grupo. |
| `planes_intervencion` | Planes de seguimiento institucional. | Relaciona caso de orientacion o alumno. |
| `derivaciones_trabajo_social` | Derivaciones hacia trabajo social. | Relaciona caso, alumno, solicitante y responsable. |
| `atenciones_medicas` | Atenciones del area medica escolar. | Relaciona alumno y perfil medico. |
| `apoyos_udeii` | Apoyos y seguimiento UDEII. | Relaciona alumno y responsable UDEII. |
| `documentos_institucionales` | Catalogo documental basico. | Referencia perfil creador. |
| `notificaciones` | Notificaciones internas base. | Referencia destinatario y creador. |
| `auditoria` | Bitacora institucional base. | Referencia actor y entidad logica. |
| `objetos_retenidos` | Control de objetos retenidos. | Relaciona alumno y responsables. |
| `configuracion_sistema` | Configuracion institucional no secreta. | Referencia perfil creador. |

## Decisiones De Seguridad

- No se habilita RLS en esta fase por instruccion explicita.
- No se crean policies.
- No se usan claims de `user_metadata`.
- `auth_user_id` queda nullable hasta integrar Auth real.
- `configuracion_sistema` documenta que no debe almacenar secretos.
- `auditoria.metadata` debe evitar tokens, secretos o datos innecesarios.

## Seed

`supabase/seed.sql` incluye solo datos ficticios:

- grupos de `1A` a `3D`;
- perfiles institucionales por rol;
- alumnos demo;
- incidencias demo;
- documentos demo;
- notificaciones demo;
- configuracion demo sin secretos.

## Pendiente Para Fase 3

- Definir matriz de permisos por rol.
- Habilitar RLS tabla por tabla.
- Crear policies auditables.
- Validar operaciones anon/authenticated con Supabase local o proyecto remoto controlado.
- Revisar si tablas del schema `public` deben exponerse a Data API y bajo que grants.
