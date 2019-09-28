module.exports = (app, passport) => {

//    app.get('/', (req, res) => {
//        res.render('login');
//    });
//
//app.get('/login', (req, res) => {
//    res.render('login', {
//        message: req.flash('loginMessage')
//    });
//});
//};


//Rutas
app.get('/',(req, res) => {
 
    res.render('login', {
        Pagina: 'Login'
    });
});

app.get('/login',(req, res) => {
 
    res.render('login', {
                message: req.flash('loginMessage')
            });
});

//app.post('/login',passport.authenticate(''));

app.get('/registro',(req, res) => {
 
    res.render('registro', {
        message: req.flash('signupmessage')
    });
}); 

app.post('/registro',passport.authenticate('local-signup', {
    successRedirect: '/principal',
    failureRedirect: '/registro',
    failureFlash: true
})); 

app.get('/principal',(req, res) => {
 
    res.render('principal',{
        user: req.user
    });
});

app.get('/multimedia',(req, res) => {
 
    res.render('multimedia');
});

app.get('/perfil',(req, res) => {
 
    res.render('perfil');
});

app.get('/usuarios',(req, res) => {
 
    res.render('usuarios');
});

app.get('/categorias',(req, res) => {
 
    res.render('categorias');
});

app.get('/entradas',(req, res) => {
 
    res.render('entradas');
});

}