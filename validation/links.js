const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function(data) {
  let message = {}

  data.linkName = !isEmpty(data.linkName) ? data.linkName : ""
  data.product = !isEmpty(data.product) ? data.product : ""
  data.promotions = !isEmpty(data.promotions) ? data.promotions : ""
  data.notes = !isEmpty(data.notes) ? data.notes : ""
  data.defaultUrl = !isEmpty(data.defaultUrl) ? data.defaultUrl : ""
  data.utmParameters = !isEmpty(data.utmParameters) ? data.utmParameters : ""

  if (Validator.isEmpty(data.linkName)) {
    message.linkName = "linkName field is required"
  }
  if (Validator.isEmpty(data.product)) {
    message.product = "product field is required"
  }
  if (Validator.isEmpty(data.promotions)) {
    message.promotions = "promotions field is required"
  }
  if (Validator.isEmpty(data.notes)) {
    message.notes = "notes field is required"
  }
  if (Validator.isEmpty(data.defaultUrl)) {
    message.defaultUrl = "defaultUrl field is required"
  }
  if (Validator.isEmpty(data.utmParameters)) {
    message.utmParameters = "utmParameters field is required"
  }

  return {
    message,
    isValid: isEmpty(message)
  }
}
