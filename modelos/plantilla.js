var mongoose = require('mongoose');

var PlantillaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  css: String,
  javascript: String,
  urlImagenes: Object,
  fechaSubida: Date,
});

mongoose.model('Plantilla', PlantillaSchema);

module.exports = mongoose.model('Plantilla');