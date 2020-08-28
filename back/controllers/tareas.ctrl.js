let Tarea = require("../model/Tareas");
let Profesor = require("../model/Profesor");
let Alumno = require("../model/Alumno");
let Classroom = require("../model/Classroom");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    update_tarea,
    delete_tarea,
    getone_tarea,
    create_tarea,
    entregar_tarea,
    getall_tarea,
    getall_tarea_classroom,
    getall_user_tareas
}

// Tarea Controlador

async function create_tarea(req, res) {
  console.log('create tareas')
  const errors = validationResult(req);
  let profesor = await Profesor.findOne({
    userID:req.user.id
  });

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if(!profesor){
    return res.status(400).json({
      message: "ID Profesor Error"
    });
  }

  const { 
    titulo_tarea,
    descripcion,
    classroomID,
  } = req.body;
  console.log(req.body);
  try {
    console.log(titulo_tarea);
    console.log(descripcion);
    console.log(classroomID);
    let tarea = new Tarea()
    tarea.creado_para = profesor.universidadID
    tarea.titulo_tarea = titulo_tarea
    tarea.descripcion = descripcion
    tarea.classroomID = classroomID
    if(req.body.fecha_entrega){
      tarea.fecha_entrega = req.body.fecha_entrega
    }
    if(req.body.documento){
      tarea.documento = req.body.documento
    }
    await tarea.save()
    //console.log(tarea)
    return res.status(200).send(tarea)
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
}

async function entregar_tarea(req, res) {
  console.log('entregar tareas')
  const errors = validationResult(req);
  const userID = req.user.id;

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }

  if(!userID){
    return res.status(400).json({
      message: "ID Estudiante Error"
    });
  }

  const { 
    documento_nombre,
    documento_url,
    tareaid,
  } = req.body;
  console.log(req.body);
  const nuevaTarea = {
    user: userID,
    documento_url,
    documento_nombre
  }
  console.log("PROANDO A VER");
  console.log(nuevaTarea)
  try {
    let tarea = await Tarea.findOne({
      _id:tareaid
    });
    console.log(tarea);
    tarea.entregados.push(nuevaTarea)
    await tarea.save()
    //console.log(tarea)
    return res.status(200).send(tarea)
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error al guardar");
  }
}


async function getall_tarea(req, res) {
  let tarea = await Tarea.find();
  if(tarea !=""){
    res.status(200).send(tarea)
  }else{
    res.status(402).send("not found")
  }
}


async function getall_tarea_classroom(req, res) {
  let tarea = await Tarea.find({classroomID:req.params.roomid}).populate('entregados.user', 'nombre apellido correo');
  console.log("TAREA");
  console.log(tarea);
  if(tarea !=""){
    res.status(200).send(tarea)
  }else{
    res.status(402).send("not found")
  }
}

async function getall_user_tareas(req, res) {
  permiso = req.user.permiso;
  userID = req.user.id;
  if(permiso == 3) {
    profesor = await Profesor.findOne({userID})
    aulas = profesor.aulasID;
    tareas = await Tarea.find({ "classroomID": { "$in": aulas } }).populate('entregados.user', 'nombre apellido correo');
    console.log("solo TAREAS");
    console.log(tareas);
  }
  else if(permiso == 4) {
    alumno = await Alumno.findOne({userID})
    aulas = alumno.aulasID;
    tareas = await Tarea.find({ "classroomID": { "$in": aulas } }).populate('entregados.user', 'nombre apellido correo');
  }
  if(tareas !=""){
    res.status(200).send(tareas)
  }else{
    res.status(402).send("not found")
  }
  // let tarea = await Tarea.find({classroomID:req.params.roomid}).populate('entregados.user', 'nombre apellido correo');
  // console.log("TAREA");
  // console.log(tarea);
  // if(tarea !=""){
  //   res.status(200).send(tarea)
  // }else{
  //   res.status(402).send("not found")
  // }
}
//Editar  tarea 
async function update_tarea(req, res) {
  let tarea = await Tarea.findById(req.params.tareaid);
  if(!tarea){
    return res.status(400).json({
      errors: errors.array()
    });
  }

  try {
    if(req.body.titulo_tarea){
      tarea.titulo_tarea = req.body.titulo_tarea
    }
    if(req.body.descripcion){
      tarea.descripcion = req.body.descripcion
    }
    if(req.body.fecha_entrega){
      tarea.fecha_entrega = req.body.fecha_entrega
    }
    if(req.body.documento){
      tarea.documento = req.body.documento
    }

    await tarea.save()
    //console.log(tarea)
    return res.status(200).send(tarea)
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
 }; // function bracket 

//Borrar tarea 
function delete_tarea(req, res) {
    Tarea.findByIdAndRemove(req.params.tareaid)
    .then(tarea => {
        res.status(200).json({
            'type': 'success',
            'message': 'Succ'
        });
    })
    .catch(err => {
        res.status(400).send('Error');
    });
    
  }//function bracket 

  //Get una plantilla de tarea 
function getone_tarea(req, res){
    Tarea.findById(req.params.tareaid, function(err, oneTarea)
    {  
        if(err){
        console.log(err);
        res.sendStatus(500);
        return
    }
    console.log(oneTarea);
    return res.send(oneTarea);
  
    })
  
  }//function btacket 