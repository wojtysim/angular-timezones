(function () {

  var toExtendedNative = function (wrapped) {
    /* Tricks the isDate method in Angular into treating these objects like it
     * would any other Date. May be horribly slow. */
    var native = new Date()
    for (key in wrapped) {
      native[key] = wrapped[key]
    }
    return native
  }

  var module = angular.module('Timezones', [])

  module.factory('$timezones', function ($injector) {
    var _tz = timezoneJS.timezone

    // _tz.loadingScheme = _tz.loadingSchemes.PRELOAD_ALL

    try {
      _tz.zoneFileBasePath = $injector.get('timezonesURL')
    } catch (e) {
      _tz.zoneFileBasePath = '/tz/data'
    }

    _tz.init({async : false})

    timezoneJS.fromLocalString = function (str, tz) {
      // https://github.com/csnover/js-iso8601/blob/master/iso8601.js – MIT license

      var minutesOffset = 0
      var struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{1,2}):(\d{1,2})(?::(\d{1,2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(str)
      var numericKeys = [ 1, 4, 5, 6, 7, 10, 11 ]
      // avoid NaN timestamps caused by “undefined” values being passed to Date.UTC
      for (var i = 0, k; (k = numericKeys[i]); ++i) {
        struct[k] = +struct[k] || 0
      }

      // allow undefined days and months
      struct[2] = (+struct[2] || 1) - 1
      struct[3] = +struct[3] || 1

      return toExtendedNative(new timezoneJS.Date(struct[1], struct[2], struct[3], struct[4], struct[5], struct[6], struct[7], tz))
    }

    return {
      Date : timezoneJS.Date
    }
  })

  module.filter('tzDate', function ($timezones) {
    return function (dt, tz) {
      return toExtendedNative(new $timezones.Date(dt, tz))
    }
  })

})(angular)