/* global describe beforeEach it */
var supertest = require('supertest')
var express = require('express')
var bodyParser = require('body-parser')
var route = require('../../routes/roles.js')

describe('roles', function () {
  var request
  var validationErrors = false

  beforeEach(function () {
    var app = express()
    app.set('views', './views')
    app.set('view engine', 'pug')

    app.use(bodyParser.urlencoded({ extended: false }))

    app.use(function (req, res, next) {
      req.validationErrors = validationErrors
      next()
    })

    route(app)

    request = supertest(app)
  })

  describe('GET /roles', function () {
    it('should respond with a 200', function (done) {
      request
        .get('/roles')
        .expect(200, done)
    })
  })

  describe('POST /roles', function () {
    it('should respond with a 200 when no validation errors', function (done) {
      request
        .post('/roles')
        .send({name: 'Joe'})
        .expect(200, done)
    })

    it('should respond with a 400 when there are validation errors', function (done) {
      validationErrors = [{name: 'some-field', message: 'some error'}]
      request
        .post('/roles')
        .send({name: 'Joe'})
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err)
          done()
        })
    })
  })
})
