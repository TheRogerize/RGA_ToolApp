const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
let ContenidoCtrl = require("../../controllers/contenido.ctrl")
const { check } = require("express-validator/check");



router.post("/create_contenido", auth, 
ContenidoCtrl.create_contenido);

router.get("/getall_contenido", 
ContenidoCtrl.getall_contenido)

router.get('/delete_contenido/:contid',
ContenidoCtrl.delete_contenido
  )

  router.get( "/getone_contenido/:contid",
  ContenidoCtrl.getone_contenido
);
router.post( "/update_contenido/:contid",
ContenidoCtrl.update_contenido
);
module.exports = router;