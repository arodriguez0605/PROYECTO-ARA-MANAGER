var User = require('../modelos/usuario');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

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

module.exports = {
  loginUsuario,
  logoutUsuario
};
