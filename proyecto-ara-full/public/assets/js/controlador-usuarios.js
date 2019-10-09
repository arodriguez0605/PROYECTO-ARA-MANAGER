$(document).ready(function() {
  
  $('#data-table').DataTable({
    pageLength: 10,
    searching: true,
    ordering: true,
    paging: true,
    responsive: true,
    ajax: {
      "async": true,
      "crossDomain": true,
      "url": "/api/usuario/obtenerUsuarios",
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
      { data: "name", title: "Nombre"},
      { data: "email", title: "Correo"},
      { data: "estado", title: "Estado",
      render: function ( data, type, row, meta ) {
        if(row.estado == 'Activo'){
          return `<span class="badge badge-info"> Activo </span>`
        } else {
          return `<span class="badge badge-warning"> Inactivo </span>`
        }
      }
    },
      { data: "fechaCreacion", title: "Fecha de Creación"},
      { data: "permiso", title:"Tipo de Usuario"},
      { data: null, title: "Opción",
      render: function ( data, type, row, meta ) {
        if (row.estado=='Inactivo'){
          return `<button type="button" onclick="buscarUsuario('`+ row._id +`')" class="btn btn-default btn-sm" data-toggle="modal" data-target="#exampleModalCenter"><span class="far fa-edit edit"></span></button>`+
                  `<button type="button" onclick="activarUsuario('`+ row._id +`')" class="btn btn-default btn-sm"><span class="far fa-check-circle custon-check"></span></button>`
        } else {
          return `<button type="button" onclick="buscarUsuario('`+ row._id +`')" class="btn btn-default btn-sm" data-toggle="modal" data-target="#exampleModalCenter"><span class="far fa-edit edit"></span></button>`+
                  `<button type="button" onclick="eliminarUsuario('`+ row._id +`')" class="btn btn-default btn-sm"><span class="far fa-trash-alt trash"></span></button>`  
        }
      }}
    ]
  });

  //cargarUsuarios();
});

$("#btn-nuevo-usuario").click(function (){
  //console.log(`Registrar Usuario`);

  $.ajax({
    url: "/api/usuario/nuevaCuenta",
    method: "POST",
    dataType: "json",
    headers: {
      'x-access-token': `${sessionStorage.Token}`
    },
    data: {        
      "name": $('#nombre').val(),
      "password": $('#contrasena').val(),
      "email": $('#correo').val(),
      "permiso": $('#permiso').val()
    },
    success: function (response) {

      if (response.auth == true){
        //console.log(`Datos`);
        // Mensajes Validos
        $.alert({
          title: '',
          content: `Usuario "${response.user.name}", guardado con exito`,
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

        //cargarUsuarios();
        $('#exampleModalCenter').modal('hide'); // Cierra el Modal
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
    error: function (xhr, status, error){
      var err = JSON.parse(xhr.responseText);
      console.error(`Error mensaje: ${err.mensaje}`);
    }
  });
});

function buscarUsuario(id){
  
  $.ajax({
    url: "/api/usuario/"+id,
    method: "GET",
    dataType: "json",
    headers: {
      'x-access-token': `${sessionStorage.Token}`
    },
    success: function (response) {
      // console.log(`mensaje del servidor, auth: ${response.auth}`);
      $('#id-usuario').val(response.user._id);
      $('#nombre').val(response.user.name);
      $('#correo').val(response.user.email);
      $('#contrasena').val("");
      if(response.user.permiso == 'Administrador'){
        $('#permiso').val(1);
      } else {
        $('#permiso').val(2);
      }
      $("#btn-nuevo-usuario").addClass("d-none");
      $("#btn-actualizar-usuario").removeClass("d-none");

      if (response.auth == true){
        //console.log(`Datos`);
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
    error: function (xhr, status, error){
      var err = JSON.parse(xhr.responseText);
      console.error(`Error mensaje: ${err.mensaje}`);
    }
  });
}

function cargarUsuarios (){
  //console.log("cargar los usuarios");

  $.ajax({
    url: "/api/usuario/obtenerUsuarios",
    method: "GET",
    dataType: "json",
    headers: {
      'x-access-token': `${sessionStorage.Token}`
    },
    success: function (response) {
      // console.log(`mensaje del servidor, auth: ${response.auth}`);
      
      // console.log(response);
      // console.log(response.users);
      // console.log(response.users[0].email);

      if (response.auth == true){
        //console.log(`Datos`);
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
    error: function (xhr, status, error){
      var err = JSON.parse(xhr.responseText);
      console.error(`Error mensaje: ${err.mensaje}`);
    }
  });
}

function eliminarUsuario (id){
  $.ajax({
    url: "/api/usuario/eliminarUsuario",
    method: "PUT",
    dataType: "json",
    data: {
      "_id" : id
    },
    headers: {
      'x-access-token': `${sessionStorage.Token}`
    },
    success: function (response) {
      // console.log(`mensaje del servidor, auth: ${response.auth}`);

      $('#data-table').DataTable().ajax.reload(); // Se encarga de refrescar las tablas

      if (response.auth == true){
        // Mensajes Validos
        $.alert({
          title: '',
          content: `Usuario "${response.user.name}", Activado con exito`,
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
    error: function (xhr, status, error){
      var err = JSON.parse(xhr.responseText);
      console.error(`Error mensaje: ${err.mensaje}`);
    }
  });
}

function activarUsuario (id){
  $.ajax({
    url: "/api/usuario/activarUsuario",
    method: "PUT",
    dataType: "json",
    data: {
      "_id" : id
    },
    headers: {
      'x-access-token': `${sessionStorage.Token}`
    },
    success: function (response) {
      // console.log(`mensaje del servidor, auth: ${response.auth}`);

      $('#data-table').DataTable().ajax.reload(); // Se encarga de refrescar las tablas

      if (response.auth == true){
        // Mensajes Validos
        $.alert({
          title: '',
          content: `Usuario "${response.user.name}", Activado con exito`,
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
    error: function (xhr, status, error){
      var err = JSON.parse(xhr.responseText);
      console.error(`Error mensaje: ${err.mensaje}`);
    }
  });
}

$("#btn-actualizar-usuario").click(function (){
  //console.log("Actualizar el usuario: " + $('#id-usuario').val());

  $.ajax({
    url: "/api/usuario/actualizarUsuario",
    method: "PUT",
    dataType: "json",
    data: {
      "_id" : $('#id-usuario').val(),
      "name": $('#nombre').val(),
      "password": $('#contrasena').val(),
      "email": $('#correo').val(),
      "permiso": $('#permiso').val()
    },
    headers: {
      'x-access-token': `${sessionStorage.Token}`
    },
    success: function (response) {
      // console.log(`mensaje del servidor, auth: ${response.auth}`);
      
      $("#btn-nuevo-usuario").removeClass("d-none");
      $("#btn-actualizar-usuario").addClass("d-none");
      $('#data-table').DataTable().ajax.reload(); // Se encarga de refrescar las tablas
      $('#exampleModalCenter').modal('hide'); // Cierra el Modal

      if (response.auth == true){
        // Mensajes Validos
        $.alert({
          title: '',
          content: `Usuario "${response.user.name}", actualizado con exito`,
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
    error: function (xhr, status, error){
      var err = JSON.parse(xhr.responseText);
      console.error(`Error mensaje: ${err.mensaje}`);
    }
  });
});