let Profesor = require("../model/Profesor")
let Coordinador = require("../model/Coordinador")
let User = require("../model/User")
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


module.exports = {

  singup_profesor,
  update_profesor,
  delete_profesor,
  getone_profesor,
  getall_profesor,
  populate_profesor_all,
  populate_profesor_one,
  getall_univprofesor,
  populate_allprof_univ
}


async function singup_profesor(req, res) {
  const errors = validationResult(req);
  let coordinador = await Coordinador.findOne({
    userID: req.user.id
  });

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
    carnet } = req.body;
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
      permiso: 3,
      telefono
    });

    const salt = await bcrypt.genSalt(10);
    user.clave = await bcrypt.hash(clave, salt);
    await user.save();


    let profesor = new Profesor()
    profesor.userID = user._id
    profesor.cargo = cargo,
      profesor.carnet = carnet
    profesor.universidadID = coordinador.universidadID
    await profesor.save();

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
          msg: "Profesor registrado exitosamente"
        });
      }
    );

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
}


//Editar Profesor 
function update_profesor(req, res) {

  Profesor.findByIdAndUpdate(req.params.proid, {
    $set:
    {
      cargo: req.body.cargo,
      //carnet: req.body.carnet,

    }
  })
    .then(profesor => {
      res.status(200).json({
        'type': 'success',
        'message': 'Succ'
      });
    })
    .catch(err => {

      res.status(400).json({
        msg: "No se lograron editar los datos del profesor"
      });
    });

}; // function bracket 


//Get all profesores 
function getall_profesor(req, res) {
  Profesor.find({}, function (err, allProfesor) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return
    }
    return res.send(allProfesor);

  })
}

//Get all profesores por universidad
async function getall_univprofesor(req, res) {

  let universidad = await Universidad.findOne({ userID: req.user.id })

  // despues de conseguir universidad, se hace una busquead en coordinador con el id de la universidad encontrada
  Profesor.find({ universidadID: universidad._id }, function (err, allunivProfesor) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return
    }
    res.status(200).json(allunivProfesor)
  })
}


//Get una profesor 
function getone_profesor(req, res) {
  Profesor.findById(req.params.proid, function (err, oneProfesor) {
    if (err) {
      console.log(err);
      res.sendStatus(500);
      return
    }
    return res.send(oneProfesor);
  })

}//function btacket 

//Populate all profesor
async function populate_profesor_all(req, res) {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await Profesor.find()
      .populate('userID')
      .exec(function (err, found_user) {

        return res.send(found_user);
      });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
}

//Populate all profesor by universidad
async function populate_allprof_univ(req, res) {
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
    const user = await Profesor.find({ universidadID: universidadID }).populate('userID')

    res.status(200).json(user)
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
}

//Populate one profesor
async function populate_profesor_one(req, res) {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await Profesor.findById(req.params.proid)
      .populate('userID')
      .exec(function (err, found_user) {

        return res.send(found_user);
      });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
}


//Delete profesor
function delete_profesor(req, res) {
  Profesor.findByIdAndRemove(req.params.proid)
    .then(profesor => {
      res.status(200).json({
        'type': 'success',
        'message': 'Succ'
      });
    })
    .catch(err => {
      res.status(400).send('Error');
    });

}//function bracket