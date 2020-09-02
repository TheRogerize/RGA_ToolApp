const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
let CoordinadorCtrl = require("../../controllers/coordinador.ctrl")
const { check } = require("express-validator/check");


router.post(
    "/singup_",
    [
      check("correo", "Please enter a valid email").isEmail(),
      check("clave", "Please enter a valid password").isLength({
          min: 6
        }),
      check("nombre", "Please Enter a valid Name").not().isEmpty(),
      check("apellido", "Please Enter a valid apellido").not().isEmpty(),
      check("telefono", "Please Enter a valid telefono").not().isEmpty(),
      check("cargo", "Please enter a valid password").not().isEmpty(),
      check("carnet", "Please Enter a valid carnet").not().isEmpty() 
    ],
    auth,
    CoordinadorCtrl.singup_
  
  );

  router.post('/edit_coordinador/:coorid',
  [
    check("cargo", "Please enter a valid password").not().isEmpty(),
    //check("carnet", "Please enter a valid password").not().isEmpty()
  ],
  CoordinadorCtrl.update_coordinador
   );

router.get("/getall_coordinador",auth,
  CoordinadorCtrl.getall_coordinador
);


router.get( "/getone_coordinador/:coorid",
  CoordinadorCtrl.getone_coordinador
);

router.get("/delete_coordinador/:coorid",
  CoordinadorCtrl.delete_coordinador
  );

  router.get("/populate_allcoor",
  CoordinadorCtrl.populate_coordinador_all
);

router.get("/populate_onecoor/:coorid",
CoordinadorCtrl.populate_coordinador_one
);

router.post("/add_to_facultad",
 CoordinadorCtrl.add_to_facultad);

router.get("/getall_facultades",
auth,
  CoordinadorCtrl.getall_facultad
);



module.exports = router;