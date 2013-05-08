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

  it('should reject null for date', function () {
    expect(function () {
      $timezones.align(null, 'America/New_York')
    }).toThrow()
  })

  it('should reject undefined for date', function () {
    expect(function () {
      $timezones.align(undefined, 'America/New_York')
    }).toThrow()
  })

  it('should reject booleans for date', function () {
    expect(function () {
      $timezones.align(true, 'America/New_York')
    }).toThrow()
  })

  it('should reject invalid timezone names', function () {
    expect(function () {
      $timezones.align(Date.now(), 'bogus')
    }).toThrow()
  })

  it('should reject invalid timezone objects', function () {
    expect(function () {
      $timezones.align(Date.now(), {})
    }).toThrow()
  })

  it('should reject null for timezone', function () {
    expect(function () {
      $timezones.align(Date.now(), null)
    }).toThrow()
  })

  it('should reject undefined for timezone', function () {
    expect(function () {
      $timezones.align(Date.now(), undefined)
    }).toThrow()
  })

  it('should accept numerical dates as number literals', function () {
    expect($timezones.align(1270548037000, 'America/New_York')).toBeDefined()
  })

  it('should accept numerical dates as string literals', function () {
    expect($timezones.align('1270548037000', 'America/New_York')).toBeDefined()
  })

})