$(document).ready(function() {

});

$("#btn-nuevo-usuario").click(function (){
  console.log(`Registrar Usuario`);
  console.log('permiso:' + $('#permiso').val());

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
      // console.log(`mensaje del servidor, auth: ${response.auth}`);
      
      console.log(response.users);

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
      
      console.log(response.users);

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

