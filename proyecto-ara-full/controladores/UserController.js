var User = require('../modelos/usuario');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// DEVUELVE A TODOS LOS USUARIOS DE LA BASE DE DATOS
function mostrarUsuarios (req, res) {
  User.find({}, {password: 0}, function (err, users) {
    if (err) return res.status(500).send("Hubo un problema para encontrar a los usuarios.");
    res.status(200).send({auth: true, mensaje: 'Se devuelven los usuarios', data: users});
  });
};

// CONSIGUE UN SOLO USUARIO DE LA BASE DE DATOS
function buscarUsuario(req, res) {
  User.findById(req.params.id, function (err, user) {
      if (err) return res.status(500).send("Se ha producido un problema al encontrar al usuario.");
      if (!user) return res.status(404).send({auth:false, mensaje: 'Usuario no encontrado.', id: req.params.id});
      res.status(200).send({auth: true, mensaje: 'Se devuelve el usuario', user: user});
  });
};

// DEVUELVE LA INFORMACIÓN DEL USUARIO LOGEADO
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

// OBTIENE LA INFORMACIÓN PARA EL PERFIL DEL USUARIO LOGEADO
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

        res.status(200).send({auth: true, mensaje:'Se retorna el usuario', user: user});
    });
  });
};

// CREA UN NUEVO USUARIO DESDE REGISTRO
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
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        permiso: "Regular",
        fechaCreacion: Date.now(),
        estado: "Activo"
      },
      function (err, user) {
        if (err) return res.status(500).send({auth: false, mensaje: 'Hubo un problema al agregar la información a la base de datos.'});
        
        // create a token - Generated jwts will include an iat (issued at) claim by default
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // Expira en 24 horas
        });
    
        res.status(200).send({ auth: true, token: token, mensaje: 'Usuario guardado con éxito.' });
      });
    }); 
  }
};

// CREA UN NUEVO USUARIO DESDE LA CUENTA DE UN ADMIN
function nuevaCuenta (req, res) {

  // Comprobación de campos nulos
  if (!req.body.name || !req.body.email || !req.body.password || !req.body.permiso){
    return res.status(400).send({auth: false, mensaje: "Campos faltantes."});
  } else {
    
    if (req.body.permiso == 1){
      req.body.permiso = 'Administrador';
    } else if (req.body.permiso == 2){
      req.body.permiso = 'Regular';
    } else {
      return res.status(400).send({auth: false, mensaje: "Campos Incorrectos."});
    }

    // Busca si el correo ya existe en la base
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) return res.status(500).send({auth: false, mensaje: 'Error en el servidor.'});
      
      if (user) return res.send({auth: false, mensaje: 'Este correo ya fue registrado.'});

      // Si no existe el correo en la base, encripta la contraseña
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
      // Intenta crear el usuario con la contraseña encriptada
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        permiso: req.body.permiso,
        fechaCreacion: Date.now(),
        estado: "Activo"
      },
      function (err, user) {
        if (err) return res.status(500).send({auth: false, mensaje: 'Hubo un problema al agregar la información a la base de datos.'});
    
        res.status(200).send({ auth: true, mensaje: 'Usuario guardado con éxito.', user: user});
      });
    }); 
  }
};

// ACTUALIZA EL PERFIL EN LA BASE DE DATOS
function actualizarPerfil (req, res) {
  
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).send({ auth: false, mensaje: 'No se proporcionó un token.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, mensaje: 'Error al autenticar el token.' });
        
    User.findByIdAndUpdate(decoded.id, req.body, {new: true}, function (err, user) {
      if (err) return res.status(500).send({auth: false, mensaje: "Hubo un problema al actualizar al usuario."});
      
      if (!user) return res.status(404).send({auth: false, mensaje: "No se encontró el usuario."});
      
      res.status(200).send({auth: true, mensaje: 'Perfil actualizado con exito!', user: user});
    });
  });
};

// ACTUALIZA UN SOLO USUARIO EN LA BASE DE DATOS
function actualizarUsuario(req, res) {
  var token = req.headers['x-access-token'];

  if (!token) return res.status(401).send({ auth: false, mensaje: 'No se proporcionó un token.' });

  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) return res.status(500).send({ auth: false, mensaje: 'Error al autenticar el token.' });

    var hashedPassword;
    if (req.body.password){
      hashedPassword = bcrypt.hashSync(req.body.password, 8);
    }
    
    if (req.body.permiso == 1){
      req.body.permiso = 'Administrador';
    } else if (req.body.permiso == 2){
      req.body.permiso = 'Regular';
    } else {
      return res.status(400).send({auth: false, mensaje: "Campos Incorrectos."});
    }
        
    User.findByIdAndUpdate(req.body._id, 
      {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        permiso: req.body.permiso
      }, 
      {new: true}, function (err, user) {
      if (err) return res.status(500).send({auth: false, mensaje: "Hubo un problema al actualizar al usuario."});
      
      if (!user) return res.status(404).send({auth: false, mensaje: "No se encontró el usuario."});
      
      res.status(200).send({auth: true, mensaje: 'Usuario actualizado con exito!', user: user});
    });
  });
};

// CAMBIA EL ESTADO A INACTIVO DE UN USUARIO DE LA BASE DE DATOS
function eliminarUsuario (req, res) {
  User.findByIdAndUpdate(req.body._id, {estado: 'Inactivo'},  function (err, user) {
    if (err) return res.status(500).send("Hubo un problema al eliminar el usuario.");
    res.status(200).send({auth: true, mensaje: `"Usuario: "+ ${user.name} +" fué borrado."`, user: user});
  });
};

// CAMBIA EL ESTADO A ACTIVO DE UN USUARIO DE LA BASE DE DATOS
function activarUsuario (req, res) {
  User.findByIdAndUpdate(req.body._id, {estado: 'Activo'},  function (err, user) {
    if (err) return res.status(500).send("Hubo un problema al reestablecer el usuario.");
    res.status(200).send({auth: true, mensaje: `"Usuario: "+ ${user.name} +" fué reestablecido."`, user: user});
  });
};


module.exports = {
  registrarUsuario,
  mostrarUsuarios, 
  me,
  obtenerPerfil,
  buscarUsuario,
  actualizarPerfil,
  nuevaCuenta,
  actualizarUsuario,
  eliminarUsuario,
  activarUsuario
};