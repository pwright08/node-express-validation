var express = require('express')

module.exports = function (app) {
  var route = express.Router()

  app.use('/roles', route)

  route.get('/', function (req, res) {
    res.render('roles', { title: 'Roles', data: {} })
  })

  route.post('/', function (req, res) {
    if (req.validationErrors) {
      res.status(400).render('roles', { title: 'Roles', data: req.body, errors: req.validationErrors })
    } else {
      res.render('roles', { title: 'Roles', data: {}, msg: 'Role added!' })
    }
  })
}
