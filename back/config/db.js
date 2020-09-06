const mongoose = require("mongoose");
const MONGOURI = process.env.MONGO_DB_KEY;
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true
    });
    mongoose.set('useFindAndModify', false);
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};
//s
module.exports = InitiateMongoServer;
