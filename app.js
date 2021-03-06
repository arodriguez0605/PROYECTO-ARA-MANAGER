const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var session = require('express-session');
const api = require('./rutas/rutas');

//Creamos un middleware que se ejecuta siempre sin importar la petición que el usuario haga:
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true })); // Poder parsear el cuerpo de la peticion y poder tratar los datos que enviemos
app.use(bodyParser.json()); // poder admitir peticiones con cuerpo de msj en formato json
app.use(session({secret: "ClaveSuperSecreta", resave: true, saveUninitialized: true}));

/**
 * Las rutas llevan Api al inicio. Ejemplo:
 * http://localhost:3000/api/usuarios
 * http://localhost:3000/api/register
 * http://localhost:3000/api/login
 */
app.use('/api', api);

module.exports = app;