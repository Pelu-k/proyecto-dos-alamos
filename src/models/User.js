const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 10,
        max: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    address: {
        type: String,
        required: true,
        min: 10,
        max: 255
    },
    phone: {
        type: String,
        required: true,
        min: 12,
        max: 12
    },
    birthday: {
        type: Date,
        required: true,
    },
    dateRegister: {
        type: Date,
        default: Date.now
    },
    rol: {
        type: String,
        required: true,
        default: "Paciente"
    },
    record: [
        {
            type: Record
        }
    ]
});

module.exports = model('User', userSchema);