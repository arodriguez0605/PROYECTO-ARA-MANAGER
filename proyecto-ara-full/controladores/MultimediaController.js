var Multimedia = require('../modelos/multimedia');

async function guardarImagen(imagenData) {
    try {
        Multimedia.create({
            nombre: imagenData.nombre,
            descripcion: imagenData.descripcion,
            url: imagenData.urlImagen,
            extensionArchivo: imagenData.extensionArchivo,
            fechaSubido: Date.now(),
        },
            function (error, multimedia) {
                if (error) {
                    return (error);
                }
                return (multimedia);
            })
    } catch (error) {
        return error;
    }
}

module.exports = { guardarImagen };