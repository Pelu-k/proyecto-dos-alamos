const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { appConfig } = require('../config');

const User = require('../models/User');

// Estructura de validación de datos para el inicio de sesión
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(255).required()
})

const login = async (req, res, next) => {
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
}

module.exports = {login}