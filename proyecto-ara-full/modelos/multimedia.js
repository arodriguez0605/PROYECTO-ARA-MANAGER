var mongoose = require('mongoose');

var MultimediaSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  url: String,
  extensionArchivo: String,
  fechaSubido: Date,
});

mongoose.model('Multimedia', MultimediaSchema);

module.exports = mongoose.model('Multimedia');