var express = require('express')

module.exports = function (app) {
  var route = express.Router()

  app.use('/users', route)

  route.get('/', function (req, res) {
    res.render('users', { title: 'Users' })
  })

  route.post('/', function (req, res) {
    res.render('users', { msg: 'User added!' })
  })
}
