const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
let ProfesorCtrl = require("../../controllers/profesor.ctrl")
const { check } = require("express-validator/check");

//Agregar profesor
router.post(
    "/singup_profesor",
    [
      check("cargo", "Please enter a valid password").not().isEmpty(),
      //check("carnet", "Please Enter a valid Name").not().isEmpty(),
     
    ],auth,
    ProfesorCtrl.singup_profesor
  
  );
//Editar profesor
  router.post('/edit_profesor/:proid',
  [
    check("cargo", "Please enter a valid password").not().isEmpty(),
    //check("carnet", "Please Enter a valid Name").not().isEmpty(),
   
  ],
  ProfesorCtrl.update_profesor
   );

//Todos profesores
   router.get("/getall_profesor",
   ProfesorCtrl.getall_profesor
 );

//Un profesor
router.get( "/getone_profesor/:proid",
  ProfesorCtrl.getone_profesor
);

//Populate ALL
router.get("/populate_profesor",
  ProfesorCtrl.populate_profesor_all,
);

//Populate one
router.get("/populate_profesor/:proid",
ProfesorCtrl.populate_profesor_one
);

//Deelete profesor
router.get('/delete_profesor/:proid',
ProfesorCtrl.delete_profesor
  );

module.exports = router;