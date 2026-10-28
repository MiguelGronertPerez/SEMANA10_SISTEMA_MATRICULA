require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'cambiar-en-produccion',
  jwtExpira: process.env.JWT_EXPIRA || '2h',
  databaseUrl: process.env.DATABASE_URL, // PostgreSQL
  redisUrl: process.env.REDIS_URL,       // Redis (sesiones y cupos)
  tesoreriaUrl: process.env.TESORERIA_URL,
  smtp: { host: process.env.SMTP_HOST, port: process.env.SMTP_PORT },
  // Parámetros académicos (valores de prueba de A-04, sección 3.1)
  maxCreditos: Number(process.env.MAX_CREDITOS || 22),
  maxIntentosLogin: Number(process.env.MAX_INTENTOS_LOGIN || 5),
};
