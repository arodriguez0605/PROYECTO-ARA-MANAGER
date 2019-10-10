$(document).ready(function () {

    //console.log('Ready!');
    $('#data-table').DataTable({
      pageLength: 10,
      searching: true,
      ordering: true,
      paging: true,
      responsive: true,
      ajax: {
        "async": true,
        "crossDomain": true,
        "url": "/api/entrada/mostrarEntradas",
        "method": "GET",
        "dataType": "json",
        "headers": {
          'x-access-token': `${sessionStorage.Token}`
        }
      },
      language: {
        url: "../assets/plugin/data-tables/spanish.json",
        oPaginate: {
            sNext: '<i class="far fa-angle-right"></i>',
            sPrevious: '<i class="far fa-angle-left"></i>'
        }
      },
      columns: [
        { data: "autor.name", title: "Autor" },
        { data: "nombre", title: "Nombre" },
        { data: "descripcion", title: "Descripción" },
        // { data: "categoria", title: "Categoría" },
        { data: "imagen", title: "Imagen" ,
        render: function(data, type, row, meta){
          return `<img src="${row.imagen}" height="80" width="80">`
        }},
        { data: "puedeComentar", title: "Permiso" },
        { data: "estado", title: "Estado",
          render: function ( data, type, row, meta ) {
            if (row.estado == 'Privado'){
              return `<span class="badge badge-info"> Privada </span>`
            } else {
              return `<span class="badge badge-success"> Pública </span>`
            }
          }
        },
        { data: null, title: "Opción",
        render: function ( data, type, row, meta ) {
          if (row.estado=='Inactivo'){
            return `<button type="button" onclick="buscarEntrada('`+ row._id +`')" class="btn btn-default btn-sm" data-toggle="modal" data-target="#exampleModalCenter"><span class="far fa-edit edit"></span></button>`+
                    `<button type="button" onclick="activarEntrada('`+ row._id +`')" class="btn btn-default btn-sm"><span class="far fa-check-circle custon-check"></span></button>`
          } else {
            return `<button type="button" onclick="buscarEntrada('`+ row._id +`')" class="btn btn-default btn-sm" data-toggle="modal" data-target="#exampleModalCenter"><span class="far fa-edit edit"></span></button>`+
                    `<button type="button" onclick="eliminarEntrada('`+ row._id +`')" class="btn btn-default btn-sm"><span class="far fa-trash-alt trash"></span></button>`  
          }
        }},
        { data: "contenido", title: "Contenido" }
      ]
    });

});

function verEntrada(id) {
  var idEntrada = id;

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

function eliminarEntrada(id) {
    var idCategoria = id;

    $.ajax({
        url: "/api/categoria/actualizarCategoria",
        method: "PUT",
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