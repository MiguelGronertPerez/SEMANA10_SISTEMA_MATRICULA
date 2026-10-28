const service = require('./auth.service');

async function login(req, res, next) {
  try {
    const { usuario, clave } = req.body;
    res.json(await service.iniciarSesion(usuario, clave));
  } catch (e) { next(e); }
}

module.exports = { login };
