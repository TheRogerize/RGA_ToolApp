const mongoose = require("mongoose");

const ProfesorSchema = mongoose.Schema({
  userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
  },
  Personal: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "credenciales"
	  },
  cargo: {
    type: String,
    required: true
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
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// export model profesor with ProfesorSchema
module.exports = mongoose.model("profesor", ProfesorSchema);
