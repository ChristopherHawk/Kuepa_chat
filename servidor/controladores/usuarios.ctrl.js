const usersCtrl = {};
const User = require('../modelos/usuarios.modelo');

  //crear Usuario
usersCtrl.registro = async (req, res) => {
  const nombre = req.body.nombre
  const contraseña = req.body.contraseña
  const confirmar_contraseña = req.body.confirmar_contraseña

  if (contraseña != confirmar_contraseña) {
    res.send('las contraseñas no coinciden');
  }
  if (!nombre || !contraseña) {
    res.send('Este campo es obligatorio');
  } 
  if (contraseña.length < 4) {
    res.send('las contraseñas debe de tener mínimo 4 caracteres');
  }  
   else {
    const nombreUsuario = await User.findOne({nombre: nombre});
    console.log(nombreUsuario)
    if (nombreUsuario) {
      res.send('Este nombre ya existe')
    }
    else {
      const nuevoUsuario = new User({  
        nombre,
        contraseña 
      });
        nuevoUsuario.contraseña = await nuevoUsuario.encryptPassword(contraseña)
      await nuevoUsuario.save();
      console.log('Usuario registrado satisfactoriamente', nuevoUsuario);
      res.json(nuevoUsuario);
    }
  }
};

usersCtrl.iniciarSesion = async (req, res) => {
  const nombre = req.body.nombre
  const contraseña = req.body.contraseña
  const usuario = await User.findOne({nombre});
  if (!usuario) return res.status(404).send("El usuario incorrecto");
  const match = await usuario.matchPassword(contraseña);
  if (!match) return res.status(401).send("contraseña incorrecta");
  console.log('Sesión iniciada');
  res.json(usuario);
}

usersCtrl.cerrarSesion = (req, res) => {
  req.logout();
  res.status(200).send('sessión cerrada');
}

module.exports = usersCtrl;