$(document).ready(function () {

    console.log('Ready!');

});

function verCategoria(id) {
    var idCategoria = id;

    $.ajax({
        url: "/api/categoria/verCategoria",
        method: "POST",
        dataType: "json",
        headers: {
            'x-access-token': `${sessionStorage.Token}`
        },
        data: {
            "idCategoria": idCategoria,
        },
        success: function (response) {

            if (response.auth == true) {
                //console.log(`Datos`);
                let categoria = response.categoria
                console.log(categoria)
                $('#imagenCategoria').html(`<p>${categoria.nombre}</p>`);
                $('#imagenCategoria1').html(`<p>${categoria.descripcion}</p>`)
                $('#imagenCategoria2').html(`<img src="${categoria.url}" alt="">`)
            }
        },
        error: function (xhr, status, error) {
            var err = JSON.parse(xhr.responseText);
            console.error(`Error mensaje: ${err.mensaje}`);
        }
    });

}


function eliminarCategoria(id) {
    var idCategoria = id;

    $.ajax({
        url: "/api/categoria/eliminarCategoria",
        method: "DELETE",
        dataType: "json",
        headers: {
            'x-access-token': `${sessionStorage.Token}`
        },
        data: {
            "idCategoria": idCategoria,
        },
        success: function (response) {

            if (response.auth == true) {
                //console.log(`Datos`);
                // Mensajes Validos
                $.alert({
                    title: '',
                    content: `Categoría eliminada con éxito`,
                    type: 'green',
                    typeAnimated: true,
                    icon: 'fas fa-check',
                    closeIcon: true,
                    closeIconClass: 'fas fa-times',
                    autoClose: 'cerrar|5000', // Tiempo para cerrar el mensaje
                    theme: 'modern', // Acepta propiedades CSS
                    buttons: {
                        cerrar: {
                            text: 'Cerrar',
                            btnClass: 'btn-success',
                            keys: ['enter', 'shift']
                        }
                    }
                });
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


function verFormActualizar(id){
    var idCategoria = id;
    
    $.ajax({
        url: "/api/categoria/verCategoria",
        method: "POST",
        dataType: "json",
        headers: {
            'x-access-token': `${sessionStorage.Token}`
        },
        data: {
            "idCategoria": idCategoria,
        },
        success: function (response) {

            if (response.auth == true) {
                //console.log(`Datos`);
                let categoria = response.categoria
                console.log(categoria)
                $('#inputNombreCategoria').html(/*html */`<input class="form-control" placeholder="Nombre de la categoría" type="text"
                name="nombreCategoria" id="nombreCategoria" required value="${categoria.nombre}">`);
                $('#inputDescripcionCategoria').html(/* html */`<input class="form-control" placeholder="Descripción" type="text" name="descripcionCategoria"
                id="descripcionCategoria" required value="${categoria.descripcion}">`)
            }
        },
        error: function (xhr, status, error) {
            var err = JSON.parse(xhr.responseText);
            console.error(`Error mensaje: ${err.mensaje}`);
        }
    });
}

