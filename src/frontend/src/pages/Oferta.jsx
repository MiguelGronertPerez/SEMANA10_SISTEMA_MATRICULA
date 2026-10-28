import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { Search, Filter, BookOpen, Clock, Users, MapPin, Check, AlertCircle, X, ShieldCheck } from 'lucide-react';

export default function Oferta({ perfil, alActualizarPerfil }) {
  const [oferta, setOferta] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [filtroCiclo, setFiltroCiclo] = useState('TODOS');
  const [notificacion, setNotificacion] = useState(null);
  const [procesando, setProcesando] = useState(null);

  useEffect(() => {
    cargarOferta();
  }, []);

  async function cargarOferta() {
    try {
      setCargando(true);
      const data = await api('/cursos/oferta');
      setOferta(data);
    } catch (err) {
      mostrarMensaje('error', 'Error al cargar la oferta académica: ' + err.message);
    } finally {
      setCargando(false);
    }
  }

  function mostrarMensaje(tipo, texto) {
    setNotificacion({ tipo, texto });
    setTimeout(() => setNotificacion(null), 5000);
  }

  async function matricularSeccion(seccionId, nombreCurso) {
    try {
      setProcesando(seccionId);
      const res = await api('/matriculas', {
        method: 'POST',
        body: { seccionId }
      });
      mostrarMensaje('exito', `¡Matrícula exitosa en ${nombreCurso} (${seccionId})!`);
      if (alActualizarPerfil) alActualizarPerfil();
      cargarOferta();
    } catch (err) {
      mostrarMensaje('error', err.message);
    } finally {
      setProcesando(null);
    }
  }

  const cursosFiltrados = (oferta?.cursos || []).filter(curso => {
    const coincideTexto = curso.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                          curso.codigo.toLowerCase().includes(busqueda.toLowerCase());
    const coincideCiclo = filtroCiclo === 'TODOS' || curso.ciclo.toString() === filtroCiclo;
    return coincideTexto && coincideCiclo;
  });

  const seccionesMatriculadas = perfil?.seccionesMatriculadas || [];

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }} className="animate-fade-in">
      {/* Toast Flotante de Notificaciones */}
      {notificacion && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 100,
          background: notificacion.tipo === 'exito' ? '#064E3B' : '#7F1D1D',
          border: `1px solid ${notificacion.tipo === 'exito' ? '#10B981' : '#F43F5E'}`,
          color: '#FFF',
          padding: '14px 20px',
          borderRadius: 12,
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          maxWidth: 480,
          animation: 'fadeIn 0.2s ease'
        }}>
          {notificacion.tipo === 'exito' ? <Check size={20} color="#34D399" /> : <AlertCircle size={20} color="#FB7185" />}
          <div style={{ fontSize: 13, flex: 1 }}>{notificacion.texto}</div>
          <button onClick={() => setNotificacion(null)} style={{ background: 'transparent', color: '#FFF' }}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Encabezado y Filtros */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5, color: '#F8FAFC' }}>
              Oferta Académica 2027-I
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>
              Selecciona las asignaturas y secciones para armar tu plan de matrícula semestral.
            </p>
          </div>

          {/* Buscador y Filtro por Ciclo */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-dim)' }} />
              <input
                type="text"
                placeholder="Buscar curso o código..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                style={{ paddingLeft: 36, width: 240 }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#0A101D', padding: '0 10px', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
              <Filter size={14} color="var(--text-dim)" />
              <select
                value={filtroCiclo}
                onChange={(e) => setFiltroCiclo(e.target.value)}
                style={{ background: 'transparent', border: 'none', padding: '8px 4px', fontSize: 13 }}
              >
                <option value="TODOS">Todos los ciclos</option>
                <option value="1">Ciclo I</option>
                <option value="2">Ciclo II</option>
                <option value="3">Ciclo III</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Estado de Carga */}
      {cargando ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-dim)' }}>
          Cargando catálogo de asignaturas disponibles...
        </div>
      ) : cursosFiltrados.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', background: 'var(--bg-surface)', borderRadius: 16, border: '1px solid var(--border-subtle)' }}>
          <BookOpen size={40} color="var(--text-dim)" style={{ marginBottom: 12 }} />
          <h3 style={{ fontSize: 16, color: '#FFF' }}>No se encontraron asignaturas</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
            Prueba ajustando los términos de búsqueda o el filtro de ciclo.
          </p>
        </div>
      ) : (
        /* Lista de Cursos */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {cursosFiltrados.map((curso) => {
            // Verificar si el estudiante cumple prerrequisitos
            const aprobados = perfil?.aprobados || [];
            const faltan = curso.prerrequisitos.filter(p => !aprobados.includes(p));
            const cumplePrerreq = faltan.length === 0;

            return (
              <div
                key={curso.codigo}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: 'var(--shadow-card)',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Cabecera del Curso */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                      <span className="badge badge-blue" style={{ fontFamily: 'monospace', fontWeight: 700 }}>
                        {curso.codigo}
                      </span>
                      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#FFF' }}>
                        {curso.nombre}
                      </h2>
                      <span style={{ fontSize: 12, color: 'var(--text-dim)' }}>
                        • Ciclo {curso.ciclo}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 4 }}>
                      {curso.descripcion}
                    </p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div className="badge" style={{ background: '#1E293B', color: '#94A3B8' }}>
                      {curso.creditos} Créditos
                    </div>

                    {curso.prerrequisitos.length > 0 ? (
                      cumplePrerreq ? (
                        <div className="badge badge-green" title="Prerrequisitos aprobados">
                          <ShieldCheck size={12} />
                          Prerreq: {curso.prerrequisitos.join(', ')} (Cumplido)
                        </div>
                      ) : (
                        <div className="badge badge-amber" title="No cumple con los prerrequisitos">
                          <AlertCircle size={12} />
                          Falta aprobar: {faltan.join(', ')}
                        </div>
                      )
                    ) : (
                      <div className="badge badge-green">
                        Sin prerrequisitos
                      </div>
                    )}
                  </div>
                </div>

                {/* Secciones Disponibles */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
                  {curso.secciones.map((sec) => {
                    const estaMatriculado = seccionesMatriculadas.includes(sec.id);
                    const sinCupo = sec.matriculados >= sec.cupo;
                    const vacantes = sec.cupo - sec.matriculados;
                    const porcOcupacion = (sec.matriculados / sec.cupo) * 100;

                    return (
                      <div
                        key={sec.id}
                        style={{
                          background: '#0B1120',
                          border: `1px solid ${estaMatriculado ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-subtle)'}`,
                          borderRadius: 12,
                          padding: 16,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          gap: 14
                        }}
                      >
                        <div>
                          {/* Título de Sección y Docente */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <span style={{ fontWeight: 700, fontSize: 14, color: '#38BDF8' }}>
                              Sección {sec.codigo}
                            </span>
                            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                              {sec.docente}
                            </span>
                          </div>

                          {/* Horario y Aula */}
                          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, color: 'var(--text-muted)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <MapPin size={13} color="var(--text-dim)" />
                              <span>{sec.aula}</span>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                              <Clock size={13} color="var(--text-dim)" style={{ marginTop: 2 }} />
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {sec.horario.map((h, i) => (
                                  <span key={i} style={{ color: '#E2E8F0' }}>
                                    <strong>{h.diaTexto}:</strong> {h.inicio} - {h.fin}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Barra de Cupos y Botón */}
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
                            <span style={{ color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 4 }}>
                              <Users size={12} />
                              Vacantes: <strong>{vacantes}</strong> de {sec.cupo}
                            </span>
                            <span style={{ color: sinCupo ? '#F43F5E' : vacantes <= 5 ? '#F59E0B' : '#10B981', fontWeight: 600 }}>
                              {sinCupo ? 'LLENO' : `${sec.matriculados} inscritos`}
                            </span>
                          </div>

                          <div style={{ width: '100%', height: 5, background: '#1E293B', borderRadius: 3, overflow: 'hidden', marginBottom: 12 }}>
                            <div style={{
                              height: '100%',
                              width: `${porcOcupacion}%`,
                              background: sinCupo ? '#F43F5E' : vacantes <= 5 ? '#F59E0B' : '#10B981'
                            }} />
                          </div>

                          {estaMatriculado ? (
                            <div style={{
                              width: '100%',
                              padding: '8px 12px',
                              borderRadius: 8,
                              background: 'rgba(16, 185, 129, 0.15)',
                              border: '1px solid rgba(16, 185, 129, 0.3)',
                              color: '#34D399',
                              fontSize: 12,
                              fontWeight: 600,
                              textAlign: 'center',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 6
                            }}>
                              <Check size={14} />
                              Matriculado en esta sección
                            </div>
                          ) : (
                            <button
                              onClick={() => matricularSeccion(sec.id, curso.nombre)}
                              disabled={sinCupo || procesando === sec.id}
                              style={{
                                width: '100%',
                                padding: '9px 12px',
                                borderRadius: 8,
                                background: sinCupo ? '#1E293B' : 'var(--accent-blue)',
                                color: sinCupo ? 'var(--text-dim)' : '#FFFFFF',
                                fontSize: 13,
                                fontWeight: 600,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 6,
                                boxShadow: sinCupo ? 'none' : '0 2px 10px rgba(37, 99, 235, 0.3)'
                              }}
                            >
                              {procesando === sec.id ? 'Validando reglas...' : sinCupo ? 'Sin vacantes disponibles' : 'Matricular sección'}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
