const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('../../config/env');

function generarToken(usuario) {
  return jwt.sign({ id: usuario.id, rol: usuario.rol }, env.jwtSecret, { expiresIn: env.jwtExpira });
}

async function verificarClave(claveIngresada, hash) {
  return bcrypt.compare(claveIngresada, hash);
}

// TODO: buscar usuario en PostgreSQL, contar intentos fallidos en Redis,
// bloquear tras env.maxIntentosLogin (CP-AUT-04) y registrar en auditoría.
async function iniciarSesion(/* usuario, clave */) {
  const err = new Error('Credenciales inválidas'); // mensaje genérico (CP-AUT-02/03)
  err.status = 401;
  throw err;
}

module.exports = { generarToken, verificarClave, iniciarSesion };
