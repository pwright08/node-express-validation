/* global describe beforeEach it */
var proxyquire = require('proxyquire')
var sinon = require('sinon')
var expect = require('chai').expect
var fieldValidator = require('../../validators/field-validator')

describe('validator-roles', function () {
  var baseValidatorName
  var validatorRoles
  var mockFieldValidatorFactory
  var fieldValidators
  var data = {
    'name': 'joe',
    'type': 'admin'
  }

  beforeEach(function () {
    fieldValidators = {}
    mockFieldValidatorFactory = function (data, fieldName, displayName, errors) {
      var fieldValidatorSpied = fieldValidator(data, fieldName, displayName, errors)

      fieldValidatorSpied.spyIsRequired = sinon.spy(fieldValidatorSpied, 'isRequired')
      fieldValidatorSpied.spyIsAlpha = sinon.spy(fieldValidatorSpied, 'isAlpha')

      fieldValidators[fieldName] = fieldValidatorSpied

      return fieldValidatorSpied
    }
    baseValidatorName = proxyquire('../../validators/base-validator-name.js', {
      './field-validator': mockFieldValidatorFactory
    })
    validatorRoles = proxyquire('../../validators/validator-roles.js', {
      './base-validator-name': baseValidatorName,
      './field-validator': mockFieldValidatorFactory
    })
  })

  it('should validate role', function (done) {
    var result = validatorRoles(data)
    expect(result).to.be.false

    expect(fieldValidators['name']).to.exist
    sinon.assert.calledOnce(fieldValidators['name'].spyIsRequired)
    sinon.assert.calledOnce(fieldValidators['name'].spyIsAlpha)

    expect(fieldValidators['type']).to.exist
    sinon.assert.calledOnce(fieldValidators['type'].spyIsRequired)
    sinon.assert.calledOnce(fieldValidators['type'].spyIsAlpha)

    done()
  })
})
