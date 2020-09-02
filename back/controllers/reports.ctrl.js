
const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Universidad = require("../model/Universidad");
const Profesor = require("../model/Profesor");
const Coordinador = require("../model/Coordinador")
let Alumno = require("../model/Alumno") 
let User = require("../model/User")
let Classroom = require("../model/Classroom")
const path = require('path');
const fs = require("fs");
const nodemailer = require('nodemailer');
ejs = require('ejs');
let pdf = require("html-pdf");

 
module.exports = {
  students_list,
  coordinadores_list
}

async function students_list(req, res) {
      let classroom = await Classroom.findOne({_id: req.params.classroomID})
      let profesor = await Profesor.findById(classroom.profesorID).populate('userID', 'nombre apellido correo telefono');
      
      let alumnosID = classroom.alumnosID;
    let alumnos = await Alumno.find({"userID": { "$in": alumnosID } }).populate('userID', "nombre apellido correo telefono");
      ejs.renderFile(path.join(__dirname, './templates/pdfs/', "students.ejs"), {students: alumnos, classroom, profesor}, (err, data) => {
      if (err) {
            res.send(err);
      } else {
          let options = {
              "height": "11.25in",
              "width": "8.5in",
              "header": {
                  "height": "20mm"
              },
              "footer": {
                  "height": "20mm",
              },
          };
        const filename = "alumnos-" + new Date().toISOString().slice(0,10) + ".pdf";
        const reportePath = "./PDFreports/" + filename;
          pdf.create(data, options).toFile(reportePath, function (err, data) {
              if (err) {
                  res.send(err);
              } else {
                  res.download(reportePath);
              }
          });
      }
  });
}

async function coordinadores_list(req, res) {
  let universidad = await Universidad.findOne({userID: req.user.id}).populate('userID','correo telefono');
  let coordinadores = await Coordinador.find({universidadID: universidad._id})
  .populate('userID', 'nombre apellido correo telefono')
  .populate('facultadID')
  ejs.renderFile(path.join(__dirname, './templates/pdfs/', "coordinadores.ejs"), {coordinadores: coordinadores, universidad}, (err, data) => {
  if (err) {
        res.send(err);
  } else {
      let options = {
          "height": "11.25in",
          "width": "8.5in",
          "header": {
              "height": "20mm"
          },
          "footer": {
              "height": "20mm",
          },
      };
    const filename = "coordinadores-" + new Date().toISOString().slice(0,10) + ".pdf";
    const reportePath = "./PDFreports/" + filename;
      pdf.create(data, options).toFile(reportePath, function (err, data) {
          if (err) {
              res.send(err);
          } else {
              res.download(reportePath);
          }
      });
  }
});
}


