import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { auditRepository } from '../repositories/auditRepository';
import { incidentsRepository } from '../repositories/incidentsRepository';
import { studentsRepository, type Alumno } from '../repositories/studentsRepository';

const prioridadStyle: Record<string, string> = {
  baja: 'bg-slate-100 text-slate-700',
  media: 'bg-amber-100 text-amber-800',
  alta: 'bg-red-100 text-red-800',
  critica: 'bg-red-200 text-red-900',
};

const tiposIncidencia = ['Retardo', 'Falta de material', 'Conducta', 'Uniforme', 'Tarea no entregada', 'Otro'];

export function StudentRecord() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  const [alumno, setAlumno] = useState<Alumno | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    studentsRepository.getById(id)
      .then((data) => {
        setAlumno(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar el expediente del alumno.');
        setLoading(false);
      });
  }, [id, refreshKey]);

  const incidencias = id ? incidentsRepository.getByStudent(id) : [];
  const auditoria = id ? auditRepository.getByStudent(id) : [];

  const [showForm, setShowForm] = useState(false);
  const [tipo, setTipo] = useState(tiposIncidencia[0]);
  const [prioridad, setPrioridad] = useState<'baja' | 'media' | 'alta' | 'critica'>('media');
  const [descripcion, setDescripcion] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [saved, setSaved] = useState(false);

  if (loading) {
    return <div className="p-4 text-slate-500">Cargando expediente desde Supabase...</div>;
  }

  if (error || !alumno) {
    return (
      <div className="space-y-4">
        <p className="text-lg font-semibold text-red-600">{error || 'Alumno no encontrado'}</p>
        <button
          type="button"
          onClick={() => navigate('/alumnos')}
          className="rounded-lg bg-blue-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-900"
        >
          Volver a alumnos
        </button>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('handleSubmit called', { descripcion, alumno, tipo, prioridad, refreshKey });
    if (!descripcion.trim()) {
      console.log('descripcion is empty');
      return;
    }
    if (!alumno) {
      console.log('alumno is undefined');
      return;
    }
    const result = incidentsRepository.create({
      alumnoId: alumno.id,
      tipo,
      prioridad,
      descripcion: descripcion.trim(),
      observaciones: observaciones.trim(),
    });
    console.log('registrarIncidencia result', result);
    setRefreshKey((k) => k + 1);
    setSaved(true);
    setShowForm(false);
    setDescripcion('');
    setObservaciones('');
    setTimeout(() => setSaved(false), 3000);
    navigate(`/alumnos/${alumno.id}`, { replace: true });
  }

  return (
    <div key={refreshKey} className="space-y-8">
      <nav className="flex items-center gap-2 text-sm text-slate-500">
        <button type="button" onClick={() => navigate('/alumnos')} className="hover:text-slate-800 transition">Alumnos</button>
        <span>/</span>
        <span className="font-medium text-slate-800">{alumno.nombre}</span>
      </nav>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h1 className="text-xl font-bold text-slate-900">{alumno.nombre}</h1>
        <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
          <div>
            <span className="text-slate-400">Grupo</span>
            <p className="font-medium text-slate-700">{alumno.grupo}</p>
          </div>
          <div>
            <span className="text-slate-400">Tutor</span>
            <p className="font-medium text-slate-700">{alumno.tutor}</p>
          </div>
          <div>
            <span className="text-slate-400">Estado</span>
            <p className="font-medium text-slate-700 capitalize">{alumno.estado}</p>
          </div>
        </div>
      </div>

      {saved && (
        <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800">
          Incidencia registrada correctamente.
        </div>
      )}

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">Incidencias</h2>
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-blue-800 px-4 py-2 text-xs font-semibold text-white shadow transition hover:bg-blue-900"
          >
            {showForm ? 'Cancelar' : 'Registrar incidencia'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-500">Tipo</label>
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                >
                  {tiposIncidencia.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-slate-500">Prioridad</label>
                <select
                  value={prioridad}
                  onChange={(e) => setPrioridad(e.target.value as typeof prioridad)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
                >
                  <option value="baja">Baja</option>
                  <option value="media">Media</option>
                  <option value="alta">Alta</option>
                  <option value="critica">Crítica</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-500">Descripción</label>
              <textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={3}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-500">Observaciones</label>
              <textarea
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-blue-800 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-blue-900"
            >
              Guardar incidencia
            </button>
          </form>
        )}

        {incidencias.length === 0 ? (
          <p className="text-sm text-slate-400">Sin incidencias registradas.</p>
        ) : (
          <div className="space-y-3">
            {[...incidencias].reverse().map((inc) => (
              <div key={inc.id} className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-medium text-slate-800">{inc.tipo}</span>
                    <span className={`ml-2 inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${prioridadStyle[inc.prioridad]}`}>
                      {inc.prioridad}
                    </span>
                  </div>
                  <span className="shrink-0 text-xs text-slate-400">
                    {new Date(inc.fecha).toLocaleString('es-MX')}
                  </span>
                </div>
                <p className="mt-1.5 text-sm text-slate-600">{inc.descripcion}</p>
                {inc.observaciones && (
                  <p className="mt-1 text-xs text-slate-400 italic">{inc.observaciones}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="mb-4 text-lg font-semibold text-slate-800">Auditoría</h2>
        {auditoria.length === 0 ? (
          <p className="text-sm text-slate-400">Sin eventos de auditoría.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {[...auditoria].reverse().map((e) => (
              <li key={e.id} className="flex items-start gap-3 py-2.5 text-sm">
                <span className="mt-0.5 size-2 shrink-0 rounded-full bg-violet-400" />
                <div className="min-w-0 flex-1">
                  <p className="text-slate-700">{e.descripcion}</p>
                  <p className="text-xs text-slate-400">
                    {e.usuario} &middot; {new Date(e.fecha).toLocaleString('es-MX')}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
