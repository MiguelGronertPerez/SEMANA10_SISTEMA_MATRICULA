const service = require('./matricula.service');

async function matricular(req, res, next) {
  try {
    res.status(201).json(await service.matricular(req.usuario.id, req.body.seccionId));
  } catch (e) { next(e); }
}

module.exports = { matricular };
