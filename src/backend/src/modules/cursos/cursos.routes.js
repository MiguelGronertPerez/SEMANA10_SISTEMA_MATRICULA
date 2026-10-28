const router = require('express').Router();
const { autenticar } = require('../../middlewares/auth');
const { permitirRoles } = require('../../middlewares/roles');

// Oferta académica del periodo (todos los roles autenticados)
router.get('/oferta', autenticar, (req, res) => res.json([])); // TODO: leer de PostgreSQL / Redis

// Gestión de secciones y cupos (solo Registros Académicos)
router.post('/secciones', autenticar, permitirRoles('REGISTROS'), (req, res) => res.status(501).json({ error: 'Pendiente' }));

module.exports = router;
