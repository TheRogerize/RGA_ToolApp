let User = require("../model/User")
let Alumno = require("../model/Alumno") 
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Universidad = require("../model/Universidad");
const Profesor = require("../model/Profesor");
const Coordinador = require("../model/Coordinador")
module.exports = {
    signup,
    login,
    test,
    me,
    getall,
    get_alumno_room,
    getone
}

async function signup(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    let permiso = 4 // alumno
    const { correo, clave, nombre, apellido, telefono, universidadID } = req.body;
    try {
      let user = await User.findOne({
        correo
      });
      if (user) {
        console.log("user exist")
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new User({
        correo,
        nombre, 
        apellido,
        permiso, 
        telefono
      });

      const salt = await bcrypt.genSalt(10);
      user.clave = await bcrypt.hash(clave, salt);

      await user.save();
      // console.log(user)

      let alumno = new Alumno()
      alumno.userID = user._id
      await alumno.save();

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
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token, payload
          });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Error in Saving");
    }
}

async function login(req, res)  {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { correo, clave } = req.body;
    try {
      let user = await User.findOne({
        correo
      });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(clave, user.clave);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect clave !"
        });

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
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
}

async function me(req ,res) {
    try {
      // request.user is getting fetched from Middleware after token authentication


      res.json(user);
    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
        
}

async function test(req, res) {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await Alumno.findOne({
      userID: req.body.id
    })
    .populate('userID')
    .exec(function (err, found_user) {

    return res.send(found_user);
  });
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
      
}

async function getall(req,res) {
  let alumno = await Alumno.find().populate('userID')

  //let alumno = await Classroom.find({alumnosID: "5efa6e49ebbc0401a4f613a4"}).populate("alumnosID");
  if(alumno !=""){
    res.status(200).send(alumno)
  }else{
    res.status(402).send("not found")
  }
}

async function get_alumno_room(req,res){

  let alumno = await Alumno.findOne({userID:req.user.id}).populate({path:'aulasID', select:'nombre_aula class_chat'})
  //let alumno = await Classroom.find({alumnosID: "5efa6e49ebbc0401a4f613a4"}).populate("alumnosID");
  if(alumno !=""){
    res.status(200).send(alumno)
  }else{
    res.status(402).send("not found")
  }
}
async function getone(req, res){

}