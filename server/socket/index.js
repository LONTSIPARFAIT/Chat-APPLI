const express = require("express");
const { Server } = require("socket.io");
const http = require("http");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const { set } = require("mongoose");
const UserModel = require("../models/UserModel");

const app = express();

// connection au soket
const server = http.createServer(app)
const io = new Server(server,{
  cors : {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
})

//  le socket va demarer sur le http://localhost:8080/

// utilisateur en ligne
const onlineUser = new Set()

io.on("connection",async (socket)=>{
  console.log("user connecter", socket.id);

  const token = socket.handshake.auth.token

  // Current user detail
  const user = await getUserDetailsFromToken(token)
  // console.log('user',user);

  // create a room
  socket.join(user?._id)
  onlineUser.add(user?._id)

  io.emit('onlineUser',Array.from(onlineUser))
  socket.on('message-page', async(userId)=>{
    console.log('userId',userId);
    const userDetails = await UserModel.findById(userId).select('-password')

    const payload = {
      _id: userDetails?._id,
      name: userDetails?.name,
      email: userDetails?.email,
      online: onlineUser.has(userId)
    }
    socket.emit('message-edit',payload)
    
  })
  
  // Deconnnexion
  socket.on("disconnect",(socket)=>{
    onlineUser.delete(user?._id)
    console.log('utilisateur deconnecter',socket.id);
    
  })
})

module.exports = {
  app,
  server,
}