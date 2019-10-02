// MODULOS CARGADOS
const hbs = require('hbs');
const database = require ('./modules/database'); // Se conecta a Mongo

// Puerto 
const port = process.env.PORT || 3000;
const app = require('./app');

require('./hbs/helpers');

app.set('view engine', 'hbs');
// Express HBS engine mi motor de plantillas
hbs.registerPartials(__dirname + '/views/parciales');

// Paginas
app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/registro', (req, res) => {
  res.render('registro');
});

function verificarAuth(req, res, next){
  if (req.session.user){
     next(); // Si existe sesión, vaya a la página
  } else {
    res.redirect('/login');
  }
}

app.get('/', (req, res) => {
  if (req.session.user){
    res.redirect('/principal');
  } else {
    res.redirect('/login');
  }
});

app.get('/principal', verificarAuth, (req, res) => {
  res.render('principal');
});

app.get('/multimedia', verificarAuth, (req, res) => {
    res.render('multimedia');
});

app.get('/perfil', verificarAuth, (req, res) => {
    res.render('perfil');
});

app.get('/usuarios', verificarAuth, (req, res) => {
    res.render('usuarios');
});

app.get('/categorias', verificarAuth, (req, res) => {
    res.render('categorias');
});

app.get('/entradas', verificarAuth, (req, res) => {
    res.render('entradas');
});

app.get('/editor', verificarAuth, (req, res) => {
    res.render('editor');
});

app.get('/editor2', verificarAuth, (req, res) => {
  res.render('editor2');
});

// Si redirige a una página que no existe devuelve a la principal
app.get('*', (req, res) => {
  if (req.session.user){
    res.redirect('principal');
  } else {
    res.redirect('login');
  }
});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto': ${port}`);
});
