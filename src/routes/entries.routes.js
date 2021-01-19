const router = require('express').Router();

const ValidateToken = require('../middleware/ValidateToken');

const { register } = require('../controllers/register.controller');
const { login } = require('../controllers/login.controller');

router.get('/', async (req, res, next) => {

    res.render('index')
/*     res.json({
        estado: true,
        mensaje: 'Funcionando, Home'
    }); */
});

// Registro y autenticación de usuario
router.get('/register', (req, res, next) => {

    res.render('registrar')
/*     res.json({
        estado: true,
        mensaje: 'Funcionando, Register'
    }); */
})

router.post('/register', register);

router.get('/login', (req, res, next) => {
    res.render('login')
/*     res.json({
        estado: true,
        mensaje: 'Funcionando, Login'
    }) */
})

router.post('/login', login)

// Rutas restringidas




module.exports = router