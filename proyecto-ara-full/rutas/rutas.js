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
api.post('/usuario/register', usuarioCtrl.registrarUsuario);

// === Petición de tipo POST para Insertar nuevos recursos: 
api.post('/usuario/nuevaCuenta', usuarioCtrl.nuevaCuenta);

// === Petición de tipo GET para obtener datos del usuario Logeado: 
api.get('/usuario/me', usuarioCtrl.me);

// === Petición de tipo GET para obtener datos del usuario Logeado para el perfil: 
api.get('/usuario/obtenerPerfil', usuarioCtrl.obtenerPerfil);

// === Petición de tipo GET que devuelve todos los Recursos de la base:
api.get('/usuario/obtenerUsuarios', usuarioCtrl.mostrarUsuarios)

// === Petición de tipo GET para un único recurso en concreto:
 api.get('/usuario/:id', usuarioCtrl.buscarUsuario)

// === Petición de tipo PUT para Actualizar el perfil:
api.put('/usuario/guardarPerfil', usuarioCtrl.actualizarPerfil)

 // === Petición de tipo PUT para Actualizar un único recurso:
//api.put('/usuario/:usuarioId', usuarioCtrl.updateUsuario)

// === Petición de tipo DELETE para Borrar un único recurso:
//api.delete('/usuario/:usuarioId', usuarioCtrl.deleteUsuario)

// ==================== PETICIONES DE AUTENTICACIÓN ====================
// === Petición de tipo POST para Login: 
api.post('/login', autenticar.loginUsuario);

// === Petición de tipo GET para Logout: 
api.get('/logout', autenticar.logoutUsuario);

// ==================== PETICIONES DE LOREM ====================

// Se exportan las rutas
module.exports = api;
