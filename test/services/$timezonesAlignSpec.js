'use strict'

describe('$timezones.align(date, timezoneF)', function () {
  var $timeout
    , $timezones

  beforeEach(module('Timezones', function ($provide) {
    $provide.constant('$timezones.definitions.location', 'base/tz/data')
  }))

  beforeEach(inject(function (_$timeout_, _$timezones_) {
    $timeout = _$timeout_
    $timezones = _$timezones_
  }))

  it('should reject invalid dates', function () {
    expect(function () {
      $timezones.align('bogus', 'America/New_York')
    }).toThrow()

    expect(function () {
      $timezones.align({}, 'America/New_York')
    }).toThrow()
  })

  it('should accept numerical dates', function () {
    expect(function () {
      return $timezones.align(0, 'America/New_York')
    }).toBeDefined()
  })

})