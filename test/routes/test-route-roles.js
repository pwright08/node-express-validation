/* global describe beforeEach it */
var supertest = require('supertest')
var express = require('express')
var route = require('../../routes/roles.js')

describe('roles', function () {
  var request

  beforeEach(function () {
    var app = express()
    app.set('views', './views')
    app.set('view engine', 'pug')

    route(app)

    request = supertest(app)
  })

  describe('GET /roles', function () {
    it('should respond with a 200', function (done) {
      request
        .get('/roles')
        .expect(200)
        .end(done())
    })
  })
})
