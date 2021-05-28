const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPut, usersPost, usersDelete } = require('../controllers/users');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usersGet)

router.post('/', [
    //middlewares

    //chequeos...
    /*
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //validando que NO este vacio
    check('password', 'La contraseña debe tener mas de 6 caracteres.').isLength({ min: 6 }), //validando contraseña
    check('correo', 'El correo no es válido').isEmail(), //validando parametros, que sea un correo. en este caso.
    check('rol', 'No es un rol valido.').isIn(['Array', 'De', 'Opciones']), //validando si esta en la lista del array enviado.
    validarCampos //si todos los check pasan entonces sigue, si no, regresa un error.
    */

], usersPost)

router.put('/:id', usersPut)

router.delete('/', usersDelete)


module.exports = router;