$(document).ready(function() {
  cargarPerfil();
});

function cargarPerfil(){
  console.log(`Cargar Perfil`);

  $.ajax({
    url: "/api/usuario/obtenerPerfil",
    method: "GET",
    dataType: "json",
    headers: {
      'x-access-token': `${sessionStorage.Token}`
    },
    success: function (response) {
      console.log(`mensaje del servidor: ${response.user.name}`);
      
      // Para prepopular los inputs
      $('#input-username').val(response.user.name);
      $('#input-email').val(response.user.email);
      $('#input-first-name').val(response.user.primerNombre);
      $('#input-last-name').val(response.user.primerApellido);
      $('#input-date').val(response.user.fechaNacimiento);
      $('#input-password').val("");
      $('#input-job').val(response.user.trabajo);
      $('#input-work-place').val(response.user.lugarTrabajo);
      $('#input-address').val(response.user.direccion);
      $('#input-city').val(response.user.ciudad);
      $('#input-country').val(response.user.pais);
      $("#input-about").val(response.user.acercaPerfil);
      $('#input-postal-code').val(response.user.codigoPostal);

      // Mostrar información en el perfil
      $("#profile-name").html(response.user.primerNombre +' '+ response.user.primerApellido);
      $('#profile-address').html(response.user.direccion +', '+response.user.ciudad);
      $('#profile-job').html(response.user.trabajo);
      $('#profile-work-place').html(response.user.lugarTrabajo);
      $("#profile-about").html(response.user.acercaPerfil);
    },
    error: function (xhr, status, error){
      var err = JSON.parse(xhr.responseText);
      console.error(`Error mensaje: ${err.mensaje}`)
    }
  });
}

function ActualizarPerfil(){
  console.log(`Actualizar Perfil`);

  $.ajax({
    url: "/api/usuario/guardarPerfil",
    method: "PUT",
    dataType: "json",
    data: {
      "name": $('#input-username').val(),
      "email": $('#input-email').val(),
      "primerNombre": $('#input-first-name').val(),
      "primerApellido": $('#input-last-name').val(),
      "fechaNacimiento": $('#input-date').val(),
      //"password": $('#input-password').val(),
      "trabajo": $('#input-job').val(),
      "lugarTrabajo": $('#input-work-place').val(),
      "direccion": $('#input-address').val(),
      "ciudad": $('#input-city').val(),
      "pais": $('#input-country').val(),
      "codigoPostal": $('#input-postal-code').val(),
      "acercaPerfil": $("#input-about").val()
      //"": $('#Lorem').val();
    },
    headers: {
      'x-access-token': `${sessionStorage.Token}`
    },
    success: function (response) {
      // console.log(`mensaje del servidor, auth: ${response.auth}`);
      
      if (response.auth == true){
        //console.log(`Datos`);
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

      cargarPerfil();
    },
    error: function (xhr, status, error){
      
      var err = JSON.parse(xhr.responseText);
      console.error(`Error mensaje: ${err.mensaje}`);

      //Mensaje de Error
      $.alert({
        title: 'Error al cargar los Datos',
        content: err.mensaje,
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
  });
}