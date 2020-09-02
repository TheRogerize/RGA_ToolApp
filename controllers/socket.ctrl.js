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
const rooms = [{ nombre_aula: 'commonroom', seccion: 0 }]
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
    Classroom.find({}, function (err, allClassroom) {
        if (err) {
            console.log(err);
            return
            console.log("allClassroom")
        }
        return ("allClassroom");

    })
}
exports.initialize = (server) => {
    io = sio(server);


    io.on('connect', function (socket) {
        let decoded

        if (!socket.handshake.query.token) {
            console.log("No token")
        } else {

            if (socket.handshake.query.token) {
                decoded = jwt.verify(socket.handshake.query.token, "randomString");

                socket.on('disconnect', (res) => {
                    console.log("bye bye" + decoded.user.id)

                    User.findOne({ _id: decoded.user.id }, function (err, user) {
                        if (err) {
                            console.log(err);
                        }

                        if (user) {
                            console.log(user)
                            for (let i = 0; i < user.sockets.length; i++) {
                                if (socket.id == user.sockets[i]) {
                                    user.sockets.splice(i, 1);
                                }
                            }
                            user.save(function (err, user_updated) {
                                if (err) {
                                    console.log(err);
                                }
                                console.log(user_updated.sockets)
                            })
                        } else {
                            console.log('no user')
                        }

                    })

                });
                socket.on('chat_connect', () => {
                    console.log("chat_connect socket: " + socket.id)
                    try {
                        console.log("chat_connect")
                        User.findOne({ _id: decoded.user.id }, function (err, user) {
                            console.log("user found")
                            if (err) {
                                console.log(err);
                            }
                            if (user) {
                                if (user.sockets.indexOf(socket.id) > -1) {
                                    console.log("same")
                                } else {
                                    user.sockets = user.sockets.concat(socket.id)
                                    console.log("new")
                                    user.save(function (err, user_updated) {
                                        if (err) {
                                            console.log(err);
                                        }
                                        console.log("save")
                                    })
                                }
                            }
                        })
                    } catch (error) {
                        console.log(error)
                    }
                })
                socket.on('manual_disconnect', () => {
                    console.log('manual disc')
                    console.log("manual bye" + decoded.user.id)
                    User.findOne({ _id: decoded.user.id }, function (err, user) {
                        if (err) {
                            console.log(err);
                        }

                        if (user) {
                            // console.log(user)
                            for (let i = 0; i < user.sockets.length; i++) {
                                if (socket.id == user.sockets[i]) {
                                    user.sockets.splice(i, 1);
                                }
                            }
                            user.save(function (err, user_updated) {
                                if (err) {
                                    console.log(err);
                                }
                                console.log(user_updated.sockets)
                            })
                        } else {
                            console.log('no user')
                        }

                    })

                })
            }

        }


    });



    Classroom.find({}, 'id nombre_aula seccion', function (err, classroom_chat) {
        console.log("classroom_chat found")
        if (err) {
            console.log(err);
        }
        if (classroom_chat) {

            rooms.push(classroom_chat)
        }
    })
}


