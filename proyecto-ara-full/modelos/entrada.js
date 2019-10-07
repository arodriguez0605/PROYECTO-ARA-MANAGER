var mongoose = require('mongoose');

var EntradaSchema = new mongoose.Schema({
    nombre: String,
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fechaSubido:{
        type:Date,
        default:Date.now()
    },
    contenido: String,
    categoria: { type: mongoose.Schema.Types.ObjectId, ref :'Categoria' },
    imagen: String,
    puedeComentar:{
        type:Number,
        default:1,
    },
    estado:{
        type:Number,
        default:1,
    },
    comentarios: [{
        idUser: String,
        comentario: String 
    }],
});

mongoose.model('Entrada', EntradaSchema);

module.exports = mongoose.model('Entrada');