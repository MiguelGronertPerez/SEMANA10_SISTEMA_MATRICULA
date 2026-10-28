import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Oferta from './pages/Oferta.jsx';
import Matricula from './pages/Matricula.jsx';
import Navbar from './components/Navbar.jsx';
import { api } from './api/client.js';

export default function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      cargarPerfil();
    }
  }, [token]);

  async function cargarPerfil() {
    try {
      const data = await api('/matriculas/perfil');
      setPerfil(data);
    } catch (err) {
      console.error('Error al cargar perfil:', err);
    }
  }

  async function cambiarEstudiante(codigo) {
    try {
      // Re-autenticar transparentemente con el nuevo estudiante demo
      const res = await api('/auth/login', {
        method: 'POST',
        body: { usuario: codigo, clave: '123456' }
      });
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('usuario', JSON.stringify(res.usuario));
      setToken(res.token);
      const nuevoPerfil = await api('/matriculas/perfil');
      setPerfil(nuevoPerfil);
    } catch (err) {
      console.error('Error al cambiar de estudiante:', err);
    }
  }

  function alAutenticar() {
    setToken(sessionStorage.getItem('token'));
    cargarPerfil();
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {token && <Navbar perfil={perfil} alCambiarEstudiante={cambiarEstudiante} />}
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/oferta" replace /> : <Login alAutenticar={alAutenticar} />}
        />
        <Route
          path="/oferta"
          element={token ? <Oferta perfil={perfil} alActualizarPerfil={cargarPerfil} /> : <Navigate to="/" replace />}
        />
        <Route
          path="/matricula"
          element={token ? <Matricula perfil={perfil} alActualizarPerfil={cargarPerfil} /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
