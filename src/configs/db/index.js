const mongoose = require("mongoose")
const mongooseAutoPopulate = require("mongoose-autopopulate")
const mongooseLeanVirtuals = require("mongoose-lean-virtuals")
const mongooseLeanGetters = require("mongoose-lean-getters")
const mongooseLeanDefaults = require("mongoose-lean-defaults").default
const slug = require("mongoose-slug-generator")

// add plugin
mongoose.plugin(mongooseAutoPopulate)
mongoose.plugin(mongooseLeanVirtuals)
mongoose.plugin(mongooseLeanGetters)
mongoose.plugin(mongooseLeanDefaults)
mongoose.plugin(slug)

// connect to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cryptoblog.hpzy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )

    console.log("MongoDB connected")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = { connectDB }
