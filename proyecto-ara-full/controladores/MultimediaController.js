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

async function guardarVideo(videoData) {
    try {
        Multimedia.create({
            nombre: videoData.nombre,
            descripcion: videoData.descripcion,
            url: videoData.urlVideo,
            extensionArchivo: videoData.extensionVideo,
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

async function guardarArchivo(archivoData) {
    try {
        Multimedia.create({
            nombre: archivoData.nombre,
            descripcion: archivoData.descripcion,
            url: archivoData.urlArchivo,
            extensionArchivo: archivoData.extensionArchivo,
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

module.exports = { guardarImagen, guardarVideo, guardarArchivo };