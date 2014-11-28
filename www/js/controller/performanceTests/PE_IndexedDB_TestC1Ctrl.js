sdApp.controller('PE_IndexedDB_TestC1Ctrl', function ($scope, $rootScope, testDataFactory) {

    var data;

    var iteration = 1;
    const dbName = "PE_TestC1";
    const objStoreName = "PE_TestC1";

    $scope.databaseOpened = false;
    $scope.testInProgress = false;
    $scope.isPrepared = false;

    //TODO Change for real tests
    var amountOfData;
    var amountOfData_testC1a = 100;
    var amountOfData_testC1b = 500;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestC1a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testC1a + ' items';
    $scope.testName2 = 'TestC1b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testC1b + ' items';

    $scope.results = [];

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestC1a') {
            amountOfData = amountOfData_testC1a;
        } else {
            amountOfData = amountOfData_testC1b;
        }
        console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');

    };

    $scope.reset = function () {

        var answer = confirm('Do you really want to reset this page. All test results will be removed!');

        if (answer) {
            iteration=1;
            $scope.isPrepared = false;
            $scope.results = [];
            $scope.selectedTestVariant = '';
        }

    };

    $scope.closeDatabase = function() {
        $scope.db.close();
        console.log('database closed');
        $scope.isPrepared=false;
        $scope.databaseOpened = null;
        $scope.$apply();
    };

    $scope.openDatabase = function () {
        console.log('openDatabase start');

        //Quelle: https://developer.mozilla.org/de/docs/IndexedDB/IndexedDB_verwenden
        if (!window.indexedDB) {
            window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
        } else {

            var request = window.indexedDB.open(dbName, 6);

            request.onerror = function (event) {
                console.error('request.onerror');
                alert("Database error: " + event.target.errorCode);

            };
            request.onsuccess = function (event) {
                console.log('request.onsuccess (in openDatabase)');
                $scope.db = request.result;


                //TODO status light sounds not very professional....maybe change this....
                //for updating the "status-light" on the openDatabase button
                $scope.databaseOpened = true;
                $scope.$apply();
            };

            request.onupgradeneeded = function (event) {
                console.log('request.onupgradeneeded (in openDatabase)');
                console.log('foo');
                $scope.db = event.target.result;


                //TODO Dieser Code funktioniert nicht! Change or delete!
                //remove old objectStores if there were any
                //if (event.oldVersion < 1) {
                //$scope.db.deleteObjectStore(objStoreName);
                //}

                //create a new objectStore
                var objectStore = $scope.db.createObjectStore(objStoreName, {});


            }
        }
    };


    $scope.prepare = function () {
        loadData();
        clearObjectStore();
    };

    function loadData() {

        data = testDataFactory.testData();

    }

    $scope.startPerformanceTest = function () {

        $scope.testInProgress = true;

        var timeStart = new Date().getTime();
        var transaction = $scope.db.transaction([objStoreName], "readwrite");

        console.dir(data);
        var objectStore = transaction.objectStore(objStoreName);

        for (var i = 0; i < amountOfData; i++) {
        console.log('_' + data[i][0]);
            //localStorage.setItem(data[i][0], JSON.stringify(data[i]));
            //var keyValuePair = {key: i, value: i};
            var objectToStore = {id: data[i][0], value: data[i]};
            //var objectToStore = {key: data[i][0], value: data[i]};
            //objectStore.add(objectToStore, data[i]);
            //objectStore.add(objectToStore);
            objectStore.add(data[i], data[i][0]);


            //objectStore.add(data[i], data[i][0]);
        }

        transaction.oncomplete = function (event) {
            var timeEnd = new Date().getTime();

            var timeDiff = timeEnd - timeStart;

            $scope.results.push('iteration ' + iteration + ': ' + timeDiff + ' ms');
            iteration++;
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