const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
let ClassroomCtrl = require("../../controllers/classroom.ctrl")
const { check } = require("express-validator/check");
const classroomCtrl = require("../../controllers/classroom.ctrl");


router.post(
  "/add_classroom",
 /* [
    check("nombre_aula", "Please enter a valid email").isEmail(),
    check("seccion", "Please Enter a valid Name").not().isEmpty(),
    check("unidad", "Please Enter a valid LastName").not().isEmpty()
    
  ],*/
  auth,
  ClassroomCtrl.add_classroom
);

router.get(
  "/getall_classroom",
 /* [
    check("nombre_aula", "Please enter a valid email").isEmail(),
    check("seccion", "Please Enter a valid Name").not().isEmpty(),
    check("unidad", "Please Enter a valid LastName").not().isEmpty()
    
  ],*/
  ClassroomCtrl.getall_classroom
);
router.get(
  "/getOne_classroom/:classroomID",
 /* [
    check("nombre_aula", "Please enter a valid email").isEmail(),
    check("seccion", "Please Enter a valid Name").not().isEmpty(),
    check("unidad", "Please Enter a valid LastName").not().isEmpty()
    
  ],*/
  ClassroomCtrl.getOne_classroom
);

router.post(
  '/invitation_room',
  auth,
  ClassroomCtrl.invitation_room
)

router.get(
  '/get_estudiantes/:roomid', 
  ClassroomCtrl.get_estudiantes
)

router.get(
  '/pending_user_classroom/:roomid', 
  ClassroomCtrl.pending_user_classroom
)

router.get(
  '/accept_user/:roomid/:userid', 
  ClassroomCtrl.accept_user
)
router.get(
  '/decline_user/:roomid/:userid', 
  ClassroomCtrl.decline_user
)
router.get('/delete_classroom/:classid',
ClassroomCtrl.delete_classroom
)


router.post("/add_profesor_classroom",
 ClassroomCtrl.add_profesor_classroom);

router.get("/getChat/:roomid", ClassroomCtrl.getChat)

router.post("/add_msg", auth, ClassroomCtrl.add_msg)




router.post(
  "/add_archivo",
  [check("classroomID", "Por favor, adjunta un archivo").not().isEmpty()], ClassroomCtrl.add_archivo)
router.post("/delete_archivo", ClassroomCtrl.delete_archivo)
module.exports = router;