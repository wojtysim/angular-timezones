# Timezones for AngularJS [![Build Status](https://secure.travis-ci.org/michaelahlers/angular-timezone-js.png)](http://travis-ci.org/michaelahlers/angular-timezone-js)

[AngularJS](http://angularjs.com/) features for [TimezoneJS](https://github.com/mde/timezone-js)-enhanced JavaScript `Date` objects.

## Inclusion

### Bower

[Bower](https://github.com/bower/bower) users can add the following to their package dependencies. Be sure to see [_tags_](https://github.com/michaelahlers/angular-timezone-js/tags) for a list of available versions.

```json
{
  "dependencies" : {
    "angular-timezones" : "git@github.com:michaelahlers/angular-timezones.git"
  }
}
```

## Usage

After including `angular-timezones.js`, add this package to your application.

```javascript
angular.module('your-application', ['Timezones'])
```

## Developers

_TimezoneJS for Angular_ is tested with [Karma](http://karma-runner.github.io/) and [PhantomJS](http://phantomjs.org/) against the latest available release of [jQuery](http://jquery.com/) (2.0.0) and [AngularJS](http://angularjs.com/) (1.1.4).

With [NPM](http://npmjs.com/) installed, you can test your modifications with the following.

```
$ npm install
$ npm test
```

## Acknowledgements

This project was originally forked from [`angular-timezone-js`](https://github.com/LeZuse/angular-timezone-js) by [Tomas Ruzicka](https://github.com/LeZuse).

[Timezone data provided by IANA](http://iana.org/time-zones) (extracted from [tzdata2013c.tar.gz](http://www.iana.org/time-zones/repository/releases/tzdata2013c.tar.gz)).
