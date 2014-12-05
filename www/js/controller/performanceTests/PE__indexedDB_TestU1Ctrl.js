sdApp.controller('PE_IndexedDB_TestU1Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory, IndexedDBClearObjectStore) {

    var iteration = 1;
    const dbName = "PE_TestU1";
    const objStoreName = "PE_TestU1";

    var dataForPreparation;
    var dataForUpdate;

    $scope.databaseOpened = false;
    $scope.testInProgress = false;
    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testU1a = PE_ParameterFactory.amountOfData_testU1a;
    var amountOfData_testU1b = PE_ParameterFactory.amountOfData_testU1b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestU1a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testU1a + ' items';
    $scope.testName2 = 'TestU1b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testU1b + ' items';

    $scope.results = [];


    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestU1a') {
            amountOfData = amountOfData_testU1a;
        } else {
            amountOfData = amountOfData_testU1b;
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

            var request = window.indexedDB.open(dbName, 5);

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
                console.log('request.onupgradeneeded (in openDatabase)');
                $scope.db = event.target.result;


                //TODO Dieser Code funktioniert nicht! Change or delete!
                //remove old objectStores if there were any
                //if (event.oldVersion < 1) {
                //$scope.db.deleteObjectStore(objStoreName);
                //}

                //create a new objectStore
                var objectStore = $scope.db.createObjectStore(objStoreName, {});

                //Column key is defined as index for the objectStore "einzelwerte"
                objectStore.createIndex("id", "id", {unique: true});

            }
        }
    };

    function saveAddressData() {

        $scope.testInProgress = true;

        var timeStart = new Date().getTime();
        var transaction = $scope.db.transaction([objStoreName], "readwrite");

        console.dir(dataForPreparation);
        var objectStore = transaction.objectStore(objStoreName);

        for (var i = 0; i < amountOfData; i++) {

            var addressToSave = dataForPreparation[i];
            objectStore.put(addressToSave, addressToSave[0]);

        }

        transaction.oncomplete = function (event) {

            $scope.isPrepared = true;
            $scope.$apply();

        };

        transaction.onerror = function (event) {
            console.error('transaction.onerror (in startPerformanceTest_onlyOne)');
            $scope.testInProgress = false;
        };
    };

    $scope.prepare = function () {
        loadDataForPreparation();
        loadDataForUpdate();
        $scope.prepareInProgress = true;
        $scope.$apply();
        IndexedDBClearObjectStore.clearObjectStore($scope.db, objStoreName, function () {
            saveAddressData();
            $scope.prepareInProgress = false;
            $scope.isPrepared = true;
            console.log('prepare function finished');
            $scope.$apply();
        });
    };

    function loadDataForPreparation() {
        dataForPreparation = testDataFactory.testData();
    }

    function loadDataForUpdate() {
        dataForUpdate = testDataFactory.testDataForUpdateTests();
    }

    $scope.startPerformanceTest = function () {

        $scope.testInProgress = true;

        var timeStart = new Date().getTime();
        var transaction = $scope.db.transaction([objStoreName], "readwrite");

        var objectStore = transaction.objectStore(objStoreName);

        for (var i = 0; i < amountOfData; i++) {

            var addressToSave = dataForUpdate[i];
            objectStore.put(addressToSave, addressToSave[0]);
        }

        transaction.oncomplete = function (event) {
            var timeEnd = new Date().getTime();

            var timeDiff = timeEnd - timeStart;

            $scope.results.push({iteration: iteration, time: timeDiff});
            iteration++;
            $scope.testInProgress = false;
            $scope.isPrepared = false;
            $scope.$apply();

        };

        transaction.onerror = function (event) {
            console.dir(event);
            console.error('transaction.onerror (in startPerformanceTest)');
            $scope.testInProgress = false;
        };

    };

    function clearObjectStore() {

        var transaction = $scope.db.transaction([objStoreName], "readwrite");
        var objectStore = transaction.objectStore(objStoreName);

        objectStore.clear();
        objectStore.onsuccess = function (evt) {
            console.log('onSuccess');

        };

        objectStore.onerror = function (event) {
            console.error("clearObjectStore:", event.target.errorCode);

        };

        transaction.oncomplete = function (event) {
            console.log('onComplete');
            $scope.isPrepared = true;
            $scope.testInProgress = false;
            $scope.$apply();

        };

    };

});