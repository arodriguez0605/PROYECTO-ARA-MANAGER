$(document).ready(function () {
    console.log('Ready!');
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    
    var idEntrada = queryString;
    cargarComentarios(idEntrada)
})

function cargarComentarios(id) {
    let idEntrada = id

    $.ajax({
        url: "/api/entrada/obtenerComentarios",
        method: "POST",
        dataType: "json",
        headers: {
            'x-access-token': `${sessionStorage.Token}`
        },
        data: {
            "idEntrada": idEntrada
        },
        success: function (response) {
            if (response.auth == true) {
                var comentarios = response.comentarios.comentarios
                console.log(comentarios);
                for (let i = 0; i < comentarios.length; i++) {
                    console.log(comentarios[i]);
                    
                    $('#listaComentarios').append(/* html */ `
                        <p class="lead" align="left">${comentarios[i].idUser.name}</p>
                        <p class="lead" align="left">${comentarios[i].fechaComentario}</p>
                        <p class="lead" >${comentarios[i].comentario}</p>
                    `)                    
                }
            } else {

            }
        },
        error: function (xhr, status, error) {
            var err = JSON.parse(xhr.responseText);
            console.error(`Error mensaje: ${err.mensaje}`);
        }
    });  
}