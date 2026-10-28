import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Calendar, GraduationCap, LogOut, CheckCircle, AlertTriangle, UserCheck } from 'lucide-react';

export default function Navbar({ perfil, alCambiarEstudiante }) {
  const location = useLocation();
  const navigate = useNavigate();

  function cerrarSesion() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
    navigate('/');
  }

  const creditos = perfil?.creditosMatriculados || 0;
  const maxCreditos = perfil?.limiteCreditos || 22;
  const porcentaje = Math.min((creditos / maxCreditos) * 100, 100);

  return (
    <header style={{
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0 24px'
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16
      }}>
        {/* Logo e Identidad */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #1E4E79, #2563EB)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
          }}>
            <GraduationCap size={20} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: -0.3, color: '#FFFFFF' }}>
              UCSS <span style={{ color: '#38BDF8', fontWeight: 500 }}>Matrículas</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-dim)', marginTop: -2 }}>
              Periodo Académico 2027-I
            </div>
          </div>
        </div>

        {/* Enlaces de Navegación */}
        <nav style={{ display: 'flex', gap: 6, background: '#090D16', padding: 4, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
          <Link
            to="/oferta"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              color: location.pathname === '/oferta' ? '#FFFFFF' : 'var(--text-muted)',
              background: location.pathname === '/oferta' ? '#1E293B' : 'transparent',
              transition: 'all 0.15s ease'
            }}
          >
            <BookOpen size={16} />
            Oferta Académica
          </Link>
          <Link
            to="/matricula"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              color: location.pathname === '/matricula' ? '#FFFFFF' : 'var(--text-muted)',
              background: location.pathname === '/matricula' ? '#1E293B' : 'transparent',
              transition: 'all 0.15s ease'
            }}
          >
            <Calendar size={16} />
            Mi Matrícula
            {perfil?.seccionesMatriculadas?.length > 0 && (
              <span style={{
                background: '#2563EB',
                color: '#FFF',
                fontSize: 11,
                padding: '1px 6px',
                borderRadius: 10,
                fontWeight: 600
              }}>
                {perfil.seccionesMatriculadas.length}
              </span>
            )}
          </Link>
        </nav>

        {/* Sección de Usuario y Créditos */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* Selector de estudiante de prueba */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>Probar caso:</span>
            <select
              value={perfil?.codigo || '20210001'}
              onChange={(e) => alCambiarEstudiante && alCambiarEstudiante(e.target.value)}
              style={{
                fontSize: 12,
                padding: '4px 8px',
                background: '#131D33',
                borderColor: 'var(--border-subtle)',
                color: '#E2E8F0',
                borderRadius: 6
              }}
              title="Cambiar rápidamente de usuario de prueba"
            >
              <option value="20210001">Ana Torres (Caso ideal)</option>
              <option value="20210002">Luis Ramos (Sin prerrequisito)</option>
              <option value="20210003">Carla Díaz (Con deuda)</option>
              <option value="20210004">Jorge Paredes (Límite créditos)</option>
            </select>
          </div>

          {/* Medidor de Créditos */}
          <div style={{
            background: '#090D16',
            border: '1px solid var(--border-subtle)',
            borderRadius: 8,
            padding: '5px 12px',
            minWidth: 130
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
              <span style={{ color: 'var(--text-muted)' }}>Créditos:</span>
              <span style={{ fontWeight: 600, color: creditos > maxCreditos ? '#F43F5E' : '#38BDF8' }}>
                {creditos} / {maxCreditos}
              </span>
            </div>
            <div style={{ width: '100%', height: 4, background: '#1E293B', borderRadius: 2, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${porcentaje}%`,
                background: creditos > maxCreditos ? '#F43F5E' : creditos >= 18 ? '#F59E0B' : '#10B981',
                transition: 'width 0.3s ease'
              }} />
            </div>
          </div>

          {/* Estado de Deuda */}
          {perfil?.deuda > 0 ? (
            <div className="badge badge-rose" title="Bloqueado por Tesorería">
              <AlertTriangle size={12} />
              Deuda: S/ {perfil.deuda.toFixed(2)}
            </div>
          ) : (
            <div className="badge badge-green" title="Solvente para matrícula">
              <CheckCircle size={12} />
              Solvente
            </div>
          )}

          {/* Botón Salir */}
          <button
            onClick={cerrarSesion}
            title="Cerrar sesión"
            style={{
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-muted)',
              padding: '6px 10px',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12
            }}
          >
            <LogOut size={14} />
            Salir
          </button>
        </div>
      </div>
    </header>
  );
}
