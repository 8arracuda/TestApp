sdApp.controller('DE_WebSqlCtrl', function ($scope, $rootScope) {


    $rootScope.section='DE';


    //<für alle Tabs>
    $scope.stringForRightButton = 'show keys';
    $scope.functionForRightButton = function () {
        $rootScope.toggle('myOverlay', 'on');
    };
    //</für alle Tabs>

    $scope.enableTab_einzelwerte = function () {
        $scope.tab = 1;
        $scope.stringForTitle = 'WS - Einzelwerte';
        //$scope.stringForRightButton = 'EZW';
    };

    $scope.enableTab_strDaten = function () {
        $scope.tab = 2;
        $scope.stringForTitle = 'WS - strDaten';
        //$scope.stringForRightButton = 'STR';
    };

    $scope.enableTab_mediendaten = function () {
        $scope.tab = 3;
        $scope.stringForTitle = 'WS Mediendaten';
        //$scope.stringForRightButton = 'MED';
    };

    //$scope.databases = [];
    //$scope.initWebSQL();
    //
    //
    //
    //
    //$scope.initWebSQL = function () {
    //    console.log('initWebSQL start');
    //    dbWebSQL = window.openDatabase("test", "1.0", "test", 2 * 1024 * 1024);
    //    //dbWebSQL.transaction($scope.setupWebSQL, $scope.errorHandlerWebSQL, $scope.dbReadyWebSQL);
    //    dbWebSQL.transaction($scope.setupWebSQL, $scope.errorHandlerWebSQL);
    //    console.log('initWebSQL executed');
    //}

    $scope.enableTab_einzelwerte();
});