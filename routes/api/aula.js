const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
let AulaCtrl = require("../../controllers/Aula.ctrl")
const { check } = require("express-validator/check");


router.post(
    "/add_contenido",
    [
      check("unidad", "Please Enter a valid unida").not().isEmpty() 
    ],
    auth, 
    AulaCtrl.create_contenido
)
router.get("/get_all_contenido", AulaCtrl.getall_contenido)

module.exports = router;