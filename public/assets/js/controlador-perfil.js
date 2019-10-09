var campos = [
  {campo: 'input-username', expresion: /^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){4,20}[a-zA-Z0-9]$/, 
  formato: 'El usuario debe tener entre 6 a 20 caracteres, sin espacios, y puede llevar (_) ó (.) en medio.', 
  valido: false},

  {campo: 'input-email', expresion: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 
  formato: 'Ingrese un correo válido.', 
  valido: false},
  
  {campo: 'input-password', expresion: /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,100})$/, 
  formato: 'La contraseña debe tener por lo menos de 6 caracteres, 1 letra mayúscula, 1 letra minúscula, y 1 numero.', 
  valido: false},
];

function validarRegistro(campo, expresion, formato) {
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

$(document).ready(function() {
  cargarPerfil();
});

function cargarPerfil(){
  //console.log(`Cargar Perfil`);

  $.ajax({
    url: "/api/usuario/obtenerPerfil",
    method: "GET",
    dataType: "json",
    headers: {
      'x-access-token': `${sessionStorage.Token}`
    },
    success: function (response) {
      //console.log(`mensaje del servidor: ${response.user.name}`);
      let date, fechaFormato = "";

      if (response.user.fechaNacimiento){
        date = new Date(response.user.fechaNacimiento);
        fechaFormato = date.toISOString().slice(0, 10);
      }
      
      // Para prepopular los inputs
      $('#input-username').val(response.user.name);
      $('#input-email').val(response.user.email);
      $('#input-first-name').val(response.user.primerNombre);
      $('#input-last-name').val(response.user.primerApellido);
      $('#input-date').val(fechaFormato);
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
  var camposValidos = false; // Inicialmente es falso
  
  // Manda a llamar la función de validar por cada campo
  for (var i=0; i<campos.length; i++) {
    campos[i].valido = validarRegistro(campos[i].campo, campos[i].expresion, campos[i].formato);
  }

  for (var i=0; i<campos.length; i++){
    if (!campos[i].valido){
      return camposValidos = false; // Sale de la función con el return
    } else {
      camposValidos = true;
    }
  }

  if (camposValidos){
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
        "password": $('#input-password').val(),
        "trabajo": $('#input-job').val(),
        "lugarTrabajo": $('#input-work-place').val(),
        "direccion": $('#input-address').val(),
        "ciudad": $('#input-city').val(),
        "pais": $('#input-country').val(),
        "codigoPostal": $('#input-postal-code').val(),
        "acercaPerfil": $("#input-about").val()
      },
      headers: {
        'x-access-token': `${sessionStorage.Token}`
      },
      success: function (response) {
        // console.log(`mensaje del servidor, auth: ${response.auth}`);
        
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
  
        cargarPerfil();
      },
      error: function (xhr, status, error){
        var err = JSON.parse(xhr.responseText);
        console.error(`Error mensaje: ${err.mensaje}`);
      }
    });
  }
}