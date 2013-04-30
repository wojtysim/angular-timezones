(function (angular, timezoneJS) {

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

    try {
      _tz.zoneFileBasePath = $injector.get('timezonesURL')
    } catch (e) {
      _tz.zoneFileBasePath = '/tz/data'
    }

    _tz.init({ async : false })

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

      Date : timezoneJS.Date,

      /**
       * Generate an object that defines the timezone.
       *
       * @param timezone
       * An Olson name (e.g., America/New_York) to resolve.
       *
       * @param reference
       * An optional Date used as a reference point (as some properties, like
       * the abbreviation, vary at various times of the year). The current
       * date will be used if not provided.
       *
       * @returns {{name: string, abbreviation: string, offset: number, region: string, locality: string}}
       */
      resolve : function (timezone, reference) {
        /* This is not terribly efficient, but necessary beacuse some timezone
         * specifics (like the abbreviation and offset) are temporal. */
        reference = new timezoneJS.Date(reference || Date.now(), timezone)

        var name = reference.getTimezone()

        var result = {
          name : name,
          abbreviation : reference.getTimezoneAbbreviation(),
          offset : -reference.getTimezoneOffset(),
          region : name.split('/')[0],
          locality : name.split('/')[1].replace('_', ' ')
        }

        return result
      }

    }
  })

  module.filter('tzDate', function ($timezones) {
    return function (dt, tz) {
      return toExtendedNative(new $timezones.Date(dt, tz))
    }
  })

})(angular, timezoneJS)