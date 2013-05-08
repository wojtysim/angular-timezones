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

  it('should reject invalid date strings', function () {
    expect(function () {
      $timezones.align('bogus', 'America/New_York')
    }).toThrow()
  })

  it('should reject invalid date objects', function () {
    expect(function () {
      $timezones.align({}, 'America/New_York')
    }).toThrow()
  })

  it('should reject null dates', function () {
    expect(function () {
      $timezones.align(null, 'America/New_York')
    }).toThrow()
  })

  it('should reject undefined dates', function () {
    expect(function () {
      $timezones.align(undefined, 'America/New_York')
    }).toThrow()
  })

  it('should accept numerical dates as number literals', function () {
    expect($timezones.align(1270548037000, 'America/New_York')).toBeDefined()
  })

  it('should accept numerical dates as string literals', function () {
    expect($timezones.align('1270548037000', 'America/New_York')).toBeDefined()
  })

})