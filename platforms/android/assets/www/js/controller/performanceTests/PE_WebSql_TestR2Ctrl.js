sdApp.controller('PE_WebSql_TestR2Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory) {

    var iteration = 1;

    var dataForPreparation;

    const dbName = "PE_TestR2";
    const tableName = "PE_TestR2";
    const dbVersion = "1.0";

    //bool value used for the status-light in the "open database" section
    $scope.databaseOpened = false;

    $scope.testInProgress = false;

    var amountOfData;
    var amountOfData_testR2a = PE_ParameterFactory.amountOfData_testR2a;
    var amountOfData_testR2b = PE_ParameterFactory.amountOfData_testR2b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'Read test - random addresses will be loaded';
    $scope.testName1 = 'TestR2a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testR2a + ' items';
    $scope.testName2 = 'TestR2b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testR2b + ' items';

    $scope.results = [];

    $scope.isPrepared = false;


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

    $scope.prepare = function () {
        console.log('prepare');

        clearTable();
        loadDataForPreparation();
        saveAddressData();

    };

    function saveAddressData() {

        console.log('saveTable1ToWebSQL start');

        $scope.db.transaction(function (tx) {

            for (var i = 0; i < dataForPreparation.length; i++) {
                tx.executeSql("INSERT INTO " + tableName + "(id, firstName, lastName, street, zipcode, city, email, randomNumber1, randomNumber2) VALUES(?,?,?,?,?,?,?,?,?)", [dataForPreparation[i][0], dataForPreparation[i][1], dataForPreparation[i][2], dataForPreparation[i][3], dataForPreparation[i][4], dataForPreparation[i][5], dataForPreparation[i][6], dataForPreparation[i][7], dataForPreparation[i][8]]);
            }

            console.log(dataForPreparation.length + ' addresses saved in WebSQL database  -' + tableName + '-?');

        }, function errorHandler(transaction, error) {
            alert("Error : " + transaction.message);
            alert("Error : " + error.message);
        });

        console.log('saveTable1ToWebSQL executed');

    }

    function loadDataForPreparation() {

        dataForPreparation = testDataFactory.testData();

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
        console.log('initWebSQL start');
        $scope.db = window.openDatabase(dbName, dbVersion, dbName, 2 * 1024 * 1024);
        //$scope.db.transaction($scope.setupWebSQL, $scope.errorHandlerWebSQL, $scope.dbReadyWebSQL);
        $scope.db.transaction($scope.createTable, $scope.errorHandlerWebSQL);
        console.log('initWebSQL executed');
        $scope.databaseOpened = true;
    };

    $scope.createTable = function (tx) {
        console.log('createTable start');
        tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tableName + '(id INTEGER PRIMARY KEY, firstName TEXT, lastName TEXT, street TEXT, zipcode TEXT, city TEXT, email TEXT, randomNumber1 INTEGER, randomNumber2 INTEGER)');
        console.log('createTable executed');
    };

    $scope.errorHandlerWebSQL = function (e) {
        console.log('errorHandlerWebSQL start');
        console.log(e.message);
        console.log('errorHandlerWebSQL executed');
    };


    $scope.startPerformanceTest = function () {

        $scope.testInProgress = true;
        $scope.$apply();

        var addressIdsToLoad = testDataFactory.getRandomIndices();

        if (addressIdsToLoad.length < amountOfData) {
            alert('Warning: Too few address Ids defined. The test will produce wrong results!');
        }

        var timeStart = new Date().getTime();
        var onSuccessCounter = 0;

        $scope.keyLoaded = $scope.keyToLoad;

        $scope.db.transaction(function (tx) {

            //for (var i = 0; i < addressIdsToLoad.length; i++) {
            for (var i = 0; i < amountOfData; i++) {

                tx.executeSql("SELECT * FROM " + tableName + " WHERE id = ?", [addressIdsToLoad[i]], function (transaction, results) {

                    onSuccessCounter = onSuccessCounter + 1;

                    //---Test-Output to check the returned values---
                    //if ($rootScope.testOutputLogging) {
                    //console.log('loaded address: ' + JSON.stringify(results.rows.item(0)));
                    //}

                    if (onSuccessCounter == amountOfData) {
                        var timeEnd = new Date().getTime();

                        var timeDiff = timeEnd - timeStart;
                        $scope.testInProgress = false;
                        $scope.results.push({iteration:  iteration,  time: timeDiff});
                        iteration++;
                        $scope.$apply();
                    }

                }, function (t, e) {
                    alert("couldn't read database (" + e.message + ")");
                });
            }

        });

    }

});