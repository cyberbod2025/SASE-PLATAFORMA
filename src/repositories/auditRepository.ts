import { getActividadReciente, getAuditoria } from '../store/mockData';

type Auditoria = ReturnType<typeof getAuditoria>[number];

export const auditRepository = {
  getAll(): Auditoria[] {
    return getAuditoria();
  },

  getByStudent(studentId: string): Auditoria[] {
    return getAuditoria(studentId);
  },

  getRecent(limit = 5): Auditoria[] {
    return getActividadReciente(limit);
  },
};
