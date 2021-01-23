const router = require('express').Router();
const passport = require('passport');
require('../controllers/auth.controller');
const nodemailer = require('nodemailer');
const { mailConfig } = require('../config');

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

//#region Borrar
router.get('/user/assing', isAuthenticated, async (req, res, next) => {
    res.render('assing');
});

router.post('/user/assing', isAuthenticated, async (req, res, next) => {
    
})
//#endregion

// ruta para consultar por todos los doctores para uso de AJAX
router.get('/doctors', isAuthenticated, async (req, res, next) => {
    if (req.user.rol === 'Secretaria') {
        const doctors = await User.find({rol: 'Doctor'});
        res.json({doctors});
    } else {
        res.redirect('404');
    }
});

// Cambiar la disponibilidad del medico
router.put('/availability/:id', isAuthenticated, async (req, res, next) => {
    if (req.user.rol === 'Secretaria') {
        let doctor = await User.findByIdAndUpdate({
            _id: req.params.id
        },
        {
            $set: {
                availability: req.body.docAvailability
            }
        });
        res.redirect('/user/profile');
    }
});

router.get('/user/send/:id', isAuthenticated, async (req, res, next) => {
    const userTo = await User.findOne({_id: req.params.id});
    res.render('send', {userTo});
});

// Enviar correo
router.post('/user/send/:id', isAuthenticated, async (req, res, next) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        secure: false,
        port: 587,
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: mailConfig.user,
            pass: mailConfig.pass
        }
    })

    const mensaje = req.body.msg;

    const mailOptions = {
        from: `"${req.user.name}" <${mailConfig.user}>`,
        to: req.body.email,
        subject: 'Contacto',
        text: mensaje
    }

    await transporter.sendMail(mailOptions, function(error, info) {
        if(error){
            //console.log(error)
            res.redirect('/user/profile')
        } else {
            //console.log('mensaje enviado ' + info.response)
            res.redirect('/user/profile')
        }
    })
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