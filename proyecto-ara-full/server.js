// MODULOS CARGADOS
const hbs = require('hbs');
const multer = require('multer');
const database = require('./modules/database'); // Se conecta a Mongo
const Multimedia = require('./controladores/MultimediaController');
const Categoria = require('./controladores/CategoriaController');
const Entrada = require('./controladores/EntradaController');

let storageCategoria = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data/archivosSubidos/imgCategoria')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.originalname)
  }
})

let storageEntrada = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data/archivosSubidos/imgEntrada')
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, file.originalname)
  }
})

const uploadCategoria = multer({ storage: storageCategoria });
const uploadEntrada = multer({ storage: storageEntrada });
const uploadImage = multer({ dest: './public/data/archivosSubidos/bancoImagenes/' });
const uploadVideo = multer({ dest: './public/data/archivosSubidos/bancoVideos/' });
const uploadArchivo = multer({ dest: './public/data/archivosSubidos/bancoArchivos/' });

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

app.get('/navbar', verificarAuth, (req, res) => {
  res.render('/parciales/navbar');
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
  var categorias = Categoria.obtenerCategorias();
  // console.log(categorias);

  categorias.then(function(categorias){
    // console.log(categorias);
    console.log(req.session.user);
    res.render('categorias', {categoria: categorias});
 })
  
});

app.get('/entradas', verificarAuth, (req, res) => {
  var entradas = Entrada.obtenerEntradas();
  // console.log(categorias);

  entradas.then(function(entradas){
    console.log(entradas);
  //console.log(req.session.user);
    res.render('entradas', {entrada: entradas});
  })
});

app.get('/editor', verificarAuth, (req, res) => {

  var categorias = Categoria.obtenerCategorias();
  // console.log(categorias);

  categorias.then(function(categorias){
    // console.log(categorias);
    console.log(req.session.user);
    res.render('editor', {categoria: categorias});
 });
});

app.get('/editor2', verificarAuth, (req, res) => {
  res.render('editor2');
});

app.post('/subirImagen', uploadImage.single('cargarArchivo'), async (req, res) => {
  try {
    if (
      req.body.nombreArchivo !== '' &&
      req.body.descripcionArchivo !== '' &&
      req.file !== undefined
    ) {
      let extensionArchivo = req.file.mimetype.split('/');
      let imagenData = {
        nombre: req.body.nombreArchivo,
        descripcion: req.body.descripcionArchivo,
        urlImagen: `/public/data/archivosSubidos/bancoImagenes/${req.file.filename}.${extensionArchivo[1]}`,
        extensionArchivo: `.${extensionArchivo[1]}`,
      }

      await Multimedia.guardarImagen(imagenData, res).then(response => {
        res.render('multimedia', { code: 200, message: 'La imagen ha sido guardada!' });
      })

    } else {
      res.render('multimedia', { code: 400, message: 'Datos incompletos.' });
    }
  } catch (error) {
    res.render('multimedia', { code: 500, message: error });
  }
})

app.post('/subirVideo', uploadVideo.single('cargarVideo'), async (req, res) => {
  try {
    if (
      req.body.nombreVideo !== '' &&
      req.body.descripcionVideo !== '' &&
      req.file !== undefined
    ) {
      let extensionVideo = req.file.mimetype.split('/');
      let imagenData = {
        nombre: req.body.nombreVideo,
        descripcion: req.body.descripcionVideo,
        urlVideo: `/public/data/archivosSubidos/bancoVideos/${req.file.filename}.${extensionVideo[1]}`,
        extensionVideo: `.${extensionVideo[1]}`,
      }

      await Multimedia.guardarVideo(imagenData, res).then(response => {
        res.render('multimedia', { code: 200, message: 'El video ha sido guardado!' });
      })

    } else {
      res.render('multimedia', { code: 400, message: 'Datos incompletos.' });
    }
  } catch (error) {
    res.render('multimedia', { code: 500, message: error });
  }
})

app.post('/subirArchivo', uploadArchivo.single('cargarArchivo'), async (req, res) => {
  try {
    if (
      req.body.nombreArchivo !== '' &&
      req.body.descripcionArchivo !== '' &&
      req.file !== undefined
    ) {
      let extensionArchivo = req.file.mimetype.split('/');
      let archivoData = {
        nombre: req.body.nombreArchivo,
        descripcion: req.body.descripcionArchivo,
        urlArchivo: `/public/data/archivosSubidos/bancoArchivos/${req.file.filename}.${extensionArchivo[1]}`,
        extensionArchivo: `.${extensionArchivo[1]}`,
      }

      await Multimedia.guardarArchivo(archivoData, res).then(response => {
        res.render('multimedia', { code: 200, message: 'El archivo ha sido guardado!' });
      })

    } else {
      res.render('multimedia', { code: 400, message: 'Datos incompletos.' });
    }
  } catch (error) {
    res.render('multimedia', { code: 500, message: error });
  }
})

app.post('/crearCategoria', uploadCategoria.single('cargarImagen'), async (req, res) => {
  try {
    if (
      req.body.nombreArchivo !== '' &&
      req.body.descripcionArchivo !== '' &&
      req.file !== undefined
    ) {
      console.log(req.body);
      console.log('req.file----->>>>>>', req.file);
      //let extensionArchivo = req.file.mimetype.split('/');
      let categoriaData = {
        nombre: req.body.nombreCategoria,
        descripcion: req.body.descripcionCategoria,
        urlImagen: `/data/archivosSubidos/imgCategoria/${req.file.filename}`
      }

      await Categoria.crearCategoria(categoriaData, res).then(response => {
        console.log('response--><', response);
        res.render('categorias', { code: 200, message: 'La categoria ha sido creada!' });
      })

    } else {
      res.render('categorias', { code: 400, message: 'Datos incompletos.' });
    }
  } catch (error) {
    res.render('categorias', { code: 500, message: error });
  }
})

app.post('/crearEntrada', uploadEntrada.single('cargarImagen'), async (req, res) => {
  try {
    if (
      req.body.nombreEntrada !== '' &&
      req.body.descripcionEntrada !== '' &&
      req.file !== undefined
    ) {
      var puedeComentar
      if (req.body.puedeComentar == '') {
        puedeComentar = 1
      } else {
        puedeComentar = req.body.puedeComentar
      }

      var estado
      if (req.body.estado == '') {
        estado = 1
      } else {
        estado = req.body.estado
      }      
      console.log(req.body);
      console.log('req.file----->>>>>>', req.file);
      //let extensionArchivo = req.file.mimetype.split('/');
      let entradaData = {
        nombre: req.body.nombreEntrada,
        descripcion: req.body.descripcionEntrada,
        contenido: req.body.editor1,
        categoria: req.body.categoria,
        imagen: `/data/archivosSubidos/imgEntrada/${req.file.filename}`,
        puedeComentar: puedeComentar,
        estado: estado,
      }

      await Entrada.crearEntrada(entradaData, res).then(response => {
        console.log('response--><', response);
        res.render('entradas', { code: 200, message: 'La Entrada ha sido creada!' });
      })

    } else {
      res.render('entradas', { code: 400, message: 'Datos incompletos.' });
    }
  } catch (error) {
    res.render('entradas', { code: 500, message: error });
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
