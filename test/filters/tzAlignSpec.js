'use strict'

describe('tzAlign', function () {
  var scope, $filter, $compile, $timeout, $sandbox

  beforeEach(module('Timezones', function ($provide) {
    $provide.constant('$timezones.definitions.location', 'base/tz/data')
  }))

  beforeEach(inject(function ($injector, $rootScope, _$filter_, _$compile_, _$timeout_, $rootElement) {
    scope = $rootScope
    $filter = _$filter_
    $compile = _$compile_
    $timeout = _$timeout_

    $sandbox = $rootElement.append(angular.element('<div id="sandbox"></div>'))
  }))

  var compile = function (scenario, reference) {
    angular.extend(scope, scenario.scope)

    scope.reference = reference

    var $element = $(scenario.markup).appendTo($sandbox)

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
      scope : {
        timezone : 'America/New_York'
      },
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
      scope : {
        timezone : 'America/Los_Angeles'
      },
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
      scope : {
        timezone : 'Europe/Berlin'
      },
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
      scope : {
        timezone : 'Australia/Sydney'
      },
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
      var timezone = scenario.scope.timezone
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

  it('should support formatting date objects to expected timezones', function () {
    scenarios.forEach(function (scenario) {
      var expected = scenario.expected
        , el = compile(scenario, scenario.reference)

      expect(el.text()).toEqual(expected.text)
    })
  })

  it('should support formatting numerical to expected timezones', function () {
    scenarios.forEach(function (scenario) {
      var expected = scenario.expected
        , el = compile(scenario, scenario.reference)

      expect(el.text()).toEqual(expected.text)
    })
  })

})