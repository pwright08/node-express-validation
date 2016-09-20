/* global describe beforeEach it */
var proxyquire = require('proxyquire')
var sinon = require('sinon')
var expect = require('chai').expect
var fieldValidator = require('../../validators/field-validator')

describe('validator-users', function () {
  var baseValidatorName
  var validatorUsers
  var mockFieldValidatorFactory
  var fieldValidators
  var data = {
    'name': 'joe',
    'age': '20',
    'email': 'a@b.com'
  }

  beforeEach(function () {
    fieldValidators = {}
    mockFieldValidatorFactory = function (data, fieldName, displayName, errors) {
      var fieldValidatorSpied = fieldValidator(data, fieldName, displayName, errors)

      fieldValidatorSpied.spyIsRequired = sinon.spy(fieldValidatorSpied, 'isRequired')
      fieldValidatorSpied.spyIsAlpha = sinon.spy(fieldValidatorSpied, 'isAlpha')
      fieldValidatorSpied.spyIsNumeric = sinon.spy(fieldValidatorSpied, 'isNumeric')
      fieldValidatorSpied.spyIsGreaterThanZero = sinon.spy(fieldValidatorSpied, 'isGreaterThanZero')
      fieldValidatorSpied.spyIsEmail = sinon.spy(fieldValidatorSpied, 'isEmail')

      fieldValidators[fieldName] = fieldValidatorSpied

      return fieldValidatorSpied
    }
    baseValidatorName = proxyquire('../../validators/base-validator-name.js', {
      './field-validator': mockFieldValidatorFactory
    })
    validatorUsers = proxyquire('../../validators/validator-users.js', {
      './base-validator-name': baseValidatorName,
      './field-validator': mockFieldValidatorFactory
    })
  })

  it('should validate user', function (done) {
    var result = validatorUsers(data)
    expect(result).to.be.false

    expect(fieldValidators['name']).to.exist
    sinon.assert.calledOnce(fieldValidators['name'].spyIsRequired)
    sinon.assert.calledOnce(fieldValidators['name'].spyIsAlpha)

    expect(fieldValidators['age']).to.exist
    sinon.assert.calledOnce(fieldValidators['age'].spyIsNumeric)
    sinon.assert.calledOnce(fieldValidators['age'].spyIsGreaterThanZero)

    expect(fieldValidators['email']).to.exist
    sinon.assert.calledOnce(fieldValidators['email'].spyIsRequired)
    sinon.assert.calledOnce(fieldValidators['email'].spyIsEmail)

    done()
  })
})
