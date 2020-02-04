import React from 'react';
import socket from "socket.io";
import './App.css';

function App() {
  var socket = io();
  socket.emit('add_nfc_user', "from React");
  return (
    <div>
      <h1>Event Experience</h1>
    </div>
  );
}

export default App;
