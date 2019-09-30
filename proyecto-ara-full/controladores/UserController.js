var User = require('../modelos/usuario');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');

// DEVUELVE A TODOS LOS USUARIOS DE LA BASE DE DATOS
function mostrarUsuarios (req, res) {
  User.find({}, function (err, users) {
      if (err) return res.status(500).send("Hubo un problema para encontrar a los usuarios.");
      res.status(200).send(users);
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
  mostrarUsuarios
};