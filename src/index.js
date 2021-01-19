const express = require('express');
const { appConfig } = require('./config');
const bodyparser = require('body-parser');
const path = require('path');

const app = express();
const db = require('./database/Connection');

// Configuración
app.set('port', appConfig.port || 8080);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Middlewares
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Rutas
app.use(require('./routes/entries.routes'));

app.listen(app.get('port'), () => {
    console.log(`Escuchando en: http://${appConfig.host}:${appConfig.port}`);
});