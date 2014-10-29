sdApp.controller('DE_IndexedDBCtrl', function ($scope, $rootScope) {

    $rootScope.section = 'DE';


    //<für alle Tabs>
    $scope.stringForRightButton = 'show keys';
    $scope.functionForRightButton = function () {
        $rootScope.toggle('myOverlay', 'on');
    };
    //</für alle Tabs>

    $scope.enableTab_einzelwerte = function () {
        $scope.tab = 1;
        $scope.stringForTitle = 'IDB - Einzelwerte';
        //$scope.stringForRightButton = 'EZW';
    };

    $scope.enableTab_strDaten = function () {
        $scope.tab = 2;
        $scope.stringForTitle = 'IDB - strDaten';
        //$scope.stringForRightButton = 'STR';
    };

    $scope.enableTab_mediendaten = function () {
        $scope.tab = 3;
        $scope.stringForTitle = 'IDB - Mediendaten';
        //$scope.stringForRightButton = 'MED';
    };

    $scope.enableTab_einzelwerte();



    //Functions for the Overlay

    $scope.dbName = "PG12xp";
    $scope.dbVersion = "2";

    $scope.dbName = "TestAppDatabase";
    $scope.dbVersion = "1";

    $scope.listObjectStores = function () {

        console.log('function listObjectStores() called');
        var request = window.indexedDB.open($scope.dbName, $scope.dbVersion);

        request.onerror = function (event) {
            console.error('request.onerror');
            alert("Database error: " + event.target.errorCode);
            // Machen Sie etwas mit request.errorCode!
        };
        request.onsuccess = function (event) {
            console.log('request.onsuccess');
            db = request.result;

            $scope.objectStores = db.objectStoreNames;

            $scope.$apply();

        };

    };

});