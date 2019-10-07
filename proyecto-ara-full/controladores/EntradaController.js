var Entrada = require('../modelos/entrada');

function obtenerEntradas() {
    var promise = Entrada.find().populate('categoria','nombre').exec();
    return promise;
}

async function crearEntrada(entradaData) {
    try {
        Entrada.create({
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

module.exports = { 
    crearEntrada,
    obtenerEntradas
};