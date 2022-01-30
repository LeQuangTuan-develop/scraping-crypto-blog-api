const mongoose = require("mongoose");

// connect to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://wolfhybrid:Lqt.1605%40@cryptoblog.hpzy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectDB };
