const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
    //De manera local
    local: {
        email: String,
        password: String
    },
    //A través de fb
    facebook: {
        email: String,
        password: String,
        id: String,
        token: String
    },  
    //A través de google
    google: {
        email: String,
        password: String,
        id: String,
        token: String
    },
    //A través de github     
    github: {
        email: String,
        password: String,
        id: String,
        token: String
    }   
});

//Función que recibe la contraseña y la cifra
//genera el HASH
/*userSchema.methods.generateHash  = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//Verificar que la contraseña es válida y coincide
userSchema.methods.validPassword = function (password){
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);

*/