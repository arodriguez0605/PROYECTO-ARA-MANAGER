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
        type:String,
        default:'Si',
    },
    estado:{
        type:String,
        default:'Público',
    },
    comentarios: [{
        idUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        fechaComentario:{
            type:Date,
            default:Date.now()
        },
        comentario: String 
    }],
});

mongoose.model('Entrada', EntradaSchema);

module.exports = mongoose.model('Entrada');