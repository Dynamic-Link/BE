const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InstaDataSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  thumbnailUrl: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2017/03/27/13/06/man-2178598__340.jpg"
  },
  imageUrl: {
    type: String,
    default:
      "https://cdn.pixabay.com/photo/2017/03/28/12/16/tables-2181979__340.jpg"
  },
  likes: {
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  comments: {
    type: Array,
    default: [
      {
        username: { type: String },
        text: { type: String },
        commentId: { type: String },
        updatedAt: { type: Date },
        createdAt: { type: Date }
      }
    ]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("instadata", InstaDataSchema);
