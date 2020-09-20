const mongoose = require("mongoose");

const AulaSchema = mongoose.Schema({
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
		ref: "alumno"
	}],
	carrera: {
		type: String,
		required: true
	},
  contenido:[{	
    nombre_unidad:{
      	type:String, 
      	required:true
    },
    temas: [{
      titulo:{
        type:String, 
        required:true
      },
      contenido:[{
        texto: String,
        file:{
            file_url: String,
            file_name: String
        }
      }]
    }]
	}],
	tareas:[{
		texto: String,
		file:{
				file_url: String,
				file_name: String
		}
	}],
	createdAt: {
    type: Date,
    default: Date.now()
  },
});

// export model aula  with AulaSchema
module.exports = mongoose.model("aula ", AulaSchema);
