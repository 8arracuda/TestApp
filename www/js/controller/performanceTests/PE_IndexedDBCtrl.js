sdApp.controller('PE_IndexedDBCtrl', function ($scope, $rootScope) {

    $rootScope.section = 'PE';

    //<für alle Tabs>
    $scope.stringForRightButton = '';
    $scope.stringForTitle = 'IndexedDB';
    //$scope.functionForRightButton = function () {
    //    $rootScope.toggle('myOverlay', 'on');
    //};
    //</für alle Tabs>

    $scope.enableTab_1 = function () {
        $scope.tab = 1;
    };

    $scope.enableTab_2 = function () {
        $scope.tab = 2;
    };

    $scope.enableTab_3 = function () {
        $scope.tab = 3;
    };

    $scope.enableTab_4 = function () {
        $scope.tab = 4;
    };

    $scope.enableTab_5 = function () {
        $scope.tab = 5;
    };

    $scope.enableTab_1();

});