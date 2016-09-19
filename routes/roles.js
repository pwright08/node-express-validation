var express = require('express')

module.exports = function (app) {
  var route = express.Router()

  app.use('/roles', route)

  route.get('/', function (req, res) {
    res.render('roles', { title: 'Roles' })
  })

  route.post('/', function (req, res) {
    res.render('roles', { msg: 'Role added!' })
  })
}
