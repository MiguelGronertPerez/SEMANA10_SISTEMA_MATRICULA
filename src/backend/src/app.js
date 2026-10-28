const express = require('express');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/salud', (req, res) => res.json({ estado: 'ok' }));
app.use('/api/auth', require('./modules/auth/auth.routes'));
app.use('/api/cursos', require('./modules/cursos/cursos.routes'));
app.use('/api/matriculas', require('./modules/matricula/matricula.routes'));

app.use(errorHandler);

module.exports = app;
