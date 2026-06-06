import { describe, expect, it, vi } from 'vitest';

vi.mock('../lib/supabase', () => {
  const mockData = [
    {
      id: 'al-001',
      matricula: '123',
      nombre_completo: 'Test Student 1',
      estatus: 'activo',
      tutor_nombre: 'Test Tutor 1',
      grupos: { grado: 1, grupo: 'A' },
    },
    {
      id: 'al-002',
      matricula: '124',
      nombre_completo: 'Test Student 2',
      estatus: 'activo',
      tutor_nombre: 'Test Tutor 2',
      grupos: { grado: 2, grupo: 'B' },
    },
  ];

  return {
    supabase: {
      from: vi.fn(() => ({
        select: vi.fn(() => ({
          eq: vi.fn((field, value) => ({
            single: vi.fn(() => {
              const student = mockData.find((s) => s[field as keyof typeof s] === value);
              return Promise.resolve({ data: student, error: student ? null : { code: 'PGRST116' } });
            })
          })),
          then: function(resolve: any) {
            resolve({ data: mockData, error: null });
          }
        })),
      })),
    },
  };
});

import { auditRepository } from './auditRepository';
import { incidentsRepository } from './incidentsRepository';
import { studentsRepository } from './studentsRepository';

describe('data repositories', () => {
  it('consults students through the repository', async () => {
    const students = await studentsRepository.getAll();

    expect(students.length).toBeGreaterThan(0);
    const firstStudent = await studentsRepository.getById(students[0].id);
    expect(firstStudent).toEqual(students[0]);
  });

  it('returns student-record incidents by student', () => {
    const incidents = incidentsRepository.getByStudent('al-001');

    expect(incidents.length).toBeGreaterThan(0);
    expect(incidents.every((incident) => incident.alumnoId === 'al-001')).toBe(true);
  });

  it('creates an audit entry when creating an incident', async () => {
    const student = await studentsRepository.getById('al-002');
    expect(student).toBeDefined();

    const beforeIncidents = incidentsRepository.getByStudent('al-002');
    const beforeAudit = auditRepository.getByStudent('al-002');

    const incident = incidentsRepository.create({
      alumnoId: 'al-002',
      tipo: 'Conducta',
      prioridad: 'alta',
      descripcion: 'Registro ficticio desde prueba de repository.',
      observaciones: 'Debe crear auditoria institucional ficticia.',
    });

    const afterIncidents = incidentsRepository.getByStudent('al-002');
    const afterAudit = auditRepository.getByStudent('al-002');

    expect(afterIncidents).toHaveLength(beforeIncidents.length + 1);
    expect(afterIncidents.at(-1)).toEqual(incident);
    expect(afterAudit).toHaveLength(beforeAudit.length + 1);
    expect(afterAudit.at(-1)).toMatchObject({
      accion: 'incidencia_creada',
      alumnoId: 'al-002',
    });
  });
});
