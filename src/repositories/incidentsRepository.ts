import {
  getCasosAbiertos,
  getIncidencias,
  registrarIncidencia,
} from '../store/mockData';

type Incidencia = ReturnType<typeof getIncidencias>[number];

export type CreateIncidentInput = Parameters<typeof registrarIncidencia>[0];

export const incidentsRepository = {
  getAll(): Incidencia[] {
    return getIncidencias();
  },

  getByStudent(studentId: string): Incidencia[] {
    return getIncidencias(studentId);
  },

  getOpenCasesCount(): number {
    return getCasosAbiertos();
  },

  create(data: CreateIncidentInput): Incidencia {
    return registrarIncidencia(data);
  },
};
