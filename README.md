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

I've added an additional route `users-explicit-validator` which instead of using the middleware it uses the validator explicitly in the route logic as a comparison.

## Conclusion

Attaching the validators for requests as middleware does reduce the amount of boilerplate code in the route slightly (requiring the validator and calling it), but it only moves this code into middleware function used to map validators to urls. This approach is also only clean if your application is extremely generically structured, with all POST/PUT routes using single validators with simple url paths, once it gets more complicated you need a more complicated mapper/logic to apply the validation.

Overall I don't like using app level middleware to apply logic which is only applicable to certain routes (POST/PUT requests) and affects the logic of the route itself. For maintenance and testing I think the route should control it's validation logic for any request data itself, this makes it clearer in the code what is happening.

I did like using ES6 Classes and inheritance, which will be very useful to prevent code repetition and make clean modules. Also Template literals are very good, having a build in string formating method will cover a common use case.

## Links

* https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Classes
* https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Template_literals