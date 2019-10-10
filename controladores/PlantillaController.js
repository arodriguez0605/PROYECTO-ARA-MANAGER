var Plantilla = require('../modelos/plantilla');

function obtenerPlantillas() {
    var promise = Plantilla.find().exec();
    return promise;
}

module.exports = {
    obtenerPlantillas,
};