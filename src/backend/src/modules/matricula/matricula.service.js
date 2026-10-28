const env = require('../../config/env');
const { validarMatricula } = require('./rules');
const { CURSOS, ESTUDIANTES_DB } = require('../cursos/cursos.data');

function buscarCursoYSeccion(seccionId) {
  for (const curso of CURSOS) {
    const seccion = curso.secciones.find(s => s.id === seccionId || s.codigo === seccionId);
    if (seccion) return { curso, seccion };
  }
  return { curso: null, seccion: null };
}

function calcularCreditosActuales(seccionesCodigos) {
  let total = 0;
  for (const secId of seccionesCodigos) {
    const { curso } = buscarCursoYSeccion(secId);
    if (curso) total += curso.creditos;
  }
  return total;
}

function obtenerDetalleSecciones(seccionesCodigos) {
  const lista = [];
  for (const secId of seccionesCodigos) {
    const { curso, seccion } = buscarCursoYSeccion(secId);
    if (curso && seccion) {
      lista.push({
        seccionId: seccion.id,
        codigoCurso: curso.codigo,
        nombreCurso: curso.nombre,
        creditos: curso.creditos,
        docente: seccion.docente,
        aula: seccion.aula,
        horario: seccion.horario
      });
    }
  }
  return lista;
}

async function obtenerPerfilEstudiante(usuarioId) {
  let estudiante = ESTUDIANTES_DB[usuarioId];
  if (!estudiante) {
    // Si es un usuario admin o nuevo, creamos un perfil estudiante estándar
    estudiante = {
      codigo: usuarioId,
      nombre: 'Estudiante UCSS',
      carrera: 'Ingeniería de Sistemas',
      cicloActual: 3,
      deuda: 0,
      aprobados: ['MAT101', 'PRO101'],
      seccionesMatriculadas: []
    };
    ESTUDIANTES_DB[usuarioId] = estudiante;
  }

  const creditosMatriculados = calcularCreditosActuales(estudiante.seccionesMatriculadas);
  const detalleSecciones = obtenerDetalleSecciones(estudiante.seccionesMatriculadas);

  return {
    ...estudiante,
    creditosMatriculados,
    limiteCreditos: env.maxCreditos || 22,
    seccionesDetalle: detalleSecciones
  };
}

async function matricular(usuarioId, seccionId) {
  const estudiante = await obtenerPerfilEstudiante(usuarioId);
  const { curso, seccion } = buscarCursoYSeccion(seccionId);

  if (!curso || !seccion) {
    const err = new Error('La sección solicitada no existe en la oferta académica.');
    err.status = 404;
    throw err;
  }

  if (estudiante.seccionesMatriculadas.includes(seccion.id)) {
    const err = new Error('Ya se encuentra matriculado en esta sección.');
    err.status = 400;
    throw err;
  }

  // Verificar si ya está matriculado en otra sección del MISMO curso
  for (const secId of estudiante.seccionesMatriculadas) {
    const c = buscarCursoYSeccion(secId);
    if (c.curso && c.curso.codigo === curso.codigo) {
      const err = new Error(`Ya tiene una sección matriculada para el curso ${curso.nombre} (${secId}).`);
      err.status = 400;
      throw err;
    }
  }

  // Obtener objetos de secciones ya matriculadas con sus horarios
  const seccionesMatriculadasObjs = estudiante.seccionesMatriculadas
    .map(sId => buscarCursoYSeccion(sId).seccion)
    .filter(Boolean);

  // Fecha de simulación dentro del calendario oficial 2027-I
  const fechaSimulada = new Date('2027-02-20T10:00:00');
  const plazoOficial = {
    inicio: new Date('2027-02-15T00:00:00'),
    fin: new Date('2027-03-05T23:59:59')
  };

  const resultado = validarMatricula({
    estudiante: {
      ...estudiante,
      creditos: estudiante.creditosMatriculados
    },
    curso,
    seccion,
    seccionesMatriculadas: seccionesMatriculadasObjs,
    fecha: fechaSimulada,
    plazo: plazoOficial,
    limiteCreditos: 22
  });

  if (!resultado.ok) {
    const primerError = resultado.errores[0];
    const err = new Error(primerError.mensaje);
    err.codigo = primerError.codigo;
    err.errores = resultado.errores;
    err.status = 422;
    throw err;
  }

  // Si todas las reglas pasan: Registrar matrícula y descontar cupo
  seccion.matriculados += 1;
  estudiante.seccionesMatriculadas.push(seccion.id);

  return {
    ok: true,
    mensaje: `Matrícula exitosa en ${curso.nombre} (${seccion.id})`,
    seccionId: seccion.id,
    creditosMatriculados: calcularCreditosActuales(estudiante.seccionesMatriculadas),
    matricula: {
      codigoCurso: curso.codigo,
      nombreCurso: curso.nombre,
      seccion: seccion.id,
      docente: seccion.docente,
      horario: seccion.horario
    }
  };
}

async function retirar(usuarioId, seccionId) {
  const estudiante = await obtenerPerfilEstudiante(usuarioId);
  const index = estudiante.seccionesMatriculadas.indexOf(seccionId);

  if (index === -1) {
    const err = new Error('El estudiante no está matriculado en la sección indicada.');
    err.status = 404;
    throw err;
  }

  const { seccion } = buscarCursoYSeccion(seccionId);
  if (seccion && seccion.matriculados > 0) {
    seccion.matriculados -= 1;
  }

  estudiante.seccionesMatriculadas.splice(index, 1);

  return {
    ok: true,
    mensaje: `Retiro exitoso de la sección ${seccionId}.`,
    creditosRestantes: calcularCreditosActuales(estudiante.seccionesMatriculadas)
  };
}

module.exports = {
  obtenerPerfilEstudiante,
  matricular,
  retirar,
  buscarCursoYSeccion
};
