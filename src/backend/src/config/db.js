// Conexión a PostgreSQL. Pendiente: instalar "pg" y crear el Pool con env.databaseUrl.
// El esquema SQL vive en db/ (artefacto A-06).
module.exports = { query: async () => { throw new Error('Base de datos no configurada todavía'); } };
