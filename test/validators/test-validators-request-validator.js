/* global describe beforeEach it */
var proxyquire = require('proxyquire')
var expect = require('chai').expect

describe('request-validator', function () {
  var requestValidator
  var validatorUsersResult = 'validatorUsersResult'
  var validatorRolesResult = 'validatorRolesResult'

  beforeEach(function () {
    requestValidator = proxyquire('../../validators/request-validator.js', {
      './validator-users': function (data) { return validatorUsersResult },
      './validator-roles': function (data) { return validatorRolesResult }
    })
  })

  describe('should set request.validationErrors', function () {
    it('to false for non POST requests', function (done) {
      var request = { url: '/not-a-post', method: 'GET' }
      requestValidator(request)
      expect(request.validationErrors).to.be.false
      done()
    })

    it('to false for url without validator', function (done) {
      var request = { url: '/no-validator', method: 'POST' }
      requestValidator(request)
      expect(request.validationErrors).to.be.false
      done()
    })

    it('to result of validatorUsers for /users', function (done) {
      var request = { url: '/users', method: 'POST' }
      requestValidator(request)
      expect(request.validationErrors).to.equal(validatorUsersResult)
      done()
    })

    it('to result of validatorRoles for /roles', function (done) {
      var request = { url: '/roles', method: 'POST' }
      requestValidator(request)
      expect(request.validationErrors).to.equal(validatorRolesResult)
      done()
    })
  })
})
