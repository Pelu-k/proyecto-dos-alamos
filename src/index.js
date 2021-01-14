const express = require('express');
const { appConfig } = require('./config');
const bodyparser = require('body-parser');

const app = express();
const db = require('./database/Connection');

// Configuración
app.set('port', appConfig.port || 8080);

// Middlewares
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Rutas
app.use(require('./routes/entries.routes'));

app.listen(app.get('port'), () => {
    console.log(`Escuchando en: ${appConfig.host}:${appConfig.port}`);
});