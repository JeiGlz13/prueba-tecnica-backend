const {Schema, model} = require('mongoose');

const EmployeeSchema = Schema({
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
        required: true,
        unique: true
    },
    fechaNacimiento: {
        type: String,
        required: true
    },
    numeroINSS: {
        type: String,
        required: true,
        unique: true
    },
    uid: {
        type: String,
        required: true,
        unique: true
    },
})

module.exports = model('Employee', EmployeeSchema);