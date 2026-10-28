import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client.js';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navegar = useNavigate();

  async function ingresar(e) {
    e.preventDefault();
    try {
      const { token } = await api('/auth/login', { method: 'POST', body: { usuario, clave } });
      sessionStorage.setItem('token', token);
      navegar('/oferta');
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={ingresar}>
      <h1>Sistema de Matrículas</h1>
      <input placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={clave} onChange={(e) => setClave(e.target.value)} />
      <button type="submit">Ingresar</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
