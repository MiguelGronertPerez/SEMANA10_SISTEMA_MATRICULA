const router = require('express').Router();
const { autenticar } = require('../../middlewares/auth');
const { permitirRoles } = require('../../middlewares/roles');
const { CURSOS } = require('./cursos.data');

// Oferta académica del periodo 2027-I (todos los roles autenticados)
router.get('/oferta', autenticar, (req, res) => {
  res.json({
    periodo: '2027-I',
    fechaInicio: '2027-02-15',
    fechaFin: '2027-03-05',
    limiteCreditos: 22,
    cursos: CURSOS
  });
});

// Gestión de secciones y cupos (solo Registros Académicos)
router.post('/secciones', autenticar, permitirRoles('REGISTROS'), (req, res) => {
  res.status(501).json({ error: 'Pendiente' });
});

module.exports = router;
