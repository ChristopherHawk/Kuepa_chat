const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User= require('../modelos/usuarios.modelo');


passport.use(new localStrategy ({
    
    //variables a considerar
    usernameField: 'nombre',
    
}, async(nombre, contraseña, done) => {

    //coincidencias
    const usuario = await User.findOne({nombre})
    if(!usuario){
        return done(null, false, console.log('Este usuario no existe'));
    }else {
        // validación de contraseña
     const match = await usuario.matchPassword(contraseña);
     if(match) {
         return done(null, usuario);
     } else {
         return done(null, false, console.log('contraseña incorrecta'));
     }
    }
}));

passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

//Consulta de autorización
passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});