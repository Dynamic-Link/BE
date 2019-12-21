const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateRegister(data) {
  let message = {}
  data.firstName = !isEmpty(data.firstName) ? data.firstName : ""
  data.lastName = !isEmpty(data.lastName) ? data.lastName : ""
  data.email = !isEmpty(data.email) ? data.email : ""
  data.password = !isEmpty(data.password) ? data.password : ""

  if (Validator.isEmpty(data.firstName)) {
    message.firstName = "firstName field is required"
  }
  if (Validator.isEmpty(data.lastName)) {
    message.lastName = "lastName field is required"
  }
  if (Validator.isEmpty(data.email)) {
    message.email = "Email field is required"
  }
  if (Validator.isEmpty(data.password)) {
    message.password = "Password field is required"
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    message.password = "Password must be at least 6 characters"
  }

  return {
    message,
    isValid: isEmpty(message)
  }
}
