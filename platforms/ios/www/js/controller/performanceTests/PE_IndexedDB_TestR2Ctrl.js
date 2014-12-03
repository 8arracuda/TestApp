sdApp.controller('PE_IndexedDB_TestR2Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory) {
    var iteration = 1;

    var dataForPreparation;

    const dbName = "PE_TestR2";
    const objStoreName = "PE_TestR2";

    $scope.databaseOpened = false;
    $scope.testInProgress = false;
    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testR2a = PE_ParameterFactory.amountOfData_testR2a;
    var amountOfData_testR2b = PE_ParameterFactory.amountOfData_testR2b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestR2a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testR2a + ' items';
    $scope.testName2 = 'TestR2b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testR2b + ' items';

    $scope.results = [];

    function loadDataForPreparation() {

        dataForPreparation = testDataFactory.testData();

    };

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestR2a') {
            amountOfData = amountOfData_testR2a;
        } else {
            amountOfData = amountOfData_testR2b;
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
                $scope.db.deleteObjectStore(objStoreName);

                var objectStore = $scope.db.createObjectStore(objStoreName, {});

                //var objectStore = $scope.db.createObjectStore(objStoreName, {keyPath: "id"});
                //objectStore.createIndex("id", "id", {unique: true});

            }
        }
    };

    //slightly modified code from DE_IndexedDB_strDaten
    function saveAddressData() {
        console.log('saveAddressData');

        var transaction = $scope.db.transaction([objStoreName], "readwrite");

        var objectStore = transaction.objectStore(objStoreName);

        for (var i = 0; i < amountOfData; i++) {
            console.log('_' + dataForPreparation[i][0]);

            var id = dataForPreparation[i][0];
            objectStore.add(dataForPreparation[i][0], id + '_id');
            objectStore.add(dataForPreparation[i][1], id + '_firstName');
            objectStore.add(dataForPreparation[i][2], id + '_lastName');
            objectStore.add(dataForPreparation[i][3], id + '_street');
            objectStore.add(dataForPreparation[i][4], id + '_zipcode');
            objectStore.add(dataForPreparation[i][5], id + '_city');
            objectStore.add(dataForPreparation[i][6], id + '_email');
            objectStore.add(dataForPreparation[i][7], id + '_randomNumber1');
            objectStore.add(dataForPreparation[i][8], id + '_randomNumber2');

        }

        transaction.oncomplete = function (event) {
            iteration++;
            $scope.isPrepared = true;
            $scope.$apply();

        };

        transaction.onerror = function (event) {
            console.error('transaction.onerror');
            $scope.testInProgress = false;
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
        console.log('prepare');

        clearObjectStore();
        loadDataForPreparation();

        setTimeout(function () {
            saveAddressData();

        }, 1000);

    };

    $scope.startPerformanceTest = function () {

        var i = 0;

        function readNext() {
            var transaction = $scope.db.transaction([objStoreName], "readonly");

            var objectStore = transaction.objectStore(objStoreName);

            transaction.oncomplete = function (event) {
                i++;
                if (i < amountOfData*9) {
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

            var id = parseInt(i / 9);
            var keyName;
            switch (i % 9) {
                case 0:
                    keyName = id + '_id';
                    break;
                case 1:
                    keyName = id + '_firstName';
                    break;
                case 2:
                    keyName = id + '_lastName';
                    break;
                case 3:
                    keyName = id + '_street';
                    break;
                case 4:
                    keyName = id + '_zipcode';
                    break;
                case 5:
                    keyName = id + '_city';
                    break;
                case 6:
                    keyName = id + '_email';
                    break;
                case 7:
                    keyName = id + '_randomNumber1';
                    break;
                default:
                    keyName = id + '_randomNumber2';

            }

            var request = objectStore.get(keyName);

            request.onsuccess = function (event) {

                //---Test-Output to check the returned values---
                //console.log(keyName + ' has value "' + request.result + '"');

            };

        };

        $scope.testInProgress = true;
        $scope.$apply();

        var timeStart = new Date().getTime();
        readNext();

    };

});