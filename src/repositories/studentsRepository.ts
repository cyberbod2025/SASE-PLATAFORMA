import { supabase } from '../lib/supabase';

export type Alumno = {
  id: string;
  nombre: string;
  grupo: string;
  matricula: string;
  estado: 'activo' | 'baja' | 'suspendido';
  tutor?: string;
};

export const studentsRepository = {
  async getAll(): Promise<Alumno[]> {
    const { data, error } = await supabase
      .from('alumnos')
      .select('id, matricula, nombre_completo, estatus, tutor_nombre, grupos(grado, grupo)');
      
    if (error) {
      console.error('Error fetching students:', error);
      throw new Error('Error al obtener los alumnos desde la base de datos.');
    }
    
    return (data || []).map((row: any) => ({
      id: row.id,
      nombre: row.nombre_completo,
      matricula: row.matricula,
      estado: row.estatus,
      grupo: row.grupos ? `${row.grupos.grado}${row.grupos.grupo}` : 'Sin grupo',
      tutor: row.tutor_nombre,
    }));
  },

  async getById(id: string): Promise<Alumno | undefined> {
    const { data, error } = await supabase
      .from('alumnos')
      .select('id, matricula, nombre_completo, estatus, tutor_nombre, grupos(grado, grupo)')
      .eq('id', id)
      .single();
      
    if (error) {
      if (error.code === 'PGRST116') return undefined;
      console.error('Error fetching student by id:', error);
      throw new Error(`Error al obtener el alumno con ID ${id}.`);
    }
    
    if (!data) return undefined;
    
    const row: any = data;
    return {
      id: row.id,
      nombre: row.nombre_completo,
      matricula: row.matricula,
      estado: row.estatus,
      grupo: row.grupos ? `${row.grupos.grado}${row.grupos.grupo}` : 'Sin grupo',
      tutor: row.tutor_nombre,
    };
  },
};
