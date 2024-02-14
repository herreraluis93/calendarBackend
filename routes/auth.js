/*
    Rutas de usuario / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { crearUsuario, revalidarToken, loginUsuario } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post(
    '/new',
    [//middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El mail es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres mínimo').isLength({ min: 6 }),
        validarCampos,
    ], 
    crearUsuario);

router.post(
    '/',
    [//middleware
        check('email', 'El mail es obligatorio').isEmail(),
        check('password', 'El password debe tener 6 caracteres mínimo').isLength({ min: 6 }),
        validarCampos,
    ],
    loginUsuario);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;