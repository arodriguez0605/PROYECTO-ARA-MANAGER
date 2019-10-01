$(document).ready(function() {
  cargarDatos();
});

function cargarDatos(){
  console.log(`Cargar Datos`);
  let token = sessionStorage.getItem("Token")
  
  $.ajax({
    url: "/api/me",
    method: "GET",
    dataType: "json",
    headers: {
      'x-access-token': token
    },
    success: function (response) {
      // console.log(`mensaje del servidor, auth: ${response.auth}`);
      // console.log(`mensaje del servidor, user: ${response.user.name}`);
      // console.log(`mensaje del servidor, user: ${response.user.email}`);
      
      $('#perfil-usuario').html(response.user.name); // Perfil
      $('#navbar-usuario').html(response.user.name); // Navbar
      $('#sidebar-usuario').html(response.user.name); // Sidebar

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
          autoClose: 'cerrar|5000', // Tiempo para cerrar el mensaje
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
      //console.error(`Error mensaje: ${err.mensaje}`);

      // Mensaje de Error
      $.alert({
        title: 'Error',
        content: err.mensaje,
        type: 'red',
        typeAnimated: true,
        icon: 'fas fa-exclamation-triangle',
        closeIcon: true,
        closeIconClass: 'fas fa-times',
        autoClose: 'cerrar|5000', // Tiempo para cerrar el mensaje
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