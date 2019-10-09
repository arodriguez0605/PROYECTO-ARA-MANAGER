 //-------------VALIDACIONES LOGIN-----------------
 var campos = [
  {campo:'correo', expresion: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 
  formato: 'Ingrese un correo o contraseña válida.', 
  valido: false},

  {campo:'contrasena', expresion: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,100})$/, 
  formato: 'Ingrese un correo o contraseña válida', 
  valido: false}
];

/* 
/^( (?=\S*?[A-Z]) (?=\S*?[a-z]) (?=\S*?[0-9]).{6,100} )$
Revisa que la contraseña tenga un minimo de 6 caracteres, 
por lo menos 1 letra mayuscula, 1 letra minuscula, 1 numero, y sin espacios.
*/

function validarLogin(campo, expresion, formato) {
  var re = expresion;
  var valor = $("#"+campo).val();
  
  if($("#"+campo).val() == ""){
    $("#"+campo).removeClass("is-valid");
    $("#"+campo).addClass("is-invalid");
    $("#validar-"+campo).removeClass("valid-feedback");
    $("#validar-"+campo).addClass("invalid-feedback");
    $("#validar-"+campo).html("Ingrese el dato");
    return false;

  } else if (!re.test(valor)) {
    $("#"+campo).removeClass("is-valid");
    $("#"+campo).addClass("is-invalid");
    $("#validar-"+campo).removeClass("valid-feedback");
    $("#validar-"+campo).addClass("invalid-feedback");
    $("#validar-"+campo).html(formato);
    return false;

  } else {
    $("#"+campo).removeClass("is-invalid");
    $("#"+campo).addClass("is-valid");
    $("#validar-"+campo).removeClass("invalid-feedback");
    $("#validar-"+campo).addClass("valid-feedback");
    $("#validar-"+campo).html("Campo Correcto");
    return true;
  }
}

$("#btn-login").click(function(){
  var loginValido = false; // Inicialmente es falso\
  
  // Manda  a llamar la función de validar por cada campo
  for (var i=0; i<campos.length; i++) {
    campos[i].valido = validarLogin(campos[i].campo, campos[i].expresion, campos[i].formato);
  }

  for (var i=0; i<campos.length; i++){
    if (!campos[i].valido){
      return loginValido = false; // Sale de la función con el return
    } else {
      loginValido = true;
    }
  }

  if (loginValido){
    //console.log('Ingresar al Login')
    $.ajax({
      url: "/api/login",
      method: "POST",
      dataType: "json",
      data: {
        "email": $('#correo').val(),
        "password": $('#contrasena').val(),
      },
      success: function (response){
        // console.log(`mensaje del servidor, auth: ${response.auth}`);

        if (response.auth == true){
          //console.log(`LOGEADO`);

          // Se guarda el Token en el sessionStorage para futuras peticiones con AJAX
          sessionStorage.setItem('Token', response.token);
          
          window.location.href = "/principal"; // Redirecciona a la página principal
        } else {
          // Mensaje de Error
          $.alert({
            title: 'Error al hacer Login',
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
          title: 'Error al intentar Ingresar',
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
});
//----------- FIN VALIDACIONES LOGIN ---------

// function logInFB(){ 
//   FB.login(function(response) {
//     console.log(response);
//     if (response.status=="connected"){
//       FB.api('/me?fields=id,name,first_name,last_name,email', function(datosUsuario) {
//         var parametros = {
//           facebookId: datosUsuario.id,
//           nombre: datosUsuario.first_name,
//           apellido: datosUsuario.last_name,
//           correo: datosUsuario.email
//         };
      
//         $.ajax({
//           url: "/api/fblogin",
//           method: "POST",
//           data: parametros,
//           dataType: "json",
//           success: function(response){

//             if (response.estatus == 1){
//               window.location.href = "/dash-carpeta.html";
//             } else {
//               // Mensaje de Error
//               $.alert({
//                 title: '',
//                 content: response.mensaje,
//                 type: 'red',
//                 typeAnimated: true,
//                 icon: 'fas fa-exclamation-triangle',
//                 closeIcon: true,
//                 closeIconClass: 'fas fa-times',
//                 autoClose: 'cerrar|5000', // Tiempo para cerrar el mensaje
//                 theme: 'modern', // Acepta propiedades CSS
//                 buttons: {
//                   cerrar: {
//                     text: 'Cerrar',
//                     btnClass: 'btn-danger',
//                     keys: ['enter', 'shift']
//                   }
//                 }
//               });
//             }
//           },
//           error: function (e) {
//             console.log(e);
//           },
//         });  
//       });
//     }
//   }, {scope: 'public_profile,email'});
    
// }

// function checkLoginState() {
//   FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
//   });
// }

// window.fbAsyncInit = function() {
//   FB.init({
//     appId  : '865336320473266',
//     cookie : true,
//     xfbml  : true,  
//     version: 'v3.3'
//   });
//   FB.AppEvents.logPageView();
// };

// (function(d, s, id) {
//   var js, fjs = d.getElementsByTagName(s)[0];
//   if (d.getElementById(id)) return;
//   js = d.createElement(s); js.id = id;
//   js.src = "https://connect.facebook.net/en_US/sdk.js";
//   fjs.parentNode.insertBefore(js, fjs);
// }(document, 'script', 'facebook-jssdk'));
