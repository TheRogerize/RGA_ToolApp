const mongoose = require("mongoose");

const CredencialesSchema = mongoose.Schema({
 
  universidadID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "universidad"
  },
  ProfesorID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "profesor"
  }],
  CoordinadorID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "coordinador"
  }],
  AlumnoID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "alumno"
  }]
});

// export model Credenciales with CredencialesSchema
module.exports = mongoose.model("credenciales", CredencialesSchema);
