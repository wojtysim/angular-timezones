'use strict'

describe('tzAlign', function () {
  var scope, $filter, $compile, $timeout, $sandbox

  beforeEach(module('Timezones', function ($provide) {
    $provide.constant('$timezones.definitions.location', 'base/tz/data')
  }))

  beforeEach(inject(function ($injector, $rootScope, _$filter_, _$compile_, _$timeout_, $rootElement) {
    scope = $rootScope.$new(true)
    $filter = _$filter_
    $compile = _$compile_
    $timeout = _$timeout_

    $sandbox = $rootElement.append(angular.element('<div id="sandbox"></div>'))
  }))

  var compile = function (markup, timezone, reference) {
    angular.extend(scope, {
      timezone : timezone,
      reference : reference
    })

    var $element = $(markup).appendTo($sandbox)

    $element = $compile($element)(scope)
    scope.$digest()

    return $element
  }

  afterEach(function () {
    $sandbox.remove()
    scope.$destroy()
  })

  var scenarios = [
    {
      timezone : 'America/New_York',
      reference : new Date(Date.parse('1970-01-01T00:00:00+00:00')),
      markup : '<span>{{reference|tzAlign:timezone|date:"yyyy-MM-dd HH:mm:ss Z"}}</span>',
      expected : {
        fullYear : 1969,
        month : 11,
        date : 31,
        hours : 19,
        text : '1969-12-31 19:00:00 -0500'
      }
    },
    {
      timezone : 'America/Los_Angeles',
      reference : new Date(Date.parse('1970-01-01T00:00:00+00:00')),
      markup : '<span>{{reference|tzAlign:timezone|date:"yyyy-MM-dd HH:mm:ss Z"}}</span>',
      expected : {
        fullYear : 1969,
        month : 11,
        date : 31,
        hours : 16,
        text : '1969-12-31 16:00:00 -0800'
      }
    },
    {
      timezone : 'Europe/Berlin',
      reference : new Date(Date.parse('1970-01-01T00:00:00+00:00')),
      markup : '<span>{{reference|tzAlign:timezone|date:"yyyy-MM-dd HH:mm:ss Z"}}</span>',
      expected : {
        fullYear : 1970,
        month : 0,
        date : 1,
        hours : 1,
        text : '1970-01-01 01:00:00 +0100'
      }
    },
    {
      timezone : 'Australia/Sydney',
      reference : new Date(Date.parse('1970-01-01T00:00:00+00:00')),
      markup : '<span>{{reference|tzAlign:timezone|date:"yyyy-MM-dd HH:mm:ss Z"}}</span>',
      expected : {
        fullYear : 1970,
        month : 0,
        date : 1,
        hours : 10,
        text : '1970-01-01 10:00:00 +1000'
      }
    }
  ]

  it('should align dates to expected timezones', function () {
    scenarios.forEach(function (scenario) {
      var timezone = scenario.timezone
        , reference = scenario.reference
        , expected = scenario.expected

      var actual = $filter('tzAlign')(reference, timezone)

      expect(actual.getTimezone()).toEqual(timezone)
      expect(actual.getFullYear()).toEqual(expected.fullYear)
      expect(actual.getMonth()).toEqual(expected.month)
      expect(actual.getDate()).toEqual(expected.date)
      expect(actual.getHours()).toEqual(expected.hours)
    })
  })

  it('should pass the date through unchanged when timezone is undefined', function () {
    scenarios.forEach(function (scenario) {
      var reference = scenario.reference
        , expected = scenario.reference
        , actual

      expect(function () {
        actual = $filter('tzAlign')(reference, undefined)
      }).not.toThrow()

      expect(actual).toBe(expected)
    })
  })

  it('should pass through invalid date values', function () {
    var expected = 'bogus value'
      , actual

    expect(function () {
      actual = $filter('tzAlign')(expected, 'America/New_York')
    }).not.toThrow()

    expect(actual).toBe(expected)
  })

  it('should pass through null date values', function () {
    var actual

    expect(function () {
      actual = $filter('tzAlign')(null, 'America/New_York')
    }).not.toThrow()

    expect(actual).toBeNull()
  })

  it('should pass through undefined date values', function () {
    var actual

    expect(function () {
      actual = $filter('tzAlign')(undefined, 'America/New_York')
    }).not.toThrow()

    expect(actual).toBeUndefined()
  })

  it('should pass through boolean date values', function () {
    var actual

    expect(function () {
      actual = $filter('tzAlign')(true, 'America/New_York')
    }).not.toThrow()

    expect(actual).toBe(true)
  })

  it('should pass through dates when timezone is null', function () {
    var expected = new Date(1970, 1, 1)
      , actual = $filter('tzAlign')(expected, null)

    expect(actual).toEqual(expected)
  })

  it('should pass through dates when timezone is undefined', function () {
    var expected = new Date(1970, 1, 1)
      , actual = $filter('tzAlign')(expected, undefined)

    expect(actual).toEqual(expected)
  })

  it('should pass through dates when timezone is an object', function () {
    var expected = new Date(1970, 1, 1)
      , actual = $filter('tzAlign')(expected, {})

    expect(actual).toEqual(expected)
  })

  it('should pass through dates when timezone is a number', function () {
    var expected = new Date(1970, 1, 1)
      , actual = $filter('tzAlign')(expected, 1234)

    expect(actual).toEqual(expected)
  })

  it('should pass through dates when timezone is an invalid string', function () {
    var expected = new Date(1970, 1, 1)
      , actual = $filter('tzAlign')(expected, 'bogus')

    expect(actual).toEqual(expected)
  })

  it('should align date objects that are formatted correctly', function () {
    scenarios.forEach(function (scenario) {
      var expected = scenario.expected
        , el = compile(scenario.markup, scenario.timezone, scenario.reference)

      expect(el.text()).toEqual(expected.text)

      scope.timezone = 'America/Chicago'
      scope.$digest()

      expect(el.text()).not.toEqual(expected.text)
    })
  })

  it('should align milliseconds from epoch as numeric literals that are formatted', function () {
    scenarios.forEach(function (scenario) {
      var expected = scenario.expected
        , el = compile(scenario.markup, scenario.timezone, scenario.reference.getTime())

      expect(el.text()).toEqual(expected.text)
    })
  })

  it('should align milliseconds from epoch as string literals that are formatted', function () {
    scenarios.forEach(function (scenario) {
      var expected = scenario.expected
        , el = compile(scenario.markup, scenario.timezone, '' + scenario.reference.getTime())

      expect(el.text()).toEqual(expected.text)
    })
  })
})