//Estrategia local para autenticarnos de diversas formas
/*
const LocalStrategy = require ('passport-local').Strategy;

const User = require('../models/user');

//serializa los datos en una sesion en el navegador para no estar pidiendo los datos
module.exports = function(passport){
    passport.serializeUser(function(user, done){
        done(null, user.id)
    });
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });  

    //Registro
    passport.use('local-signup', new LocalStrategy({
        userNameField: 'correo',
        passwordField: 'contrasena',
        passReqToCallback: true
    },
    function(req,  correo, contrasena, done){
        User.findOne({'local.email': correo}, function(err, user){
            if(err){return done(err); }
            if(user){
                return done(null, false, req.flash('signupmessage', 'El correo electrónico ya ha sido registrado'));
            }else{
                var newUser = new User();
                newUser.local.email = correo;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function(err){
                    if (err) {throw err;}
                    return done(null, newUser);
                });
            }
        })
    }));

        //Registro
    passport.use('local-signup', new LocalStrategy({
        userNameField: 'correo',
        passwordField: 'contrasena',
        passReqToCallback: true
    },
    function(req,  correo, contrasena, done){
        User.findOne({'local.email': correo}, function(err, user){
            if(err){return done(err); }
            if(user){
                return done(null, false, req.flash('signupmessage', 'El correo electrónico ya ha sido registrado'));
            }else{
                var newUser = new User();
                newUser.local.email = correo;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function(err){
                    if (err) {throw err;}
                    return done(null, newUser);
                });
            }
        })
    }));

    //Login
    passport.use('local-signup', new LocalStrategy({
        userNameField: 'correo',
        passwordField: 'contrasena',
        passReqToCallback: true
    },
    function(req,  correo, contrasena, done){
        User.findOne({'local.email': correo}, function(err, user){
            if(err){return done(err); }
            if(!user){
                return done(null, false, req.flash('loginmessage', 'El usuario no ha sido encontrado'))}
            if(!user.validatePassword(password)){
                return done(null, false, req.flash('loginmessage', 'La contraseña es incorrecta'));
            }
            return done(null, user);
        })
    }));
}
*/