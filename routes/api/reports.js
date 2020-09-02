const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
let reportsCtrl = require("../../controllers/reports.ctrl")
const { check } = require("express-validator/check");


router.get(
  "/students_list/:classroomID",
  reportsCtrl.students_list
);

router.get(
  "/coordinadores_list",
  auth,
  reportsCtrl.coordinadores_list
);
module.exports = router;
