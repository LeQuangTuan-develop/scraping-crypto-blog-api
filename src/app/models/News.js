const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NewsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

module.exports = mongoose.model("News", NewsSchema)
