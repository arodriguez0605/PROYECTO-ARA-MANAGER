$(document).ready(function () {

    console.log('Ready!');
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    
    var idEntrada = queryString;
    $('#inicioEntrada').html( /* html */`<input type="hidden" name="valorIdEntrada" id="valorIdEntrada" value="${idEntrada}">`)
    console.log(idEntrada);
    $.ajax({
        url: "/api/entrada/verEntrada",
        method: "POST",
        dataType: "json",
        headers: {
            'x-access-token': `${sessionStorage.Token}`
        },
        data: {
            "idEntrada": idEntrada,
        },
        success: function (response) {

            if (response.auth == true) {
                //console.log(`Datos`);
                let entrada = response.entrada
                console.log(entrada)
                $('#entrada').html(/* html */ `
                    <h1 class="display-4">${entrada.nombre}</h1>
                    <hr class="my-4">
                    <p class="lead">Publicado por: ${entrada.autor.name}</p>
                    <p> ${entrada.categoria.nombre}</p>
                    <img src="${entrada.imagen}" class="img-fluid" alt="Responsive image">
                    <div>
                        ${entrada.contenido}
                    </div>
                    <hr class="my-4">       
                    <p class="lead" align="right"> ${entrada.fechaSubido}</p>  
                `);

                if(entrada.puedeComentar == 'Si') {
                    $('#hacerComentario').html(/* html */`
                                <div class="form-group col-6">
                                    <h2>Comentar</h2>
                                    <textarea class="form-control" id="comentarioEntrada" rows="3" cols="2" placeholder="Introduce un comentario"></textarea> 
                                </div>
                                <a class="btn btn-warning btn-lg" id="comentarEntrada" href="#" role="button" onclick='comentarEntrada()'>Hacer comentario</a>
                    `)
                } else {
                    $('#hacerComentario').html(/* html */`
                                <div class="form-group col-6">
                                    <h2>Comentar</h2>
                                    <textarea class="form-control" id="comentarioEntrada" rows="3" cols="2" placeholder="Introduce un comentario" disabled></textarea> 
                                </div>
                                <button class="btn btn-warning btn-lg" id="comentarEntrada" disabled>Hacer comentario</button>
                    `)                    
                }
            }
        },
        error: function (xhr, status, error) {
            var err = JSON.parse(xhr.responseText);
            console.error(`Error mensaje: ${err.mensaje}`);
        }
    });
    
});

function comentarEntrada(){
    let idEntrada = $('#valorIdEntrada').val()
    let comentario = $('#comentarioEntrada').val()

    $.ajax({
        url: "/api/entrada/comentar",
        method: "POST",
        dataType: "json",
        headers: {
            'x-access-token': `${sessionStorage.Token}`
        },
        data: {
            "idEntrada": idEntrada,
            "comentario": comentario,
        },
        success: function (response) {
            if (response.auth == true) {
                location.reload();
            } else {

                // Mensaje de Error
                $.alert({
                    title: 'Error',
                    content: response.mensaje,
                    type: 'red',
                    typeAnimated: true,
                    icon: 'fas fa-exclamation-triangle',
                    closeIcon: true,
                    closeIconClass: 'fas fa-times',
                    //autoClose: 'cerrar|5000', // Tiempo para cerrar el mensaje
                    theme: 'modern', // Acepta propiedades CSS
                    buttons: {
                        cerrar: {
                            text: 'Cerrar',
                            btnClass: 'btn-danger',
                            keys: ['enter', 'shift']
                        }
                    }
                });
            }
        },
        error: function (xhr, status, error) {
            var err = JSON.parse(xhr.responseText);
            console.error(`Error mensaje: ${err.mensaje}`);
        }
    });        
}