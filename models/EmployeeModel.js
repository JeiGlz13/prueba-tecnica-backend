const {Schema, model} = require('mongoose');

const EmployeeSchema = Schema({
    nombres: {
        type: String,
        require: true
    },
    apellidos: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    cedula: {
        type: String,
        require: true,
        unique: true
    },
    fechaNacimiento: {
        type: String,
        require: true
    },
    numeroINSS: {
        type: String,
        require: true,
        unique: true
    },
    uid: {
        type: String,
        require: true,
        unique: true
    },
})

module.exports = model('Employee', EmployeeSchema);