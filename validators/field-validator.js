var npmValidator = require('validator')


// ES6 Class used to chain common validation calls together
// Using ES6 Template literals
class FieldValidator {
  constructor (data, fieldName, displayName, errors) {
    this.data = data
    this.fieldName = fieldName
    this.displayName = displayName
    this.errors = errors
  }

  isRequired () {
    if (!this.data) {
      this.errors.push({ 'name': this.fieldName, 'message': `You must enter a ${this.displayName}` })
    }
    return this
  }

  isAlpha () {
    if (!npmValidator.isAlpha(this.data)) {
      this.errors.push({ 'name': this.fieldName, 'message': `You must enter a valid ${this.displayName}` })
    }
    return this
  }

  isNumeric () {
    if (!npmValidator.isNumeric(this.data)) {
      this.errors.push({ 'name': this.fieldName, 'message': `${this.displayName} must be a valid number` })
    }
    return this
  }

  isGreaterThanZero () {
    var parsedIntData = parseInt(this.data)
    if (parsedIntData < 0) {
      this.errors.push({ 'name': this.fieldName, 'message': `${this.displayName} must be greater than zero` })
    }
    return this
  }

  isEmail () {
    if (!npmValidator.isEmail(this.data)) {
      this.errors.push({ 'name': this.fieldName, 'message': `${this.displayName} must be a valid email` })
    }
    return this
  }
}

exports.default = function (data, fieldName, displayName, errors) {
  return new FieldValidator(data, fieldName, displayName, errors)
}
module.exports = exports['default']
