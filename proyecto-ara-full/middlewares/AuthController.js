var User = require('../modelos/usuario');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

function registrarUsuario (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  
  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  },
  function (err, user) {
    if (err) return res.status(500).send("Hubo un problema registrando el usuario.")
    
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // Expira en 24 horas
    });

    res.status(200).send({ auth: true, token: token });
  }); 
};

function me (req, res) {
  var token = req.headers['x-access-token'];
  
  if (!token) return res.status(401).send({ auth: false, message: 'No se proporcionó un token.' });
  
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Error al autenticar el token.' });
    
    //res.status(200).send(decoded); // Retorna Token decodificado

    User.findById(decoded.id, 
      { password: 0 }, // projection
      
      function (err, user) {
        if (err) return res.status(500).send("Hubo un problema buscando el usuario.");
        if (!user) return res.status(404).send("No se encontró el usuario.");
        
        res.status(200).send(user);
    });

  });
};

function loginUsuario(req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error en el servidor.');
    
    if (!user) return res.status(404).send('No se encontró el usuario.');
    
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // Expira en 24 horas
    });
    
    res.status(200).send({ auth: true, token: token });
  });
  
};

function logoutUsuario(req, res) {
  res.status(200).send({ auth: false, token: null });
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  logoutUsuario,
  me
};