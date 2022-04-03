const express = require('express');
const { agregarEmpleado, eliminarEmpleado, actualizarEmpleado, leerEmpleados } = require('../controllers/employees');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = express.Router();

router.get('/', leerEmpleados)

router.post('/create', [ 
    check('nombres', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('numeroINSS', 'El numero de INSS es obligatorio').not().isEmpty(),
    check('cedula', 'La cedula es obligatorio').not().isEmpty(),
    check('fechaNacimiento', 'La fecha de nacimiento es obligatorio').not().isEmpty(),
    check('uid', 'El uid es obligatorio').not().isEmpty(),
    validarCampos
] ,agregarEmpleado);

router.delete('/:id', eliminarEmpleado);

router.put('/:id', 
[ 
    check('nombres', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('numeroINSS', 'El numero de INSS es obligatorio').not().isEmpty(),
    check('cedula', 'La cedula es obligatorio').not().isEmpty(),
    check('fechaNacimiento', 'La fecha de nacimiento es obligatorio').not().isEmpty(),
    check('uid', 'El uid es obligatorio').not().isEmpty(),
    validarCampos
]
,actualizarEmpleado)

module.exports = router;
