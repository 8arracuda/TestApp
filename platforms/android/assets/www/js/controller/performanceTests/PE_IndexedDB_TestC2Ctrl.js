sdApp.controller('PE_IndexedDB_TestC2Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory, IndexedDBClearObjectStore) {

    var data;

    var iteration = 1;
    const dbName = "PE_TestC2";
    const objStoreName = "PE_TestC2";

    $scope.databaseOpened = false;
    $scope.testInProgress = false;
    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testC2a = PE_ParameterFactory.amountOfData_testC2a;
    var amountOfData_testC2b = PE_ParameterFactory.amountOfData_testC2b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestC2a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testC2a + ' items';
    $scope.testName2 = 'TestC2b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testC2b + ' items';

    $scope.results = [];

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestC2a') {
            amountOfData = amountOfData_testC2a;
        } else {
            amountOfData = amountOfData_testC2b;
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
        $scope.prepareInProgress = true;
        $scope.$apply();
        IndexedDBClearObjectStore.clearObjectStore($scope.db, objStoreName, function () {
            loadData();
            $scope.prepareInProgress = false;
            $scope.isPrepared = true;
            $scope.$apply();
        });
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


            //var objectToStore = {id: data[i][0], value: data[i]};


            var id = data[i][0];
            objectStore.add(data[i][0], id+'_id');
            objectStore.add(data[i][1], id+'_firstName');
            objectStore.add(data[i][2], id+'_lastName');
            objectStore.add(data[i][3], id+'_street');
            objectStore.add(data[i][4], id+'_zipcode');
            objectStore.add(data[i][5], id+'_city');
            objectStore.add(data[i][6], id+'_email');
            objectStore.add(data[i][7], id+'_randomNumber1');
            objectStore.add(data[i][8], id+'_randomNumber2');



            //objectStore.add(data[i], data[i][0]);
        }

        transaction.oncomplete = function (event) {
            var timeEnd = new Date().getTime();

            var timeDiff = timeEnd - timeStart;

            $scope.results.push({iteration:  iteration,  time: timeDiff});
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

});