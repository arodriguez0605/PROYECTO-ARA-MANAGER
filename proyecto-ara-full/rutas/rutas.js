const express = require('express');

const autenticar = require('../middlewares/AuthController');
const usuarioCtrl = require('../controladores/UserController');
//const loremCtrl = require('../controladores/lorem'); // Ejemplos
//const loremCtrl = require('../controladores/lorem'); // Ejemplos

// Middleware de autenticación que nos permite proteger ciertas rutas
var VerifyToken = require('../middlewares/VerifyToken');

// Se usa un router de express para las rutas
const api = express.Router();

// ==================== PETICIONES DE USUARIO ====================
// === Petición de tipo POST para Insertar nuevos recursos: 
api.post('/register', autenticar.registrarUsuario);

// === Petición de tipo POST para Login: 
api.post('/login', autenticar.loginUsuario);

// === Petición de tipo GET para Logout: 
api.get('/logout', autenticar.logoutUsuario);

// === Petición de tipo GET para Prueba: 
api.get('/me', VerifyToken, autenticar.me);

// === Petición de tipo GET que devuelve todos los Recursos de la base:
api.get('/usuarios', usuarioCtrl.mostrarUsuarios)

// Ejemplos:
// === Petición de tipo GET para un único recurso en concreto:
// api.get('/usuario/:usuarioId', usuarioCtrl.getUsuario)

// === Petición de tipo PUT para Actualizar un único recurso:
// api.put('/usuario/:usuarioId', usuarioCtrl.updateUsuario)

// === Petición de tipo DELETE para Borrar un único recurso:
// api.delete('/usuario/:usuarioId', usuarioCtrl.deleteUsuario)

// ==================== PETICIONES DE LOREM ====================

// ==================== PETICIONES DE LOREM ====================

// Se exportan las rutas
module.exports = api;
