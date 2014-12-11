sdApp.controller('PL_WebSqlCtrl', function ($scope, $rootScope, testDataFactory) {

    $rootScope.section = 'PL';

    var tableName = 'PL_WebSQL';
    var dbName = 'PL_WebSQL';
    var dbVersion = '1.0';

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
        clearTable();
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


    //$scope.startPlatformTest = function () {
    //    console.log('startPlatformTest');
    //    //localStorage.setItem(keyPrefix + '' + fillWithZeroes(10,i), value);
    //    $scope.loop = 0;
    //
    //    var i;
    //    function nextLoop() {
    //
    //
    //        $scope.db.transaction(function (tx) {
    //                //var limit = 50000;
    //                var limit = 100000;
    //                i = $scope.currentIteration;
    //                //for (var i = 0; i < limit; i++) {
    //                for (; i < ($scope.currentIteration + limit); i++) {
    //
    //                    tx.executeSql("INSERT INTO " + tableName + "(keyName, Value) VALUES(?,?)", [keyPrefix + '' + fillWithZeroes(10, i), value]);
    //
    //                }
    //                $scope.currentIteration = (parseInt($scope.currentIteration) + limit);
    //
    //            }, function errorHandler(transaction, error) {
    //
    //                if (transaction.code == transaction.QUOTA_ERR) {
    //                    alert('quota error at ' + i);
    //                }
    //                    alert('some error...');
    //                console.log('is there a .code that contains QUOTA_ERR?');
    //                console.dir(transaction);
    //                console.log("Error : " + transaction.message);
    //                console.log("Error : " + error.message);
    //            }, function onSuccessHandler() {
    //                $scope.loop = $scope.loop + 1;
    //                //if ($scope.loop < 10) {
    //                //  nextLoop();
    //                //}
    //
    //                setTimeout(
    //                    function () {
    //                        //to update the UI - gives the user an update about the progress as the test progresses
    //                        $scope.$apply();
    //                        setTimeout(
    //                            nextLoop(parseInt($scope.currentIteration)), 500);
    //                    }, 1000);
    //
    //                console.log('added some more things - i:' + i);
    //            }
    //        );
    //
    //    }
    //
    //    //start the test
    //    $scope.currentIteration = 0;
    //    nextLoop();
    //
    //
    //};

    //$scope.startPlatformTest = function () {
    //
    //    $scope.testInProgress = true;
    //
    //    var datasetArray = [];
    //    for (var i=0; i<100; i++) {
    //        datasetArray.push(testDataFactory.getDatasetWithOffset(i));
    //    }
    //
    //    var timeStart = new Date().getTime();
    //    $scope.db.transaction(function (tx) {
    //            for (var i = 0; i < amountOfData; i++) {
    //                //
    //                //var timeStart = new Date().getTime();
    //                //timeDiffSum += new Date().getTime() - timeStart;
    //                tx.executeSql("INSERT INTO " + tableName + "(keyName, value) VALUES(?,?)", ['dataset_' + i, datasetArray[i]]);
    //
    //            }
    //        }, function errorHandler(transaction, error) {
    //            console.log("Error : " + transaction.message);
    //            console.log("Error : " + error.message);
    //        }, function () {
    //            console.log('success callback');
    //            //timeDiffSum += new Date().getTime() - timeStart;
    //            var timeEnd = new Date().getTime();
    //            var timeDiff = timeEnd - timeStart;
    //            $scope.results.push({iteration:  iteration,  time: timeDiff });
    //            $scope.testInProgress = false;
    //            $scope.isPrepared = false;
    //            iteration++;
    //            $scope.$apply();
    //        }
    //    );
    //
    //};


    $scope.startPlatformTest = function () {
        console.log('startPlatformTest');

        var errorAlreadyShown = false;

        $scope.currentIteration = 0;

        var datasetStringToSave = testDataFactory.getDatasetWithOffset(0);

        function nextTransactions() {

            var onSuccessCounter = 0;

            $scope.db.transaction(function (tx) {

                    for (var i = 0; i < 5; i++) {

                        tx.executeSql("INSERT INTO " + tableName + "(keyName, value) VALUES(?,?)", ['dataset_' + $scope.currentIteration, datasetStringToSave]);
                        $scope.currentIteration += 1;
                    }

                },
                function errorHandler(transaction, error) {

                    if (transaction.code == transaction.QUOTA_ERR) {
                        if (errorAlreadyShown == false) {
                            alert('quota error at iteration' + $scope.currentIteration);
                            errorAlreadyShown = true;
                        }
                    }
                    console.log("Error : " + transaction.message);
                    console.log("Error : " + error.message);
                }, function onSuccessHandler() {
                    console.log('onSuccessCounter:' + onSuccessCounter);
                    console.log('onSuccess ' + $scope.currentIteration);
                    onSuccessCounter = 0;
                    $scope.$apply();

                    //continue if there was no error
                    if (errorAlreadyShown == false) {
                        nextTransactions();
                    }
                });

        }

        nextTransactions();

    };


    function clearTable() {

        $scope.db.transaction(function (tx) {
            tx.executeSql("DELETE FROM " + tableName, [], clearedTableCallback, $scope.errorHandlerWebSQL);
        });

        function clearedTableCallback(transaction, results) {
            console.log('Table ' + tableName + ' has been cleared');
            $scope.isPrepared = true;
            $scope.$apply();

        }

    };

    $scope.initWebSQL = function () {
        $scope.db = window.openDatabase(dbName, dbVersion, dbName, 2 * 1024 * 1024);
        //$scope.db.transaction($scope.setupWebSQL, $scope.errorHandlerWebSQL, $scope.dbReadyWebSQL);
        $scope.db.transaction($scope.createTable, $scope.errorHandlerWebSQL);
        $scope.databaseOpened = true;
    };

    $scope.createTable = function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tableName + '(id TEXT PRIMARY KEY, dataset TEXT)');
    };

    $scope.errorHandlerWebSQL = function (e) {
        console.log(e.message);
    };

});