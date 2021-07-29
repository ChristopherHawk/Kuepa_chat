const { Router } = require('express');
const router = Router();

const {
  registro,
  iniciarSesion,
  cerrarSesion
} = require('../controladores/usuarios.ctrl');

//Registro
router.post('/registro', registro);

//Iniciar sesión
router.post('/iniciarSesion', iniciarSesion);

//Cerrar sesión
router.get('/cerrarSesion', cerrarSesion);







module.exports = router;