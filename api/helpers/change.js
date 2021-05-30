const { Empleados } = require('../database/db');

const checkChange = async (id, primer_nombre, primer_apellido) => {

    return new Promise(async (resolve, reject) => {

        try {
            var user = await Empleados.findByPk(id);
            if (user.dataValues.primer_nombre !== primer_nombre || user.dataValues.primer_apellido !== primer_apellido) {
                resolve("yes")
            } else {
                resolve(user.dataValues.email)
            }
        } catch (err) {
            reject(err)
        }

    })

}


module.exports = {
    checkChange
}