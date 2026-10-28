import { useState } from 'react';
import { api } from '../api/client';
import { Calendar, Trash2, Printer, AlertTriangle, FileText, CheckCircle2, Clock, X, User } from 'lucide-react';

const DIAS = ['LUN', 'MAR', 'MIE', 'JUE', 'VIE', 'SAB'];
const DIAS_TEXTO = { LUN: 'Lunes', MAR: 'Martes', MIE: 'Miércoles', JUE: 'Jueves', VIE: 'Viernes', SAB: 'Sábado' };
const HORAS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];

const COLORES_CURSOS = [
  { bg: 'rgba(37, 99, 235, 0.2)', border: '#3B82F6', text: '#93C5FD' },
  { bg: 'rgba(16, 185, 129, 0.2)', border: '#10B981', text: '#6EE7B7' },
  { bg: 'rgba(168, 85, 247, 0.2)', border: '#A855F7', text: '#D8B4FE' },
  { bg: 'rgba(245, 158, 11, 0.2)', border: '#F59E0B', text: '#FDE68A' },
  { bg: 'rgba(236, 72, 153, 0.2)', border: '#EC4899', text: '#FBCFE8' }
];

export default function Matricula({ perfil, alActualizarPerfil }) {
  const [modalConstancia, setModalConstancia] = useState(false);
  const [retirando, setRetirando] = useState(null);
  const [notificacion, setNotificacion] = useState(null);

  const secciones = perfil?.seccionesDetalle || [];
  const creditos = perfil?.creditosMatriculados || 0;
  const maxCreditos = perfil?.limiteCreditos || 22;

  async function retirarAsignatura(seccionId, nombreCurso) {
    if (!confirm(`¿Estás seguro de retirarte de ${nombreCurso} (${seccionId})?`)) return;
    try {
      setRetirando(seccionId);
      await api(`/matriculas/${seccionId}`, { method: 'DELETE' });
      setNotificacion({ tipo: 'exito', texto: `Se ha retirado de ${nombreCurso} exitosamente.` });
      if (alActualizarPerfil) alActualizarPerfil();
    } catch (err) {
      setNotificacion({ tipo: 'error', texto: err.message });
    } finally {
      setRetirando(null);
      setTimeout(() => setNotificacion(null), 4000);
    }
  }

  // Mapear bloques de horario
  function obtenerBloqueHorario(dia, hora) {
    for (let idx = 0; idx < secciones.length; idx++) {
      const sec = secciones[idx];
      const match = sec.horario?.find(h => {
        if (h.dia !== dia) return false;
        const inicioH = parseInt(h.inicio.split(':')[0], 10);
        const finH = parseInt(h.fin.split(':')[0], 10);
        const actualH = parseInt(hora.split(':')[0], 10);
        return actualH >= inicioH && actualH < finH;
      });
      if (match) {
        return {
          seccion: sec,
          color: COLORES_CURSOS[idx % COLORES_CURSOS.length],
          esInicio: match.inicio === hora
        };
      }
    }
    return null;
  }

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }} className="animate-fade-in">
      {/* Toast Flotante */}
      {notificacion && (
        <div style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          zIndex: 100,
          background: notificacion.tipo === 'exito' ? '#064E3B' : '#7F1D1D',
          border: `1px solid ${notificacion.tipo === 'exito' ? '#10B981' : '#F43F5E'}`,
          color: '#FFF',
          padding: '12px 18px',
          borderRadius: 10,
          fontSize: 13,
          boxShadow: '0 8px 25px rgba(0,0,0,0.4)'
        }}>
          {notificacion.texto}
        </div>
      )}

      {/* Tarjeta de Resumen del Estudiante */}
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 16,
        padding: 24,
        marginBottom: 28,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #1E4E79, #38BDF8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFF'
          }}>
            <User size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: '#FFF' }}>
                {perfil?.nombre || 'Estudiante'}
              </h1>
              <span className="badge badge-blue">{perfil?.codigo}</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 2 }}>
              {perfil?.carrera} • Ciclo {perfil?.cicloActual} • Periodo 2027-I
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Créditos inscritos
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: creditos > maxCreditos ? '#F43F5E' : '#38BDF8' }}>
              {creditos} <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>/ {maxCreditos} max</span>
            </div>
          </div>

          <button
            onClick={() => setModalConstancia(true)}
            disabled={secciones.length === 0}
            style={{
              background: '#1E293B',
              border: '1px solid var(--border-subtle)',
              color: '#FFFFFF',
              padding: '10px 16px',
              borderRadius: 10,
              fontSize: 13,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
            }}
          >
            <Printer size={16} color="#38BDF8" />
            Constancia de Matrícula
          </button>
        </div>
      </div>

      {secciones.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'var(--bg-card)',
          borderRadius: 16,
          border: '1px dashed var(--border-subtle)'
        }}>
          <Calendar size={48} color="var(--text-dim)" style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: 18, color: '#FFF', fontWeight: 600 }}>Aún no tienes asignaturas matriculadas</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, marginTop: 6, maxWidth: 460, margin: '6px auto 20px' }}>
            Explora la oferta académica del ciclo 2027-I e inscribe tus asignaturas para armar tu horario oficial.
          </p>
          <a
            href="/oferta"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              background: 'var(--accent-blue)',
              color: '#FFF',
              borderRadius: 8,
              textDecoration: 'none',
              fontSize: 13,
              fontWeight: 600
            }}
          >
            Ir a la Oferta Académica
          </a>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {/* Asignaturas Matriculadas */}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#FFF', marginBottom: 14 }}>
              Asignaturas Inscritas ({secciones.length})
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
              {secciones.map((sec, idx) => {
                const color = COLORES_CURSOS[idx % COLORES_CURSOS.length];
                return (
                  <div
                    key={sec.seccionId}
                    style={{
                      background: 'var(--bg-card)',
                      border: `1px solid ${color.border}`,
                      borderRadius: 12,
                      padding: 16,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: 12
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span style={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 700, color: color.text }}>
                            {sec.codigoCurso} • Sec. {sec.seccionId}
                          </span>
                          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#FFF', marginTop: 2 }}>
                            {sec.nombreCurso}
                          </h3>
                        </div>
                        <span className="badge" style={{ background: color.bg, color: color.text, border: `1px solid ${color.border}` }}>
                          {sec.creditos} Créditos
                        </span>
                      </div>

                      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
                        Docente: <strong>{sec.docente}</strong><br />
                        Aula: <strong>{sec.aula}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: 10 }}>
                      <span style={{ fontSize: 11, color: '#34D399', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <CheckCircle2 size={12} /> Estado: Confirmado
                      </span>
                      <button
                        onClick={() => retirarAsignatura(sec.seccionId, sec.nombreCurso)}
                        disabled={retirando === sec.seccionId}
                        style={{
                          background: 'rgba(244, 63, 94, 0.1)',
                          border: '1px solid rgba(244, 63, 94, 0.25)',
                          color: '#FB7185',
                          padding: '5px 10px',
                          borderRadius: 6,
                          fontSize: 12,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4
                        }}
                        title="Retirar esta materia"
                      >
                        <Trash2 size={12} />
                        {retirando === sec.seccionId ? 'Retirando...' : 'Retirar'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Horario Semanal Visual */}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#FFF', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={18} color="#38BDF8" />
              Horario Semanal
            </h2>

            <div style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 16,
              overflowX: 'auto',
              boxShadow: 'var(--shadow-card)'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', minWidth: 700 }}>
                <thead>
                  <tr style={{ background: '#0F172A', borderBottom: '1px solid var(--border-subtle)' }}>
                    <th style={{ padding: '12px 10px', fontSize: 12, color: 'var(--text-dim)', width: 80 }}>Hora</th>
                    {DIAS.map(d => (
                      <th key={d} style={{ padding: '12px 10px', fontSize: 13, color: '#FFF', fontWeight: 600 }}>
                        {DIAS_TEXTO[d]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {HORAS.map(hora => (
                    <tr key={hora} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <td style={{ padding: '8px 4px', fontSize: 11, fontFamily: 'monospace', color: 'var(--text-dim)', background: '#0B1120' }}>
                        {hora}
                      </td>
                      {DIAS.map(dia => {
                        const bloque = obtenerBloqueHorario(dia, hora);
                        return (
                          <td
                            key={dia + hora}
                            style={{
                              padding: 4,
                              height: 48,
                              verticalAlign: 'top',
                              background: bloque ? bloque.color.bg : 'transparent',
                              borderRight: '1px solid rgba(255,255,255,0.03)'
                            }}
                          >
                            {bloque && bloque.esInicio && (
                              <div style={{
                                padding: '4px 6px',
                                background: bloque.color.border,
                                color: '#FFF',
                                borderRadius: 6,
                                fontSize: 10,
                                fontWeight: 700,
                                textAlign: 'left',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap'
                              }}>
                                <div>{bloque.seccion.codigoCurso}</div>
                                <div style={{ fontSize: 9, opacity: 0.9 }}>{bloque.seccion.aula}</div>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Constancia Oficial de Matrícula (PDF Simulado) */}
      {modalConstancia && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: 16
        }}>
          <div style={{
            background: '#FFFFFF',
            color: '#1E293B',
            borderRadius: 16,
            maxWidth: 680,
            width: '100%',
            padding: 36,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'relative'
          }}>
            <button
              onClick={() => setModalConstancia(false)}
              style={{
                position: 'absolute',
                top: 20,
                right: 20,
                background: '#F1F5F9',
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748B'
              }}
            >
              <X size={18} />
            </button>

            {/* Cabecera Institucional */}
            <div style={{ borderBottom: '2px solid #1E4E79', paddingBottom: 16, marginBottom: 20, textAlign: 'center' }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1E4E79', letterSpacing: 0.5 }}>
                UNIVERSIDAD CATÓLICA SEDES SAPIENTIAE
              </h2>
              <div style={{ fontSize: 12, color: '#64748B' }}>Dirección de Registros y Servicios Académicos</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginTop: 10 }}>
                CONSTANCIA OFICIAL DE MATRÍCULA — PERIODO 2027-I
              </div>
            </div>

            {/* Datos del Estudiante */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 12, marginBottom: 20, background: '#F8FAFC', padding: 12, borderRadius: 8 }}>
              <div><strong>Estudiante:</strong> {perfil?.nombre}</div>
              <div><strong>Código:</strong> {perfil?.codigo}</div>
              <div><strong>Carrera:</strong> {perfil?.carrera}</div>
              <div><strong>Ciclo:</strong> {perfil?.cicloActual}</div>
              <div><strong>Fecha de Emisión:</strong> 28/10/2026 14:30</div>
              <div><strong>Total Créditos:</strong> {creditos}</div>
            </div>

            {/* Tabla de Asignaturas */}
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginBottom: 20 }}>
              <thead>
                <tr style={{ background: '#1E4E79', color: '#FFF' }}>
                  <th style={{ padding: '8px 10px', textAlign: 'left' }}>Código</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left' }}>Asignatura</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center' }}>Sección</th>
                  <th style={{ padding: '8px 10px', textAlign: 'center' }}>Créditos</th>
                  <th style={{ padding: '8px 10px', textAlign: 'left' }}>Aula</th>
                </tr>
              </thead>
              <tbody>
                {secciones.map((sec, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #E2E8F0' }}>
                    <td style={{ padding: '8px 10px', fontWeight: 600 }}>{sec.codigoCurso}</td>
                    <td style={{ padding: '8px 10px' }}>{sec.nombreCurso}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center' }}>{sec.seccionId}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center' }}>{sec.creditos}</td>
                    <td style={{ padding: '8px 10px' }}>{sec.aula}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Sello y Validación Digital */}
            <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11, color: '#64748B' }}>
              <div>
                <div><strong>Código de Verificación:</strong> 8F92-UCSS-2027-MAT</div>
                <div>Documento firmado digitalmente conforme a la Ley N.° 27269.</div>
              </div>
              <button
                onClick={() => window.print()}
                style={{
                  background: '#1E4E79',
                  color: '#FFF',
                  padding: '8px 16px',
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}
              >
                <Printer size={14} /> Imprimir / PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
