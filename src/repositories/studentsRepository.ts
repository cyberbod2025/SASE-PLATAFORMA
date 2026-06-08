import { supabase } from '../lib/supabase';

export type Alumno = {
  id: string;
  nombre: string;
  grupo: string;
  matricula: string;
  estado: 'activo' | 'baja' | 'egresado';
  tutor?: string;
};

type StudentGroupRow = {
  grado: number;
  grupo: string;
};

type StudentRow = {
  id: string;
  matricula: string;
  nombre_completo: string;
  estatus: Alumno['estado'];
  tutor_nombre: string | null;
  grupos: StudentGroupRow | StudentGroupRow[] | null;
};

function mapStudent(row: StudentRow): Alumno {
  const group = Array.isArray(row.grupos) ? row.grupos[0] : row.grupos;

  return {
    id: row.id,
    nombre: row.nombre_completo,
    matricula: row.matricula,
    estado: row.estatus,
    grupo: group ? `${group.grado}${group.grupo}` : 'Sin grupo',
    tutor: row.tutor_nombre ?? undefined,
  };
}

export const studentsRepository = {
  async getAll(): Promise<Alumno[]> {
    const { data, error } = await supabase
      .from('alumnos')
      .select('id, matricula, nombre_completo, estatus, tutor_nombre, grupos(grado, grupo)');
      
    if (error) {
      throw new Error('Error al obtener los alumnos desde la base de datos.');
    }
    
    return ((data ?? []) as StudentRow[]).map(mapStudent);
  },

  async getById(id: string): Promise<Alumno | undefined> {
    const { data, error } = await supabase
      .from('alumnos')
      .select('id, matricula, nombre_completo, estatus, tutor_nombre, grupos(grado, grupo)')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      throw new Error(`Error al obtener el alumno con ID ${id}.`);
    }
    
    if (!data) return undefined;
    
    return mapStudent(data as StudentRow);
  },
};
