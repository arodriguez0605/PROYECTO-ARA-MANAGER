var mongoose = require('mongoose');

var servidor = 'arodriguez:arodriguez2@ds333238.mlab.com:33238';
var db = 'heroku_mqpv9nkt';

class Database{
    constructor(){
        // Promesas
        mongoose.connect(`mongodb://${servidor}/${db}`)
        .then(()=>{
            console.log('Se conecto a mongo');
        }).catch((error)=>{
            console.log(error);
        });
    }
}

module.exports = new Database();