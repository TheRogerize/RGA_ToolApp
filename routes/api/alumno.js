const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
let AlumnoCtrl = require("../../controllers/alumno.ctrl")
const { check } = require("express-validator/check");


router.post(
  "/signup",
  [
    check("correo", "Please enter a valid email").isEmail(),
    check("clave", "Please enter a valid password").isLength({
      min: 6
    }),
    check("nombre", "Please Enter a valid Name").not().isEmpty(),
    check("apellido", "Please Enter a valid apellido").not().isEmpty(),
    check("telefono", "Please Enter a valid telefono").not().isEmpty(),
  ],
  AlumnoCtrl.signup
);

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6
    }),
  ],
  AlumnoCtrl.login
);


router.get("/me", auth, AlumnoCtrl.me);

router.post(
  "/test", 
  AlumnoCtrl.test
)
router.get("/getall", AlumnoCtrl.getall)

router.get("/getone/:alumid", AlumnoCtrl.getone)

router.get("/get_alumno_room", auth, AlumnoCtrl.get_alumno_room)

module.exports = router;
