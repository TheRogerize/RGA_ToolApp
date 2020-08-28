const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
let UniversidadCtrl = require("../../controllers/universidad.ctrl")
const { check } = require("express-validator/check");



router.post(
  "/singup_universidad",
  [
    check("historia", "Please enter a valid password").not().isEmpty(),
    check("mision", "Please Enter a valid Name").not().isEmpty(),
    check("vision", "Please Enter a valid LastName").not().isEmpty(),
    check("nombre_univ", "Please nombre").not().isEmpty(),
    check("metas", "Please metas").not().isEmpty()
  ],
  UniversidadCtrl.singup_universidad

);

router.post('/edit_universidad/:univid',
    [
      check("historia", "Please enter a valid password").not().isEmpty(),
      check("mision", "Please Enter a valid Name").not().isEmpty(),
      check("vision", "Please Enter a valid LastName").not().isEmpty(),
      check("nombre_univ", "Please nombre").not().isEmpty(),
      check("metas", "Please metas").not().isEmpty()
    ],
    UniversidadCtrl.update_universidad
     );


router.get('/delete_universidad/:univid',
  UniversidadCtrl.delete_universidad
  );

router.get( "/getone_universidad/:univid",
  UniversidadCtrl.getone_univ
);

router.get("/getall_universidad",
  UniversidadCtrl.getall_univerdad
);

router.get("/univ_popu",
  UniversidadCtrl.populate_universidad_all
);

router.get("/univ_popu/:univid",
  UniversidadCtrl.populate_universidad_one
);

router.post('/add_facultad', auth, UniversidadCtrl.add_facultad)


module.exports = router;
