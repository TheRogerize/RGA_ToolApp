const mongoose = require("mongoose");

const CoordinadorSchema = mongoose.Schema({
  userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user"
  },
  cargo: {
    type: String,
    required: true
  },
  universidadID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "universidad"
  },
  carnet: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  facultadID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "facultad"
  }
});

// export model coordinador with CoordinadorSchema
module.exports = mongoose.model("coordinador", CoordinadorSchema);
