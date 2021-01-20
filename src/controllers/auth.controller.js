const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/User');

// Estructura de validación de datos para el inicio de sesión
const schemaLogin = Joi.object({
    email: Joi.string().min(2).max(255).required(),
    password: Joi.string().min(6).max(255).required()
})

// Estructura de validación de datos para el registro de usuarios
const schemaRegister = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(2).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
    address: Joi.string().min(2).max(255).required(),
    phone: Joi.string().min(12).max(12).required(),
    birthday: Joi.date().required()
});

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
})

// Login de usuario
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    // Validar campos
    const { error } = schemaLogin.validate(req.body);
    if (error) {
        return done(null, false, req.flash('errorLogin', 'Los datos no son validos, ' + error.message))
    }

    // Validar email
    const user = await User.findOne({email: email});
    if (!user) {
        return done(null, false, req.flash('errorLogin', 'El correo no existe'));
    }

    // Validar contraseña
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
        return done(null, false, req.flash('errorLogin', 'Contraseña incorrecta'));
    }

    // Todo bien
    return done(null, user);
}))

// Registro de usuario
passport.use('register', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    // Validar datos
    const { error } = schemaRegister.validate(req.body);
    if (error) {
        return done(null, false, req.flash('errorRegister', 'Los datos no son validos, ' + error.message));
    }

    // Validar correo unico
    const isEmailExist = await User.findOne({email: email});
    if (isEmailExist) {
        return done(null, false, req.flash('errorRegister', 'El correo ya esta en uso'));
    }

    // Cifrar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordCrypt = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: passwordCrypt,
        address: req.body.address,
        phone: req.body.phone,
        birthday: req.body.birthday
    });

    try {
        const saveUser = await newUser.save();
        return done(null, newUser, req.flash('successRegister', 'Bienvenido al sistema del Centro Médico Dos Alamos'));
    } catch (error) {
        return done(null, false, req.flash('errorRegister', 'Error: ' + error))
    }
}))

