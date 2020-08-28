let Contenido = require("../model/Contenido");
let Coordinador = require("../model/Coordinador");
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    update_contenido,
    delete_contenido,
    getone_contenido,
    getall_univplantilla,
    create_contenido,
    getall_contenido
}



  

// Contenido Controlador

async function create_contenido(req, res) {
 
  const errors = validationResult(req);
  let user = await Coordinador.findOne({
    userID:req.user.id
  });

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  const { unidad,nombre_plantilla } = req.body;
  try {
    let contenido = new Contenido()
    contenido.creado_para = user.universidadID
    contenido.nombre_plantilla = nombre_plantilla
    contenido.unidad = unidad
  
    await contenido.save()
    //console.log(contenido)
    return res.status(200).send(contenido)
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
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

//Editar  contenido 
function update_contenido(req, res) {
  
  Contenido.findByIdAndUpdate(req.params.contid, { $set:
     {unidad: req.body.unidad,
      nombre_plantilla: req.body.nombre_plantilla
      
      
     }
    })
     .then(coordinador => { 
       console.log("update")
       res.status(200).json( {
           'type' : 'success', 
           'message': 'Succ'
       } );
     })
     .catch(err => {
     
       res.status(400).json({
       msg:"No se lograron editar los datos de la plantilla"
       });
     });
 
 }; // function bracket 



//Get all profesores por universidad
async function getall_univplantilla(req, res){
  let universidadID
  console.log(req.user)
  if(req.user.permiso == 1){
    let universidad = await Universidad.findOne({userID:req.user.id})
    universidadID = universidad._id
  }
  if(req.user.permiso == 2) {
    let coordinador = await Coordinador.findOne({userID:req.user.id})
    universidadID = coordinador.universidadID
  }
  Contenido.find({creado_para:universidadID}, function(err, allunivContenido)
  {  
      if(err){
      console.log(err);
      res.sendStatus(500);
      return
  }
  return res.send(allunivContenido);

  })
}

//Borrar contenido 
function delete_contenido(req, res) {
    Contenido.findByIdAndRemove(req.params.contid)
    .then(contenido => {
        res.status(200).json({
            'type': 'success',
            'message': 'Succ'
        });
    })
    .catch(err => {
        res.status(400).send('Error');
    });
    
  }//function bracket 

  //Get una plantilla de contenido 
function getone_contenido(req, res){
    Contenido.findById(req.params.contid, function(err, oneContenido)
    {  
        if(err){
        console.log(err);
        res.sendStatus(500);
        return
    }
    console.log(oneContenido);
    return res.send(oneContenido);
  
    })
  
  }//function btacket 