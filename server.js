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
const uploadImage = multer({ storage: multer.diskStorage({
  destination: function (req, file, callback) { callback(null, './public/data/archivosSubidos/bancoImagenes/');},
  filename: function (req, file, callback) {
    callback(null,
      `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);}
    })
});
const uploadVideo = multer({ storage: multer.diskStorage({
  destination: function (req, file, callback) { callback(null, './public/data/archivosSubidos/bancoVideos/');},
  filename: function (req, file, callback) {
    callback(null,
      `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);}
    })
});
const uploadArchivo = multer({ storage: multer.diskStorage({
  destination: function (req, file, callback) { callback(null, './public/data/archivosSubidos/bancoArchivos/');},
  filename: function (req, file, callback) {
    callback(null,
      `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);}
    })
});

const separarMultimedia = (multimedias) => {
  let bancoImagenes = [];
  let bancoVideos = [];
  let bancoArchivos = [];

  multimedias.map(multimedia => {
    if (multimedia.extensionArchivo.split('/')[0] === 'image') {
      bancoImagenes.push(multimedia);
    } else if (multimedia.extensionArchivo.split('/')[0] === 'video') {
      bancoVideos.push(multimedia);
    } else {
      bancoArchivos.push(multimedia);
    }
  })
  return { bancoImagenes, bancoVideos, bancoArchivos }
}

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

app.get('/multimedia', verificarAuth, async (req, res) => {
  const multimedias = await Multimedia.obtenerMultimedias();
  const multimedia = separarMultimedia(multimedias);
  res.render('multimedia', { imagenes: multimedia.bancoImagenes, videos: multimedia.bancoVideos, archivos: multimedia.bancoArchivos });
});

app.get('/plantillas', verificarAuth, (req, res) => {
  res.render('plantillas');
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

  categorias.then(function (categorias) {
    // console.log(categorias);
    console.log(categorias);
    res.render('categorias', {categoria: categorias});
 })
  
});

app.get('/entradas', verificarAuth, (req, res) => {

    res.render('entradas', { idUsuario: req.session.user.id });
});

app.get('/editor', verificarAuth, (req, res) => {

  var categorias = Categoria.obtenerCategorias();
  // console.log(categorias);

  categorias.then(function (categorias) {
    // console.log(categorias);
    console.log(req.session.user);
    res.render('editor', { categoria: categorias });
  });
});

app.get('/editor2', verificarAuth, (req, res) => {
  res.render('editor2');
});

app.get('/paginaprincipal', verificarAuth, (req, res) => {
  res.render('paginaprincipal');
});

app.get('/verentrada', verificarAuth, (req, res) => {
  res.render('verentrada');
});

app.get('/crearprincipal', verificarAuth, (req, res) => {
  res.render('crearprincipal');
});

app.get('/verpagina', verificarAuth, (req, res) => {
  res.render('verpagina');
});


app.post('/subirImagen', uploadImage.single('cargarImagen'), async (req, res) => {
  try {
    if (
      req.body.nombreArchivo !== '' &&
      req.body.descripcionArchivo !== '' &&
      req.file !== undefined
    ) {
      let imagenData = {
        nombre: req.body.nombreArchivo,
        descripcion: req.body.descripcionArchivo,
        urlImagen: `/data/archivosSubidos/bancoImagenes/${req.file.filename}`,
        extensionArchivo: req.file.mimetype,
      }

      const multimedias = await Multimedia.obtenerMultimedias();
      const multimedia = separarMultimedia(multimedias);

      await Multimedia.guardarImagen(imagenData, res).then(async response => {

        res.render('multimedia', {
          imagenes: multimedia.bancoImagenes,
          videos: multimedia.bancoVideos,
          archivos: multimedia.bancoArchivos,
          code: 200,
          message: 'La imagen ha sido guardada!'
        });
      })

    } else {
      res.render('multimedia', {
        imagenes: multimedia.bancoImagenes,
        videos: multimedia.bancoVideos,
        archivos: multimedia.bancoArchivos,
        code: 400,
        message: 'Datos incompletos.'
      });
    }
  } catch (error) {
    res.render('multimedia', {
      imagenes: multimedia.bancoImagenes,
      videos: multimedia.bancoVideos,
      archivos: multimedia.bancoArchivos,
      code: 500,
      message: error
    });
  }
})

app.post('/subirVideo', uploadVideo.single('cargarVideo'), async (req, res) => {
  try {
    if (
      req.body.nombreVideo !== '' &&
      req.body.descripcionVideo !== '' &&
      req.file !== undefined
    ) {
      let imagenData = {
        nombre: req.body.nombreVideo,
        descripcion: req.body.descripcionVideo,
        urlVideo: `/data/archivosSubidos/bancoVideos/${req.file.filename}`,
        extensionVideo: req.file.mimetype,
      }

      const multimedias = await Multimedia.obtenerMultimedias();
      const multimedia = separarMultimedia(multimedias);

      await Multimedia.guardarVideo(imagenData, res).then(async response => {
        res.render('multimedia', {
          imagenes: multimedia.bancoImagenes,
          videos: multimedia.bancoVideos,
          archivos: multimedia.bancoArchivos,
          code: 200,
          message: 'El video ha sido guardado!',
        });
      })

    } else {
      res.render('multimedia', {
        imagenes: multimedia.bancoImagenes,
        videos: multimedia.bancoVideos,
        archivos: multimedia.bancoArchivos,
        code: 400,
        message: 'Datos incompletos.',
      });
    }
  } catch (error) {
    res.render('multimedia', {
      imagenes: multimedia.bancoImagenes,
      videos: multimedia.bancoVideos,
      archivos: multimedia.bancoArchivos,
      code: 500,
      message: error,
    });
  }
})

app.post('/subirArchivo', uploadArchivo.single('cargarArchivo'), async (req, res) => {
  try {
    if (
      req.body.nombreArchivo !== '' &&
      req.body.descripcionArchivo !== '' &&
      req.file !== undefined
    ) {
      let archivoData = {
        nombre: req.body.nombreArchivo,
        descripcion: req.body.descripcionArchivo,
        urlArchivo: `/data/archivosSubidos/bancoArchivos/${req.file.filename}`,
        extensionArchivo: req.file.mimetype,
      }

      const multimedias = await Multimedia.obtenerMultimedias();
      const multimedia = separarMultimedia(multimedias);

      await Multimedia.guardarArchivo(archivoData, res).then(async response => {

        res.render('multimedia', {
          imagenes: multimedia.bancoImagenes,
          videos: multimedia.bancoVideos,
          archivos: multimedia.bancoArchivos,
          code: 200,
          message: 'El archivo ha sido guardado!',
        });
      })

    } else {
      res.render('multimedia', {
        imagenes: multimedia.bancoImagenes,
        videos: multimedia.bancoVideos,
        archivos: multimedia.bancoArchivos,
        code: 400,
        message: 'Datos incompletos.',
      });
    }
  } catch (error) {
    res.render('multimedia', {
      imagenes: multimedia.bancoImagenes,
      videos: multimedia.bancoVideos,
      archivos: multimedia.bancoArchivos,
      code: 500,
      message: error
    });
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
        urlImagen: `/data/archivosSubidos/imgCategoria/${req.file.filename}`,
        autor: req.session.user.id
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

app.post('/actualizarCategoria', uploadCategoria.single('cargarImagen'), async (req, res) => {
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
        urlImagen: `/data/archivosSubidos/imgCategoria/${req.file.filename}`,
        autor: req.session.user.id
      }

      await Categoria.actualizarCategoria(req.body.idCategoria, categoriaData, res).then(response => {
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
      //console.log(req.body);
      //console.log('Valor de puedeComentar '+ req.body.permitirComentario);
      
      let puedeComentar;
      if (req.body.puedeComentar == 1) {
        puedeComentar = 'Si'
      } else {
        puedeComentar = 'No'
      }

      //console.log('Valor de estado '+ req.body.privacidad);
      let estado;
      if (req.body.estado == 1) {
        estado = 'Privada'
      } else {
        estado = 'Pública'
      }

      //console.log(req.body);
      //console.log('req.file----->>>>>>', req.file);
      //let extensionArchivo = req.file.mimetype.split('/');
      let entradaData = {
        nombre: req.body.nombreEntrada,
        autor: req.session.user.id,
        contenido: req.body.editor1,
        categoria: req.body.categoria,
        imagen: `/data/archivosSubidos/imgEntrada/${req.file.filename}`,
        descripcion: req.body.descripcionEntrada,
        puedeComentar: puedeComentar,
        estado: estado,
      }

      await Entrada.crearEntrada(entradaData, res).then(response => {
        //console.log('response--><', response);
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
