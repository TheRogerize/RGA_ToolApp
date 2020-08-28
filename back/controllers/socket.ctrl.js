'use strict'

let sio = require('socket.io');
const jwt = require("jsonwebtoken");
let io = null;
let User = require("../model/User")
let Classroom = require("../model/Classroom")
exports.io = () => {
    return io;
}


let room = "getChatRooms()"

const usernames = []
const rooms = [{nombre_aula:'commonroom', seccion:0}]
const room_users = {
    commonroom: [],
    Programacion: [],
    Science: [],
    Botany: [],
    Music: [],
    Tesla: [],
    Spacex: [],
    BlueOrigin: [],
}

function getChatRooms() {
    Classroom.find({}, function(err, allClassroom)
    {  
        if(err){
        console.log(err);
        return
        console.log("allClassroom")
    }
    return("allClassroom");
  
    })
}
exports.initialize = (server)=>{
    io = sio(server);

 
    io.on('connect', function(socket){
        let decoded
        console.log("socket: "+ socket.id)
        //console.log(socket.handshake.query)
   
        if(!socket.handshake.query.token) {
            console.log("No token")
        }else{

        if(socket.handshake.query.token){
            //console.log("token")
            decoded = jwt.verify(socket.handshake.query.token, "randomString");
            //console.log(decoded.user)

            socket.on('disconnect', (res) => {
                console.log("bye bye"+ decoded.user.id)
                
                User.findOne({_id:decoded.user.id},function(err,user){
                    if(err){
                        console.log(err);
                    }
        
                    if(user){
                        console.log(user)
                        for(let i = 0; i<user.sockets.length;i++){
                            if(socket.id == user.sockets[i]){
                                user.sockets.splice(i,1);
                            }
                        }
                        user.save(function(err, user_updated){
                            if(err){
                                console.log(err);
                            }
                            console.log(user_updated.sockets)
                        })
                    }else{
                        console.log('no user')
                    }
                    
                })

            });
            //console.log(decoded)
            socket.on('chat_connect', ()=>{
                console.log("chat_connect socket: "+socket.id)
                try {
                    console.log("chat_connect")
                    User.findOne({_id:decoded.user.id},function(err,user){
                        console.log("user found")
                        //console.log(user)
                        if(err){
                            console.log(err);
                        }
                        if(user){
                            //console.log(user)
                           // console.log(socket.id)
                            if (user.sockets.indexOf(socket.id) > -1) {
                               console.log("same")
                            } else {
                               user.sockets = user.sockets.concat(socket.id)
                               console.log("new")
                               user.save(function(err, user_updated){
                                if(err){
                                    console.log(err);
                                }
                                console.log("save")
                               // console.log(user_updated.sockets)
                            })
                            }                      
                           // console.log(user.sockets)
                         
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            })
            socket.on('manual_disconnect', ()=>{
                console.log('manual disc')
                console.log("manual bye"+ decoded.user.id)
                User.findOne({_id:decoded.user.id},function(err,user){
                    if(err){
                        console.log(err);
                    }
        
                    if(user){
                        // console.log(user)
                        for(let i = 0; i<user.sockets.length;i++){
                            if(socket.id == user.sockets[i]){
                                user.sockets.splice(i,1);
                            }
                        }
                        user.save(function(err, user_updated){
                            if(err){
                                console.log(err);
                            }
                            console.log(user_updated.sockets)
                        })
                    }else{
                        console.log('no user')
                    }
                    
                })

            })
        }

        }

      
    });

 
   
   Classroom.find({}, 'id nombre_aula seccion',function(err,classroom_chat){
    console.log("classroom_chat found")
    //console.log(classroom_chat)
    if(err){
        console.log(err);
    }
    if(classroom_chat){
        
        rooms.push(classroom_chat)
       // console.log(socket.id)
       // console.log(user.sockets)
    }
    
})
/*
   io.on('connect', (socket) => {
    
    console.log()
    socket.on('adduser', function (username) {
        socket.username = username
        socket.room = rooms[0].nombre_aula
        //room[0].push(username)
        //room_users[socket.room].push(username)
        console.log(rooms)
        socket.join(rooms[0].nombre_aula)
        socket.emit('chat_update', {
            username: socket.username,
            message: `Te has conectado a la sala: ${socket.room}`
        })
        io.to(socket.room).emit('site_data', {
            users: room_users[socket.room],
            rooms,
            current_room: socket.room
        })
        socket.broadcast.to(socket.room).emit('update_update', {
            username: socket.username,
            message: `${socket.username} Se ha unido a la sala ${socket.room} - ${room}`
        })
  
    })
    socket.on('chat_message', (data) => {
        io.sockets.in(socket.room).emit('chat_update', {
            username: socket.username,
            message: data
        })
    })
  
    socket.on('switchrooms', (newroom) => {
  
          socket.leave(socket.room)
          socket.join(newroom)
          room_users[socket.room] = room_users[socket.room].filter((i) => {
            return i != socket.username
          })
          socket.room = newroom
          room_users[socket.room].push(socket.username)
          socket.emit('chat_update', {
            username: socket.username,
            message: `te has conectado a la sala ${socket.room}`
          })
          io.in(socket.room).emit('site_data', {
            users: room_users[socket.room],
            rooms,
            current_room: socket.room
          })
          socket.broadcast.to(socket.room).emit('update_update', {
            username: socket.username,
            message: `${socket.username} se ha conectado a la sala ${socket.room}`
          })
        })
      })
  
  */
}


