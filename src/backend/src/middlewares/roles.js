// Control de acceso por rol. Rol no permitido -> 403.
// Roles: ADMIN, REGISTROS, DOCENTE, ESTUDIANTE
function permitirRoles(...roles) {
  return (req, res, next) => {
    if (!req.usuario || !roles.includes(req.usuario.rol)) {
      return res.status(403).json({ error: 'Prohibido' });
    }
    next();
  };
}

module.exports = { permitirRoles };
