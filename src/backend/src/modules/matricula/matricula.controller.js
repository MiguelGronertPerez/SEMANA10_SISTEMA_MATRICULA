const service = require('./matricula.service');

async function obtenerPerfil(req, res, next) {
  try {
    res.json(await service.obtenerPerfilEstudiante(req.usuario.id));
  } catch (e) { next(e); }
}

async function matricular(req, res, next) {
  try {
    const { seccionId } = req.body;
    res.status(201).json(await service.matricular(req.usuario.id, seccionId));
  } catch (e) { next(e); }
}

async function retirar(req, res, next) {
  try {
    const { seccionId } = req.params;
    res.json(await service.retirar(req.usuario.id, seccionId));
  } catch (e) { next(e); }
}

module.exports = {
  obtenerPerfil,
  matricular,
  retirar
};
