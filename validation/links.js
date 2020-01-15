const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function(data) {
  let message = {}

  data.linkName = !isEmpty(data.linkName) ? data.linkName : ""
  data.product = !isEmpty(data.product) ? data.product : ""
  data.defaultUrl = !isEmpty(data.defaultUrl) ? data.defaultUrl : ""

  if (Validator.isEmpty(data.linkName)) {
    message.linkName = "linkName field is required"
  }
  if (Validator.isEmpty(data.product)) {
    message.product = "product field is required"
  }
 
  if (Validator.isEmpty(data.defaultUrl)) {
    message.defaultUrl = "defaultUrl field is required"
  }
 

  return {
    message,
    isValid: isEmpty(message)
  }
}
