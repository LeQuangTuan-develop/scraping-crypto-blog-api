const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
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
    info: {
      author: {
        type: String,
      },
      publish_date: {
        type: Date,
        default: new Date(),
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Blog", BlogSchema);
