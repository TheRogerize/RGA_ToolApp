const mongoose = require("mongoose");

const TareasSchema = mongoose.Schema({
  universidadID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "universidad"
  },
  classroomID: {
   type: mongoose.Schema.Types.ObjectId,
  ref: "classroom"
  },
  titulo_tarea: {
      type: String,
      required: true
  },
  descripcion:{
      type: String,
      required: true
  },
  createdAt: {
      type: Date,
      default: Date.now()
    },
    fecha_entrega: {
      type: Date
    },
    documento:{
      documento_url: String,
      documento_nombre: String
    },
    entregados: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
      },
      documento_url: String,
      documento_nombre: String
    }]
  })


// export model user with UserSchema
module.exports = mongoose.model("tareas", TareasSchema);