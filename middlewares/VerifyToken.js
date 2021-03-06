// Para agregar seguridad a una ruta especifica, esta función sería llamada desde alguna peticion.
var jwt = require('jsonwebtoken');
var config = require('../config');

function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];

  if (!token)
    return res.status(403).send({ auth: false, mensaje: 'Se necesita un token.' });
    
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
      return res.status(500).send({ auth: false, mensaje: 'Error al autenticar el token.' });
      
    // si todo está bien, se guarda para solicitar su uso en otras rutas
    req.userId = decoded.id;
    next();
  });
}

module.exports = verifyToken;