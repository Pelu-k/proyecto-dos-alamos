const router = require('express').Router();
const passport = require('passport');
require('../controllers/auth.controller');

const User = require('../models/User');

router.get('/', async (req, res, next) => {
    res.render('index');
});

// Registro y autenticación de usuario
router.get('/register', isNotAuthenticated, (req, res, next) => {
    res.render('register');
});

router.post('/register', passport.authenticate('register', {
    successRedirect: '/user',
    failureRedirect: '/register',
    failureFlash: true
}));

router.get('/login', isNotAuthenticated, (req, res, next) => {
    res.render('login')
    //res.json({error: null, msg: 'Login'})
});

router.post('/login', passport.authenticate('login', {
    successRedirect: '/user/profile',
    failureRedirect: '/login',
    failureFlash: true
}));


// Rutas restringidas
router.get('/user', isAuthenticated,async (req, res, next) => {
    res.redirect('/user/profile');

});

router.get('/user/logout', isAuthenticated, (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.get('/user/profile', isAuthenticated, async (req, res, next) => {
    const users = await User.find();
    res.render('profile', {users});
});

router.get('/doctors', isAuthenticated, async (req, res, next) => {
    if (req.user.rol === 'Secretaria' || req.user.rol === 'Administrador') {
        const doctors = await User.find({rol: 'Doctor'});
        res.json({doctors});
    } else {
        res.json({msg: 'No tienes los permisos necesarios'});
    }
})


// Validar autenticación
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}

function isNotAuthenticated(req, res, next){
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;