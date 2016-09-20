var FieldValidator = require('./field-validator')

module.exports = function (data) {
  console.log('validating using validator-roles!')

  var errors = []

  var name = data['name']
  var type = data['type']

  FieldValidator(name, 'name', 'Name', errors)
    .isRequired()
    .isAlpha()

  FieldValidator(type, 'type', 'Type', errors)
    .isRequired()
    .isAlpha()

  return errors.length > 0 ? errors : false
}
