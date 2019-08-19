//variable global
var db;
//función inicial -- solo se agrega una vez
(()=>{
    if (!('indexedDB' in window)) 
        console.log('Este navegador no soporta indexedDB');
    
        //Si la base de datos no existe la crea, sino solo la abre.
        let solicitud = window.indexedDB.open('facebook',3);  //Asincrona
        
        solicitud.onsuccess = function(evento){
            console.log("Se creó o abrió la BD");
            db = solicitud.result;
            //funciones que son necesarias al iniciar la página
            llenarUsuarios();
            llenarPosts()
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

            let objectStorePosts = db.createObjectStore('posts',{keyPath:'codigoPost', autoIncrement:true});
            objectStorePosts.transaction.oncomplete = function(evento){
                console.log('Se creo el object store de posts');
            }

            objectStorePosts.transaction.onerror = function(evento){
                console.log(evento);
            }
            
        }
        
})();

//PARA USUARIOS
function llenarUsuarios(){
    document.getElementById('slc-usuario').innerHTML = '';
    let transaccion = db.transaction(['usuarios'],'readonly'); //recibe nombre tabla y escritura-lectura
    let objectStoreUsuarios = transaccion.objectStore('usuarios'); //referencia a la tabla
    let cursor = objectStoreUsuarios.openCursor(); //su funcion (cursor) recorrer la tabla
    cursor.onsuccess = function(evento){
        //Se ejecuta por cada registro en el objectstore
        if (evento.target.result){ //verifica si el cursor encontró informacion
            console.log(evento.target.result);
            let persona = evento.target.result.value;
            //anexarFilaTabla(evento.target.result.value, evento.target.result.key);
            document.getElementById('slc-usuario').innerHTML +=`<option value="${persona.firstName} ${persona.lastName}" >${persona.firstName} ${persona.lastName}</option>`
            evento.target.result.continue(); //Mover el cursor a la siguiente direccion de memoria
        }
    }
}

//PARA POSTS
function llenarPosts(){
    let transaccion = db.transaction(['posts'],'readonly');
    let objectStoreUsuarios = transaccion.objectStore('posts');
    let cursor = objectStoreUsuarios.openCursor();
    cursor.onsuccess = function(evento){
        //Se ejecuta por cada registro en el objectstore
        if (evento.target.result){
            console.log(evento.target.result);
            let post = evento.target.result.value;

            document.getElementById('posts').innerHTML +=`<div class="col-12 col-md-4 col-lg-3 posts">
            <img class="rounded-circle img-thumbnail imagenes" src="img/imagen.jpg">
            <label><strong>${post.firstName}</strong></label> <label>(${post.date})</label>
            <hr>
            <p>${post.textAreaHome}</p>
            <button type="button" class="btn btn-primary">Borrar</button>
        </div>`
            //anexarFilaTabla(evento.target.result.value, evento.target.result.key);
            evento.target.result.continue(); //Mover el cursor a la siguiente direccion de memoria
        }
    }
}
//Boton POST
function enviarPublicacion(){
    let post = validarCampos();
    if (post==null || post == undefined)
        return;
    //Agregar al ObjectStore de usuarios
    let transaccion = db.transaction(['posts'],'readwrite'); //readonly: Solo lectura, readwrite:lectura y escritura
    let objectStoreUsuarios = transaccion.objectStore('posts');
    let solicitud = objectStoreUsuarios.add(post);
    solicitud.onsuccess = function(evento){
        console.log('Se agrego la publicación con exito');
        console.log(evento);
        document.getElementById('posts').innerHTML +=`<div class="col-12 col-md-4 col-lg-3 posts">
        <img class="rounded-circle img-thumbnail imagenes" src="img/imagen.jpg">
        <label><strong>${post.firstName}</strong></label> <label>(${post.date})</label>
        <hr>
        <p>${post.textAreaHome}</p>
        <button type="button" class="btn btn-primary">Borrar</button>
    </div>`
    }
}


//Validaciones de campos vacíos

var campos = [
    {id:'text-area-home', valido:false},
    {id:'date', valido:false},
];

function validarCampos(){
    for (let i = 0; i<campos.length; i++){
        campos[i].valido = validarCampoVacio(campos[i].id);
    }

    for (let i = 0; i<campos.length; i++){
    if (!campos[i].valido)
        return;
}
        let post = {
            firstName: document.getElementById('slc-usuario').value,
            date: document.getElementById('date').value,
            textAreaHome: document.getElementById('text-area-home').value
        }
        return post;
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