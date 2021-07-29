import React, {useState} from 'react';
import { Button, CardContent, Card, FormInput } from 'semantic-ui-react'
import {myHeadersPOST} from '../cliente';
import { AsyncStorage } from 'AsyncStorage';
const IniciarSesion = ({setRegistrado, setNombre, setAlumno}) => {
  const [registroUsuario, setRegistroUsuario] = useState({
    nombre:'',
    contraseña:''
  });

  const handleInputChange = (e, { name, value }) => setRegistroUsuario({...registroUsuario, [name]:value });
//Iniciar Sesion
const InicioSesion = () => {
  var Usuario = new URLSearchParams();
  Usuario.append("nombre", registroUsuario.nombre);
  Usuario.append("contraseña", registroUsuario.contraseña);
 
   //guardar Usuario
   const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
    console.log(e)
    }
  }

  fetch("http://localhost:5000/iniciarSesion",
  {
    method: 'POST',
    headers: myHeadersPOST,
    body: Usuario,
    redirect: 'follow'
  })
    .then(response => response.json())
    .then(result => {
      storeData(result)
      setNombre(result.nombre)
     
    })
    .catch(error => console.log('error', error));
    };


    const disabled = !registroUsuario.nombre || !registroUsuario.contraseña;

  return (  
   
      <Card
    header='Iniciar sesión'
    meta={
      <CardContent id='divEnter'>
      <FormInput fluid autoFocus={true} label='Introduzca su nombre' name='nombre' onChange={handleInputChange} />
          <FormInput fluid type='password' label='Introduzca su clave' name='contraseña' onChange={handleInputChange} />
          Deseo crear una cuenta: <a  onClick={() => setAlumno(false)}>Registrarme</a>
          <Button disabled={disabled} fluid id='btnEnter' content='Ir al chat' color='green' onClick={()=> {InicioSesion();  setRegistrado(true); setAlumno(true);}}/>  
          </CardContent>
    }
    
  />
                 

  );
}
 
export default IniciarSesion;