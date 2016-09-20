var validators = {
  '/users': require('./validator-users'),
  '/roles': require('./validator-roles')
}

// Used in Express middleware to select the correct validator module to validate a
// request and set 'validationErrors' against the request
module.exports = function (request) {
  var validator = null

  if (request.method !== 'POST') {
    validator = null
  } else if (validators[request.url]) {
    // match validator using simple map
    // this approach will only work with basic routes, otherwise will need a more complex matching method
    validator = validators[request.url]
  }

  request.validationErrors = validator ? validator(request.body) : false
}
