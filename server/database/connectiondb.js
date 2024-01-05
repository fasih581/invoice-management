const mongoose = require("mongoose");
mongoose.set("strictQuery", false);


const connectmongo = async () => {
    try {
      // mongoDB connection string
      const con = await mongoose.connect(process.env.MONGODB_URL);
  
      console.log(`MongoDb connected : ${con.connection.host}`);
    } catch (err) { 
      console.log(err);
      process.exit(1);
    }
  };
  
  module.exports = connectmongo; 