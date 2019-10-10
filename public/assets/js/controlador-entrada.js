$(document).ready(function () {

    console.log('Ready!');

    let idUsuarioSesion = $('#idUsuarioSesion').val()
    console.log(idUsuarioSesion);

    $.ajax({
        url: "/api/entrada/verEntradas",
        method: "GET",
        headers: {
            'x-access-token': `${sessionStorage.Token}`
        },
        success: function (response) {
            console.log(response);
            if (response.auth == true) {

                entradas = response.entradas
                for (let i = 0; i < entradas.length; i++) {
                    if (entradas[i].autor._id == idUsuarioSesion) {

                        $('#entradas').append( /* html */ `
                            <tr>
                                <th scope="row">
                                    <div class="media align-items-center">
                                        <!--    <a href="#" class="avatar rounded-circle mr-3">
                                                    <img alt="Image placeholder" src="../assets/img/theme/bootstrap.jpg">
                                                    </a>-->
                                        <div class="media-body">
                                            <span class="mb-0 text-sm">${ entradas[i].nombre }</span>
                                        </div>
                                    </div>
                                </th>
                                <td>
                                    ${ entradas[i].categoria.nombre }
                                </td>
                                <td>
                                    <span class="badge badge-dot mr-4">
                                        <i class="bg-warning"></i> ${ entradas[i].estado }
                                    </span>
                                </td>
                                <td>
                                    <div class="avatar-group">
                                        <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="${entradas[i].autor.name}">
                                            <img alt="Image placeholder" src="..${entradas[i].autor.imagen}" class="rounded-circle">
                                        </a>
                                        <!--       <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="Romina Hadid">
                                                    <img alt="Image placeholder" src="../assets/img/theme/team-2-800x800.jpg" class="rounded-circle">
                                                    </a>
                                                    <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="Alexander Smith">
                                                    <img alt="Image placeholder" src="../assets/img/theme/team-3-800x800.jpg" class="rounded-circle">
                                                    </a>
                                                    <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="Jessica Doe">
                                                    <img alt="Image placeholder" src="../assets/img/theme/team-4-800x800.jpg" class="rounded-circle">
                                                    </a> -->
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <!--       <span class="mr-2">60%</span>
                                                    <div>
                                                    <div class="progress">
                                                        <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;"></div>
                                                    </div>-->
                                        ${ entradas[i].fechaSubido }
                                    </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="badge badge-dot mr-4">
                                        <i class="bg-warning"></i> ${ entradas[i].puedeComentar }
                                    </span>
                                </td>

                                <td class="text-right">
                                    <div class="dropdown">
                                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                            <a class="dropdown-item" href="/verentrada?${ entradas[i]._id }">Visualizar</a>
                                            <a class="dropdown-item" href="#">Editar</a>
                                            <a class="dropdown-item" href="#" onclick="eliminarEntrada('${ entradas[i]._id }')">Eliminar</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        `)
                    } else if (entradas[i].autor._id != idUsuarioSesion) {
                        if (entradas[i].estado == 'Público') {
                            $('#entradas').append( /* html */ `
                            <tr>
                                <th scope="row">
                                    <div class="media align-items-center">
                                        <!--    <a href="#" class="avatar rounded-circle mr-3">
                                                    <img alt="Image placeholder" src="../assets/img/theme/bootstrap.jpg">
                                                    </a>-->
                                        <div class="media-body">
                                            <span class="mb-0 text-sm">${ entradas[i].nombre }</span>
                                        </div>
                                    </div>
                                </th>
                                <td>
                                    ${ entradas[i].categoria.nombre }
                                </td>
                                <td>
                                    <span class="badge badge-dot mr-4">
                                        <i class="bg-warning"></i> ${ entradas[i].estado }
                                    </span>
                                </td>
                                <td>
                                    <div class="avatar-group">
                                        <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="${entradas[i].autor.name}">
                                            <img alt="Image placeholder" src="..${entradas[i].autor.imagen}" class="rounded-circle">
                                        </a>
                                        <!--       <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="Romina Hadid">
                                                    <img alt="Image placeholder" src="../assets/img/theme/team-2-800x800.jpg" class="rounded-circle">
                                                    </a>
                                                    <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="Alexander Smith">
                                                    <img alt="Image placeholder" src="../assets/img/theme/team-3-800x800.jpg" class="rounded-circle">
                                                    </a>
                                                    <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="Jessica Doe">
                                                    <img alt="Image placeholder" src="../assets/img/theme/team-4-800x800.jpg" class="rounded-circle">
                                                    </a> -->
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <!--       <span class="mr-2">60%</span>
                                                    <div>
                                                    <div class="progress">
                                                        <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;"></div>
                                                    </div>-->
                                        ${ entradas[i].fechaSubido }
                                    </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="badge badge-dot mr-4">
                                        <i class="bg-warning"></i> ${ entradas[i].puedeComentar }
                                    </span>
                                </td>

                                <td class="text-right">
                                    <div class="dropdown">
                                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                            <a class="dropdown-item" href="/verentrada?${ entradas[i]._id }">Visualizar</a>
                                            <a class="dropdown-item" href="#">Editar</a>
                                            <a class="dropdown-item" href="#" onclick="eliminarEntrada('${ entradas[i]._id }')">Eliminar</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        `)                            
                        } else {
                            $('#entradas').append( /* html */ `
                            <tr>
                                <th scope="row">
                                    <div class="media align-items-center">
                                        <!--    <a href="#" class="avatar rounded-circle mr-3">
                                                    <img alt="Image placeholder" src="../assets/img/theme/bootstrap.jpg">
                                                    </a>-->
                                        <div class="media-body">
                                            <span class="mb-0 text-sm">${ entradas[i].nombre }</span>
                                        </div>
                                    </div>
                                </th>
                                <td>
                                    ${ entradas[i].categoria.nombre }
                                </td>
                                <td>
                                    <span class="badge badge-dot mr-4">
                                        <i class="bg-warning"></i> ${ entradas[i].estado }
                                    </span>
                                </td>
                                <td>
                                    <div class="avatar-group">
                                        <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="${entradas[i].autor.name}">
                                            <img alt="Image placeholder" src="..${entradas[i].autor.imagen}" class="rounded-circle">
                                        </a>
                                        <!--       <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="Romina Hadid">
                                                    <img alt="Image placeholder" src="../assets/img/theme/team-2-800x800.jpg" class="rounded-circle">
                                                    </a>
                                                    <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="Alexander Smith">
                                                    <img alt="Image placeholder" src="../assets/img/theme/team-3-800x800.jpg" class="rounded-circle">
                                                    </a>
                                                    <a href="#" class="avatar avatar-sm" data-toggle="tooltip" data-original-title="Jessica Doe">
                                                    <img alt="Image placeholder" src="../assets/img/theme/team-4-800x800.jpg" class="rounded-circle">
                                                    </a> -->
                                    </div>
                                </td>
                                <td>
                                    <div class="d-flex align-items-center">
                                        <!--       <span class="mr-2">60%</span>
                                                    <div>
                                                    <div class="progress">
                                                        <div class="progress-bar bg-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;"></div>
                                                    </div>-->
                                        ${ entradas[i].fechaSubido }
                                    </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="badge badge-dot mr-4">
                                        <i class="bg-warning"></i> ${ entradas[i].puedeComentar }
                                    </span>
                                </td>

                                <td class="text-right">
                                    <div class="dropdown">
                                        <a class="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown"
                                            aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-ellipsis-v"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                                            <a class="dropdown-item" href="#" style="cursor: not-allowed">Entrada Privada</a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        `)                            
                        }
                    }

                }
            }
        },
        error: function (xhr, status, error) {
            //var err = JSON.parse();
            console.error(`Error mensaje: ${xhr.responseText}`);
        }
    });

});

function eliminarEntrada(id) {
    var idEntrada = id;

    $.ajax({
        url: "/api/entrada/eliminarEntrada",
        method: "DELETE",
        dataType: "json",
        headers: {
            'x-access-token': `${sessionStorage.Token}`
        },
        data: {
            "idEntrada": idEntrada,
        },
        success: function (response) {

            if (response.auth == true) {
                //console.log(`Datos`);
                // Mensajes Validos
                $.alert({
                    title: '',
                    content: `Entrada eliminada con éxito`,
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
                location.reload();
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
        error: function (xhr, status, error) {
            var err = JSON.parse(xhr.responseText);
            console.error(`Error mensaje: ${err.mensaje}`);
        }
    });

}