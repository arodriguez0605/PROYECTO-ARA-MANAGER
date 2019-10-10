$(document).ready(function () {
  console.log("categorias")
  $.ajax({
    url: "/api/categoria/obtenerCategoriasSelect",
    method: "GET",
    dataType: "json",
    headers: {
      'x-access-token': `${sessionStorage.Token}`
    },
    success: function (response) {
      //console.log(`mensaje del servidor, auth: ${response.categorias}`);
      //$('#categoria').val(response.promise);
      
      categoria = response.categorias
      for (let i = 0; i < categoria.length; i++) {
        $('#categoria').append(`
          <option value="${categoria[i]._id}">${categoria[i].nombre}</option>
        `)
      }
    },
    error: function (xhr, status, error){
      var err = JSON.parse(xhr.responseText);
      console.error(`Error mensaje: ${err.mensaje}`);
    }
  });
});