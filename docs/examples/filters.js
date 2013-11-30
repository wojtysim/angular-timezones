(function (angular) {

  var application = angular.module('application', ['Timezones'])

  application.constant('$timezones.definitions.location', '../../tz/data')

  application.controller('World', function ($scope) {
    var now = $scope.now = Date.now()

    $scope.examples = [
      { timezone : 'Pacific/Honolulu', reference : now },
      { timezone : 'America/Los_Angeles', reference : now },
      { timezone : 'America/Chicago', reference : now },
      { timezone : 'America/New_York', reference : now },
      { timezone : 'Europe/Berlin', reference : now },
      { timezone : 'Asia/Tokyo', reference : now },
      { timezone : 'Australia/Sydney', reference : now },
      { timezone : 'Etc/GMT+12', reference : now }
    ]
  })

})(angular)