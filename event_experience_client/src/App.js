import React from 'react';
import socketIOClient from "socket.io-client";
import AddUserForm from "./AddUserForm";
import './App.css';

var socket;

function App() {
  socket = socketIOClient("http://localhost:3000/");
  socket.emit('add_nfc_user', "from React");

  socket.on('add_nfc_user', function(msg){
    console.log(msg);
  });

  return (
    <div>
      <h1>Event Experience</h1>
      <AddUserForm/>
    </div>
  );
}

export default App;
