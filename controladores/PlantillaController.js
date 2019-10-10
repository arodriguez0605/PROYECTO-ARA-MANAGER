var Plantilla = require('../modelos/plantilla');

function obtenerPlantillas() {
    var promise = Plantilla.find().exec();
    return promise;
}

async function guardarPlantilla(plantillaData) {
    try {
        const imagenes = { imagenes: plantillaData.urlImagenes }
        Plantilla.create({
            titulo: plantillaData.tituloPlantilla,
            descripcion: plantillaData.descripcionPlantilla,
            css: '',
            javascript: '',
            urlImagenes: imagenes,
            fechaSubida: Date.now(),
        },
            function (error, plantilla) {
                if (error) {
                    return (error);
                }
                return (plantilla);
            })
    } catch (error) {
        return error;
    }
}

module.exports = {
    obtenerPlantillas,
    guardarPlantilla,
};