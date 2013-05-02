'use strict'

describe('$timezones.resolve(timezone, reference)', function () {
  var $timeout
    , $timezones

  beforeEach(module('Timezones', function ($provide) {
    $provide.constant('$timezones.definitions.location', 'base/tz/data')
  }))

  beforeEach(inject(function (_$timeout_, _$timezones_) {
    $timeout = _$timeout_
    $timezones = _$timezones_
  }))

  var scenarios = [
    {
      reference : new Date(Date.parse('1970-01-01T00:00:00+00:00')),
      name : 'America/Los_Angeles',
      abbreviation : 'PST',
      offset : 480,
      region : 'America',
      locality : 'Los Angeles'
    },

    {
      reference : new Date(Date.parse('1970-01-01T00:00:00+00:00')),
      name : 'America/New_York',
      abbreviation : 'EST',
      offset : 300,
      region : 'America',
      locality : 'New York'
    },

    {
      reference : new Date(Date.parse('1970-05-01T00:00:00+00:00')),
      name : 'America/New_York',
      abbreviation : 'EDT',
      offset : 240,
      region : 'America',
      locality : 'New York'
    },

    {
      reference : new Date(Date.parse('1970-01-01T00:00:00+00:00')),
      name : 'Europe/Berlin',
      abbreviation : 'CEST',
      offset : -60,
      region : 'Europe',
      locality : 'Berlin'
    },

    {
      reference : new Date(Date.parse('1970-01-01T00:00:00+00:00')),
      name : 'Etc/GMT+12',
      abbreviation : 'GMT+12',
      offset : 720,
      region : 'Etc',
      locality : 'GMT+12'
    }
  ]

  it('should resolve Olson names', function () {
    scenarios.forEach(function (scenario) {
      var reference = scenario.reference
        , name = scenario.name
        , abbreviation = scenario.abbreviation
        , offset = scenario.offset
        , region = scenario.region
        , locality = scenario.locality

      var actual = $timezones.resolve(name, reference)

      expect(actual.name).toEqual(name)
      expect(actual.abbreviation).toEqual(abbreviation)
      expect(actual.offset).toEqual(offset)
      expect(actual.region).toEqual(region)
      expect(actual.locality).toEqual(locality)
    })
  })

  it('should provide the local timezone definition', function () {
    var reference = new Date()
      , actual = $timezones.getLocal()

    expect(actual.offset).toEqual(reference.getTimezoneOffset())
  })

  it('should require the reference date', function () {
    expect(function () {
      $timezones.resolve('America/New_York')
    }).toThrow()
  })

  it('should require Date objects', function () {
    expect(function () {
      $timezones.resolve('America/New_York', 'bogus date')
    }).toThrow()
  })

})