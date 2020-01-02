const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function(data) {
  let message = {}

  data.email = !isEmpty(data.email) ? data.email : ""
  data.password = !isEmpty(data.password) ? data.password : ""

  if (Validator.isEmpty(data.email)) {
    message.email = "Email field is required"
  }
  if (Validator.isEmpty(data.password)) {
    message.password = "Password field is required"
  }
  return {
    message,
    isValid: isEmpty(message)
  }
}
