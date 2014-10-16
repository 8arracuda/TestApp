sdApp.controller('DE_WebSqlCtrl', function ($scope, $rootScope) {

    $rootScope.section='DE';


    $scope.enableTab_einzelwerte = function () {
        $scope.tab = 1;
        $scope.stringForTitle = 'WS - Einzelwerte';
        $scope.stringForRightButton = 'EZW';
    };

    $scope.enableTab_strDaten = function () {
        $scope.tab = 2;
        $scope.stringForTitle = 'WS - strDaten';
        $scope.stringForRightButton = 'STR';
    };

    $scope.enableTab_mediendaten = function () {
        $scope.tab = 3;
        $scope.stringForTitle = 'WS Mediendaten';
        $scope.stringForRightButton = 'MED';
    };


    $scope.enableTab_einzelwerte();
});