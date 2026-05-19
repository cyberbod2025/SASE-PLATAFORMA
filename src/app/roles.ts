export const institutionalRoles = [
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
] as const;

export type InstitutionalRole = (typeof institutionalRoles)[number];

export const roleLabels: Record<InstitutionalRole, string> = {
  directivo: 'Dirección',
  secretaria: 'Secretaría',
  prefectura: 'Prefectura',
  orientacion: 'Orientación',
  trabajo_social: 'Trabajo Social',
  medico_escolar: 'Médico Escolar',
  udeii: 'UDEII',
  docente: 'Docente',
  developer: 'Developer',
  system_admin: 'System Admin'
};

export const staffRoles = institutionalRoles.filter((role) => role !== 'docente');
