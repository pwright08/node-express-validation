var BaseValidatorName = require('./base-validator-name')
var FieldValidator = require('./field-validator')

class ValidatorRoles extends BaseValidatorName {
  validate (data) {
    var errors = super.validate(data)

    var type = data['type']

    FieldValidator(type, 'type', 'Type', errors)
      .isRequired()
      .isAlpha()

    return errors.length > 0 ? errors : false
  }
}

exports.default = function (data) {
  return new ValidatorRoles().validate(data)
}
module.exports = exports['default']
