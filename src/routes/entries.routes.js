const router = require('express').Router();
const passport = require('passport');
require('../controllers/auth.controller');

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
router.get('/user', isAuthenticated, (req, res, next) => {
    res.redirect('/user/profile');
});

router.get('/user/logout', isAuthenticated, (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.get('/user/profile', isAuthenticated, async (req, res, next) => {
    res.render('profile');
});


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