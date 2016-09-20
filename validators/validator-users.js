var FieldValidator = require('./field-validator')

module.exports = function (data) {
  console.log('validating using validator-users!')

  var errors = []

  var name = data['name']
  var age = data['age']
  var email = data['email']

  FieldValidator(name, 'name', 'Name', errors)
    .isRequired()
    .isAlpha()

  FieldValidator(age, 'age', 'Age', errors)
    .isNumeric()
    .isGreaterThanZero()

  FieldValidator(email, 'email', 'Email', errors)
    .isRequired()
    .isEmail()

  return errors.length > 0 ? errors : false
}
