var validatorUsers = require('./validator-users')
var validatorRoles = require('./validator-roles')

// Used in Express middleware to select the correct validator module to validate a
// request and set 'validationErrors' against the request
module.exports = function (request) {
  var validator = null

  if (request.method !== 'POST') {
    validator = null
  } else if (request.url === '/users') {
    validator = validatorUsers
  } else if (request.url === '/roles') {
    validator = validatorRoles
  }

  request.validationErrors = validator ? validator(request.body) : false
}
