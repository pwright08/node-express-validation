var FieldValidator = require('./field-validator')

// Example of a base validator class used to reduce repeating code for forms with similar sets of fields
class BaseValidatorName {
  validate (data) {
    var errors = []
    var name = data['name']

    FieldValidator(name, 'name', 'Name', errors)
      .isRequired()
      .isAlpha()

    return errors
  }
}

exports.default = BaseValidatorName
module.exports = exports['default']
