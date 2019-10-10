var Entrada = require('../modelos/entrada');

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
    .exec();
    return promise;
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
  var idEntrada = req.body.idEntrada

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
    mostrarEntradas,
    mostrarEntrada
};