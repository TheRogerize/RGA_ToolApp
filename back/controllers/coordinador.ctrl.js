let Coordinador = require("../model/Coordinador")
let Universidad = require("../model/Universidad")
let Facultad = require("../model/Facultad")
let User = require("../model/User")
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  singup_,
  update_coordinador,
  delete_coordinador,
  getone_coordinador,
  getall_coordinador,
  getall_univcoordinador,
  add_to_facultad,
  populate_coordinador_all,
  populate_coordinador_one,
  getall_facultad,
  getall_facultad_univ,
  populate_allcoordinador_univ
}

async function add_to_facultad(req, res) {
  let coordinador = await Coordinador.findById(req.body.coordinadorID);
  if (req.body.facultadID != "") {
    coordinador.facultadID = req.body.facultadID
  } else {
    coordinador.facultadID = undefined
  }
  await coordinador.save()
  res.send(coordinador)

}
//singup coordinador 
async function singup_(req, res) {
  let universidad = await Universidad.findOne({
    userID: req.user.id
  });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
      msg: "Alguno de los datos ingresados no es valido"
    });
  }
  const {
    correo,
    clave,
    nombre,
    apellido,
    telefono,
    cargo,
    carnet,
  } = req.body;
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
      permiso: 2,
      telefono,
    });

    const salt = await bcrypt.genSalt(10);
    user.clave = await bcrypt.hash(clave, salt);
    await user.save();


    let coordinador = new Coordinador()
    coordinador.userID = user._id,
      coordinador.cargo = cargo,
      coordinador.universidadID = universidad._id
    coordinador.carnet = carnet,
      await coordinador.save();

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
          msg: "Coordinador registrado exitosamente"
        });
      }
    );

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error procesando la peticion");
  }
}


//Editar Universidad 
function update_coordinador(req, res) {

  Coordinador.findByIdAndUpdate(req.params.coorid, {
    $set:
    {
      cargo: req.body.cargo,
      //carnet: req.body.carnet

    }
  })
    .then(coordinador => {
      res.status(200).json({
        'type': 'success',
        'message': 'Succ'
      });
    })
    .catch(err => {

      res.status(400).json({
        msg: "No se lograron editar los datos de la universidad"
      });
    });

}; // function bracket 


//Get All coordinadores
function getall_coordinador(req, res) {
  Coordinador.find({}, function (err, allCoordinador) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return
    }
    return res.send(allCoordinador);

  })
}

//Get One coordinador
function getone_coordinador(req, res) {
  Coordinador.findById(req.params.coorid, function (err, oneCoordinador) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return
    }
    return res.send(oneCoordinador);

  })

}//function btacket 


//Delete coordinador
function delete_coordinador(req, res) {
  Coordinador.findByIdAndRemove(req.params.coorid)
    .then(coordinador => {
      res.status(200).json({
        'type': 'success',
        'message': 'Coordinador eliminado'
      });
    })
    .catch(err => {
      res.status(400).send('Error');
    });

}

//Populate function (join tables to get info)
async function populate_coordinador_all(req, res) {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await Coordinador.find()
      .populate('userID')
      .exec(function (err, found_user) {

        return res.send(found_user);
      });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
}

//Populate by id
async function populate_coordinador_one(req, res) {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await Coordinador.findById(req.params.coorid)
      .populate('userID')
      .exec(function (err, found_user) {

        return res.send(found_user);
      });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
}

//Get all facultades 

//Get All coordinadores
function getall_facultad(req, res) {
  Facultad.find({}, function (err, allFacultad) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return
    }
    return res.send(allFacultad);

  })
}
//---------FUNCIONES FILTER_UNIVERSIDAD--------------------//
//Get All coordinadores de una universidad 
async function getall_univcoordinador(req, res) {
  // se busca Universidad por el id del usuario
  let universidad = await Universidad.findOne({ userID: req.user.id })
  // despues de conseguir universidad, se hace una busquead en coordinador con el id de la universidad encontrada
  Coordinador.find({ universidadID: universidad._id }, function (err, univCoordinador) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return
    }

    return res.send(univCoordinador);

  })

}//function btacket 

//Get All facultades by universidad
async function getall_facultad_univ(req, res) {
  let universidad = await Universidad.findOne({
    userID: req.user.id
  });
  Facultad.find({ universidadID: universidad._id }, function (err, allunivFacultad) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return
    }
    return res.send(allunivFacultad);

  })
}//function btacket 

//Populate coordinadores por universidad
async function populate_allcoordinador_univ(req, res) {
  try {
    let universidadID
    if (req.user.permiso == 1) {
      let universidad = await Universidad.findOne({ userID: req.user.id })
      universidadID = universidad._id
    }
    if (req.user.permiso == 2) {
      let coordinador = await Coordinador.findOne({ userID: req.user.id })
      universidadID = coordinador.universidadID
    }
    // request.user is getting fetched from Middleware after token authentication
    const user = await Coordinador.find({ universidadID: universidadID }).populate('userID')

    res.status(200).json(user)
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
}//function btacket 
