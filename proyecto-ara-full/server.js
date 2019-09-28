//MODULOS CARGADOS
const express = require('express');
const app = express();

const hbs = require('hbs');
const bodyParser = require ('body-parser');
const database = require ('./modules/database');

//Otros módulos
//const path =require('path');
const mongoose =require('mongoose');
//const passport =require('passport');
//const flash =require('connect-flash');
//const morgan =require('morgan');
//const cookieParser =require('cookie-parser');
//const session =require('express-session');

//REQUIRES
//Acceso a los helpers de HBS
require('./hbs/helpers');
//require('./routes')(app, passport); //para poder conseguir autenticación dentro de estas rutas 
//require('./modules/passport')(passport);
//CONFIGURACIONES 
const port = process.env.PORT || 3000;

//Creamos middleware que se ejecuta siempre sin importar la petición que el usuario haga:
//MIDDLEWARES
//app.use(morgan('dev')); //ver msjs por consola
//app.use(cookieParser()); //interpretar las cookies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})); //interpretar la información de los formularios a través de la url
/*app.use(session({
    secret: 'proyectoaramanager',
    resave: false, //que no se guarde cada cierto tiempo
    saveUninitialized: false 
}));*/ //manejar sesiones de express
//app.use(passport.initialize()); //como nos vamos a autenticar
//app.use(passport.session()); //unirlo a las sesiones, para no pedir la información en ls BD sino en el navegador
//app.use(flash());//mensajes entre distintas páginas html

//Routes
require('./routes/routes'); //para poder conseguir autenticación dentro de estas rutas 
//require('./modules/passport')(passport);
//STATIC FILES
app.use(express.static(__dirname + '/public'));

//Express HBS engine mi motor de plantillas
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');



app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto', ${port}`);
});