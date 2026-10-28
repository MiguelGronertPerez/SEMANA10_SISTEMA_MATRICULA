const jwt = require('jsonwebtoken');
const env = require('../config/env');

// Exige un token JWT válido. Sin token o vencido -> 401.
function autenticar(req, res, next) {
  const cabecera = req.headers.authorization || '';
  const token = cabecera.startsWith('Bearer ') ? cabecera.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'No autorizado' });
  try {
    req.usuario = jwt.verify(token, env.jwtSecret); // { id, rol }
    next();
  } catch {
    return res.status(401).json({ error: 'Sesión vencida o token inválido' });
  }
}

module.exports = { autenticar };
