const { Empleados } = require('../database/db');

//fn para crear el correo del nuevo empleado.
const createEmail = async ({ primer_apellido, primer_nombre, pais }) => {

    return new Promise(async (resolve, reject) => {
        let dominio = 'cidenet.com.us';
        if (pais === 'Colombia') {
            dominio = 'cidenet.com.co'
        }
        let email = `${primer_nombre.toLowerCase()}.${primer_apellido.trim().replace(/ /g, '').toLowerCase()}@${dominio}`;
        let exist = true;
        let i = 1;
        while (exist) {
            exist = false;
            try {
                var user = await Empleados.findOne({
                    where: {
                        email
                    }
                });
                if (user) {
                    exist = true;
                    email = `${primer_nombre.toLowerCase()}.${primer_apellido.trim().replace(/ /g, '').toLowerCase()}.${i}@${dominio}`;
                } else {
                    resolve(email)
                }
            } catch (err) {
                reject(err)
            }
            i++;
        }

    })

}

module.exports = {
    createEmail
}