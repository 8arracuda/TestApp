sdApp.controller('OverviewCtrl', function ($scope, techSupportFactory) {

    $scope.stringForTitle = 'Overview';
    $scope.stringForRightButton = 'OVV';

    $scope.techniques = techSupportFactory.techSupport();


});