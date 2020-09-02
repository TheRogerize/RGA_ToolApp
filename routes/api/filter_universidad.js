const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
let CoordinadorCtrl = require("../../controllers/coordinador.ctrl")
let ProfesorCtrl = require("../../controllers/profesor.ctrl")
let ContenidoCtrl = require("../../controllers/contenido.ctrl")
let ClassroomCtrl = require("../../controllers/classroom.ctrl")


//Busquedas de coordinador por universidad --> Controlador de Coordinador 
router.get("/getall_univcoor",auth,
  CoordinadorCtrl.getall_univcoordinador //Id de Universidad/Usuario necesario
);
router.get("/getall_univcoordinador_populate",auth,
  CoordinadorCtrl.populate_allcoordinador_univ //UserId de Universidad o Coordinador
);
router.get("/getall_univfacul",auth,
  CoordinadorCtrl.getall_facultad_univ //Token con el UserID de Universidad
);
//Busquedas de profesor por universidad --> Controlador de profesor
router.get("/getall_univprofesor", auth,
ProfesorCtrl.getall_univprofesor
);
router.get("/getall_univprofesor_populate", auth,
ProfesorCtrl.populate_allprof_univ 
);
//Busquedas de contenido/plantillas por universidad --> Controlador de contenido
router.get("/getall_univplantillas",auth, 
ContenidoCtrl.getall_univplantilla
);
//Busquedas de classrooms por universidad --> Controlador de classroom
router.get("/getall_univclassrooms",auth, 
ClassroomCtrl.getall_univclassrooms
);

module.exports = router;