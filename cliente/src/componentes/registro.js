import React, {useState} from 'react';
import { Button, CardContent, Card, FormInput } from 'semantic-ui-react'

import {myHeadersPOST} from '../cliente';
const Registro = ({ setAlumno}) => {
  const [registroUsuario, setRegistroUsuario] = useState({
    nombre:'',
    contraseña:'',
    confirmar_contraseña:''
  });
  const handleInputChange = (e, { name, value }) => setRegistroUsuario({...registroUsuario, [name]:value });

//Registro
const registrar = () => {
  var Usuario = new URLSearchParams();
  Usuario.append("nombre", registroUsuario.nombre);
  Usuario.append("contraseña", registroUsuario.contraseña);
  Usuario.append("confirmar_contraseña", registroUsuario.confirmar_contraseña);
  
  fetch("http://localhost:5000/registro",
  {
    method: 'POST',
    headers: myHeadersPOST,
    body: Usuario,
    redirect: 'follow'
  })
    .then(response => response.json())
    .then(result => {
      console.log('usuario Registrado')
    })
    .catch(error => console.log('error', error));
    };
    const disabled = !registroUsuario.nombre || !registroUsuario.contraseña || !registroUsuario.confirmar_contraseña;
  return (  
   
      <Card
    header='Registro'
    meta={
      <CardContent id='divEnter'>
      <FormInput fluid autoFocus={true} label='Introduzca su nombre' name='nombre' onChange={handleInputChange} />
          <FormInput fluid type='password' label='Introduzca su clave' name='contraseña' onChange={handleInputChange} />
          <FormInput fluid type='password' label='confirme su clave' name='confirmar_contraseña' onChange={handleInputChange} />
          Ya tengo cuenta: <a onClick={() => setAlumno(true)}> Iniciar Sesión</a>
          <Button disabled={disabled} fluid id='btnEnter' content='Ir al chat' color='green' onClick={()=> {registrar();  setAlumno(true);}}/>  
          </CardContent>
    }
    
  />
                 

  );
}
 
export default Registro;