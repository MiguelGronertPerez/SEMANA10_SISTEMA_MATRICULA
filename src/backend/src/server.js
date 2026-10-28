const app = require('./app');
const env = require('./config/env');

app.listen(env.port, () => console.log(`API de Matrículas escuchando en el puerto ${env.port}`));
