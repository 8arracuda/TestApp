sdApp.controller('PE_IndexedDB_Test1Ctrl', function ($scope, $rootScope) {

    var iteration = 1;
    const dbName = "PE_Test1";
    const objStoreName = "PE_Test1";

    $scope.databaseOpened = false;
    $scope.testInProgress = false;
    $scope.isPrepared = false;

    //TODO Change for real tests
    var amountOfData = 10000;
    $scope.testDecription = 'Stores ' + amountOfData + ' items';

    $scope.results = [];

    $scope.openDatabase = function () {
        console.log('openDatabase start');

        //Quelle: https://developer.mozilla.org/de/docs/IndexedDB/IndexedDB_verwenden
        if (!window.indexedDB) {
            window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
        } else {

            var request = window.indexedDB.open(dbName, 1);

            request.onerror = function (event) {
                console.error('request.onerror');
                alert("Database error: " + event.target.errorCode);
                // Machen Sie etwas mit request.errorCode!
            };
            request.onsuccess = function (event) {
                console.log('request.onsuccess (in openDatabase)');
                $scope.db = request.result;

                //for updating the "status-light" on the openDatabase button
                $scope.databaseOpened = true;
                $scope.$apply();
            };

            request.onupgradeneeded = function (event) {
                console.log('request.onupgradeneeded (in openDatabase)');
                $scope.db = event.target.result;


                //TODO Dieser Code funktioniert nicht! Change or delete!
                //remove old objectStores if there were any
                //if (event.oldVersion < 1) {
                //    $scope.db.deleteObjectStore(objStoreName);
                //}

                //create a new objectStore
                var objectStore = $scope.db.createObjectStore(objStoreName, {keyPath: "key"});

                //Column key is defined as index for the objectStore "einzelwerte"
                objectStore.createIndex("key", "key", {unique: true});

            }
        }
    };


    $scope.prepare = function () {
        clearObjectStore();
    }


    $scope.startPerformanceTest_save_onlyOne = function () {

        $scope.testInProgress = true;

        var timeStart = new Date().getTime();
        var transaction = $scope.db.transaction([objStoreName], "readwrite");

        var objectStore = transaction.objectStore(objStoreName);

        for (var i = 0; i < amountOfData; i++) {
            var keyValuePair = {key: i, value: i};
            objectStore.add(keyValuePair);
        }

        transaction.oncomplete = function (event) {
            var timeEnd = new Date().getTime();

            var timeDiff = timeEnd - timeStart;

            $scope.results.push('iteration ' + iteration + ': ' + timeDiff + ' ms');
            $scope.testInProgress = false;
            $scope.isPrepared = false;
            $scope.$apply();

        };

        transaction.onerror = function (event) {
            console.error('transaction.onerror (in startPerformanceTest_onlyOne)');
            $scope.testInProgress = false;
        };
    };

    function clearObjectStore() {

        var request = $scope.db.transaction([objStoreName], "readwrite").objectStore(objStoreName).clear();

        request.onsuccess = function (evt) {

            console.log('objectStore "' + objStoreName + '" has been cleared');
            $scope.isPrepared = true;
            $scope.$apply();
        };
        request.onerror = function (event) {
            console.error("clearObjectStore:", event.target.errorCode);

        };

    };

});