const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  nombre: {
    type: String,
    default: 'default',
    required: true
  },
  apellido: {
    type: String,
    default: 'default',
    required: true
  },
  telefono: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true
  },
  clave: {
    type: String,
    required: true
  },
  permiso: {  // 0 admin - 1 Universidad - 2 Coordinador - 3 Profesor - 4 Estudiante
    type: Number,
    required : true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  sockets: [String],
  resettoken: String,

});

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
