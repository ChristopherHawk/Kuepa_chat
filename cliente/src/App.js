import React, { useState, useEffect } from "react";
import Chat from "./componentes/Chat";
import { Container, Header } from 'semantic-ui-react'
import "./App.css";
import { AsyncStorage } from 'AsyncStorage';
import Registro from "./componentes/registro";
import IniciarSesion from "./componentes/iniciarSesion";

function App() {
 
  const [nombre, setNombre] = useState("");
  const [registrado, setRegistrado] = useState(false);
  const [alumno, setAlumno] = useState(false);

   //Obtener usuario
   const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      
      if(jsonValue !== null){
       const userSaved = JSON.parse(jsonValue) 
       setNombre(userSaved.nombre)
      } 
    } catch(e) {
    console.log(e)
    }
  }    

useEffect(() => {

  if(nombre) return setRegistrado(true)
  getData()
 
}, [nombre])



return (
    <Container id="AppDiv">
     <Header id='header' content ='Clase Virtual: Kuepa Chat'/>
        
         {!registrado && !alumno && 
         <Registro 
          setAlumno={setAlumno}
          />}
      {!registrado && alumno && ( 
        <IniciarSesion 
        setRegistrado={setRegistrado} 
        setNombre={setNombre}
        setAlumno={setAlumno}
        />
      )}

      {registrado && <Chat nombre={nombre} setRegistrado={setRegistrado} />}
    </Container>
  );
}

export default App;
