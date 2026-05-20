-- SASE-310-FULL seed inicial ficticio.
-- No contiene datos reales ni credenciales. No usa service_role.

insert into public.perfiles_usuario (id, nombre_completo, email, rol)
values
  ('00000000-0000-4000-8000-000000000001', 'Alicia Direccion Demo', 'direccion.demo@sase.local', 'directivo'),
  ('00000000-0000-4000-8000-000000000002', 'Bruno Secretaria Demo', 'secretaria.demo@sase.local', 'secretaria'),
  ('00000000-0000-4000-8000-000000000003', 'Carla Prefectura Demo', 'prefectura.demo@sase.local', 'prefectura'),
  ('00000000-0000-4000-8000-000000000004', 'Diego Orientacion Demo', 'orientacion.demo@sase.local', 'orientacion'),
  ('00000000-0000-4000-8000-000000000005', 'Elena Trabajo Social Demo', 'trabajo.social.demo@sase.local', 'trabajo_social'),
  ('00000000-0000-4000-8000-000000000006', 'Fabian Medico Demo', 'medico.demo@sase.local', 'medico_escolar'),
  ('00000000-0000-4000-8000-000000000007', 'Gabriela UDEII Demo', 'udeii.demo@sase.local', 'udeii'),
  ('00000000-0000-4000-8000-000000000008', 'Hector Docente Demo', 'docente.demo@sase.local', 'docente'),
  ('00000000-0000-4000-8000-000000000009', 'Iris Admin Demo', 'admin.demo@sase.local', 'system_admin')
on conflict (id) do nothing;

insert into public.grupos (id, ciclo_escolar, grado, grupo)
values
  ('10000000-0000-4000-8000-000000000101', '2026-2027', 1, 'A'),
  ('10000000-0000-4000-8000-000000000102', '2026-2027', 1, 'B'),
  ('10000000-0000-4000-8000-000000000103', '2026-2027', 1, 'C'),
  ('10000000-0000-4000-8000-000000000104', '2026-2027', 1, 'D'),
  ('10000000-0000-4000-8000-000000000201', '2026-2027', 2, 'A'),
  ('10000000-0000-4000-8000-000000000202', '2026-2027', 2, 'B'),
  ('10000000-0000-4000-8000-000000000203', '2026-2027', 2, 'C'),
  ('10000000-0000-4000-8000-000000000204', '2026-2027', 2, 'D'),
  ('10000000-0000-4000-8000-000000000301', '2026-2027', 3, 'A'),
  ('10000000-0000-4000-8000-000000000302', '2026-2027', 3, 'B'),
  ('10000000-0000-4000-8000-000000000303', '2026-2027', 3, 'C'),
  ('10000000-0000-4000-8000-000000000304', '2026-2027', 3, 'D')
on conflict (ciclo_escolar, grado, grupo) do nothing;

insert into public.docentes_grupos (id, docente_id, grupo_id, asignatura, es_tutor, created_by)
values
  ('20000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000008', '10000000-0000-4000-8000-000000000101', 'Tutoria', true, '00000000-0000-4000-8000-000000000001'),
  ('20000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000008', '10000000-0000-4000-8000-000000000201', 'Diagnostico colectivo', false, '00000000-0000-4000-8000-000000000001')
on conflict (docente_id, grupo_id, asignatura) do nothing;

insert into public.alumnos (id, grupo_id, matricula, nombre_completo, curp, fecha_nacimiento, tutor_nombre, tutor_contacto, created_by)
values
  ('30000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000101', 'SASE-ALU-001', 'Alumno Demo Uno', 'DEMO010101HDFXXX01', '2014-01-10', 'Tutor Demo Uno', '555-0101', '00000000-0000-4000-8000-000000000002'),
  ('30000000-0000-4000-8000-000000000002', '10000000-0000-4000-8000-000000000101', 'SASE-ALU-002', 'Alumna Demo Dos', 'DEMO020202MDFXXX02', '2014-02-12', 'Tutora Demo Dos', '555-0102', '00000000-0000-4000-8000-000000000002'),
  ('30000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000202', 'SASE-ALU-003', 'Alumno Demo Tres', 'DEMO030303HDFXXX03', '2013-03-14', 'Tutor Demo Tres', '555-0103', '00000000-0000-4000-8000-000000000002'),
  ('30000000-0000-4000-8000-000000000004', '10000000-0000-4000-8000-000000000303', 'SASE-ALU-004', 'Alumna Demo Cuatro', 'DEMO040404MDFXXX04', '2012-04-16', 'Tutora Demo Cuatro', '555-0104', '00000000-0000-4000-8000-000000000002')
on conflict (matricula) do nothing;

insert into public.incidencias (id, alumno_id, grupo_id, tipo, severidad, descripcion, estado, reportado_por, created_by)
values
  ('40000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', '10000000-0000-4000-8000-000000000101', 'convivencia', 'media', 'Registro ficticio de seguimiento convivencial.', 'abierta', '00000000-0000-4000-8000-000000000003', '00000000-0000-4000-8000-000000000003'),
  ('40000000-0000-4000-8000-000000000002', '30000000-0000-4000-8000-000000000003', '10000000-0000-4000-8000-000000000202', 'asistencia', 'baja', 'Registro ficticio de inasistencia recurrente.', 'en_seguimiento', '00000000-0000-4000-8000-000000000008', '00000000-0000-4000-8000-000000000008')
on conflict (id) do nothing;

insert into public.casos_orientacion (id, alumno_id, incidencia_id, responsable_id, motivo, prioridad, estado, created_by)
values
  ('50000000-0000-4000-8000-000000000001', '30000000-0000-4000-8000-000000000001', '40000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000004', 'Acompanamiento ficticio por convivencia.', 'media', 'abierto', '00000000-0000-4000-8000-000000000004')
on conflict (id) do nothing;

insert into public.documentos_institucionales (id, titulo, tipo, descripcion, visibilidad, created_by)
values
  ('60000000-0000-4000-8000-000000000001', 'Circular demo de bienvenida', 'circular', 'Documento ficticio para validar catalogo institucional.', 'todos', '00000000-0000-4000-8000-000000000002'),
  ('60000000-0000-4000-8000-000000000002', 'Protocolo demo de seguimiento', 'protocolo', 'Documento ficticio para uso interno de staff.', 'staff', '00000000-0000-4000-8000-000000000001')
on conflict (id) do nothing;

insert into public.notificaciones (id, destinatario_id, titulo, mensaje, tipo, created_by)
values
  ('70000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000004', 'Caso demo asignado', 'Se asigno un caso ficticio para validacion inicial.', 'accion_requerida', '00000000-0000-4000-8000-000000000001'),
  ('70000000-0000-4000-8000-000000000002', '00000000-0000-4000-8000-000000000008', 'Diagnostico demo pendiente', 'Recordatorio ficticio para capturar diagnostico de grupo.', 'informativa', '00000000-0000-4000-8000-000000000001')
on conflict (id) do nothing;

insert into public.configuracion_sistema (id, clave, valor, descripcion, created_by)
values
  ('80000000-0000-4000-8000-000000000001', 'ciclo_escolar_activo', '{"valor": "2026-2027"}', 'Ciclo escolar demo activo.', '00000000-0000-4000-8000-000000000009'),
  ('80000000-0000-4000-8000-000000000002', 'modulos_habilitados', '{"fase": 2, "supabase": "schema_only"}', 'Configuracion ficticia sin secretos.', '00000000-0000-4000-8000-000000000009')
on conflict (clave) do nothing;

insert into public.auditoria (id, actor_id, accion, entidad, entidad_id, metadata)
values
  ('90000000-0000-4000-8000-000000000001', '00000000-0000-4000-8000-000000000009', 'seed_inicial', 'sistema', null, '{"fase": 2, "tipo": "datos_ficticios"}')
on conflict (id) do nothing;
