sdApp.controller('PE_IndexedDB_TestR1Ctrl', function ($scope, $rootScope, testDataFactory) {
    var iteration = 1;

    var iteration = 1;
    const dbName = "PE_TestR1";
    const objStoreName = "PE_TestR1";

    $scope.databaseOpened = false;
    $scope.testInProgress = false;
    $scope.isPrepared = false;

    //TODO Change for real tests
    var amountOfData;
    var amountOfData_testR1a = 1000;
    var amountOfData_testR1b = 5000;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestR1';
    $scope.testDecription1 = 'Stores ' + amountOfData_testR1a + ' items';
    $scope.testName2 = 'TestR1';
    $scope.testDecription2 = 'Stores ' + amountOfData_testR1b + ' items';

    $scope.results = [];

    function loadData() {

        data = testDataFactory.testData();

    };

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'Test1A') {
            amountOfData = amountOfData_testR1a;
        } else {
            amountOfData = amountOfData_testR1b;
        }
        console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');

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
            address.randomNumber1 = data[i][7];
            address.randomNumber2 = data[i][8];

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

        var addressIdsToLoad = [13, 18, 21, 35, 44, 46, 48, 49, 54, 71, 72, 74, 76, 79, 83, 86, 90, 92, 94, 100, 102, 104, 105, 110, 113, 115, 116, 118, 119, 120, 129, 130, 131, 132, 141, 142, 152, 155, 156, 166, 168, 170, 175, 176, 179, 186, 197, 212, 216, 220, 224, 226, 227, 229, 235, 237, 247, 252, 258, 260, 262, 268, 270, 276, 280, 282, 294, 296, 298, 299, 302, 309, 313, 318, 319, 322, 324, 326, 336, 337, 338, 342, 344, 345, 347, 360, 368, 371, 377, 379, 383, 384, 393, 396, 398, 400, 401, 409, 415, 419, 423, 429, 437, 456, 463, 465, 468, 483, 489, 492, 499];

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