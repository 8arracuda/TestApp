sdApp.controller('DE_SessionStorageCtrl', function ($scope, $rootScope) {

    $rootScope.section='DE';

    //<für alle Tabs>
    $scope.stringForRightButton = 'show keys';
    $scope.stringForTitle = 'SessionStorage';
    $scope.functionForRightButton = function () {
        $rootScope.toggle('myOverlay', 'on');
    };
    //</für alle Tabs>

    $scope.enableTab_einzelwerte = function () {
        $scope.tab = 1;
        //$scope.stringForTitle = 'SS - Einzelwerte';
        //$scope.stringForRightButton = 'EZW';
    };

    $scope.enableTab_strDaten = function () {
        $scope.tab = 2;
        //$scope.stringForTitle = 'SS - strDaten';
        //$scope.stringForRightButton = 'STR';
    };

    $scope.enableTab_mediendaten = function () {
        $scope.tab = 3;
        //$scope.stringForTitle = 'SS Mediendaten';
        //$scope.stringForRightButton = 'MED';
    };


    $scope.enableTab_einzelwerte();

});