const mongoose = require("mongoose")
const Schema = mongoose.Schema
const LinkSchema = new mongoose.Schema({
  linkName: {
    type: String,
    default: ""
  },
  product: {
    type: String,
    default: ""
  },
  promotions: {
    type: String,
    default: ""
  },
  notes: {
    type: String,
    default: ""
  },
  defaultUrl: {
    type: String,
    default: ""
  },
  utmParameters: {
    type: String,
    default: ""
  }
})
const UserSchema = new Schema({
  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  links: [LinkSchema],
  isDeleted: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model("users", UserSchema)
