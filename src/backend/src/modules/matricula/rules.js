// Reglas de negocio de la matrícula: funciones puras (sin base de datos),
// fáciles de probar. Cubren A-01 (objetivos específicos) y los casos de A-04.
const { aMinutos } = require('../../utils/tiempo');

// Prerrequisitos: el estudiante debe tener aprobados todos los del curso.
function prerrequisitosPendientes(curso, aprobados) {
  return (curso.prerrequisitos || []).filter((p) => !aprobados.includes(p));
}

// Cupo: debe haber al menos un lugar disponible.
function hayCupo(seccion) {
  return seccion.matriculados < seccion.cupo;
}

// Cruce: mismo día y rangos que se superponen. Horarios contiguos NO cruzan.
function seCruzan(horarioA, horarioB) {
  return horarioA.some((a) => horarioB.some((b) =>
    a.dia === b.dia &&
    aMinutos(a.inicio) < aMinutos(b.fin) &&
    aMinutos(b.inicio) < aMinutos(a.fin)));
}

function seccionesQueCruzan(seccionNueva, seccionesMatriculadas) {
  return seccionesMatriculadas.filter((s) => seCruzan(seccionNueva.horario, s.horario));
}

// Créditos: la suma no puede superar el límite.
function superaCreditos(creditosActuales, creditosCurso, limite) {
  return creditosActuales + creditosCurso > limite;
}

// Plazo: fecha dentro de [inicio, fin] (inclusive).
function dentroDePlazo(fecha, inicio, fin) {
  return fecha >= inicio && fecha <= fin;
}

/**
 * Valida una solicitud de matrícula y devuelve todos los errores encontrados.
 * @returns {{ok: boolean, errores: {codigo: string, mensaje: string}[]}}
 */
function validarMatricula({ estudiante, curso, seccion, seccionesMatriculadas, fecha, plazo, limiteCreditos }) {
  const errores = [];

  if (!dentroDePlazo(fecha, plazo.inicio, plazo.fin)) {
    errores.push({ codigo: 'FUERA_DE_PLAZO', mensaje: 'La matrícula está fuera del plazo establecido.' });
  }
  if (estudiante.deuda > 0) {
    errores.push({ codigo: 'CON_DEUDA', mensaje: 'El estudiante tiene una deuda pendiente.' });
  }
  const faltan = prerrequisitosPendientes(curso, estudiante.aprobados);
  if (faltan.length > 0) {
    errores.push({ codigo: 'PRERREQUISITO', mensaje: `Prerrequisitos pendientes: ${faltan.join(', ')}.` });
  }
  if (!hayCupo(seccion)) {
    errores.push({ codigo: 'SIN_CUPO', mensaje: 'La sección no tiene cupos disponibles.' });
  }
  const cruces = seccionesQueCruzan(seccion, seccionesMatriculadas);
  if (cruces.length > 0) {
    errores.push({ codigo: 'CRUCE_HORARIO', mensaje: `Cruce de horario con: ${cruces.map((s) => s.codigo).join(', ')}.` });
  }
  if (superaCreditos(estudiante.creditos, curso.creditos, limiteCreditos)) {
    const totalSolicitado = estudiante.creditos + curso.creditos;
    errores.push({
      codigo: 'LIMITE_CREDITOS',
      mensaje: `Se supera el límite de ${limiteCreditos} créditos (intentó matricular ${totalSolicitado} créditos).`,
    });
  }

  return { ok: errores.length === 0, errores };
}

module.exports = {
  prerrequisitosPendientes, hayCupo, seCruzan, seccionesQueCruzan,
  superaCreditos, dentroDePlazo, validarMatricula,
};
