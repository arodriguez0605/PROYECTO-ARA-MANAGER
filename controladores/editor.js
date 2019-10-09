var txtAreas = ["html", "css", "javascript"];
var modo = ["text/html", "css", "javascript"];
var editores = [];

for (var i = 0; i<txtAreas.length; i++){
  editores[i] = CodeMirror.fromTextArea(document.getElementById(txtAreas[i]), {
  mode: modo[i],
  lineNumbers: true,
  tabSize: 2,
  value: "CSS",
  cursorScrollMargin: 20,
  scrollbarStyle: "overlay"
  });
}

var input = document.getElementById("select");

function selectTheme() {
  var theme = input.options[input.selectedIndex].textContent;
  editores[0].setOption("theme", theme);
  editores[1].setOption("theme", theme);
  editores[2].setOption("theme", theme);
  location.hash = "#" + theme;
}

var choice = ( location.hash && location.hash.slice(1)) || (document.location.search && decodeURIComponent(document.location.search.slice(1)) );

if (choice) {
  input.value = choice;
  editores[0].setOption("theme", choice);
  editores[1].setOption("theme", choice);
  editores[2].setOption("theme", choice);
}

CodeMirror.on(window, "hashchange", function() {
  var theme = location.hash.slice(1);
  if (theme) { input.value = theme; selectTheme(); }
});

function loadfile(input, type) {
  var reader = new FileReader();

  reader.onload = function(e) {
      editores[type].setValue(e.target.result);
  }
  
  reader.readAsText(input.files[0]);
}

$(document).ready(function() {
  editorArchivo();
});

function editorArchivo(){
  $.ajax({
    url: '/api/proyecto/cargarchk',
    method: "get",
    dataType: "json",
    success: function(response){
      if(response.estatus == 1)
      cargarProyecto();
    },
    error: function(err){
      console.error(err);
    }
  });
}

function correrProyecto(){
  var html = editores[0].getValue();
  var css = editores[1].getValue();
  var javascript = editores[2].getValue();

  //console.log(html);
  //console.log(css);
  //console.log(javascript);

  var estructura = `<!DOCTYPE html>
                    <html>
                    
                      <head>
                        <meta charset="utf-8">
                        <style>
                          ${css}  
                        </style>  
                      </head>

                      <body>
                        ${html} 
                        <script>
                          ${javascript}
                        </script>
                      </body>

                    </html>`;

  var frameResultado = document.getElementById("resultado");
  var resultado = frameResultado.contentDocument || frameResultado.contentWindow.document;
  
  resultado.open();
  resultado.write(estructura);
  resultado.close();
}

function cargarProyecto(){
  //console.log("cargar un proyecto")

  $.ajax({
    url: '/api/proyecto/cargarhtlm',
    method: "get",
    dataType: "json",
    success: function(response){
      //console.log(response.archivo._id)
      editores[0].setValue(response.archivo.contenido);
      $('#id-html').val(response.archivo._id);
    },
    error: function(err){
      console.error(err);
    }
  });

  $.ajax({
    url: '/api/proyecto/cargarcss',
    method: "get",
    dataType: "json",
    success: function(response){
      //console.log(response.archivo._id)
      editores[1].setValue(response.archivo.contenido);
      $('#id-css').val(response.archivo._id);
    },
    error: function(err){
      console.error(err);
    }
  });

  $.ajax({
    url: '/api/proyecto/cargarjs',
    method: "get",
    dataType: "json",
    success: function(response){
      //console.log(response.archivo._id)
      editores[2].setValue(response.archivo.contenido);
      $('#id-javascript').val(response.archivo._id);
    },
    error: function(err){
      console.error(err);
    }
  });
}

function guardarProyecto(){
  //console.log("Guardar Proyecto")

  var html = editores[0].getValue();
  var css = editores[1].getValue();
  var javascript = editores[2].getValue();
  //console.log(html)
  //console.log(css)
  //console.log(javascript)

  $.ajax({
    url: '/api/proyecto/guardar',
    method: "POST",
    dataType: "json",
    data: {
      "id": $('#id-html').val(),
      "contenido": html,
    },
    success: function(response){
      // Mensajes Validos
      $.alert({
        title: '',
        content: `HTML actualizado con exito`,
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
    },
    error: function(err){
      console.error(err);
    }
  });

  $.ajax({
    url: '/api/proyecto/guardar',
    method: "POST",
    dataType: "json",
    data: {
      "id": $('#id-css').val(),
      "contenido": css,
    },
    success: function(response){
      // Mensajes Validos
      $.alert({
        title: '',
        content: `CSS actualizado con exito`,
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
    },
    error: function(err){
      console.error(err);
    }
  });

  $.ajax({
    url: '/api/proyecto/guardar',
    method: "POST",
    dataType: "json",
    data: {
      "id": $('#id-javascript').val(),
      "contenido": javascript
    },
    success: function(response){
      // Mensajes Validos
      $.alert({
        title: '',
        content: `Javascript actualizado con exito`,
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
    },
    error: function(err){
      console.error(err);
    }
  });
}

function descargarArchivoHTML(archivo){
  var texto = editores[0].getValue();
  archivo.download;
  archivo.href = "data:x-application/octet-stream," + encodeURIComponent(texto);
}

function descargarArchivoCSS(archivo){
  var texto = editores[1].getValue();
  archivo.download;
  archivo.href = "data:x-application/octet-stream," + encodeURIComponent(texto);
}

function descargarArchivoJS(archivo){
  var texto = editores[2].getValue();
  archivo.download;
  archivo.href = "data:x-application/octet-stream," + encodeURIComponent(texto);
}
