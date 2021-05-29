const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPut, usersPost, usersDelete, usersCheckDni } = require('../controllers/users');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usersGet)

router.get('/:dni', usersCheckDni)

router.post('/', [
    //middlewares

    //chequeos...

    check('primer_nombre', 'El primer nombre es obligatorio').not().isEmpty(),
    check('primer_nombre', 'El primer nombre debe ser en mayusculas').isUppercase(),
    check('primer_apellido', 'El primer apellido es obligatorio').not().isEmpty(),
    check('primer_apellido', 'El primer apellido debe ser en mayusculas').isUppercase(),
    check('segundo_apellido', 'El segundo apellido es obligatorio').not().isEmpty(),
    check('segundo_apellido', 'El segundo apellido debe ser en mayusculas').isUppercase(),
    check('otros_nombres', 'El segundo nombre debe ser en mayusculas').isUppercase(),
    check('pais', 'El pais es obligatorio').not().isEmpty(),
    check('pais', 'No es un pais valido.').isIn(['Colombia', 'Estados Unidos']),
    check('tipo_dni', 'No es un tipo de dni valido.').isIn(['Cedula de Ciudadania', 'Cedula de Extranjeria', 'Pasaporte', 'Permiso Especial']),
    check('dni', 'El dni es obligatorio').not().isEmpty(),
    check('fecha_ingreso', 'La fecha de ingreso es obligatoria').not().isEmpty(),
    check('area', 'No es un tipo de area valido.').isIn(['Administracion', 'Financiera', 'Compras', 'Infraestructura', 'Operacion', 'Talento Humano', 'Servicios Varios']),
    check('date', 'La fecha de registro es obligatoria').not().isEmpty(),

    validarCampos //si todos los check pasan entonces sigue, si no, regresa un error.


], usersPost)

router.put('/:id', usersPut)

router.delete('/', usersDelete)


module.exports = router;