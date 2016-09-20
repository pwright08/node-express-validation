/* global describe beforeEach it */
var supertest = require('supertest')
var proxyquire = require('proxyquire')
var express = require('express')
var bodyParser = require('body-parser')

describe('users-explicit-validator', function () {
  var request
  var validationErrors

  beforeEach(function () {
    validationErrors = false
    // Minor difference when testing with explicit is need to mock validator
    var route = proxyquire('../../routes/users-explicit-validator.js', {
      '../validators/validator-users': function (data) { return validationErrors }
    })

    var app = express()
    app.set('views', './views')
    app.set('view engine', 'pug')

    app.use(bodyParser.urlencoded({ extended: false }))

    route(app)

    request = supertest(app)
  })

  describe('GET /users-explicit-validator', function () {
    it('should respond with a 200', function (done) {
      request
        .get('/users-explicit-validator')
        .expect(200, done)
    })
  })

  describe('POST /users-explicit-validator', function () {
    it('should respond with a 200 when no validation errors', function (done) {
      request
        .post('/users-explicit-validator')
        .send({name: 'Joe'})
        .expect(200, done)
    })

    it('should respond with a 400 when there are validation errors', function (done) {
      validationErrors = [{name: 'some-field', message: 'some error'}]
      request
        .post('/users-explicit-validator')
        .send({name: 'Joe'})
        .expect(400)
        .end(function (err, res) {
          if (err) return done(err)
          done()
        })
    })
  })
})
