var mongoose = require('mongoose');
let Schema = mongoose.Schema;

var CategoriaSchema = new mongoose.Schema({
    autor: { type: Schema.Types.ObjectId, ref: 'User' },
    nombre: String,
    descripcion: String,
    url: String,
    fechaCreacion: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('Categoria', CategoriaSchema);

module.exports = mongoose.model('Categoria');