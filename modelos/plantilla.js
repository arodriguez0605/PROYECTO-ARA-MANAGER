var mongoose = require('mongoose');

var PlantillaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  css: String,
  javascript: String,
  urlImagenes: Object,
});

mongoose.model('Plantilla', PlantillaSchema);

module.exports = mongoose.model('Plantilla');