const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
let UserCtrl = require("../../controllers/user.ctrl")
const { check } = require("express-validator/check");


router.post(
  "/signup",
  [
    check("correo", "Please enter a valid email").isEmail(),
    check("clave", "Please enter a valid password").isLength({
      min: 6
    }),
    check("nombre", "Please Enter a valid Name").not().isEmpty(),
    check("apellido", "Please Enter a valid LastName").not().isEmpty(),
    check("telefono", "Please Enter a valid LastName").not().isEmpty(),
    check("permiso", "Please Enter a valid LastName").not().isEmpty()
  ],
  UserCtrl.signup
);

router.post(
  "/login",
  [
    check("correo", "Please enter a valid email").isEmail(),
    check("clave", "Please enter a valid password").isLength({
      min: 6
    }),
  ],
  UserCtrl.login
);


router.get("/me", auth, UserCtrl.me);

router.get(
  "/test", 
  auth,
  UserCtrl.test
)

router.post('/askfortoken', UserCtrl.resettoken); //solicita el token, solamente hace falta el correo del usuario

router.post('/newpassword', UserCtrl.setNewPassword) //recibe el correo, el token generado en la funcion anterior y la nueva clave, busca en la db un usuario con el correo y clave y le asigna la nueva clave
module.exports = router;
