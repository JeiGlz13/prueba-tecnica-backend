const {response} = require("express");
const EmployeeModel = require("../models/EmployeeModel");


const leerEmpleados = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Se leyeron los empleados'
    })
}

const agregarEmpleado = async (req, res = response) => {
    const { email, cedula, numeroINSS} = req.body;

    try {
        const employeeEmail = await EmployeeModel.findOne({email});
        const employeeCedula = await EmployeeModel.findOne({cedula});
        const employeeINSS = await EmployeeModel.findOne({numeroINSS});

        if(employeeEmail || employeeCedula || employeeINSS) {
            res.status(500).json({
                ok: false,
                msg: 'Un usuario existe con esos datos'
            })
        }

        const employee = new EmployeeModel(req.body);
        await employee.save();
        res.json({
            ok: true,
            msg: 'Se agrego un empleado',
            uid: employee.uid,
            nombres: employee.nombres,
            apellidos: employee.apellidos,
            cedula: employee.cedula,
            email: employee.email,
            numeroINSS: employee.numeroINSS,
            fechaNacimiento: employee.fechaNacimiento
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
  
}
const actualizarEmpleado = (req, res = response) => {
    const {nombres, apellidos, email, cedula, numeroINSS, fechaNacimiento, uid} = req.body

    res.json({
        ok: true,
        msg: 'Se actualizo un empleado',
        nombres,
        apellidos,
        email,
        cedula,
        numeroINSS,
        fechaNacimiento,
        uid
    })
}
const eliminarEmpleado = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Se elimino un empleado'
    })
}

module.exports = {
    agregarEmpleado,
    eliminarEmpleado,
    actualizarEmpleado,
    leerEmpleados
}
