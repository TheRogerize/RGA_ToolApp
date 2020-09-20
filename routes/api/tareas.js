const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
let TareaCtrl = require("../../controllers/tareas.ctrl")
const { check } = require("express-validator/check");



router.post(
  "/create_tarea", 
  auth, 
  TareaCtrl.create_tarea
);
router.post(
  "/entregar_tarea", 
  auth, 
  TareaCtrl.entregar_tarea
);

router.get(
  "/getall_tarea", 
  TareaCtrl.getall_tarea
)

router.get(
  "/getall_user_tareas",
  auth,
  TareaCtrl.getall_user_tareas
)

router.get(
  "/getall_tarea_classroom/:roomid", 
  TareaCtrl.getall_tarea_classroom
)

router.get('/delete_tarea/:tareaid',
  TareaCtrl.delete_tarea
)

  router.get( "/getone_tarea/:tareaid",
  TareaCtrl.getone_tarea
);
router.post( "/update_tarea/:tareaid",
TareaCtrl.update_tarea
);
module.exports = router;