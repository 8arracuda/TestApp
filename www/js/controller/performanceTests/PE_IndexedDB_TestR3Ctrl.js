sdApp.controller('PE_IndexedDB_TestR3Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory, IndexedDBClearObjectStore) {
    var iteration = 1;

    var dbName = "PE_TestR3";
    var objStoreName = "PE_TestR3";

    $scope.databaseOpened = false;
    $scope.testInProgress = false;
    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testR3a = PE_ParameterFactory.amountOfData_testR3a;
    var amountOfData_testR3b = PE_ParameterFactory.amountOfData_testR3b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Prepare will clear all data stored in objectStore ' + objStoreName + ". Then it will save the data needed for the test.";
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'Test R3-6';
    $scope.testDecription1 = 'Stores ' + amountOfData_testR3a + ' items';
    $scope.testName2 = 'Test R3-24';
    $scope.testDecription2 = 'Stores ' + amountOfData_testR3b + ' items';

    $scope.results = [];

    function loadData() {

        data = testDataFactory.testData();

    };

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestR3a') {
            amountOfData = amountOfData_testR3a;
        } else {
            amountOfData = amountOfData_testR3b;
        }
        console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');

    };

    $scope.reset = function () {

        var answer = confirm('Do you really want to reset this page. All test results will be removed!');

        if (answer) {
            iteration = 1;
            $scope.isPrepared = false;
            $scope.results = [];
            $scope.selectedTestVariant = '';
        }

    };

    $scope.closeDatabase = function () {
        $scope.db.close();
        console.log('database closed');
        $scope.isPrepared = false;
        $scope.databaseOpened = null;
        $scope.$apply();
    };

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

            };
            request.onsuccess = function (event) {
                console.log('request.onsuccess (in openDatabase)');
                $scope.db = request.result;

                //for updating the "status-light" on the openDatabase button
                $scope.databaseOpened = true;
                $scope.$apply();
            };

            request.onupgradeneeded = function (event) {

                $scope.db = event.target.result;

                //on update: when objectStore existed
                //before it needs to be deleted, before it's created again with new keys.
                //$scope.db.deleteObjectStore(objStoreName);

                var objectStore = $scope.db.createObjectStore(objStoreName, {});

            }
        }
    };

    function saveAddressData() {
        console.log('saveAddressData');

        var transaction = $scope.db.transaction([objStoreName], "readwrite");

        var objectStore = transaction.objectStore(objStoreName);

        for (var i = 0; i < amountOfData; i++) {
            var datasetString = testDataFactory.getDatasetWithOffset(i);
            objectStore.add(datasetString, 'dataset_' + i);
        }

        transaction.oncomplete = function (event) {

            $scope.isPrepared = true;
            $scope.$apply();

        };

        transaction.onerror = function (event) {
            console.error('transaction.onerror (in startPerformanceTest_onlyOne)');
        };

    };

    function clearObjectStore() {

        var request = $scope.db.transaction([objStoreName], "readwrite").objectStore(objStoreName).clear();

        request.onsuccess = function (evt) {

            console.log('objectStore "' + objStoreName + '" has been cleared');
        };
        request.onerror = function (event) {
            console.error("clearObjectStore:", event.target.errorCode);
            //displayActionFailure(this.error);
        };

    };

    $scope.prepare = function () {
        $scope.prepareInProgress = true;
        $scope.$apply();
        IndexedDBClearObjectStore.clearObjectStore($scope.db, objStoreName, function () {
            loadData();
            saveAddressData();
            $scope.prepareInProgress = false;
            $scope.isPrepared = true;
            console.log('prepare function finished');
            $scope.$apply();
        });
    };

    $scope.startPerformanceTest = function () {

        function readNext() {
            var transaction = $scope.db.transaction([objStoreName], "readonly");

            var objectStore = transaction.objectStore(objStoreName);

            transaction.oncomplete = function (event) {
                i++;
                if (i<amountOfData) {
                    readNext();
                } else {

                    console.log('transaction.oncomplete');

                    var timeEnd = new Date().getTime();
                    var timeDiff = timeEnd - timeStart;
                    $scope.testInProgress = false;
                    $scope.results.push({iteration:  iteration,  time: timeDiff});
                    iteration++;
                    $scope.$apply();
                }

            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror');
            };

                var request = objectStore.get('dataset_' + i);

                request.onsuccess = function (event) {
                    console.log('request.onsuccess');

                    //---Test-Output to check the returned values---
                    //console.log('Has value "' + request.result.substring(1,100) + '"');

                };

        };

        $scope.testInProgress = true;
        $scope.$apply();

        var i = 0;
        var timeStart = new Date().getTime();
        readNext();

    };

});