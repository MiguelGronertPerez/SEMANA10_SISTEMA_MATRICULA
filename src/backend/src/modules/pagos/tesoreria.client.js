// Cliente del Sistema de Tesorería (externo). Tiempo de espera: 10 s (A-04, sección 3.1).
// Si Tesorería no responde, NO se confirma la matrícula.
const env = require('../../config/env');

async function consultarDeuda(codigoEstudiante) {
  // TODO: GET `${env.tesoreriaUrl}/estudiantes/${codigoEstudiante}/deuda` con timeout de 10 s
  void env; void codigoEstudiante;
  throw new Error('Pendiente de implementar');
}

module.exports = { consultarDeuda };
