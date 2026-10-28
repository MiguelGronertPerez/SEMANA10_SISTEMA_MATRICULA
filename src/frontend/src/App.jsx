import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Oferta from './pages/Oferta.jsx';
import Matricula from './pages/Matricula.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/oferta" element={<Oferta />} />
      <Route path="/matricula" element={<Matricula />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
