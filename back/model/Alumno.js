const mongoose = require("mongoose");

const AlumnoSchema = mongoose.Schema({
  userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
  },
  universidadID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "universidad"
  },
  aulasID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "classroom"
  }],
  carnet: {
    Type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model alumno with AlumnoSchema
module.exports = mongoose.model("alumno", AlumnoSchema);
