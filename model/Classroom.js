const mongoose = require("mongoose");

const ClassroomSchema = mongoose.Schema({
  universidadID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "universidad"
	},
	profesorID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "profesor"
	},
	alumnosID:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
  }],
  invitation:[{  
		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
  }],
  nombre_aula: {
    type: String,
    required: true
  },
  seccion: {
		type: String,
		required: true
	},
  unidad: [{
    titulo_unidad:{
      type:String, 
      required:true
    },
    descripcion:{
      type:String, 
      required:true
    },
    tema: [{
        titulo_tema:{
          type:String
        },
        contenido:[{
          //type: String,
            documento_url:{
            type: String
            },
            documento_nombre:{
              type: String
            }
        }]
    }]
  }],
	createdAt: {
    type: Date,
    default: Date.now()
  },

  class_chat:[{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
    },
    msg: String,
    date: Date
  }]
});

// export model classroom  with AulaSchema
module.exports = mongoose.model("classroom", ClassroomSchema);

let Contenido = {
  Unidad:[{
    titulo_unidad: "Integrales",
    descripción: "En esta unidad se vera como se resuelve integrales sencillos y complejas",
    tema:[
      {
        titulo: "Integrales Sencillas"
      },
      {
        titulo: "Integrales complejas"
      }
    ] 
  }]
}

