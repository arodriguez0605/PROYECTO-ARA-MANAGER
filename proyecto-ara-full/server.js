//MODULOS CARGADOS
const express = require('express');
const app = express();
const hbs = require('hbs');
const bodyParser = require ('body-parser');
const database = require ('./modules/database');

require('./hbs/helpers');

//Puerto 
const port = process.env.PORT || 3000;

//Creamos un middleware que se ejecuta siempre sin importar la petición que el usuario haga:
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//Express HBS engine mi motor de plantillas
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');

//Paginas
app.get('/',(req, res) => {
 
    res.render('principal', {
        Pagina: 'Principal'
    });
});

app.get('/principal',(req, res) => {
 
    res.render('principal');
});

app.get('/multimedia',(req, res) => {
 
    res.render('multimedia');
});

app.get('/perfil',(req, res) => {
 
    res.render('perfil');
});

app.get('/usuarios',(req, res) => {
 
    res.render('usuarios');
});

app.get('/categorias',(req, res) => {
 
    res.render('categorias');
});

app.get('/entradas',(req, res) => {
 
    res.render('entradas');
});

app.get('/login',(req, res) => {
 
    res.render('login');
});

app.get('/registro',(req, res) => {
 
    res.render('registro');
});

app.get('/editor',(req, res) => {
 
    res.render('editor');
}); 

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto', ${port}`);
});