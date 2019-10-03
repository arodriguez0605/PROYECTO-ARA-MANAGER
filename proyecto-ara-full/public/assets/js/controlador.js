$(document).ready(function() {
  cargarDatos();
});

function cargarDatos(){
  //console.log(`Cargar Datos`);
  
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

      // Mensaje de Error
      // $.alert({
      //   title: 'Error al cargar los Datos',
      //   content: err.mensaje,
      //   type: 'red',
      //   typeAnimated: true,
      //   icon: 'fas fa-exclamation-triangle',
      //   closeIcon: true,
      //   closeIconClass: 'fas fa-times',
      //   //autoClose: 'cerrar|5000', // Tiempo para cerrar el mensaje
      //   theme: 'modern', // Acepta propiedades CSS
      //   buttons: {
      //     cerrar: {
      //       text: 'Cerrar',
      //       btnClass: 'btn-danger',
      //       keys: ['enter', 'shift']
      //     }
      //   }
      // });
    }
  });
}

$("#btn-logout").click(function(){
  //console.log(`Cerrar Sesión`);
  
  $.ajax({
    url: "/api/logout",
    method: "GET",
    dataType: "json",
    headers: {
      'x-access-token': `${sessionStorage.Token}`
    },
    success: function (response) {
      // console.log(`mensaje del servidor, auth: ${response.auth}`);

      if (response.auth == false){
        console.log(`Ha salido del sitio`);
        sessionStorage.setItem('Token', response.token);
        window.location.href = "/login";
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
      //console.error(`Error mensaje: ${err.mensaje}`);

      // Mensaje de Error
      $.alert({
        title: 'Error al salir del sitio',
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
});
