-- SASE-310-FULL fase 2: esquema institucional base.
-- Alcance: tablas, relaciones, indices y comentarios. No incluye RLS ni politicas.

create extension if not exists pgcrypto;

create table public.perfiles_usuario (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  nombre_completo text not null,
  email text unique,
  rol text not null check (
    rol in (
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
    )
  ),
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.perfiles_usuario is 'Perfiles institucionales vinculables a Supabase Auth en fases posteriores.';
comment on column public.perfiles_usuario.auth_user_id is 'Referencia futura a auth.users.id; se mantiene nullable hasta implementar Auth real.';
comment on column public.perfiles_usuario.rol is 'Rol institucional controlado por lista cerrada; no usar user_metadata para autorizacion.';

create table public.grupos (
  id uuid primary key default gen_random_uuid(),
  ciclo_escolar text not null,
  grado smallint not null check (grado between 1 and 3),
  grupo text not null check (grupo ~ '^[A-Z]$'),
  turno text not null default 'matutino',
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (ciclo_escolar, grado, grupo)
);

comment on table public.grupos is 'Grupos academicos institucionales por ciclo escolar, grado y letra.';

create table public.alumnos (
  id uuid primary key default gen_random_uuid(),
  grupo_id uuid not null references public.grupos(id) on delete restrict,
  matricula text not null unique,
  nombre_completo text not null,
  curp text unique,
  fecha_nacimiento date,
  estatus text not null default 'activo' check (estatus in ('activo', 'baja', 'egresado')),
  tutor_nombre text,
  tutor_contacto text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.perfiles_usuario(id) on delete set null
);

comment on table public.alumnos is 'Expediente minimo de estudiantes; datos ficticios en seed inicial.';
comment on column public.alumnos.created_by is 'Perfil institucional que registro al alumno.';

create table public.docentes_grupos (
  id uuid primary key default gen_random_uuid(),
  docente_id uuid not null references public.perfiles_usuario(id) on delete cascade,
  grupo_id uuid not null references public.grupos(id) on delete cascade,
  asignatura text not null,
  es_tutor boolean not null default false,
  created_at timestamptz not null default now(),
  created_by uuid references public.perfiles_usuario(id) on delete set null,
  unique (docente_id, grupo_id, asignatura)
);

comment on table public.docentes_grupos is 'Relacion N:M entre docentes y grupos por asignatura o tutoria.';

create table public.incidencias (
  id uuid primary key default gen_random_uuid(),
  alumno_id uuid not null references public.alumnos(id) on delete cascade,
  grupo_id uuid references public.grupos(id) on delete set null,
  tipo text not null,
  severidad text not null default 'media' check (severidad in ('baja', 'media', 'alta', 'critica')),
  descripcion text not null,
  fecha_evento timestamptz not null default now(),
  estado text not null default 'abierta' check (estado in ('abierta', 'en_seguimiento', 'cerrada')),
  reportado_por uuid references public.perfiles_usuario(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.perfiles_usuario(id) on delete set null
);

comment on table public.incidencias is 'Registro inicial de incidencias escolares sin flujos reales de autorizacion.';

create table public.casos_orientacion (
  id uuid primary key default gen_random_uuid(),
  alumno_id uuid not null references public.alumnos(id) on delete cascade,
  incidencia_id uuid references public.incidencias(id) on delete set null,
  responsable_id uuid references public.perfiles_usuario(id) on delete set null,
  motivo text not null,
  prioridad text not null default 'media' check (prioridad in ('baja', 'media', 'alta')),
  estado text not null default 'abierto' check (estado in ('abierto', 'en_seguimiento', 'cerrado')),
  opened_at timestamptz not null default now(),
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.perfiles_usuario(id) on delete set null
);

comment on table public.casos_orientacion is 'Casos base para orientacion educativa; RLS se definira en fase posterior.';

create table public.diagnosticos_docentes (
  id uuid primary key default gen_random_uuid(),
  docente_id uuid references public.perfiles_usuario(id) on delete set null,
  grupo_id uuid not null references public.grupos(id) on delete cascade,
  periodo text not null,
  resumen text not null,
  necesidades_detectadas text,
  nivel_riesgo text not null default 'medio' check (nivel_riesgo in ('bajo', 'medio', 'alto')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.perfiles_usuario(id) on delete set null
);

comment on table public.diagnosticos_docentes is 'Diagnosticos colectivos iniciales reportados por docentes.';

create table public.planes_intervencion (
  id uuid primary key default gen_random_uuid(),
  caso_orientacion_id uuid references public.casos_orientacion(id) on delete cascade,
  alumno_id uuid references public.alumnos(id) on delete cascade,
  titulo text not null,
  objetivo text not null,
  acciones text not null,
  fecha_inicio date not null,
  fecha_cierre_estimada date,
  estado text not null default 'activo' check (estado in ('activo', 'pausado', 'cerrado')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.perfiles_usuario(id) on delete set null,
  check (caso_orientacion_id is not null or alumno_id is not null)
);

comment on table public.planes_intervencion is 'Planes institucionales de intervencion asociados a casos o alumnos.';

create table public.derivaciones_trabajo_social (
  id uuid primary key default gen_random_uuid(),
  caso_orientacion_id uuid references public.casos_orientacion(id) on delete set null,
  alumno_id uuid not null references public.alumnos(id) on delete cascade,
  solicitante_id uuid references public.perfiles_usuario(id) on delete set null,
  responsable_id uuid references public.perfiles_usuario(id) on delete set null,
  motivo text not null,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'en_atencion', 'cerrada')),
  fecha_derivacion date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.perfiles_usuario(id) on delete set null
);

comment on table public.derivaciones_trabajo_social is 'Derivaciones base hacia trabajo social.';

create table public.atenciones_medicas (
  id uuid primary key default gen_random_uuid(),
  alumno_id uuid not null references public.alumnos(id) on delete cascade,
  atendido_por uuid references public.perfiles_usuario(id) on delete set null,
  motivo text not null,
  signos_observados text,
  accion_realizada text not null,
  requiere_seguimiento boolean not null default false,
  fecha_atencion timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.perfiles_usuario(id) on delete set null
);

comment on table public.atenciones_medicas is 'Registro base de atenciones del area medica escolar.';

create table public.apoyos_udeii (
  id uuid primary key default gen_random_uuid(),
  alumno_id uuid not null references public.alumnos(id) on delete cascade,
  responsable_id uuid references public.perfiles_usuario(id) on delete set null,
  tipo_apoyo text not null,
  descripcion text not null,
  estado text not null default 'activo' check (estado in ('activo', 'en_revision', 'cerrado')),
  fecha_inicio date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.perfiles_usuario(id) on delete set null
);

comment on table public.apoyos_udeii is 'Apoyos UDEII base sin reglas de visibilidad todavia.';

create table public.documentos_institucionales (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  tipo text not null,
  descripcion text,
  url_archivo text,
  visibilidad text not null default 'staff' check (visibilidad in ('staff', 'directivos', 'todos')),
  estado text not null default 'vigente' check (estado in ('vigente', 'archivado')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.perfiles_usuario(id) on delete set null
);

comment on table public.documentos_institucionales is 'Catalogo base de documentos institucionales; storage se definira despues.';

create table public.notificaciones (
  id uuid primary key default gen_random_uuid(),
  destinatario_id uuid references public.perfiles_usuario(id) on delete cascade,
  titulo text not null,
  mensaje text not null,
  tipo text not null default 'informativa' check (tipo in ('informativa', 'accion_requerida', 'alerta')),
  leida boolean not null default false,
  created_at timestamptz not null default now(),
  created_by uuid references public.perfiles_usuario(id) on delete set null
);

comment on table public.notificaciones is 'Notificaciones internas base; no representa envio real externo.';

create table public.auditoria (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.perfiles_usuario(id) on delete set null,
  accion text not null,
  entidad text not null,
  entidad_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

comment on table public.auditoria is 'Bitacora institucional base para trazabilidad futura.';
comment on column public.auditoria.metadata is 'Datos tecnicos no sensibles; evitar secretos, tokens o datos innecesarios.';

create table public.objetos_retenidos (
  id uuid primary key default gen_random_uuid(),
  alumno_id uuid references public.alumnos(id) on delete set null,
  descripcion text not null,
  motivo text not null,
  estado text not null default 'retenido' check (estado in ('retenido', 'devuelto', 'resguardado')),
  fecha_retencion timestamptz not null default now(),
  fecha_devolucion timestamptz,
  registrado_por uuid references public.perfiles_usuario(id) on delete set null,
  devuelto_por uuid references public.perfiles_usuario(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.perfiles_usuario(id) on delete set null
);

comment on table public.objetos_retenidos is 'Control base de objetos retenidos por prefectura o autoridad escolar.';

create table public.configuracion_sistema (
  id uuid primary key default gen_random_uuid(),
  clave text not null unique,
  valor jsonb not null default '{}'::jsonb,
  descripcion text,
  editable_por text not null default 'system_admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references public.perfiles_usuario(id) on delete set null
);

comment on table public.configuracion_sistema is 'Configuracion institucional base, no contiene secretos.';
comment on column public.configuracion_sistema.valor is 'No guardar claves API, service_role ni secretos en esta tabla.';

create index idx_perfiles_usuario_rol on public.perfiles_usuario (rol);
create index idx_grupos_ciclo on public.grupos (ciclo_escolar);
create index idx_alumnos_grupo_id on public.alumnos (grupo_id);
create index idx_docentes_grupos_docente_id on public.docentes_grupos (docente_id);
create index idx_docentes_grupos_grupo_id on public.docentes_grupos (grupo_id);
create index idx_incidencias_alumno_id on public.incidencias (alumno_id);
create index idx_incidencias_estado on public.incidencias (estado);
create index idx_casos_orientacion_alumno_id on public.casos_orientacion (alumno_id);
create index idx_casos_orientacion_estado on public.casos_orientacion (estado);
create index idx_diagnosticos_docentes_grupo_id on public.diagnosticos_docentes (grupo_id);
create index idx_planes_intervencion_caso_id on public.planes_intervencion (caso_orientacion_id);
create index idx_derivaciones_trabajo_social_alumno_id on public.derivaciones_trabajo_social (alumno_id);
create index idx_atenciones_medicas_alumno_id on public.atenciones_medicas (alumno_id);
create index idx_apoyos_udeii_alumno_id on public.apoyos_udeii (alumno_id);
create index idx_documentos_institucionales_tipo on public.documentos_institucionales (tipo);
create index idx_notificaciones_destinatario_id on public.notificaciones (destinatario_id);
create index idx_auditoria_actor_id on public.auditoria (actor_id);
create index idx_auditoria_entidad on public.auditoria (entidad, entidad_id);
create index idx_objetos_retenidos_estado on public.objetos_retenidos (estado);

-- RLS queda intencionalmente pendiente para Fase 3.
