const {response} = require("express");
const EmployeeModel = require("../models/EmployeeModel");


const leerEmpleados = async (req, res = response) => {
    const employees = await EmployeeModel.find();

    res.json({
        ok: true,
        msg: 'Se leyeron los empleados',
        employees
    })
}

const agregarEmpleado = async (req, res = response) => {
    const { email, cedula, numeroINSS, uid} = req.body;

    try {
        const employeeEmail = await EmployeeModel.findOne({email});
        const employeeCedula = await EmployeeModel.findOne({cedula});
        const employeeINSS = await EmployeeModel.findOne({numeroINSS});
        const employeeUID = await EmployeeModel.findOne({uid});

        if(employeeEmail || employeeCedula || employeeINSS || employeeUID) {
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
const actualizarEmpleado = async (req, res = response) => {
    const employeeID = req.params.id;

    try {
        const employee = await EmployeeModel.findById(employeeID);
        if(!employee) {
            res.status(404).json({
                ok: false,
                msg: 'No se encontro el empleado'
            })
        }

        const nuevoEmpleado = {
            ...req.body
        }

        const employeeUpdated = await EmployeeModel.findByIdAndUpdate(employeeID, nuevoEmpleado, {new: true});

        res.json({
            ok: true,
            msg: 'Se actualizo el empleado',
            employee: employeeUpdated
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const eliminarEmpleado = async (req, res = response) => {
    const employeeID = req.params.id;

    try {
        const employee = await EmployeeModel.findById(employeeID);
        if(!employee) {
            res.status(404).json({
                ok: false,
                msg: 'No se encontro el empleado'
            })
        }


        await EmployeeModel.findByIdAndDelete(employeeID);

        res.json({
            ok: true,
            msg: 'Se elimino el empleado'
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    agregarEmpleado,
    eliminarEmpleado,
    actualizarEmpleado,
    leerEmpleados
}
