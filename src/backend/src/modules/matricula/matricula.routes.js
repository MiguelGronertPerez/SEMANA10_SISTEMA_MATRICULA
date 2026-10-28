const router = require('express').Router();
const { autenticar } = require('../../middlewares/auth');
const { permitirRoles } = require('../../middlewares/roles');
const { obtenerPerfil, matricular, retirar } = require('./matricula.controller');

// Perfil y resumen de matrícula del estudiante actual
router.get('/perfil', autenticar, obtenerPerfil);

// Inscribir curso
router.post('/', autenticar, permitirRoles('ESTUDIANTE', 'ADMIN', 'REGISTROS'), matricular);

// Retiro de asignatura dentro de plazo
router.delete('/:seccionId', autenticar, permitirRoles('ESTUDIANTE', 'ADMIN', 'REGISTROS'), retirar);

module.exports = router;
