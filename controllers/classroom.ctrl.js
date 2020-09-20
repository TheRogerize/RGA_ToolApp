let Classroom = require("../model/Classroom") 
let Contenido = require("../model/Contenido")
let Coordinador = require("../model/Coordinador")
let Profesor = require("../model/Profesor")
let Alumno = require("../model/Alumno")
let User = require("../model/User") 
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let socketctrl = require("./socket.ctrl")
const Universidad = require("../model/Universidad")
module.exports = {
    add_classroom,
    delete_classroom,
    getall_classroom,
    getOne_classroom,
    add_profesor_classroom,
    add_archivo,
    delete_archivo,
    getall_univclassrooms,
    invitation_room,
    pending_user_classroom,
    accept_user,
    decline_user,
    get_estudiantes,
    //Funciones de Chat
    getChat,
    add_msg,
    
}

async function invitation_room(req,res){
  //Data recibida: roomID: el id al cual se envia la solicitud, y el ID del user se toma del middleware Auth
  // Se busca un classroom con el roomid, en caso de no tener un id valido retorna classroom no encontrado
  let classroom = await Classroom.findById(req.body.roomID);
  if(!classroom)
  return res.status(401).json({
    message: "Classroom no encontrado"
  });

  // se verifica que el id del usuario no se encuentre en el arreglo de invitation o en el arreglo de los alumnosID,
  // para no generar dos solicitudes del mismo usuario o que un usuario que ya pertenezca al room envia una nueva solicitud
  if(classroom.invitation.includes(req.user.id) || classroom.alumnosID.includes(req.user.id)){
    res.status(400).json({
      message: "Ya has enviado una petición a este curso"
    })
  }else {
    classroom.invitation.push(req.user.id)
    await classroom.save()
    res.status(200).json({
      classroom,
      message: "Invitacion enviada, esperando aceptacion del profesor"
    })
  }
}

function get_estudiantes(req,res){
  //ruta que devuelve todas las invitaciones de un room, recibe roomid como parametro get
  let { roomid } = req.params
  Classroom.findById(roomid).populate('alumnosID', 'nombre apellido correo').select('alumnosID')
  .then(classroom => {
    if(!classroom){
      return res.status(401).json({
        message: "Classroom no encontrado"
      });
    }
    if(classroom.alumnosID){
      return res.status(200).json({
        students: classroom.alumnosID
      })
    }
  })
  .catch(err => {
    res.status(400).json({
    message: "Classroom no encontrado"
    });
  });
}


function pending_user_classroom(req,res){
  //ruta que devuelve todas las invitaciones de un room, recibe roomid como parametro get
  let { roomid } = req.params
  Classroom.findById(roomid).populate('invitation', 'nombre apellido').select('invitation')
  .then(classroom => {
    if(!classroom){
      return res.status(401).json({
        message: "Classroom no encontrado"
      });
    }
    if(classroom.invitation){
      return res.status(200).json({
        pending_invitation: classroom.invitation
      })
    }
  })
  .catch(err => {
    res.status(400).json({
    message: "Classroom no encontrado"
    });
  });
}

async function decline_user(req,res){
  // Recibe roomid y userid (esta ruta la utiliza el profesor, por eso no se utiliza el middleware para obtener el userid de alumno)
  let { roomid, userid } = req.params
  //Se busca classroom en caso de no consguir ningun classroom devuelve error
  let classroom = await  Classroom.findById(roomid)
  if(!classroom)
    return res.status(401).json({
      message: "Classroom no encontrado"
    });

  if(classroom){
    if(classroom.invitation.includes(userid)){
      // aqui se verifica que el arreglo de invitaciones contenga el id del usuario
      // si consigue una invitacion con el Id se remueve del arreglo de invitaciones y se mueve el id a alumnosID
      let index = classroom.invitation.indexOf(userid)
      if (index > -1) {
        classroom.invitation.splice(index, 1);
        await classroom.save()
        return res.status(200).json({
          message: "Petición de estudiante rechazada"
        });
      }
      else{
        return res.status(400).json({
          message: "Esta petición no pudo ser encontrada."
        });
      }
    }else {
      console.log('user not found')
      return res.status(400).json({
        message: "Classroom not found"
      });
    }
  }else{
    return res.status(400).json({
      message: "El aula no pudo ser encontrada"
    });
  }
}
async function accept_user(req,res){
  // Recibe roomid y userid (esta ruta la utiliza el profesor, por eso no se utiliza el middleware para obtener el userid de alumno)
  let { roomid, userid } = req.params
  //Se busca classroom en caso de no consguir ningun classroom devuelve error
  let classroom = await Classroom.findById(roomid)
  if(!classroom)
    return res.status(401).json({
      message: "Classroom no encontrado"
    });
  let alumno = await Alumno.findOne({userID: userid})
  
  if(!alumno)
  return res.status(401).json({
    message: "Alumno no encontrado"
  });
  if(classroom){
    if(classroom.invitation.includes(userid)){
      // aqui se verifica que el arreglo de invitaciones contenga el id del usuario
      // si consigue una invitacion con el Id se remueve del arreglo de invitaciones y se mueve el id a alumnosID
      let index = classroom.invitation.indexOf(userid)
      if (index > -1) {
        classroom.invitation.splice(index, 1);
      }
      if(!classroom.alumnosID.includes(userid)){
        //se verifica que el userid no se encuentre en alumnosID para evitar tener duplicados
        classroom.alumnosID.push(userid)
        alumno.aulasID.push(roomid)
        await classroom.save()
        await alumno.save();
        return res.status(200).json({
          message: "Alumno agregado"
        });
      }else{
        return res.status(400).json({
          message: "Alumno ya se encuentra en esta clases"
        });
      }
    }else {
      console.log('user not found')
      return res.status(400).json({
        message: "Classroom not found"
      });

    }
  }else{
    return res.status(400).json({
      message: "El aula ya se encuentra registrada"
    });
  }
}

async function add_profesor_classroom(req, res){
  let profesor = await Profesor.findById(req.body.profesorID);
    if(!profesor)
    return res.status(401).json({
      message: "Profesor no encontrado"
    });
  let classroom =  await Classroom.findById(req.body.classroomID)

    if(!classroom)
    return res.status(401).json({
      message: "Room no encontrando"
    });

    if(classroom.profesorID)
    return res.status(401).json({
      message: "Este salon ya posee a un profesor/docente asignado"
    });
  
  classroom.profesorID = profesor._id

  profesor.aulasID = profesor.aulasID.concat(classroom._id)

  console.log(classroom)
  console.log(profesor)
  await profesor.save()
  await classroom.save()
  res.send(classroom)
}


async function add_classroom(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Se encontraron errores"
      });
    }

    const { nombre_aula, seccion, contenidoID } = req.body;
    try {
      //Verificar si existe un classroom con el mismo nombre
      let classroom = await Classroom.findOne({
        nombre_aula
      });
      // Verificar si se consigue un contenido con el ID contenido
      let contenido = await Contenido.findById(contenidoID)
      console.log(contenido)
      // si existe un classroom, return 
      if (classroom) {
        return res.status(400).json({
          message: "El aula ya se encuentra registrada"
        });
      }
      // si no se encontro contenido return 
      if(!contenido){
        return res.status(400).json({
          message: "Error plantilla"
        });
      }
      console.log("por aqui");
      //let universidad = await Universidad.findOne({userID: req.user.id})
      let coordinador = await Coordinador.findOne({userID: req.user.id})
      let universidad = coordinador.universidadID;
      if(!universidad){
        return res.status(400).json({
          message: "Id universidad no encontrado"
        });
      }
      //definir classroom con nombre y seccion
      classroom = new Classroom({
        nombre_aula,
        seccion,
        universidadID: universidad._id
      });
      //declarar classroom unidad con contenido unidad
      classroom.unidad = contenido.unidad
      console.log(classroom)
      //guardar y retornar el classroom creado
      await classroom.save();
      res.status(200).json({
        classroom,
        msg: "Curso creado exitosamente"
      })
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
}

async function getall_classroom(req, res) {
  console.log("ere")
  let classroom = await Classroom.find().populate('alumnosID profesorID');
  console.log(classroom)
  if(classroom !=""){
    res.status(200).send(classroom)
  }else{
    res.status(402).send("not found")
  }
}
//Get all profesores por universidad
async function getall_univclassrooms(req, res){

  let classroomID;
  let classroom = "";
  let classrooms = [];
  if(req.user.permiso == 1){
    let uni = await Universidad.findOne({_id:req.user.id})
    univid= uni._id;
    
    classrooms = await Classroom.find({universidadID: univid});
  }
  if(req.user.permiso == 2){
    let coordinador = await Coordinador.findOne({userID:req.user.id})
    univid = coordinador.universidadID;
    
    classrooms = await Classroom.find({universidadID: univid});
  }
  else if(req.user.permiso == 3){
    let profesor = await Profesor.findOne({userID:req.user.id})
    aulas = profesor.aulasID;

    classrooms = await Classroom.find({ "_id": { "$in": aulas } });
  }
  else if(req.user.permiso == 4) {
      let estudiante = await Alumno.findOne({userID:req.user.id})
      aulas = estudiante.aulasID;
      classrooms = await Classroom.find({ "_id": { "$in": aulas } });
  }


  if(classrooms.length > 0) {
    console.log(classrooms);
    return res.send(classrooms);
  } else {
      return res.status(401).json({
      message: "Aún no has sido asignado a ningún curso."
    });
  }

}
async function getOne_classroom(req, res) {
  console.log("ere")
  console.log(req.params.classroomID)
  let classroom = await Classroom.findById(req.params.classroomID).populate('alumnosID profesorID');
  console.log(classroom)
  if(classroom !=""){
    res.status(200).send(classroom)
  } else {
    res.status(402).send("not found")
  }
}

async function getall_contenido(req, res) {
  let contenido = await Contenido.find();
  if(contenido !=""){
    res.status(200).send(contenido)
  }else{
    res.status(402).send("not found")
  }
}


// Chat Controlador

async function getChat(req,res){
  let { roomid } = req.params
  let classroom = await Classroom.findById(roomid);
  if(classroom !=""){
    res.status(200).send(classroom)
  }else{
    res.status(402).send("not found")
  }

}

async function add_msg(req,res){
  let { roomid, msg  } = req.body

  let classroom = await Classroom.findById(roomid).select('class_chat alumnosID').populate({path:'alumnosID', select:'sockets nombre'})
  if(classroom !=""){
    let new_msg = {
      user: req.user.id,
      msg: msg,
      date: Date.now()
    }
    // console.log(classroom)
    classroom.class_chat = classroom.class_chat.concat(new_msg)
    let users = classroom.alumnosID
    for (let index = 0; index < users.length; index++) {
      const user = users[index];
      console.log(user.nombre)
      for (let indexj = 0;  indexj < user.sockets.length; indexj++) {
        const socket = user.sockets[indexj];
        //console.log("socket "+ socket)
        socketctrl.io().to(socket).emit("socket_test",new_msg)
      }
      console.log("-----------------------------")
    }
    //console.log(users)

    await classroom.save()
    //console.log(classroom)
    //res.status(200).send(classroom)
  }else{
    res.status(402).send("not found")
  } 
  res.status(200).send("classroom")
}


async function add_archivo(req, res){

    let classroom =  await Classroom.findById(req.body.classroomID)

    if(!classroom)
    return res.status(401).json({
      message: "Room no encontrando"
    });
    let unidad = await classroom.unidad.find(u => u._id == req.body.unidadID);
     if(!unidad) {
      return res.status(401).json({
        message: "Unidad no encontrada"
      });
     }

     let tema = await unidad.tema.find(t => t._id == req.body.temaID);
     if(!tema) {
      return res.status(401).json({
        message: "Tema no encontrado"
      });
     }

     const documento = {
      documento_nombre: req.body.documento_nombre,
      documento_url: req.body.documento_url
    }
    tema.contenido.push(documento);
    await classroom.save();
    res.send(classroom)
}

async function delete_archivo(req, res){

  let classroom =  await Classroom.findById(req.body.classroomID)

  if(!classroom)
  return res.status(401).json({
    message: "Room no encontrando"
  });
  let unidad = await classroom.unidad.find(u => u._id == req.body.unidadID);
   if(!unidad) {
    return res.status(401).json({
      message: "Unidad no encontrada"
    });
   }

   let tema = await unidad.tema.find(t => t._id == req.body.temaID);
   if(!tema) {
    return res.status(401).json({
      message: "Tema no encontrado"
    });
   }
  
    let contenidoIndex = tema.contenido.findIndex(cont => cont._id == req.body.contenidoID);
    console.log(contenidoIndex);
    if(contenidoIndex != -1) {
      tema.contenido.splice(contenidoIndex, 1);
      await classroom.save()
      res.send(classroom)
    } else {
      return res.status(401).json({
        message: "No se encontró el archivo seleccionado"
      });
    }
}

function delete_classroom(req, res) {
  Classroom.findByIdAndRemove(req.params.classid)
  .then(classroom => {
      res.status(200).json({
          'type': 'success',
          'message': 'Succ'
      });
  })
  .catch(err => {
      res.status(400).send('Error');
  });
  
}//function bracket 
