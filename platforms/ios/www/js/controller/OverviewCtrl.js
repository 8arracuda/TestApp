sdApp.controller('OverviewCtrl', function ($scope, techSupport) {

    $scope.stringForTitle = 'Overview';
    $scope.stringForRightButton = 'OVV';

    $scope.techniques = techSupport.techSupport();

});