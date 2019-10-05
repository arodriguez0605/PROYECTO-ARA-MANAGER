// MODULOS CARGADOS
const hbs = require('hbs');
const multer = require('multer');
const upload = multer({ dest: './public/data/archivosSubidos/' });
const database = require('./modules/database'); // Se conecta a Mongo
const Multimedia = require('./controladores/MultimediaController');

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

function verificarAuth(req, res, next) {
  if (req.session.user) {
    next(); // Si existe sesión, vaya a la página
  } else {
    res.redirect('/login');
  }
}

app.get('/', (req, res) => {
  if (req.session.user) {
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

app.post('/subirImagen', upload.single('cargarArchivo'), async (req, res) => {
  try {
    if (
      req.body.nombreArchivo !== '' &&
      req.body.descripcionArchivo !== '' &&
      req.file !== undefined
    ) {
      console.log('req.file----->>>>>>', req.file);
      let extensionArchivo = req.file.mimetype.split('/');
      let imagenData = {
        nombre: req.body.nombreArchivo,
        descripcion: req.body.descripcionArchivo,
        urlImagen: `/public/data/archivosSubidos/${req.file.filename}.${extensionArchivo[1]}`,
        extensionArchivo: `.${extensionArchivo[1]}`,
      }

      await Multimedia.guardarImagen(imagenData, res).then(response => {
        console.log('response--><', response);
        res.render('multimedia', { code: 200, message: 'La imagen ha sido guardada!' });
      })

    } else {
      res.render('multimedia', { code: 400, message: 'Datos incompletos.' });
    }
  } catch (error) {
    res.render('multimedia', { code: 500, message: error });
  }
})

// Si redirige a una página que no existe devuelve a la principal
app.get('*', (req, res) => {
  if (req.session.user) {
    res.redirect('principal');
  } else {
    res.redirect('login');
  }
});

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto': ${port}`);
});
