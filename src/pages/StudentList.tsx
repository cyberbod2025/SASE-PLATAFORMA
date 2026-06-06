import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { studentsRepository, type Alumno } from '../repositories/studentsRepository';

const estadoStyle: Record<string, string> = {
  activo: 'bg-green-100 text-green-800',
  baja: 'bg-red-100 text-red-800',
  suspendido: 'bg-amber-100 text-amber-800',
};

export function StudentList() {
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    studentsRepository.getAll()
      .then((data) => {
        setAlumnos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar la lista de alumnos desde Supabase.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Alumnos</h1>
          <p className="text-sm text-slate-500">Cargando datos desde Supabase...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="text-sm text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Alumnos</h1>
        <p className="text-sm text-slate-500">Listado institucional — conectado a base de datos</p>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Grupo</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {alumnos.map((alumno) => (
              <tr key={alumno.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">{alumno.nombre}</td>
                <td className="px-4 py-3 text-slate-600">{alumno.grupo}</td>
                <td className="px-4 py-3">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${estadoStyle[alumno.estado] || 'bg-slate-100 text-slate-800'}`}>
                    {alumno.estado}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => navigate(`/alumnos/${alumno.id}`)}
                    className="rounded-lg bg-blue-800 px-3.5 py-1.5 text-xs font-semibold text-white shadow transition hover:bg-blue-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                  >
                    Abrir expediente
                  </button>
                </td>
              </tr>
            ))}
            {alumnos.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-slate-500">
                  No se encontraron alumnos.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
