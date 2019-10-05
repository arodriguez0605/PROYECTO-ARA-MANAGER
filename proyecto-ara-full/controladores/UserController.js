var User = require('../modelos/usuario');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

function registrarUsuario (req, res) {

  // Comprobación de campos nulos
  if (!req.body.name || !req.body.email || !req.body.password){
    return res.status(400).send({auth: false, mensaje: "Campos faltantes."});
  } else {
    
    // Busca si el correo ya existe en la base
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send({auth: false, mensaje: 'Error en el servidor.'});
      
      if (user) return res.send({auth: false, mensaje: 'Este correo ya fue registrado.'});

      // Si no existe el correo en la base, encripta la contraseña
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
      // Intenta crear el usuario con la contraseña encriptada
      User.create({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
      },
      function (err, user) {
        if (err) return res.status(500).send({auth: false, mensaje: 'Error en el servidor.'});
        
        // create a token - Generated jwts will include an iat (issued at) claim by default
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // Expira en 24 horas
        });
    
        res.status(200).send({ auth: true, token: token, mensaje: 'Usuario guardado con éxito.' });
      });
    }); 
  }
};

// DEVUELVE A TODOS LOS USUARIOS DE LA BASE DE DATOS
function mostrarUsuarios (req, res) {
  User.find({}, function (err, users) {
    if (err) return res.status(500).send("Hubo un problema para encontrar a los usuarios.");
    res.status(200).send(users);
  });
};

function me (req, res) {
  var token = req.headers['x-access-token'];
  
  if (!token) return res.status(401).send({ auth: false, mensaje: 'No se proporcionó un token.' });
      
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, mensaje: 'Error al autenticar el token.' });
        
    //res.status(200).send(decoded); // Retorna Token decodificado

    User.findById(decoded.id, 
      { password: 0 }, // Evita que se envie la contraseña
      
      function (err, user) {
        if (err) return res.status(500).send({mensaje: "Hubo un problema buscando el usuario."});

        if (!user) return res.status(404).send({mensaje: "No se encontró el usuario."});

        res.status(200).send({auth:true, mensaje:'Se retorna el usuario', user: user});
    });
  });
};

function obtenerPerfil (req, res) {
  var token = req.headers['x-access-token'];
  
  if (!token) return res.status(401).send({ auth: false, mensaje: 'No se proporcionó un token.' });
      
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, mensaje: 'Error al autenticar el token.' });
        
    //res.status(200).send(decoded); // Retorna Token decodificado

    User.findById(decoded.id, 
      { password: 0 }, // Evita que se envie la contraseña
      
      function (err, user) {
        if (err) return res.status(500).send({mensaje: "Hubo un problema buscando el usuario."});

        if (!user) return res.status(404).send({mensaje: "No se encontró el usuario."});

        res.status(200).send({auth:true, mensaje:'Se retorna el usuario', user: user});
    });
  });
};

// CREA UN NUEVO USUARIO
// router.post('/', function (req, res) {
//     User.create({
//             name : req.body.name,
//             email : req.body.email,
//             password : req.body.password
//         }, 
//         function (err, user) {
//             if (err) return res.status(500).send("Hubo un problema al agregar la información a la base de datos.");
//             res.status(200).send(user);
//         });
// });

// CONSIGUE UN SOLO USUARIO DE LA BASE DE DATOS
// router.get('/:id', function (req, res) {
//     User.findById(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("Se ha producido un problema al encontrar al usuario.");
//         if (!user) return res.status(404).send("Usuario no encontrado.");
//         res.status(200).send(user);
//     });
// });

// ELIMINA A UN USUARIO DE LA BASE DE DATOS
// router.delete('/:id', function (req, res) {
//     User.findByIdAndRemove(req.params.id, function (err, user) {
//         if (err) return res.status(500).send("Hubo un problema al eliminar el usuario.");
//         res.status(200).send("Usuario: "+ user.name +" fué borrado.");
//     });
// });

// ACTUALIZA UN SOLO USUARIO EN LA BASE DE DATOS
// router.put('/:id', function (req, res) {
//     User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
//         if (err) return res.status(500).send("Hubo un problema al actualizar al usuario.");
//         res.status(200).send(user);
//     });
// });

//module.exports = router;

module.exports = {
  registrarUsuario,
  mostrarUsuarios, 
  me,
  obtenerPerfil
};