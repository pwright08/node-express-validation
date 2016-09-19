/* global describe beforeEach it */
var supertest = require('supertest')
var express = require('express')
var route = require('../../routes/users.js')

describe('users', function () {
  var request

  beforeEach(function () {
    var app = express()
    app.set('views', './views')
    app.set('view engine', 'pug')

    route(app)

    request = supertest(app)
  })

  describe('GET /users', function () {
    it('should respond with a 200', function (done) {
      request
        .get('/users')
        .expect(200)
        .end(done())
    })
  })
})
