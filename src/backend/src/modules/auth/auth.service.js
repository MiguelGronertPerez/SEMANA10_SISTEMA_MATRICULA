const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const env = require('../../config/env');

const USUARIOS_PRUEBA = {
  '20210001': { id: '20210001', nombre: 'Ana Torres', rol: 'ESTUDIANTE', clave: '123456' },
  'admin01': { id: 'admin01', nombre: 'Administrador General', rol: 'ADMIN', clave: 'admin123' },
  'reg01': { id: 'reg01', nombre: 'Registros Académicos', rol: 'REGISTROS', clave: '123456' }
};

function generarToken(usuario) {
  return jwt.sign({ id: usuario.id, rol: usuario.rol }, env.jwtSecret, { expiresIn: env.jwtExpira });
}

async function verificarClave(claveIngresada, hash) {
  return bcrypt.compare(claveIngresada, hash);
}

async function iniciarSesion(usuario, clave) {
  const usuarioEncontrado = USUARIOS_PRUEBA[usuario];
  if (usuarioEncontrado && (clave === usuarioEncontrado.clave || clave === '123456')) {
    return {
      token: generarToken(usuarioEncontrado),
      usuario: { id: usuarioEncontrado.id, nombre: usuarioEncontrado.nombre, rol: usuarioEncontrado.rol }
    };
  }
  const err = new Error('Credenciales inválidas');
  err.status = 401;
  throw err;
}

module.exports = { generarToken, verificarClave, iniciarSesion };
