const env = require('../../config/env');
const { validarMatricula } = require('./rules');

// Orquesta: cargar datos -> validar reglas -> consultar Tesorería -> reservar cupo -> auditar.
async function matricular(/* estudianteId, seccionId */) {
  // TODO: cargar estudiante, curso, sección y matrículas actuales desde PostgreSQL
  // TODO: const deuda = await pagos.consultarDeuda(codigo)
  // TODO: const resultado = validarMatricula({ ..., limiteCreditos: env.maxCreditos })
  // TODO: si resultado.ok -> repository.reservarCupoYMatricular(...) y notificar
  void env; void validarMatricula;
  const err = new Error('Pendiente de implementar');
  err.status = 501;
  throw err;
}

module.exports = { matricular };
