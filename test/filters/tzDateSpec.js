'use strict'

describe('tzDate', function () {
  var scope, $filter, $compile, $timeout, $sandbox

  beforeEach(module('Timezones', function ($provide) {
    $provide.value('timezonesURL', 'base/tz/data')
  }))

  beforeEach(inject(function ($injector, $rootScope, _$filter_, _$compile_, _$timeout_, $rootElement) {
    scope = $rootScope
    $filter = _$filter_
    $compile = _$compile_
    $timeout = _$timeout_

    $sandbox = $rootElement.append(angular.element('<div id="sandbox"></div>'))
  }))

  var compile = function (scenario) {
    angular.extend(scope, scenario.scope)

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
        reference : new Date(Date.parse('1970-01-01T00:00:00+00:00')),
        timezone : 'America/New_York'
      },
      markup : '<span>{{reference|tzDate:timezone|date:"yyyy-MM-dd HH:mm:ss Z"}}</span>',
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
        reference : new Date(Date.parse('1970-01-01T00:00:00+00:00')),
        timezone : 'America/Los_Angeles'
      },
      markup : '<span>{{reference|tzDate:timezone|date:"yyyy-MM-dd HH:mm:ss Z"}}</span>',
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
        reference : new Date(Date.parse('1970-01-01T00:00:00+00:00')),
        timezone : 'Europe/Berlin'
      },
      markup : '<span>{{reference|tzDate:timezone|date:"yyyy-MM-dd HH:mm:ss Z"}}</span>',
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
        reference : new Date(Date.parse('1970-01-01T00:00:00+00:00')),
        timezone : 'Australia/Sydney'
      },
      markup : '<span>{{reference|tzDate:timezone|date:"yyyy-MM-dd HH:mm:ss Z"}}</span>',
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
        , reference = scenario.scope.reference
        , expected = scenario.expected

      var actual = $filter('tzDate')(reference, timezone)

      expect(actual.getTimezone()).toEqual(timezone)
      expect(actual.getFullYear()).toEqual(expected.fullYear)
      expect(actual.getMonth()).toEqual(expected.month)
      expect(actual.getDate()).toEqual(expected.date)
      expect(actual.getHours()).toEqual(expected.hours)
    })
  })

  it('should support formatting dates to expected timezones', function () {
    scenarios.forEach(function (scenario) {
      var expected = scenario.expected
        , el = compile(scenario)

      expect(el.text()).toEqual(expected.text)
    })
  })

})