var Categoria = require('../modelos/categoria');


function obtenerCategorias() {
    var promise = Categoria.find()
    .populate('autor','name imagen')
    .exec();
    return promise;
}

async function crearCategoria(categoriaData) {
    try {
        Categoria.create({
            autor: categoriaData.autor,
            nombre: categoriaData.nombre,
            descripcion: categoriaData.descripcion,
            url: categoriaData.urlImagen,
        },
            function (error, categoria) {
                if (error) {
                    return (error);
                }
                return (categoria);
            })
    } catch (error) {
        return error;
    }
}

function mostrarCategoria (req, res) {
    var idCategoria = req.body.idCategoria
  
      Categoria.findById(
          idCategoria,
          function (err, categoria) {
        if (err) return res.status(500).send({mensaje: "Hubo un problema al mostrar la categoria."});
  
            if (!categoria) return res.status(404).send({mensaje: "No se encontró la categoria."});
  
        res.status(200).send({auth:true, mensaje:'Se retorna la categoria', categoria: categoria});
    });
}


function eliminarCategoria (req, res) {
    var idCategoria = req.body.idCategoria
  
      Categoria.findByIdAndDelete(
          idCategoria,
          function (err, categoria) {
        if (err) return res.status(500).send({mensaje: "Hubo un problema al mostrar la categoria."});
  
            if (!categoria) return res.status(404).send({mensaje: "No se encontró la categoria."});
  
        res.status(200).send({auth:true, mensaje:'Se elimino la categoria'});
    });
}

async function actualizarCategoria(req, categoriaData) {
    try {
        Categoria.findByIdAndUpdate(
            req.body.idCategoria,
        {
            autor: categoriaData.autor,
            nombre: categoriaData.nombre,
            descripcion: categoriaData.descripcion,
            url: categoriaData.urlImagen,
        },
            function (error, categoria) {
                if (error) {
                    return (error);
                }
                return (categoria);
            })
    } catch (error) {
        return error;
    }
}

module.exports = { 
    crearCategoria,
    obtenerCategorias,
    mostrarCategoria,
    eliminarCategoria,
    actualizarCategoria
};