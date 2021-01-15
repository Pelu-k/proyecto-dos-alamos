const jwt = require('jsonwebtoken');
const { appConfig } = require('../config');

const validateToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).json({
            error: 'Acceso denegado'
        });
    }
    try {
        const validate = jwt.verify(token, appConfig.secret);
        req.user = validate;
        next();
    } catch (error) {
        res.status(400).json({
            error: 'El token no es valido'
        });
    }
}

module.exports = {
    validateToken
};