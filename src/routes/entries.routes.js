const router = require('express').Router();
const User = require('../models/User');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { appConfig } = require('../config');

// Estructura de validación de datos para el registro de usuarios
const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(10).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
});

// Estructura de validación de datos para el inicio de sesión
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(255).required()
})

router.get('/', (req, res, next) => {
    res.json({
        estado: true,
        mensaje: 'Funcionando, Home'
    });
});

// Registro y autenticación de usuario
router.get('/register', (req, res, next) => {
    res.json({
        estado: true,
        mensaje: 'Funcionando, Register'
    });
})

router.post('/register', async (req, res, next) => {

    // validar datos del usuario
    const { error } = schemaRegister.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    // Validar correo unico
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json({
            error: 'El email ya esta en uso'
        });
    }

    // Cifrar contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt)

    // Crear nuevo usuario
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });

    // Guardar usuario
    try {
        const saveUser = await user.save();
        res.json({
            error: null,
            data: saveUser,
            mensaje: 'Usuario registrado'
        })
    } catch (error) {
        res.status(400).json({error})
    }
});

router.get('/login', (req, res, next) => {
    res.json({
        estado: true,
        mensaje: 'Funcionando, Login'
    })
})

router.post('/login', async (req, res, next) => {

    // Validar datos
    const { error } = schemaLogin.validate(req.body);
    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        });
    }

    // Comprobar email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({
            error: 'Email incorrecto'
        });
    }

    // Validar contraseña
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) {
        return res.status(400).json({
            error: 'La contraseña no es correcta'
        });
    }

    // Crear token
    const token = jwt.sign({
        user: user.name,
        id: user._id
    }, appConfig.secret)

    res.header('auth-token', token).json({
        error: null,
        data: {
            mensaje: `Bienvenido, ${user.name}`,
            token: token
        }
    });
})

// Rutas restringidas




module.exports = router;