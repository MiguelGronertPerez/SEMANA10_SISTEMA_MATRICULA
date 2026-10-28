import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client.js';
import { GraduationCap, ArrowRight, ShieldCheck, UserCheck, AlertCircle } from 'lucide-react';

const USUARIOS_DEMO = [
  { codigo: '20210001', nombre: 'Ana Torres', caso: 'Caso ideal: prerrequisitos aprobados y solvente', clave: '123456' },
  { codigo: '20210002', nombre: 'Luis Ramos', caso: 'Prueba: no aprobó PRO101 (bloquea PRO201 y BDD201)', clave: '123456' },
  { codigo: '20210003', nombre: 'Carla Díaz', caso: 'Prueba: deuda de S/ 350.00 en Tesorería', clave: '123456' },
  { codigo: '20210004', nombre: 'Jorge Paredes', caso: 'Prueba: 18 créditos (evalúa exceso de 22 créditos)', clave: '123456' }
];

export default function Login({ alAutenticar }) {
  const [usuario, setUsuario] = useState('20210001');
  const [clave, setClave] = useState('123456');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navegar = useNavigate();

  async function ingresar(e) {
    if (e) e.preventDefault();
    setError('');
    setCargando(true);
    try {
      const res = await api('/auth/login', { method: 'POST', body: { usuario, clave } });
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('usuario', JSON.stringify(res.usuario));
      if (alAutenticar) alAutenticar(res.usuario);
      navegar('/oferta');
    } catch (err) {
      setError(err.message || 'Credenciales inválidas');
    } finally {
      setCargando(false);
    }
  }

  function seleccionarDemo(u) {
    setUsuario(u.codigo);
    setClave(u.clave);
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24,
      background: 'radial-gradient(circle at 50% 20%, #131E38 0%, #090D16 80%)'
    }}>
      <div style={{ maxWidth: 440, width: '100%' }} className="animate-fade-in">
        {/* Cabecera */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: 'linear-gradient(135deg, #1E4E79, #2563EB)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)'
          }}>
            <GraduationCap size={28} color="#FFFFFF" />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5, color: '#FFFFFF' }}>
            Universidad Católica Sedes Sapientiae
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 14, marginTop: 4 }}>
            Sistema de Matrícula — Periodo Académico 2027-I
          </p>
        </div>

        {/* Tarjeta de Login */}
        <div style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 16,
          padding: 28,
          boxShadow: 'var(--shadow-card)'
        }}>
          <form onSubmit={ingresar} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 }}>
                Código de estudiante o usuario
              </label>
              <input
                type="text"
                placeholder="Ej. 20210001"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginBottom: 6 }}>
                Contraseña institucional
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                required
                style={{ width: '100%' }}
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(244, 63, 94, 0.1)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                color: '#FB7185',
                padding: '10px 14px',
                borderRadius: 8,
                fontSize: 13,
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={cargando}
              style={{
                background: 'var(--accent-blue)',
                color: '#FFFFFF',
                padding: '12px',
                borderRadius: 10,
                fontSize: 14,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                marginTop: 4,
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)'
              }}
            >
              {cargando ? 'Verificando...' : 'Iniciar Sesión'}
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Acceso Rápido a Casos de Prueba */}
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
              <UserCheck size={14} color="#38BDF8" />
              Acceso rápido a casos de prueba (A-04):
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {USUARIOS_DEMO.map((u) => (
                <button
                  key={u.codigo}
                  type="button"
                  onClick={() => seleccionarDemo(u)}
                  style={{
                    background: usuario === u.codigo ? '#1E293B' : '#0B1120',
                    border: `1px solid ${usuario === u.codigo ? '#38BDF8' : 'rgba(255,255,255,0.05)'}`,
                    borderRadius: 8,
                    padding: '8px 10px',
                    textAlign: 'left',
                    color: '#E2E8F0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#FFF' }}>{u.nombre} ({u.codigo})</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{u.caso}</div>
                  </div>
                  <span style={{ fontSize: 11, color: '#38BDF8', fontWeight: 600 }}>Cargar</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Pie institucional */}
        <div style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--text-dim)' }}>
          Ingeniería de Software 2 — Semana 10 (Control de Versiones y Artefactos)
        </div>
      </div>
    </div>
  );
}
