$(document).ready(function() {
  cargarPerfil();
});

function cargarPerfil(){
  console.log(`Cargar Perfil`);

  $.ajax({
    url: "/api/me",
    method: "GET",
    dataType: "json",
    headers: {
      'x-access-token': `${sessionStorage.Token}`
    },
    success: function (response) {
      // console.log(`mensaje del servidor, auth: ${response.auth}`);
      
      $('#perfil-usuario').html(response.user.name); // Perfil
      $('#navbar-usuario').html(response.user.name); // Navbar
      $('#sidebar-usuario').html(response.user.name); // Sidebar
      
      $('#input-username').html(response.user);
      $('#input-email').html(response.user);
      $('#input-first-name').html(response.user);
      $('#input-last-name').html(response.user);
      $('#input-date').html(response.user);
      $('#input-password').html(response.user);
      $('#input-job').html(response.user);
      $('#input-work-place').html(response.user);
      $('#input-address').html(response.user);
      $('#input-city').html(response.user);
      $('#input-country').html(response.user);
      $('#input-postal-code').html(response.user);
      //$('#Lorem').html(response.user);

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
