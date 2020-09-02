const mongoose = require("mongoose");

const UniversidadSchema = mongoose.Schema({
 	userID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
	},
  	historia: {
		type: String,
		required: true
	},
	nombre_univ:{
		type: String,
		required: true
	},
	mision:{
		type: String,
		required: true
	},
	vision:{
		type: String,
		required: true
	},
	metas:{
		type: String,
		required: true
	},
	facultad:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: "facultad"
	  }],


});

module.exports = mongoose.model("universidad", UniversidadSchema);
