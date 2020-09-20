const mongoose = require("mongoose");

const FacultadSchema = mongoose.Schema({
		nombre: {
			type: String,
			required: true
		},
		carreras:[{
			type: String,
			required: true
		}],
    universidadID:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "universidad"
    }
});

module.exports = mongoose.model("facultad", FacultadSchema);
