const { response } = require('express');
const { Empleados } = require('../database/db');
const { checkChange } = require('../helpers/change');
const { createEmail } = require('../helpers/createEmail');

const usersGet = async (req, res = response) => {

    const query = req.query; //es lo que viene despues de un "?", se puede desestructurar.  Se recibe como string
    const users = await Empleados.findAll();

    res.json({
        msg: "get API - controller",
        data: users,
        query
    })
}

//chequear que el dni no se encuentre registrado.
const usersCheckDni = async (req, res = response) => {

    const dni = req.params.dni;
    try {
        var users = await Empleados.findOne({
            where: {
                dni
            }
        });

    } catch (err) {
        console.log(err)
    }

    if (users) {
        res.json({
            msg: "DNI existe",
            data: true,
        })
    } else {
        res.json({
            msg: "DNI no existe",
            data: false,
        })
    }

}

const usersPost = async (req, res) => {

    const body = req.body;
    let email;
    //create email
    try {
        email = await createEmail({ primer_apellido: body.primer_apellido, primer_nombre: body.primer_nombre, pais: body.pais })
    } catch (err) {
        res.status(500).json({
            msg: "Error generando el correo electronico.",
            error: err
        })
    }

    //saving the new employee
    try {
        const respuesta = await Empleados.create({
            primer_apellido: body.primer_apellido,
            segundo_apellido: body.segundo_apellido,
            primer_nombre: body.primer_nombre,
            otros_nombres: body.otros_nombres,
            pais: body.pais,
            tipo_dni: body.tipo_dni,
            dni: body.dni,
            email: email,
            fecha_ingreso: body.fecha_ingreso,
            area: body.area
        })
        console.log("DATA:", respuesta)
        if (respuesta.error) {
            res.status(400).json({
                msg: "post API",
                error: respuesta.error
            })
        } else {
            res.status(201).json({
                msg: "post API",
                data: respuesta
            })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "post API",
            error: err
        })
    }


}

const usersPut = async (req, res) => {

    const id = req.params.id; //es lo que viene en la ruta (link), se debe conf en su ruta. Se recibe como string
    const body = req.body;

    //check if first name and last name changed.
    const change = await checkChange(id, body.primer_nombre, body.primer_apellido)
    console.log("Cambia nombre o apellido?", change)

    if (change === 'yes') {
        //create email
        try {
            email = await createEmail({ primer_apellido: body.primer_apellido, primer_nombre: body.primer_nombre, pais: body.pais })
        } catch (err) {
            res.status(500).json({
                msg: "Error generando el correo electronico.",
                error: err
            })
        }
    } else {
        email = change
    }

    //saving the new employee
    try {
        const respuesta = await Empleados.update({
            primer_apellido: body.primer_apellido,
            segundo_apellido: body.segundo_apellido,
            primer_nombre: body.primer_nombre,
            otros_nombres: body.otros_nombres,
            pais: body.pais,
            tipo_dni: body.tipo_dni,
            dni: body.dni,
            email: email,
            area: body.area
        }, {
            where: {
                id
            }
        })
        console.log("DATA:", respuesta)
        if (respuesta.error) {
            res.status(400).json({
                msg: "put API",
                error: respuesta.error
            })
        } else {
            try {
                var users = await Empleados.findByPk(id);
                res.status(200).json({
                    msg: "put API",
                    data: users
                })

            } catch (err) {
                console.log(err)
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            msg: "put API",
            error: err
        })
    }

}

const usersDelete = async (req, res) => {

    const id = req.params.id;

    try {
        await Empleados.destroy({
            where: {
                id
            }
        });

        res.status(200).json({
            msg: "delete API",
            id
        })
    } catch (error) {
        res.status(500).json({
            msg: "delete API",
            error: error
        })
    }


}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersCheckDni,
}