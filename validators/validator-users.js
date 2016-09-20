var BaseValidatorName = require('./base-validator-name')
var FieldValidator = require('./field-validator')

class ValidatorUsers extends BaseValidatorName {
  validate (data) {
    var errors = super.validate(data)

    var age = data['age']
    var email = data['email']

    FieldValidator(age, 'age', 'Age', errors)
      .isNumeric()
      .isGreaterThanZero()

    FieldValidator(email, 'email', 'Email', errors)
      .isRequired()
      .isEmail()

    return errors.length > 0 ? errors : false
  }
}

exports.default = function (data) {
  return new ValidatorUsers().validate(data)
}
module.exports = exports['default']
