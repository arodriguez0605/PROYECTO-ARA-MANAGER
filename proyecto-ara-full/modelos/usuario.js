var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({  
  name: String,
  email: { type: String, unique: true, lowercase: true },
  password: { type: String, required: true },
  primerNombre: String,
  primerApellido: String,
  fechaNacimiento: Date,
  trabajo: String,
  lugarTrabajo: String,
  direccion: String,
  ciudad: String,
  pais: String,
  codigoPostal: String,
  acercaPerfil: String,
  imagen: String,
  permiso: String,
  fechaCreacion: { type: Date, default: Date.now() },
  estado: { type: String, default: "Activo" }
});

var Usuario = mongoose.model('User', UserSchema);

// Guarda un usuario administrador por default al cargar el proyecto
Usuario.findOne({email: 'admin@gmail.com'}, function(err, usuario){
  // Si ya existe el admin, no lo vuelve a crear.
  if (usuario) return;
  
  var hashedPassword = bcrypt.hashSync('Asd.4567', 8);

  var usuarioAdmin = new Usuario({
    name: 'Admin', 
    email: 'admin@gmail.com', 
    password: hashedPassword,
    primerNombre: "Alejandra",
    primerApellido: "Rodríguez",
    fechaNacimiento: "1995-05-06",
    trabajo: "Estudiante de Ingeniería en Sistemas",
    lugarTrabajo: "Universidad Nacional Autónoma",
    direccion: "Colonia Hato de Enmedio",
    ciudad: "Tegucigalpa",
    pais: "Honduras",
    acercaPerfil: "Este es mi proyecto de Sistemas Expertos del segundo periodo del año 2019",
    codigoPostal: "11101",
    permiso: 'Administrador',
    estado: "Activo",
    fechaCreacion: Date.now()
  });
  
  usuarioAdmin.save(function(err, usuario){
    if (err) return console.error(err);
    console.log(usuario.name + " Guardado en la base como usuario Admin.");
  });
});

module.exports = mongoose.model('User');