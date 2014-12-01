sdApp.controller('PE_IndexedDB_TestR3Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory) {
    var iteration = 1;

    const dbName = "PE_TestR3";
    const objStoreName = "PE_TestR3";

    $scope.databaseOpened = false;
    $scope.testInProgress = false;
    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testR3a = PE_ParameterFactory.amountOfData_testR3a;
    var amountOfData_testR3b = PE_ParameterFactory.amountOfData_testR3b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestR3a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testR3a + ' items';
    $scope.testName2 = 'TestR3b';
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

                $scope.db = event.target.result;

                //on update: when objectStore existed
                //before it needs to be deleted, before it's created again with new keys.
                //$scope.db.deleteObjectStore(objStoreName);

                var objectStore = $scope.db.createObjectStore(objStoreName, {keyPath: "id"});

                objectStore.createIndex("id", "id", {unique: true});

            }
        }
    };

    //slightly modified code from DE_IndexedDB_strDaten
    function saveAddressData() {
        console.log('saveAddressData');

        var transaction = $scope.db.transaction([objStoreName], "readwrite");

        var objectStore = transaction.objectStore(objStoreName);

        for (var i = 0; i < data.length; i++) {
            var address = {};

            address.id = data[i][0];
            address.firstName = data[i][1];
            address.lastName = data[i][2];
            address.street = data[i][3];
            address.zipcode = data[i][4];
            address.city = data[i][5];
            address.email = data[i][6];
            address.randomNumbeR3 = data[i][7];
            address.randomNumbeR3 = data[i][8];

            objectStore.put(address);
        }

        //console.log('addded ' + $rootScope.numberOfRows + ' addresses to ObjectStore strDaten.');

        transaction.oncomplete = function (event) {
            console.log('transaction.oncomplete (in saveAddressData)');
            $scope.isPrepared = true;
            $scope.$apply();
        };

        transaction.onerror = function (event) {
            console.error('transaction.onerror (in saveAddressData)');
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
        loadData();
        saveAddressData();

    };

    $scope.loadAddressIds = function () {
        $scope.testInProgress = true;
        $scope.$apply();

        var addressIdsToLoad = testDataFactory.getRandomIndices();

        if (addressIdsToLoad.length<amountOfData) {
            alert('Warning: Too few address Ids defined. The test will produce wrong results!');
        }

        var timeStart = new Date().getTime();

        //var request = objectStore.get($scope.keyToLoad);
        var onSuccessCounter = 0;

        console.log('addressIdsToLoad.length:' + addressIdsToLoad.length);

        for (var i = 0; i < addressIdsToLoad.length; i++) {
            var transaction = $scope.db.transaction([objStoreName], "readonly");

            var objectStore = transaction.objectStore(objStoreName);
            var request = objectStore.get(addressIdsToLoad[i]);
            transaction.oncomplete = function (event) {
                console.log('transaction.oncomplete (in loadAddressIds)');

                $scope.keyToLoad = $scope.keyLoaded;
            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror (in loadAddressIds)');
            };

            request.onsuccess = function (event) {
                console.log('request.onsuccess (in loadAddressIds)');

                onSuccessCounter = onSuccessCounter + 1;
                if (onSuccessCounter == addressIdsToLoad.length) {
                    var timeEnd = new Date().getTime();

                    var timeDiff = timeEnd - timeStart;
                    $scope.testInProgress = false;
                    $scope.results.push('Iteration ' + iteration + ': ' + timeDiff + ' ms');
                    iteration++;
                    $scope.$apply();
                }

                //if there was a result
                //if (request.result) {
                //    $scope.valueLoadedFromIndexedDB = 'has value "' + request.result.value + '"';
                //
                //} else {
                //    $scope.valueLoadedFromIndexedDB = 'does not exist';
                //}
                //
                //$scope.$apply();
            };
        }


    };

});