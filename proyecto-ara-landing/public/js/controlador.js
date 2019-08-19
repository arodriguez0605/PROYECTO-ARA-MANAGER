/*
Modelo: Logica de negocio y los datos (BD, Backend)
Vista: Lo que el usuario ve UI (HTML, CSS)
Controlador: Controlar y responder las acciones del usuario (Javascript)
Angular, VueJS, React
NodeJS, Express, Gestor de vistas EJS, Pug(Jade)
*/
var db;

(()=>{
    if (!('indexedDB' in window)) 
        console.log('Este navegador no soporta indexedDB');
    
        //Si la base de datos no existe la crea, sino solo la abre.
        let solicitud = window.indexedDB.open('netflix',1);  //Asincrona
        
        solicitud.onsuccess = function(evento){
            console.log("Se creó o abrió la BD");
            db = solicitud.result;
            agregarCategorias();
        }

        solicitud.onerror = function(evento){
            console.log(evento);
        }

        //Se ejecuta cuando se crea o se necesita actualizar la BD
        solicitud.onupgradeneeded = function(evento){
            //En este punto si se podria crear las colecciones
            console.log('Se creo o actualizó la BD');
            let db = evento.target.result;
            //Las colecciones en IndexedDB se les llama ObjectStores
            let objectStoreCategorias= db.createObjectStore('categorias',{keyPath:'codigoCategoria', autoIncrement:true});
            objectStoreCategorias.transaction.oncomplete = function(evento){
                console.log('Se creo el object store de categorías');
                agregarCategorias();
            }

            objectStoreCategorias.transaction.onerror = function(evento){
                console.log(evento);
            }



        
            let objectStorePeliculas= db.createObjectStore('peliculas',{keyPath:'codigoPeliculas', autoIncrement:true});
            objectStorePeliculas.transaction.oncomplete = function(evento){
                console.log('Se creo el object store de peliculas');
            }

            objectStorePeliculas.transaction.onerror = function(evento){
                console.log(evento);
            }
            //agregarCategorias();
        }
        
})();


//Validaciones de campos vacíos

var campos = [
    {id:'nombre-pelicula', valido:false},
    {id:'descripcion', valido:false},
    {id:'slc-calificacion', valido:false},
    {id:'slc-categorias', valido:false},
    {id:'slc-caratula', valido:false},
    {id:'fecha-pelicula', valido:false}];


function validarCampos(){
    for (let i = 0; i<campos.length; i++)
        campos[i].valido = validarCampoVacio(campos[i].id);

    for (let i = 0; i<campos.length; i++){
        if (!campos[i].valido)
        return;}
    let originalInput = document.querySelector('input[type="radio"][name="original"]:checked');
    let principalInput = document.querySelector('input[type="radio"][name="principal"]:checked');

    let pelicula = {
        nombrePelicula: document.getElementById('nombre-pelicula').value,
        descripcion: document.getElementById('descripcion').value,
        calificacion: document.getElementById('slc-calificacion').value,
        categoria: document.getElementById('slc-categorias').value,
        caratula: document.getElementById('slc-caratula').value,
        fecha: document.getElementById('fecha-pelicula').value,
        originalNetflix: (originalInput==null)?"":originalInput.value,
        peliculaPrincipal: (principalInput==null)?"":principalInput.value
        }
    
        return pelicula;
    }

    
function validarCampoVacio(id){
    let resultado = (document.getElementById(id).value=="")?false:true;
    marcarInput(id,resultado);
    return resultado; 
    
}

function marcarInput(id, valido){
    if (valido){
        document.getElementById(id).classList.remove('is-invalid');
        document.getElementById(id).classList.add('is-valid');
    }else{
        document.getElementById(id).classList.remove('is-valid');
        document.getElementById(id).classList.add('is-invalid');
    }
}

//Función para agregar categorías automaticaente
 function agregarCategorias(){
     let categorias =[{
         nombreCategoria: 'recientes',
         descripcion: 'ultimas peliculas agregadas'
     },
     {
        nombreCategoria: 'nuestra seleccion',
        descripcion: 'peliculas recomendadas'
    }]

    for (let i=0;i<categorias.length;i++){
        let transaccion = db.transaction(['categorias'],'readwrite'); 
        let objectStoreCategorias = transaccion.objectStore('categorias');
        let solicitud = objectStoreCategorias.add(categorias[i]);
        solicitud.onsuccess = function(evento){
            document.getElementById('slc-categorias').innerHTML +=`<option value="${categorias[i].nombreCategoria}">${categorias[i].nombreCategoria}</option>`
        }
    }

}


//Boton agregar nueva película
function agregarPelicula(){
    let pelicula = validarCampos();
    if (pelicula==null || pelicula == undefined)
        return;
    //Agregar al ObjectStore de usuarios
    let transaccion = db.transaction(['peliculas'],'readwrite'); //readonly: Solo lectura, readwrite:lectura y escritura
    let objectStoreUsuarios = transaccion.objectStore('peliculas');
    let solicitud = objectStorePeliculas.add(peliculas);
    solicitud.onsuccess = function(evento){
        console.log('Se agrego la pelicula con exito');
        console.log(evento);
        document.getElementById('pelicula').innerHTML +=`<div class="col">
        <h3>Agregados recientemente</h3>
        <section class="row widgets justify-content-between">
            <div class="col-12 col-md-6 col-lg-4 col-xl-3 agregados-recientemente">
                <img src="${pelicula.caratula}" class="imagen-categoria"> <h4>${pelicula.nombrePelicula}</h4><p> ${pelicula.descripcion}</p>
                <span>${pelicula.calificacion}</span> <br>
            <button type="button" class="btn btn-link">${pelicula.}</button> | <button type="button" class="btn btn-link">Eliminar</button>
            </div>
        </section>
    </div>`
    }
}

slc




