const mongoose = require('mongoose');

var servidor = 'localhost:27017';
var db = 'ara_manager';

class Database{
    constructor(){
        //Promesas
        mongoose.connect(`mongodb://${servidor}/${db}`)
        .then(()=>{
            console.log('Se conectó exitosamente a Mongo');
        }).catch((error)=>{
            console.log(error);
        });
    }
}


module.exports = new Database();