const express = require('express');
const session = require('express-session');
const { appConfig } = require('./config');
const bodyparser = require('body-parser');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');

const app = express();
const db = require('./database/Connection');

// Configuración
app.set('port', appConfig.port || 8080);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(__dirname + '/public'));


// Middlewares
app.use(bodyparser.urlencoded({ extended: false }));
app.use(session({
    secret: appConfig.secret,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyparser.json());
app.use((req, res, next) => {
    app.locals.errorLogin = req.flash('errorLogin');
    app.locals.errorRegister = req.flash('errorRegister');
    app.locals.successRegister = req.flash('successRegister');
    app.locals.user = req.user;
    next();
})

// Rutas
app.use(require('./routes/entries.routes'));

app.listen(app.get('port'), () => {
    console.log(`Escuchando en: http://${appConfig.host}:${appConfig.port}`);
});