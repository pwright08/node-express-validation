var express = require('express')

module.exports = function (app) {
  var route = express.Router()

  app.use('/users', route)

  route.get('/', function (req, res) {
    res.render('users', { title: 'Users', data: {} })
  })

  route.post('/', function (req, res) {
    if (req.validationErrors) {
      res.render('users', { title: 'Users', data: req.body, errors: req.validationErrors })
    } else {
      res.render('users', { title: 'Users', data: {}, msg: 'User added!' })
    }
  })
}
