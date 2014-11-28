sdApp.controller('PE_IndexedDB_TestD1Ctrl', function ($scope, $rootScope, testDataFactory) {

    var iteration = 1;
    const dbName = "PE_TestD1";
    const objStoreName = "PE_TestD1";

    $scope.databaseOpened = false;
    $scope.testInProgress = false;
    $scope.isPrepared = false;

    //TODO Change for real tests
    var amountOfData;
    var amountOfData_testD1a = 1000;
    var amountOfData_testD1b = 5000;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestD1a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testD1a + ' items';
    $scope.testName2 = 'TestD1b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testD1b + ' items';

    $scope.results = [];

    $scope.reset = function () {

        var answer = confirm('Do you really want to reset this page. All test results will be removed!');

        if (answer) {
            iteration = 1;
            $scope.isPrepared = false;
            $scope.results = [];
            $scope.selectedTestVariant = '';
        }

    };

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestD1a') {
            amountOfData = amountOfData_testD1a;
        } else {
            amountOfData = amountOfData_testD1b;
        }
        console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');

    };

    $scope.startPerformanceTest = function () {
        $scope.testInProgress = true;
        $scope.$apply();

        var addressIdsToLoad = [13, 18, 21, 35, 44, 46, 48, 49, 54, 71, 72, 74, 76, 79, 83, 86, 90, 92, 94, 100, 102, 104, 105, 110, 113, 115, 116, 118, 119, 120, 129, 130, 131, 132, 141, 142, 152, 155, 156, 166, 168, 170, 175, 176, 179, 186, 197, 212, 216, 220, 224, 226, 227, 229, 235, 237, 247, 252, 258, 260, 262, 268, 270, 276, 280, 282, 294, 296, 298, 299, 302, 309, 313, 318, 319, 322, 324, 326, 336, 337, 338, 342, 344, 345, 347, 360, 368, 371, 377, 379, 383, 384, 393, 396, 398, 400, 401, 409, 415, 419, 423, 429, 437, 456, 463, 465, 468, 483, 489, 492, 499];

        if (addressIdsToLoad.length<amountOfData) {
            alert('Warning: Too few address Ids defined. The test will produce wrong results!');
        }

        var timeStart = new Date().getTime();
        for (var i = 0; i < addressIdsToLoad.length; i++) {

            localStorage.removeItem('address' + addressIdsToLoad[i]);

        }

        var timeEnd = new Date().getTime();

        var timeDiff = timeEnd - timeStart;
        $scope.results.push('Iteration ' + iteration + ': ' + timeDiff + ' ms');
        $scope.testInProgress = false;
        $scope.isPrepared = false;
        $scope.$apply();

        iteration++;


    };

    function loadData() {

        data = testDataFactory.testData();

    };

    function saveAddressData() {

        if (data == null) {
            alert('error: no data loaded');
            console.error('no data loaded (in saveAddressData)');
        } else {

            //Same logic as in DE_LocalStorage_strDaten Test-Method 2

            for (var i = 0; i < data.length; i++) {

                //Set the Id as key
                //Address with key 42 is saved with key -address42-
                localStorage.setItem('address' + data[i][0], JSON.stringify(data[i]));

            }

            localStorage.setItem('numberOfAddresses', data.length);

            console.log('saved ' + data.length + ' addresses.');

        }

    };

    function clearLocalStorage() {

        localStorage.clear();

    }

    $scope.prepare = function () {

        clearLocalStorage();
        loadData();
        saveAddressData();
        $scope.isPrepared = true;
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


});