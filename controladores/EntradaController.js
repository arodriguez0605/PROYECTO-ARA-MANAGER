var Entrada = require('../modelos/entrada');


function obtenerEntradas(req, res) {
    Entrada.find(
        function (err, entradas) {
            if (err) return res.status(500).send({mensaje: "Hubo un problema al mostrar la entrada."});

                if (!entradas) return res.status(404).send({mensaje: "No se encontró la entrada."});

            res.status(200).send({auth:true, mensaje:'Se retorna las entradas', entradas: entradas});
        }
    )
=======
// DEVUELVE A TODOS LAS ENTRADAS DE LA BASE DE DATOS
function mostrarEntradas (req, res) {
  Entrada.find({}, function (err, entradas) {
    if (err) return res.status(500).send({auth: false, mensaje: "Hubo un problema al mostrar la entrada."});
    res.status(200).send({auth: true, mensaje: 'Se retornan las entradas', data: entradas});
  });
}

function obtenerEntradas() {
    var promise = Entrada.find()
    .populate('autor','name imagen')
    .populate('categoria','nombre')
}

async function crearEntrada(entradaData) {
    try {
        Entrada.create({
            autor: entradaData.autor,
            nombre: entradaData.nombre,
            descripcion: entradaData.descripcion,
            contenido: entradaData.contenido,
            categoria: entradaData.categoria,
            imagen: entradaData.imagen,
            puedeComentar: entradaData.puedeComentar,
            estado: entradaData.estado,
        },
            function (error, entrada) {
                if (error) {
                    return (error);
                }
                return (entrada);
            })
    } catch (error) {
        return error;
    }
}

function mostrarEntrada (req, res) {
<<<<<<< HEAD
    var idEntrada = req.body.idEntrada

      Entrada.findById(
          idEntrada,
          function (err, entrada) {
        if (err) return res.status(500).send({mensaje: "Hubo un problema al mostrar la entrada."});

            if (!entrada) return res.status(404).send({mensaje: "No se encontró la entrada."});

        res.status(200).send({auth:true, mensaje:'Se retorna la entrada', entrada: entrada});
    })
    .populate('categoria','nombre')
    .populate('autor','name');
}

function mostrarComentarios (req, res) {
    var idEntrada = req.body.idEntrada

      Entrada.findById(
          idEntrada,
          'comentarios',
          function (err, comentarios) {
        if (err) return res.status(500).send({mensaje: "Hubo un problema al mostrar la entrada."});

            if (!comentarios) return res.status(404).send({mensaje: "No se encontró la entrada."});

        res.status(200).send({auth:true, mensaje:'Se retorna la entrada', comentarios: comentarios});
    })
    .populate('comentarios.idUser','name');
}

function comentarEntrada (req, res) {
    var idEntrada = req.body.idEntrada
    var comentario = {
        idUser: req.session.user.id,
        comentario: req.body.comentario
    }
      Entrada.update(
        { _id: idEntrada },
        { $push: { comentarios: comentario }},
          function (err, entrada) {
        if (err) return res.status(500).send({mensaje: "Hubo un problema al mostrar la entrada."});

            if (!entrada) return res.status(404).send({mensaje: "No se encontró la entrada."});

        res.status(200).send({auth:true, mensaje:'Se comento la entrada'});
    });
}

function eliminarEntrada (req, res) {
    var idEntrada = req.body.idEntrada

      Entrada.findByIdAndDelete(
          idEntrada,
          function (err, entrada) {
        if (err) return res.status(500).send({mensaje: "Hubo un problema al mostrar la entrada."});

            if (!entrada) return res.status(404).send({mensaje: "No se encontró la entrada."});

        res.status(200).send({auth:true, mensaje:'Se elimino la entrada'});
    });
}
=======
  var idEntrada = req.body.idEntrada
>>>>>>> cc69bb2215bd7fe20ffe7bdc7bfa80383a9a1f96

  Entrada.findById(idEntrada, function (err, entrada) {
    if (err) return res.status(500).send({mensaje: "Hubo un problema al mostrar la entrada."});

    if (!entrada) return res.status(404).send({mensaje: "No se encontró la entrada."});

    res.status(200).send({auth:true, mensaje:'Se retorna la entrada', entrada: entrada});
  })
  .populate('categoria','nombre')
  .populate('autor','nombre');
}


module.exports = {
    crearEntrada,
    obtenerEntradas,
<<<<<<< HEAD
    mostrarEntrada,
    comentarEntrada,
    eliminarEntrada,
    mostrarComentarios
=======
    mostrarEntradas,
    mostrarEntrada
>>>>>>> cc69bb2215bd7fe20ffe7bdc7bfa80383a9a1f96
};
