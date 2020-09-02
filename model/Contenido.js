const mongoose = require("mongoose");

const ContenidoSchema = mongoose.Schema({
  creado_para: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "universidad"
	},
	nombre_plantilla: {type: String, required: true},
  unidad:[{	
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
				type:String, 
			},
		}]
  }]
});

module.exports = mongoose.model("contenido", ContenidoSchema);
