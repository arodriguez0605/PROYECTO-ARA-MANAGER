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

function loginUsuario(req, res) {

  // Comprobación de campos nulos
  if(!req.body.email || !req.body.password){
    return res.status(400).send({auth: false, mensaje: "Ingrese el correo y contraseña"});
  } else {
    // Busca el correo en la base
    User.findOne({ email: req.body.email }, function (err, user) {
      
      if (err) return res.status(500).send({mensaje: 'Error en el servidor.'});
      
      if (!user) return res.status(404).send({mensaje: 'No se encontró el usuario.'});
      
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password); // Válida la contraseña
      
      if (!passwordIsValid) return res.status(401).send({ mensaje: 'Credenciales Invalidas.', auth: false, token: null });
      
      // ---- Establece la variable de sesión ---- 
      req.session.user = {id: user._id, name: user.name, correo: user.email};
      //console.log('Sesión de: ' + req.session.user.name);

      // ---- Establece el Token de Autenticación ---- 
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // Expira en 24 horas
      });
  
      res.status(200).send({ auth: true, token: token, user: {name: user.name, correo: user.email}});
    });
  }
};

function logoutUsuario(req, res) {
  // Destruye la varaible de sesión
  req.session.destroy(function(){
    //console.log("El usuario salió del sitio.")
  });

  // Deja Nulo el token
  res.status(200).send({ auth: false, token: null, mensaje: "Ha salido del sitio"});
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

module.exports = {
  registrarUsuario,
  loginUsuario,
  logoutUsuario,
  me
};