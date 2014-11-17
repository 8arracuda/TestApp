sdApp.controller('PE_WebSqlCtrl', function ($scope, $rootScope) {

    $rootScope.section = 'PE';

    //<für alle Tabs>
    $scope.stringForRightButton = '';
    $scope.stringForTitle = 'WebSQL';
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

    $scope.enableTab_1();

});