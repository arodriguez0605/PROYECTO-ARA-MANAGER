
//-------------------VALIDACIONES DE REGISTRO-------------------------------------
var campos = [
    {campo:'correo', expresion: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 
    formato: 'Ingrese un correo válido.', valido: false},
    {campo:'contrasena', expresion: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,100})$/, 
    formato: 'La contraseña debe tener por lo menos de 6 caracteres, 1 letra mayúscula, 1 letra minúscula, y 1 numero.', valido: false},
    {campo:'usuario', expresion: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,20}[a-zA-Z0-9]$/, 
    formato: 'El usuario debe tener entre 6 a 20 caracteres, sin espacios, y puede llevar (_) ó (.) en medio.', valido: false}
  ];
  
  /*
  ^( (?=\S*?[A-Z]) (?=\S*?[a-z]) (?=\S*?[0-9]).{6,100} )$
  Revisa que la contraseña tenga un minimo de 6 caracteres, 
  por lo menos 1 letra mayuscula, 1 letra minuscula, 1 numero, y sin espacios.
  
  ^[a-zA-Z0-9] ([._](?![._]) | [a-zA-Z0-9]) {4,20}[a-zA-Z0-9]$
  revisa que el usuario sea de 6-20 caracteres de largo, 
  pueda llevar o no . y _
  y debe terminar e iniciar en una letra o  un numero.
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
  
    }
    else {
      $("#"+campo).removeClass("is-invalid");
      $("#"+campo).addClass("is-valid");
      $("#validar-"+campo).removeClass("invalid-feedback");
      $("#validar-"+campo).addClass("valid-feedback");
      $("#validar-"+campo).html("Campo Correcto");
      return true;
      
    }
  }
  $("#btn-registro").click(function(){
    var loginValido = false; // Inicialmente es falso
    
    // Manda  a llamar la función de validar por cada campo
    for (var i=0; i<campos.length; i++) {
      campos[i].valido = validarLogin(campos[i].campo, campos[i].expresion, campos[i].formato);
    }
  
    for (var i=0; i<campos.length; i++){
      if (!campos[i].valido){
        return loginValido = false;
      } else {
        loginValido = true;
      }
    }
  
    console.log("Nombre Usuario: "+ $('#usuario').val());
    console.log("correo: "+ $('#correo').val())
    console.log("contrasena: "+ $('#contrasena').val())
  
    if (loginValido){
  
      $.ajax({
        url: "/registro",
        method: "POST",
        dataType: "json",
        data: {
          "nombreUsuario": $('#usuario').val(),
          "correo": $('#correo').val(),
          "contrasena": $('#contrasena').val(),
        },
        success: function (response){
          //console.log(`mensaje del servidor: ${response}`);
          console.log(`mensaje del servidor1: ${response.estatus}`);
          console.log(`mensaje del servidor2: ${response.mensaje}`);   
          
          if (response.estatus == 1){
            window.location.href = "principal";
          } else {
            // Mensaje de Error
            $.alert({
              title: '',
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
        error: function (error){
          //console.error(`Error1: ${error}`);
          //console.error(`Error2: ${error.message}`);
          // Mensaje de Error
          $.alert({
            title: '',
            content: error,
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
      window.location.href = "dash-carpeta.html";
  });

 //------------FIN VALIDACIONES REGISTRO-------------
 
 //-------------VALIDACIONES LOGIN-----------------

 var campos = [
  {campo:'correo', expresion: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 
  formato: 'Ingrese un correo o contraseña válida.', valido: false},
  {campo:'contrasena', expresion: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,100})$/, 
  formato: 'Ingrese un correo o contraseña válida',  valido: false}
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

  }
  else {
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
      return loginValido = false;
    } else {
      loginValido = true;
    }
  }

  //console.log(`Validación: ${loginValido}`);
  //console.log("correo: "+ $('#correo').val())
  //console.log("contrasena: "+ $('#contrasena').val())

  if (loginValido){
    //console.log('Ingresar al Login')
    $.ajax({
      url: "/principal",
      method: "POST",
      dataType: "json",
      data: {
        "correo": $('#correo').val(),
        "contrasena": $('#contrasena').val(),
      },
      success: function (response){
        //console.log(`mensaje del servidor: ${response.mensaje}`);   
        
        if (response.estatus == 1){
          window.location.href = "/dash-carpeta.html";
        } else {
          // Mensaje de Error
          $.alert({
            title: '',
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
      error: function (error){
        //console.error(`Error1: ${error}`);
        //console.error(`Error2: ${error.message}`);
        // Mensaje de Error
        $.alert({
          title: '',
          content: error,
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
});

function logInFB(){ 
  FB.login(function(response) {
    console.log(response);
    if (response.status=="connected"){
      FB.api('/me?fields=id,name,first_name,last_name,email', function(datosUsuario) {
        var parametros = {
          facebookId: datosUsuario.id,
          nombre: datosUsuario.first_name,
          apellido: datosUsuario.last_name,
          correo: datosUsuario.email
        };
      
        $.ajax({
          url: "/api/fblogin",
          method: "POST",
          data: parametros,
          dataType: "json",
          success: function(response){

            if (response.estatus == 1){
              window.location.href = "/dash-carpeta.html";
            } else {
              // Mensaje de Error
              $.alert({
                title: '',
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
          error: function (e) {
            console.log(e);
          },
        });  
      });
    }
  }, {scope: 'public_profile,email'});
    
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
  FB.init({
    appId  : '865336320473266',
    cookie : true,
    xfbml  : true,  
    version: 'v3.3'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

//-----------FIN VALIDACIONES LOGIN---------

  