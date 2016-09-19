# Node Express validation

[![BuildStatus](https://travis-ci.org/stevenalexander/node-express-validation.svg?branch=master)](https://travis-ci.org/stevenalexander/node-express-validation?branch=master)

Simple node app using middleware to apply validation to requests independently of route logic.

## Run

```
npm install
npm test
npm start # runs on http://localhost:3000
```

## Notes

Modules are structured to use Express middleware to apply validation to specific POST actions independently of the route logic. This means the route classes don't need to know anything about the specific validator module, just check the `request.validationErrors` property.
