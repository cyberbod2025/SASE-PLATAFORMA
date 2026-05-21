import { type InstitutionalRole, institutionalRoles } from './roles';

export type RouteStatus = 'En preparación';
export type RouteSection = 'MVP Vertical' | 'Operación diaria' | 'Atención institucional' | 'Sistema';
export type RouteTone = 'blue' | 'cyan' | 'green' | 'amber' | 'violet' | 'red';

export type AppRoute = {
  path: `/${string}`;
  label: string;
  module: string;
  description: string;
  status: RouteStatus;
  section: RouteSection;
  tone: RouteTone;
  allowedRoles: InstitutionalRole[];
  defaultFor: InstitutionalRole[];
  checkpoints: string[];
  nextCapabilities: string[];
};

const allAdministrativeRoles = institutionalRoles.filter((role) => role !== 'docente');

export const appRoutes: AppRoute[] = [
  {
    path: '/dashboard',
    label: 'Panel',
    module: 'Panel de control',
    description: 'Resumen institucional con KPIs, actividad reciente y acceso rápido a alumnos.',
    status: 'En preparación',
    section: 'MVP Vertical',
    tone: 'blue',
    allowedRoles: [...institutionalRoles],
    defaultFor: [...institutionalRoles],
    checkpoints: ['KPIs', 'Actividad reciente', 'Acceso a alumnos'],
    nextCapabilities: ['Alertas en tiempo real', 'Gráficas', 'Filtros por periodo']
  },
  {
    path: '/alumnos',
    label: 'Alumnos',
    module: 'Listado de alumnos',
    description: 'Listado institucional de alumnos con acceso a expediente individual.',
    status: 'En preparación',
    section: 'MVP Vertical',
    tone: 'cyan',
    allowedRoles: [...institutionalRoles],
    defaultFor: [],
    checkpoints: ['Listado', 'Filtros', 'Acceso a expediente'],
    nextCapabilities: ['Búsqueda avanzada', 'Filtros por grupo', 'Exportar listado']
  },
  {
    path: '/direccion',
    label: 'Dirección',
    module: 'Dashboard directivo',
    description: 'Monitoreo institucional inicial para seguimiento directivo, alertas y coordinación escolar.',
    status: 'En preparación',
    section: 'Operación diaria',
    tone: 'blue',
    allowedRoles: ['directivo', 'developer', 'system_admin'],
    defaultFor: ['directivo'],
    checkpoints: ['KPIs institucionales', 'Casos críticos', 'Alertas operativas'],
    nextCapabilities: ['Reportes institucionales', 'Priorización de casos', 'Seguimiento por área']
  },
  {
    path: '/secretaria',
    label: 'Secretaría',
    module: 'Matrícula y expedientes',
    description: 'Base visual para matrícula, grupos y expedientes administrativos sin datos reales todavía.',
    status: 'En preparación',
    section: 'Operación diaria',
    tone: 'cyan',
    allowedRoles: ['secretaria', 'directivo', 'developer', 'system_admin'],
    defaultFor: ['secretaria'],
    checkpoints: ['Matrícula', 'Grupos', 'Expedientes administrativos'],
    nextCapabilities: ['Alta de alumnos', 'Consulta de grupos', 'Control documental']
  },
  {
    path: '/prefectura',
    label: 'Prefectura',
    module: 'Incidencias y conducta',
    description: 'Preparación del flujo de conducta, seguimiento y objetos retenidos para prefectura.',
    status: 'En preparación',
    section: 'Operación diaria',
    tone: 'amber',
    allowedRoles: ['prefectura', 'directivo', 'developer', 'system_admin'],
    defaultFor: ['prefectura'],
    checkpoints: ['Incidencias', 'Seguimiento', 'Objetos retenidos'],
    nextCapabilities: ['Registro de incidencia', 'Bitácora de seguimiento', 'Derivación controlada']
  },
  {
    path: '/orientacion',
    label: 'Orientación',
    module: 'Casos y diagnósticos',
    description: 'Espacio inicial para casos de orientación, diagnósticos docentes y planes de intervención.',
    status: 'En preparación',
    section: 'Atención institucional',
    tone: 'green',
    allowedRoles: ['orientacion', 'directivo', 'developer', 'system_admin'],
    defaultFor: ['orientacion'],
    checkpoints: ['Casos', 'Diagnósticos docentes', 'Planes de intervención'],
    nextCapabilities: ['Apertura de casos', 'Planes de intervención', 'Seguimiento coordinado']
  },
  {
    path: '/trabajo-social',
    label: 'Trabajo Social',
    module: 'Derivaciones y acuerdos',
    description: 'Preparación para citatorios, derivaciones y acuerdos familiares con trazabilidad.',
    status: 'En preparación',
    section: 'Atención institucional',
    tone: 'violet',
    allowedRoles: ['trabajo_social', 'directivo', 'developer', 'system_admin'],
    defaultFor: ['trabajo_social'],
    checkpoints: ['Derivaciones', 'Citatorios', 'Acuerdos familiares'],
    nextCapabilities: ['Citatorios', 'Acuerdos familiares', 'Seguimiento documental']
  },
  {
    path: '/medico',
    label: 'Médico Escolar',
    module: 'Atenciones médicas',
    description: 'Pantalla inicial para atenciones escolares y alertas médicas con acceso controlado.',
    status: 'En preparación',
    section: 'Atención institucional',
    tone: 'red',
    allowedRoles: ['medico_escolar', 'directivo', 'developer', 'system_admin'],
    defaultFor: ['medico_escolar'],
    checkpoints: ['Atenciones', 'Alertas médicas', 'Notas básicas'],
    nextCapabilities: ['Registro de atención', 'Alertas médicas', 'Notas protegidas']
  },
  {
    path: '/udeii',
    label: 'UDEII',
    module: 'Apoyos y barreras',
    description: 'Base visual para barreras para el aprendizaje, apoyos sugeridos y recomendaciones.',
    status: 'En preparación',
    section: 'Atención institucional',
    tone: 'green',
    allowedRoles: ['udeii', 'directivo', 'developer', 'system_admin'],
    defaultFor: ['udeii'],
    checkpoints: ['Barreras', 'Apoyos sugeridos', 'Recomendaciones'],
    nextCapabilities: ['Barreras', 'Apoyos sugeridos', 'Recomendaciones']
  },
  {
    path: '/docente',
    label: 'Docente',
    module: 'Grupos asignados',
    description: 'Vista inicial para grupos docentes, reportes y solicitudes sin acciones reales todavía.',
    status: 'En preparación',
    section: 'Operación diaria',
    tone: 'cyan',
    allowedRoles: ['docente', 'directivo', 'developer', 'system_admin'],
    defaultFor: ['docente'],
    checkpoints: ['Grupos', 'Reportes', 'Solicitudes'],
    nextCapabilities: ['Vista de grupos', 'Reportes controlados', 'Solicitudes institucionales']
  },
  {
    path: '/expediente',
    label: 'Expediente',
    module: 'Expediente institucional único',
    description: 'Preparación del núcleo institucional por alumno, con trazabilidad y acceso por rol.',
    status: 'En preparación',
    section: 'Atención institucional',
    tone: 'blue',
    allowedRoles: [...institutionalRoles],
    defaultFor: [],
    checkpoints: ['Datos generales', 'Historial institucional', 'Trazabilidad'],
    nextCapabilities: ['Historial de accesos', 'Acciones realizadas', 'Bitácora institucional']
  },
  {
    path: '/documentos',
    label: 'Documentos',
    module: 'Documentos institucionales',
    description: 'Base visual para documentos internos, folios y seguimiento documental.',
    status: 'En preparación',
    section: 'Sistema',
    tone: 'amber',
    allowedRoles: allAdministrativeRoles,
    defaultFor: [],
    checkpoints: ['Citatorio', 'Acta de hechos', 'Seguimiento'],
    nextCapabilities: ['Citatorio', 'Acta de hechos', 'Impresión controlada']
  },
  {
    path: '/notificaciones',
    label: 'Notificaciones',
    module: 'Alertas y avisos',
    description: 'Preparación del centro de avisos institucionales y alertas críticas.',
    status: 'En preparación',
    section: 'Sistema',
    tone: 'cyan',
    allowedRoles: [...institutionalRoles],
    defaultFor: [],
    checkpoints: ['Lectura', 'Filtros por rol', 'Alertas críticas'],
    nextCapabilities: ['Marcar como leída', 'Filtros por rol', 'Alertas críticas']
  },
  {
    path: '/admin',
    label: 'Sistema',
    module: 'Salud técnica y configuración',
    description: 'Panel inicial de salud técnica, auditoría y configuración para administración del sistema.',
    status: 'En preparación',
    section: 'Sistema',
    tone: 'violet',
    allowedRoles: ['developer', 'system_admin'],
    defaultFor: ['developer', 'system_admin'],
    checkpoints: ['Auditoría', 'Configuración', 'Estado técnico'],
    nextCapabilities: ['Registro institucional', 'Configuración segura', 'Estado de servicios']
  }
];

export function getVisibleRoutesForRole(role: InstitutionalRole) {
  return appRoutes.filter((route) => route.allowedRoles.includes(role));
}

export function getDefaultRouteForRole(role: InstitutionalRole) {
  const defaultRoute = appRoutes.find((route) => route.defaultFor.includes(role));

  if (defaultRoute) {
    return defaultRoute;
  }

  return getVisibleRoutesForRole(role)[0] ?? appRoutes[0];
}
