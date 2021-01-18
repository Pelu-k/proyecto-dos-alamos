const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

const User = require('../models/User');

// Estructura de validación de datos para el registro de usuarios
const schemaRegister = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(10).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
});

const register = async (req, res, next) => {
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
}

module.exports = {register}