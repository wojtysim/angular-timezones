'use strict'

describe('$timezones', function () {
  var $timeout
    , $timezones

  beforeEach(module('Timezones', function ($provide) {
    $provide.value('timezonesURL', 'base/tz/data')
  }))

  beforeEach(inject(function (_$timeout_, _$timezones_) {
    $timeout = _$timeout_
    $timezones = _$timezones_
  }))

  var now = Date.now()

  var scenarios = [
    {
      reference : new Date(Date.parse('1970-01-01T00:00:00+00:00')),
      name : 'America/New_York',
      abbreviation : 'EDT',
      offset : -240,
      region : 'America',
      locality : 'New York'
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

})