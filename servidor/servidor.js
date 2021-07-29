//Servidor con express
const express = require("express");
const http = require("http");
const app = express();
require('dotenv').config();

const servidor = http.createServer(app);
const session = require('express-session');
const passport = require('passport');
const socketio = require("socket.io");
const io = socketio(servidor);
const bodyParser = require('body-parser');
require( './config/passport');

require('./baseDeDatos');
//Configuraciones
app.set('port', process.env.PORT || 5000);


//Middlewares
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization,X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(session({

  secret: 'secret',
  resave: true,
  saveUninitialized: true

}));
app.use(passport.initialize());
app.use(passport.session());
//Puerto
const Puerto = app.get('port');

//Rutas
app.use(require('./rutas/usuarios.rutas'));

//socket.io
io.on("connection", (socket) => {

  socket.on("conectado", async(nombre) => { 
    
    socket.broadcast.emit("mensajes", {
      nombre: nombre,
      mensaje: `${nombre} ha entrado en la sala del chat`,
    });
  });

  socket.on("mensaje", (nombre, mensaje) => {
    io.emit("mensajes", { nombre, mensaje });
  });

  socket.on("disconnect", () => {
    io.emit("mensajes", {
      servidor: "Servidor",
      mensaje: `Un usuario' ha abandonado la sala`,
    });
  });
});

servidor.listen(Puerto, () => console.log("Servidor inicializado en el puerto", Puerto));
