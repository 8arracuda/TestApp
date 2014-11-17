sdApp.controller('PE_IndexedDB_Test1Ctrl', function ($scope, $rootScope) {
    var iteration = 1;

    const dbName = "PerformanceTests";
    const objStoreName = "PerformanceTests";
    var iteration = 1;
    $scope.databaseOpened = false;
    $scope.testInProgress = false;
    $scope.results = [];

    $scope.openDatabase = function () {
        console.log('openDatabase start');

        //Quelle: https://developer.mozilla.org/de/docs/IndexedDB/IndexedDB_verwenden
        if (!window.indexedDB) {
            window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
        } else {

            var request = window.indexedDB.open(dbName, 2);

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

                //remove old objectStores if there were any
                if (event.oldVersion < 1) {
                    $scope.db.deleteObjectStore(objStoreName);
                }

                //create a new objectStore
                var objectStore = $scope.db.createObjectStore(objStoreName, {keyPath: "key"});

                //Column key is defined as index for the objectStore "einzelwerte"
                objectStore.createIndex("key", "key", {unique: true});

            }
        }
    };


    //TODO Remove programmieren
    //$scope.startPerformanceTest_remove_onlyOne = function () {
    //
    //    var transaction = $scope.db.transaction([objStoreName], "readwrite");
    //
    //    var objectStore = transaction.objectStore(objStoreName);
    //
    //    //var request = objectStore.del
    //    //    .delete($sc ope.keyToRemove);
    //
    //    request.onsuccess = function (event) {
    //        // It's gone!
    //        alert('key ' + $scope.keyToRemove + ' was removed');
    //    };
    //
    //};


    $scope.startPerformanceTest_save_onlyOne = function () {

        $scope.testInProgress = true;

        var timeStart = new Date().getTime();
        var transaction = $scope.db.transaction([objStoreName], "readwrite");

        var objectStore = transaction.objectStore(objStoreName);

        //TODO Change for real tests
        var amountOfData = 500;
        //var amountOfData = 10000;
        for (var i = 0; i < amountOfData; i++) {
            var keyValuePair = {key: i, value: i};
            objectStore.add(keyValuePair);
        }

        //console.log('added ' + amountOfData + ' addresses to ObjectStore strDaten.');
        transaction.oncomplete = function (event) {
            console.log('transaction.oncomplete (in startPerformanceTest_onlyOne)');
            var timeEnd = new Date().getTime();

            var timeDiff = timeEnd - timeStart;
            console.log('execution time (startPerformanceTest_onlyOne):' + timeDiff);
            console.log(timeEnd + ' - ' + timeStart + ' = ' + timeDiff);
            //return timeDiff;
            //$scope.results[iteration] = timeDiff;
            //$scope.$apply();
            //alert('time: ' + timeDiff);

            $scope.results.push('iteration ' + iteration + ': ' + timeDiff + ' ms');
            $scope.testInProgress = false;
            $scope.$apply();

        };

        transaction.onerror = function (event) {
            console.error('transaction.onerror (in startPerformanceTest_onlyOne)');
            $scope.testInProgress = false;
        };
    };

    function perf_storeItems(iteration, amountOfData) {

        $scope.clearObjectStore();

        var timeStart = new Date().getTime();
        var transaction = $scope.db.transaction([objStoreName], "readwrite");

        var objectStore = transaction.objectStore(objStoreName);

        for (var i = 0; i < amountOfData; i++) {

            //var address = {};
            //
            //address.firstName = $rootScope.data[i][0];
            //address.lastName = $rootScope.data[i][1];
            //address.street = $rootScope.data[i][2];
            //address.zipcode = $rootScope.data[i][3];
            //address.city = $rootScope.data[i][4];
            //address.email = $rootScope.data[i][5];

            var keyValuePair = {key: i, value: i};

            objectStore.add(keyValuePair);
        }

        console.log('added ' + amountOfData + ' addresses to ObjectStore strDaten.');

        transaction.oncomplete = function (event) {
            console.log('transaction.oncomplete (in perf_storeItems)');
            var timeEnd = new Date().getTime();
            var timeDiff = timeEnd - timeStart;
            console.log('execution time (perf_storeItems):' + timeDiff);
            console.log(timeEnd + ' - ' + timeStart + ' = ' + timeDiff);
            $scope.results[iteration] = timeDiff;
            $scope.$apply();
        };

        transaction.onerror = function (event) {
            console.error('transaction.onerror (in perf_storeItems)');
        };

    };

    $scope.clearObjectStore = function () {

        var request = $scope.db.transaction([objStoreName], "readwrite").objectStore(objStoreName).clear();

        request.onsuccess = function (evt) {

            console.log('objectStore "' + objStoreName + '" has been cleared');
        };
        request.onerror = function (event) {
            console.error("clearObjectStore:", event.target.errorCode);
            displayActionFailure(this.error);
        };

    };

});