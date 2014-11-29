sdApp.controller('DE_PG_FileAPICtrl', function ($scope, $rootScope) {

        $rootScope.section = 'DE';

        //<für alle Tabs>
        $scope.stringForRightButton = 'show keys';
        $scope.stringForTitle = 'File API-Plugin';
        $scope.functionForRightButton = function () {
            $rootScope.toggle('myOverlay', 'on');
        };
        //</für alle Tabs>

        $scope.enableTab_einzelwerte = function () {
            $scope.tab = 1;
            //$scope.stringForTitle = 'LocalStorage';
            //$scope.stringForRightButton = 'EZW';
        };

        $scope.enableTab_strDaten = function () {
            $scope.tab = 2;
            //$scope.stringForTitle = 'LS - strDaten';
            //$scope.stringForRightButton = 'STR';
        };

        $scope.enableTab_mediendaten = function () {
            $scope.tab = 3;
            //$scope.stringForTitle = 'LS Mediendaten';
            //$scope.stringForRightButton = 'MED';
        };

        $scope.enableTab_einzelwerte();

        //Functions for the Overlay

});