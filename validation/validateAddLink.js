const Validator = require("validator")
const isEmpty = require("./is-empty")

module.exports = function validateAddLink(data) {
  let errors = {}

  data.linkName = !isEmpty(data.linkName) ? data.linkName : ""
  data.text = !isEmpty(data.text) ? data.text : ""
  data.product = !isEmpty(data.product) ? data.product : ""
  data.promotions = !isEmpty(data.promotions) ? data.promotions : ""
  data.notes = !isEmpty(data.notes) ? data.notes : ""
  data.defaultUrl = !isEmpty(data.defaultUrl) ? data.defaultUrl : ""
  data.utmParameters = !isEmpty(data.utmParameters) ? data.utmParameters : ""

  if (Validator.isEmpty(data.linkName)) {
    errors.linkName = " linkName field is required"
  }
  if (Validator.isEmpty(data.product)) {
    errors.product = " product field is required"
  }
  if (Validator.isEmpty(data.promotions)) {
    errors.promotions = " promotions field is required"
  }
  if (Validator.isEmpty(data.notes)) {
    errors.notes = " notes field is required"
  }
  if (Validator.isEmpty(data.defaultUrl)) {
    errors.defaultUrl = " defaultUrl field is required"
  }
  if (Validator.isEmpty(data.utmParameters)) {
    errors.utmParameters = " utmParameters field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
