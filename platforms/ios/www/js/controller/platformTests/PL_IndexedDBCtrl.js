sdApp.controller('PL_IndexedDBCtrl', function ($scope, $rootScope) {

    $rootScope.section = 'PL';

    var data;

    var dbName = "PL_Test1";
    var objStoreName = "PL_Test1";

    $scope.databaseOpened = false;

    $scope.result = '';
    $scope.isPrepared = false;
    $scope.testInProgress = false;

    $scope.localStorage = localStorage;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'foo';
    $scope.mainTestDecription = 'foo';
    $scope.testName1 = 'TestFoo1';
    $scope.testDecription1 = 'foo1';
    $scope.testName2 = 'TestFoo2';
    $scope.testDecription2 = 'foo2';
    $scope.testName3 = 'TestFoo3';
    $scope.testDecription3 = 'foo3';
    $scope.testName4 = 'TestFoo4';
    $scope.testDecription4 = 'foo4';

    $scope.testA_keyPrexix = "";
    $scope.testA_value = "A";
    $scope.testB_keyPrexix = "";
    $scope.testB_value = "ABCDEFGHIJ";
    $scope.testC_keyPrexix = "THISISAVERYVERYVERYVERYLONGKEY";
    $scope.testC_value = "A";
    $scope.testD_keyPrexix = "THISISAVERYVERYVERYVERYLONGKEY";
    $scope.testD_value = "ABCDEFGHIJ";

    var keyPrefix;
    var value;

    $scope.prepare = function () {
        clearObjectStore();
        $scope.isPrepared = true;
        $scope.currentIteration = '';
        $scope.$apply();
    };


    $scope.reset = function () {

        var answer = confirm('Do you really want to reset this page. All test results will be removed!');

        if (answer) {
            $scope.isPrepared = false;
            $scope.result = '';
            $scope.selectedTestVariant = '';
        }

    };

    $scope.selectTestVariant = function (testVariant) {

        //for showing the name on a button
        $scope.selectedTestVariant = testVariant;


        switch (testVariant) {
            case 'TestLimitA':
                //$scope.keyPrefix = $scope.testA_keyPrexix;
                //$scope.value = $scope.testA_value;
                keyPrefix = $scope.testA_keyPrexix;
                value = $scope.testA_value;
                break;
            case 'TestLimitB':
                //$scope.keyPrefix = $scope.testB_keyPrexix;
                //$scope.value = $scope.testB_value;
                keyPrefix = $scope.testB_keyPrexix;
                value = $scope.testB_value;
                break;
            case 'TestLimitC':
                //$scope.keyPrefix = $scope.testC_keyPrexix;
                //$scope.value = $scope.testC_value;
                keyPrefix = $scope.testC_keyPrexix;
                value = $scope.testC_value;
                break;
            case 'TestLimitD':
                //$scope.keyPrefix = $scope.testD_keyPrexix;
                //$scope.value = $scope.testD_value;
                keyPrefix = $scope.testD_keyPrexix;
                value = $scope.testD_value;
                break;
            default:
                //$scope.keyPrefix = $scope.testA_keyPrexix;
                //$scope.value = $scope.testA_value;
                keyPrefix = $scope.testA_keyPrexix;
                value = $scope.testA_value;

        }

        console.log('selected:' + keyPrefix + ' and ' + value);

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

    $scope.startPlatformTest = function () {

        $scope.testInProgress = true;

        var transaction = $scope.db.transaction([objStoreName], "readwrite");

        console.dir(data);
        var objectStore = transaction.objectStore(objStoreName);

        for (var i = 0; i < 100; i++) {

            //localStorage.setItem(keyPrefix + '' + fillWithZeroes(10, i), value);
            //var objectToStore = {keyName: keyPrefix + '' + fillWithZeroes(10,i), value: value};

            objectStore.add(value, keyPrefix + '' + fillWithZeroes(10, i));

        }

        transaction.oncomplete = function (event) {

            $scope.testInProgress = false;
            $scope.isPrepared = false;
            $scope.$apply();

        };

        transaction.onerror = function (event) {
            console.error('transaction.onerror (in startPerformanceTest_onlyOne)');
            $scope.testInProgress = false;
        };

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

    //TODO extract this to a factory or service
    function fillWithZeroes(fillToLength, number) {

        var len = number.toString().length;

        var number_new = '';
        if (len < fillToLength) {
            var zeroesToAdd = fillToLength - len;

            for (var k = 0; k < zeroesToAdd; k++) {
                number_new = '0' + number_new;
            }
        }
        return number_new + "" + number;

    };


});