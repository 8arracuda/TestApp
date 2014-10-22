sdApp.controller('DE_LocalStorageCtrl', function ($scope, $rootScope) {


    $rootScope.section = 'DE';

    $scope.localStorage = localStorage;

    //<für alle Tabs>
    $scope.stringForRightButton = 'show keys';
    $scope.functionForRightButton = function () {
        $rootScope.toggle('myOverlay', 'on');
    };
    //</für alle Tabs>

    $scope.enableTab_einzelwerte = function () {
        $scope.tab = 1;
        $scope.stringForTitle = 'LocalStorage';
        //$scope.stringForRightButton = 'EZW';
    };

    $scope.enableTab_strDaten = function () {
        $scope.tab = 2;
        $scope.stringForTitle = 'LS - strDaten';
        //$scope.stringForRightButton = 'STR';
    };

    $scope.enableTab_mediendaten = function () {
        $scope.tab = 3;
        $scope.stringForTitle = 'LS Mediendaten';
        //$scope.stringForRightButton = 'MED';
    };


    showLocalStorage = function () {
        $rootScope.toggle('myOverlay', 'on');
    };


    $scope.enableTab_einzelwerte();

    $scope.deleteItem = function (key) {
        var confirmed = confirm('do you really want to delete key "' + key + '"?')

        if (confirmed == true) {
            localStorage.removeItem(key);
        }
    }

});