var express = require('express')
var validatorUsers = require('../validators/validator-users')

module.exports = function (app) {
  var route = express.Router()

  app.use('/users-explicit-validator', route)

  route.get('/', function (req, res) {
    res.render('users', { title: 'Users', data: {} })
  })

  route.post('/', function (req, res) {
    // Explicitly state validator to use rather than use middleware mapping
    var errors = validatorUsers(req.body)
    if (errors) {
      res.status(400).render('users', { title: 'Users', data: req.body, errors: errors })
    } else {
      res.render('users', { title: 'Users', data: {}, msg: 'User added!' })
    }
  })
}
