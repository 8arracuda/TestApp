sdApp.controller('DE_LocalStorageCtrl', function ($scope, $rootScope) {

    $rootScope.section='DE';


    $scope.enableTab_einzelwerte = function () {
        $scope.tab = 1;
        $scope.stringForTitle = 'LS - Einzelwerte';
        $scope.stringForRightButton = 'EZW';
    };

    $scope.enableTab_strDaten = function () {
        $scope.tab = 2;
        $scope.stringForTitle = 'LS - strDaten';
        $scope.stringForRightButton = 'STR';
    };

    $scope.enableTab_mediendaten = function () {
        $scope.tab = 3;
        $scope.stringForTitle = 'LS Mediendaten';
        $scope.stringForRightButton = 'MED';
    };


    $scope.enableTab_einzelwerte();
    $scope.$apply();
});