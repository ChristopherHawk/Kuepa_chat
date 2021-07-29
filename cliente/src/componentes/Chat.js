import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import { Button, CardContent, CardGroup, Grid, Input, Popup } from 'semantic-ui-react'
import { AsyncStorage } from 'AsyncStorage';
import "../App.css";
import ReactPlayer from 'react-player/twitch'


const Chat = ({ nombre, setRegistrado}) => {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  //Cerrar sesión
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
    console.log(e)
    }
  }

  useEffect(() => {
    socket.emit("conectado", nombre);
  }, [nombre]);

  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]);
    });

    return () => {
      socket.off();
    };
  }, [mensajes]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const submit = (e) => {
    e.preventDefault();
    socket.emit("mensaje", nombre, mensaje);
    setMensaje("");
  };

  //Letra Capital
  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <CardContent id='chatWindow'>

    <CardContent  id='playerdiv'>
      <ReactPlayer 
id='player'
 playing={true} 
 onReady={true} 
 width='auto'
 url='https://www.twitch.tv/monstercat'
 />
   </CardContent>
   <Popup content='Cerrar clase' trigger={
      <Button 
      icon='close' 
      color='google plus'
      floated='right'
      onClick={() => {storeData(null); setRegistrado(false);}}
      />} />
      <CardContent id="chat">
        {mensajes.map((e, i) => (
          <CardGroup id='messages' key={i}>
            <CardContent><b id='textName'>{e.nombre.toUpperCase()}: </b></CardContent>
            <CardContent id='textMessage'> {capitalizarPrimeraLetra(e.mensaje)}</CardContent>
          </CardGroup>
        ))}
        <div ref={divRef}></div>
      </CardContent>
      
      <Grid>
    <Grid.Column floated='left' width={10}>
    <Input
        autoFocus={true}
        fluid
          placeholder="Escriba su mensaje"
          id="messageBox"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
    </Grid.Column>
    <Grid.Column floated='right' width={5}>
    <Button 
        floated='right' 
        content='Enviar' 
        icon='send' 
        color='green'  
        onClick={submit}/>
    </Grid.Column>
  </Grid>
  </CardContent>
  );
};

export default Chat;
