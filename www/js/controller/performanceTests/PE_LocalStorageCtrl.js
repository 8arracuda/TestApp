sdApp.controller('PE_LocalStorageCtrl', function ($scope, $rootScope) {

    $rootScope.section = 'PE';

    $scope.localStorage = localStorage;

    //<für alle Tabs>
    $scope.stringForRightButton = 'show keys';
    $scope.stringForTitle = 'LocalStorage';
    $scope.functionForRightButton = function () {
        $rootScope.toggle('myOverlay', 'on');
    };
    //</für alle Tabs>

    $scope.enableTab_1 = function () {
        $scope.tab = 1;
        //$scope.stringForTitle = 'LocalStorage';
        //$scope.stringForRightButton = 'EZW';
    };

    $scope.enableTab_2 = function () {
        $scope.tab = 2;
        //$scope.stringForTitle = 'LS - strDaten';
        //$scope.stringForRightButton = 'STR';
    };

    $scope.enableTab_3 = function () {
        $scope.tab = 3;
        //$scope.stringForTitle = 'LS Mediendaten';
        //$scope.stringForRightButton = 'MED';
    };

    $scope.enableTab_1();


});