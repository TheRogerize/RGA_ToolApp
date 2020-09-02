let User = require("../model/User")
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Universidad = require("../model/Universidad");
const Profesor = require("../model/Profesor");
const Coordinador = require("../model/Coordinador")
let Alumno = require("../model/Alumno") 

const nodemailer = require('nodemailer');
ejs = require('ejs');


module.exports = {
    signup,
    login,
    test,
    me,
    resettoken, //crea el token
    setNewPassword //recibe el token y cambia la clave
}

async function signup(req, res) {
  console.log("signup")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Se encontraron errores"
      });
    }

    const { correo, clave, nombre, apellido, permiso, telefono } = req.body;
    try {
      let user = await User.findOne({
        correo
      });
      if (user) {
        return res.status(400).json({
          message: "El usuario ya se encuentra registrado"
        });
      }

      user = new User({
        correo,
        clave,
        nombre, 
        apellido,
        permiso, 
        telefono
      });

      const salt = await bcrypt.genSalt(10);
      user.clave = await bcrypt.hash(clave, salt);

      await user.save();

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
          // expiresIn: 10000
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
        return res.status(401).json({
          message: "Este usuario no se encuentra registrado"
        });

      const isMatch = await bcrypt.compare(clave, user.clave);
      if (!isMatch)
        return res.status(401).json({
          message: "Credenciales invalidas"
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
          // expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token, payload
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
    //console.log(req.user)
    // request.user is getting fetched from Middleware after token authentication
    //Check and separate user by permisson 
    let user = null
    //console.log("IDDD:"+req.user.id)
    if (req.user.permiso == 0 ){
      console.log("User")
      user = await User.findById(req.user.id);
    }
    if (req.user.permiso == 1){
      console.log("Universidad")
      user = await Universidad.findOne({ userID: req.user.id }).populate('userID');
    }
    if (req.user.permiso == 2){
      console.log("Coordinador")
      user = await (await Coordinador.findOne({ userID: req.user.id }).select('-createdAt').populate('userID universidadID facultadID'));
    }
    if (req.user.permiso == 3){   
      console.log("Profesor")
      user = await Profesor.findOne({ userID: req.user.id }).populate('userID');
    }
    if (req.user.permiso == 4){
      console.log("Alumno")
      user =  await Alumno.findOne({ userID: req.user.id }).populate('userID');
    }
    //console.log(user)
    res.json(user);
  } catch (e) {
    console.log(e)
    res.send({ message: "Error in Fetching user" });
  }
}

async function test(req, res) {
  console.log('here')
  console.log(req.user)
  let user = await User.find()
  res.json(user)

}

async function resettoken(req, res){
  console.log(req.body.correo);

  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 25, // port for secure SMTP
    tls: {
       ciphers:'SSLv3',
       rejectUnauthorized: false
      },
    auth: {
      user: 'elyhank@outlook.com',
      pass: 'hola12321'
    }
  });

  let user = await User.findOne({ correo: req.body.correo })

  var randomstring = Math.random().toString(36).slice(-8);
  if (!user)
    return res.status(401).json({
      message: "Este usuario no se encuentra registrado"
    });

  user.resettoken = randomstring
  await user.save()
  ejs.renderFile(__dirname + "/templates/resetPassword/index.ejs", 
    { name: user.nombre, lastname: user.apellido,
      email: user.correo, password: randomstring
    }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var mainOptions = {
                from: 'elyhank@outlook.com',
                to: user.correo,
                subject: 'Information recovery',
                html: data
            };
            // console.log("html data ======================>", mainOptions.html);
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else 
                {
                    console.log('Message sent: ' + info.response);
                    res.status(200);
                    res.json({
                      "type": "success",
                      "message" : "Token Enviado, Revisa tu correo!"
                    });
                    return;
                }
            });
      }
      });
  console.log(user) 

}

async function setNewPassword(req ,res) {
  let user = await User.findOne({ correo: req.body.correo, resettoken: req.body.resettoken })
  if (!user)
  return res.status(401).json({
    message: "Este usuario no se encuentra registrado"
  });
  const salt = await bcrypt.genSalt(10);
  user.clave = await bcrypt.hash(req.body.clave, salt);
  user.resettoken == undefined
  await user.save()
  res.status(200).json({
    'type': 'success',
    'msg': 'Clave actualizada'
  })

}
