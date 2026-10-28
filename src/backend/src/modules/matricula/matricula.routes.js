const router = require('express').Router();
const { autenticar } = require('../../middlewares/auth');
const { permitirRoles } = require('../../middlewares/roles');
const { matricular } = require('./matricula.controller');

router.post('/', autenticar, permitirRoles('ESTUDIANTE', 'REGISTROS'), matricular);
// TODO: DELETE /:id (retiro), GET /mis-matriculas

module.exports = router;
