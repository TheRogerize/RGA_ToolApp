let Universidad = require("../model/Universidad") 
let User = require("../model/User") 
let Facultad = require('../model/Facultad')
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
    
    update_universidad,
    delete_universidad,
    getone_univ,
    getall_univerdad,
    singup_universidad,
    populate_universidad_all,
    populate_universidad_one,
    add_facultad,
    test
}

async function test(req, res){
let universidad = await Universidad.findById
}

async function add_facultad(req, res){
  let universidad = await Universidad.findOne({
    userID: req.user.id
  });
  const { nombre, carreras} = req.body;
  let facultad = new Facultad()
    facultad.nombre = nombre,
    facultad.carreras = carreras
    facultad.universidadID = universidad._id
    await facultad.save()
  console.log(facultad)
  let new_facultadID = facultad._id
  if(universidad.facultad.length == 0){
    universidad.facultad = new_facultadID
    console.log('Primera facultad')
  }else{
    universidad.facultad.push(new_facultadID)
    console.log('Agregando una segunda')
  }
  console.log(universidad)
  await universidad.save()
  res.status(200).json({
    msg: "Facultad registrada exitosamente"
  });
}
//singup Universidad 
async function singup_universidad(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      msg: "Alguno de los datos ingresados no es valido"
    });
  }
  let permiso = 2 // universidad
  console.log(req.body);
  const { 
    correo, 
    clave,
    nombre, 
    apellido, 
    telefono, 
    historia, 
    mision, 
    vision, 
    nombre_univ, 
    metas } = req.body;
  try {

    let user = await User.findOne({
      correo
    });
    if (user) {
      return res.status(401).json({
        msg: "Correo en uso"
      });
    }

    user = new User({
      correo,
      nombre,
      apellido,
      permiso:1, 
      telefono
    });
    
    const salt = await bcrypt.genSalt(10);
    user.clave = await bcrypt.hash(clave, salt);
    await user.save();

    console.log(user)

    let universidad = new Universidad()
    universidad.userID = user._id
    universidad.historia = historia,
    universidad.mision = mision,
    universidad.vision = vision,
    universidad.metas = metas,
    universidad.nombre_univ = nombre_univ
    await universidad.save();

    console.log(universidad)

    const payload = {
      user: {
        id: user.id,
        permiso: user.permiso
      }
    };

    jwt.sign(
      payload,
      "randomString",
      {
        expiresIn: 10000
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          token,
          msg: "Universidad registrada exitosamente"
        });
      }
    );
    
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
}


//Editar Universidad 
function update_universidad(req, res) {
  
 Universidad.findByIdAndUpdate(req.params.univid, { $set:
    {nombre_univ: req.body.nombre_univ,
     historia:  req.body.historia,   
     mision: req.body.mision,
     vision: req.body.vision,
     metas: req.body.metas
    }
   })
    .then(universidad => { 
      console.log("update")
      res.status(200).json( {
          'type' : 'success', 
          'message': 'Succ'
      } );
    })
    .catch(err => {
    
      res.status(400).json({
      msg:"No se lograron editar los datos de la universidad"
      });
    });

}; // function bracket 


//Borrar universidad 
function delete_universidad(req, res) {
  Universidad.findByIdAndRemove(req.params.univid)
  .then(universidad => {
      res.status(200).json({
          'type': 'success',
          'message': 'Succ'
      });
  })
  .catch(err => {
      res.status(400).send('Error');
  });
  
}//function bracket 

//Get una universidad 
function getone_univ(req, res){
  Universidad.findById(req.params.univid, function(err, oneUniversidad)
  {  
      if(err){
      console.log(err);
      res.sendStatus(500);
      return
  }
  console.log(oneUniversidad);
  return res.send(oneUniversidad);

  })

}//function btacket 

//Get all universidades 
function getall_univerdad(req, res){
  Universidad.find().
  populate('userID facultad').
  exec(function(err, allUniversidad)
  {  
      if(err){
      console.log(err);
      res.sendStatus(500);
      return
  }
  return res.send(allUniversidad);

  })
}

//Populate function (join tables to get info)
async function populate_universidad_all(req, res) {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await Universidad.find()
    .populate('userID')
    .exec(function (err, found_user) {

    return res.send(found_user);
  });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }}

  async function populate_universidad_one(req, res) {
    try {
      // request.user is getting fetched from Middleware after token authentication
      const user = await Universidad.findById(req.params.univid)
      .populate('userID')
      .exec(function (err, found_user) {
  
      return res.send(found_user);
    });
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }}

    