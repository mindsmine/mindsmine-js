# mindsmine-js #

[![Build Status](https://circleci.com/gh/mindsmine/mindsmine-js.svg?style=shield)](https://circleci.com/gh/mindsmine/mindsmine-js)

[![Build Status](https://travis-ci.com/mindsmine/mindsmine-js.svg?branch=main)](https://app.travis-ci.com/github/mindsmine/mindsmine-js)

JavaScript already provides a lot of functions, yet every so often there's a need for some additional functions.
**mindsmine JS** makes an attempt at providing utility functions such as String manipulation, Object wrappers, amongst
others.

---

### Releases ###

**4.5.3**
* Deprecated `mindsmine.Ajax` class. Support will be removed in the next major release
* Updated internal mechanism of URL methods

**4.5.2**
* Node 17+ supported

**4.5.1**
* Removed `ink-docstrap` dependency
* Node 16+ supported

**4.5.0**
* Added Duration support methods
* Added date check

**4.0.4**
* Node 15+ supported

**4.0.3**
* Removed `babel` dependency
* Node 14+ supported

**4.0.0**
* Added DOM support methods
* Removed deprecated functions
* Node 13+ supported

**3.6.5**
* Added polyfill for `String#padEnd`, and `String#padStart`
* Updated polyfill for `String#endsWith`, `String#startsWith`, and `String#repeat`
* Updated test code
* Node 12+ supported
* Replaced `uglify` dependency with `terser`

**3.5.5**
* Updated code
* Babel 7+ supported
* Node 11+ supported

**3.5.0**
* Added URL support methods
* Updated the tests code
* Node 10+ supported

**3.1.0**
* Added numeral system methods
* Added perfect square test method
* Node 9+ supported

**3.0.0**
* Refactored `mindsmine.Ajax.request` to support Promises
* Added tests for `mindsmine.Ajax` functions
* Added object emptiness check
* Added function check
* Added lint support
* Node 8+ supported
* Removed `gulp` dependency

**2.1.0**
* Added number of digits counting method
* Added unique random numbers generator method
* Added palindrome test, with leniency support
* Added string equality test, with leniency support
* Added number check
* Added polyfill for `Array.from`
* Added polyfill for `String#endsWith`, `String#startsWith`, `String#includes`, and `String#repeat`
* Updated polyfill for `String#trim`

**2.0.0**
* Added support for modules
* Added test and transpile framework(s)
* Updated to a NodeJS based documentation framework
* Both Node and Browser compatible
* Node 6+ supported
* ECMAScript 2015 compliant

**1.0**
* Wrappers to primitive datatypes
* Functionality most often used
* Browser version alone
* ECMAScript 5.1 compliant
