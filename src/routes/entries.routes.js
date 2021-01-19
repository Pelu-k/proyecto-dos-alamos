const router = require('express').Router();
const passport = require('passport');

router.get('/', async (req, res, next) => {
    res.render('index', {success: ''});
});

// Registro y autenticación de usuario
router.get('/register', (req, res, next) => {
    res.render('register', {error: ''});
})

router.post('/register', passport.authenticate('local-register', {
    successRedirect: '/user/profile',
    failureRedirect: '/register',
    failureFlash: true
}));

router.get('/login', (req, res, next) => {
    res.render('login', {error: ''})
    //res.json({error: null, msg: 'Login'})
})

router.post('/login', passport.authenticate('login', {
    successRedirect: '/user/profile',
    failureRedirect: '/login',
    failureFlash: true
}))

router.get('/logout', isAuthenticated, (req, res, next) => {
    req.logout();
    res.redirect('/');
})
// Rutas restringidas

router.get('/user/profile', isAuthenticated, async (req, res, next) => {
    res.render('profile', {success: `Bienvenido/a`});
})


// Validar autenticación

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/')
}


module.exports = router