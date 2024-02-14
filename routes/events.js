const { Router } = require('express');
const { obtenerEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();
//Todas tienen que pasar por la validación del JWT
router.use( validarJWT );


//Obtener eventos
router.get('/', obtenerEventos);

//Crear un evento
router.post(
    '/',
    [
        check('title','El título es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de fin es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento);

//Actualizar evento
router.put('/:id',
    [
        check('title','El título es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de fin es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento);

//Eliminar evento
router.delete('/:id', eliminarEvento);

module.exports = router;