type Alumno = {
  id: string;
  nombre: string;
  grupo: string;
  tutor: string;
  estado: 'activo' | 'baja' | 'suspendido';
};

type Incidencia = {
  id: string;
  alumnoId: string;
  tipo: string;
  prioridad: 'baja' | 'media' | 'alta' | 'critica';
  descripcion: string;
  observaciones: string;
  fecha: string;
};

type Auditoria = {
  id: string;
  accion: string;
  alumnoId: string;
  usuario: string;
  fecha: string;
  descripcion: string;
};

let incidencias: Incidencia[] = [
  { id: 'inc-1', alumnoId: 'al-001', tipo: 'Retardo', prioridad: 'baja', descripcion: 'Llegó 15 minutos tarde a primera hora.', observaciones: 'Ya es la tercera ocasión en el mes.', fecha: '2026-05-15T08:15:00Z' },
  { id: 'inc-2', alumnoId: 'al-001', tipo: 'Falta de material', prioridad: 'media', descripcion: 'No trajo libro de texto ni cuaderno.', observaciones: 'Se le prestó material institucional.', fecha: '2026-05-16T09:30:00Z' },
  { id: 'inc-3', alumnoId: 'al-003', tipo: 'Conducta', prioridad: 'alta', descripcion: 'Interrupción reiterada en clase.', observaciones: 'Se citó a tutor para seguimiento.', fecha: '2026-05-17T10:00:00Z' },
];

let auditoria: Auditoria[] = [
  { id: 'aud-1', accion: 'incidencia_creada', alumnoId: 'al-001', usuario: 'Carlos Rivera (Prefectura)', fecha: '2026-05-15T08:20:00Z', descripcion: 'Registró retardo del alumno.' },
  { id: 'aud-2', accion: 'incidencia_creada', alumnoId: 'al-001', usuario: 'María Gómez (Docente)', fecha: '2026-05-16T09:35:00Z', descripcion: 'Reportó falta de material en clase.' },
  { id: 'aud-3', accion: 'incidencia_creada', alumnoId: 'al-003', usuario: 'María Gómez (Docente)', fecha: '2026-05-17T10:05:00Z', descripcion: 'Reportó conducta inapropiada en aula.' },
];

const alumnos: Alumno[] = [
  { id: 'al-001', nombre: 'Luis Fernando Martínez López', grupo: '3°A', tutor: 'Sra. Elena López', estado: 'activo' },
  { id: 'al-002', nombre: 'Valentina Sofía Ramírez Cruz', grupo: '3°A', tutor: 'Sr. Juan Ramírez', estado: 'activo' },
  { id: 'al-003', nombre: 'Diego Alejandro Hernández Pérez', grupo: '3°B', tutor: 'Sra. Lucía Pérez', estado: 'activo' },
  { id: 'al-004', nombre: 'Camila Andrea Torres García', grupo: '2°A', tutor: 'Sr. Roberto Torres', estado: 'activo' },
  { id: 'al-005', nombre: 'Emiliano José Castillo Morales', grupo: '2°B', tutor: 'Sra. Patricia Morales', estado: 'suspendido' },
  { id: 'al-006', nombre: 'Ximena Paola Flores Rojas', grupo: '1°A', tutor: 'Sr. Antonio Flores', estado: 'activo' },
  { id: 'al-007', nombre: 'Santiago Gael Ortiz Mendoza', grupo: '1°B', tutor: 'Sra. Gabriela Mendoza', estado: 'activo' },
  { id: 'al-008', nombre: 'Regina Isabel Domínguez Vázquez', grupo: '1°B', tutor: 'Sr. Pedro Domínguez', estado: 'activo' },
];

let auditIdCounter = auditoria.length;
let incIdCounter = incidencias.length;

export function getAlumnos(): Alumno[] {
  return [...alumnos];
}

export function getAlumnoById(id: string): Alumno | undefined {
  return alumnos.find((a) => a.id === id);
}

export function getIncidencias(alumnoId?: string): Incidencia[] {
  if (alumnoId) return incidencias.filter((i) => i.alumnoId === alumnoId);
  return [...incidencias];
}

export function getAuditoria(alumnoId?: string): Auditoria[] {
  if (alumnoId) return auditoria.filter((a) => a.alumnoId === alumnoId);
  return [...auditoria];
}

export function getCasosAbiertos(): number {
  return incidencias.filter((i) => i.prioridad === 'alta' || i.prioridad === 'critica').length;
}

export function getActividadReciente(limite = 5): Auditoria[] {
  return [...auditoria].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()).slice(0, limite);
}

export function registrarIncidencia(data: {
  alumnoId: string;
  tipo: string;
  prioridad: Incidencia['prioridad'];
  descripcion: string;
  observaciones: string;
}): Incidencia {
  incIdCounter += 1;
  const incidencia: Incidencia = {
    id: `inc-${incIdCounter}`,
    alumnoId: data.alumnoId,
    tipo: data.tipo,
    prioridad: data.prioridad,
    descripcion: data.descripcion,
    observaciones: data.observaciones,
    fecha: new Date().toISOString(),
  };
  incidencias = [...incidencias, incidencia];

  auditIdCounter += 1;
  const evento: Auditoria = {
    id: `aud-${auditIdCounter}`,
    accion: 'incidencia_creada',
    alumnoId: data.alumnoId,
    usuario: 'Usuario Demo (Prefectura)',
    fecha: new Date().toISOString(),
    descripcion: `Registró incidencia tipo "${data.tipo}" con prioridad "${data.prioridad}": ${data.descripcion.slice(0, 60)}${data.descripcion.length > 60 ? '...' : ''}`,
  };
  auditoria = [...auditoria, evento];

  return incidencia;
}

export function getStats() {
  return {
    totalAlumnos: alumnos.length,
    totalIncidencias: incidencias.length,
    casosAbiertos: getCasosAbiertos(),
  };
}
