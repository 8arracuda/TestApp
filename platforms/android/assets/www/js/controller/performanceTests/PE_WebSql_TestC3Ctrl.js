sdApp.controller('PE_WebSql_TestC3Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory) {
    var iteration = 1;

    var dbName = "PE_TestC3";
    var tableName = "PE_TestC3";
    var dbVersion = "1.0";

    $scope.testInProgress = false;

    var amountOfData;
    var amountOfData_testC3a = PE_ParameterFactory.amountOfData_testC3a;
    var amountOfData_testC3b = PE_ParameterFactory.amountOfData_testC3b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'The prepare function will clear all data stored in the table ' + tableName;
    $scope.mainTestDecription = 'The test stores datasets, with 4000 addresses each, in a table with two columns: keyName and value';
    $scope.testName1 = 'Test C3-6';
    $scope.testDecription1 = 'Stores ' + amountOfData_testC3a + ' times 4,000 addresses.';
    $scope.testName2 = 'Test C3-24';
    $scope.testDecription2 = 'Stores ' + amountOfData_testC3b + ' times 4,000 addresses.';

    $scope.results = [];

    $scope.isPrepared = false;

    $scope.reset = function () {

        var answer = confirm('Do you really want to reset this page. All test results will be removed!');

        if (answer) {
            iteration=1;
            $scope.isPrepared = false;
            $scope.results = [];
            $scope.selectedTestVariant = '';
        }

    };

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestC3a') {
            amountOfData = amountOfData_testC3a;
        } else {
            amountOfData = amountOfData_testC3b;
        }
        console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');

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

    $scope.prepare = function () {
        $scope.prepareInProgress=true;
        $scope.$apply();
        clearTable();
        $scope.prepareInProgress=false;
        $scope.isPrepared = true;
        console.log('prepare function finished');
        $scope.$apply();

    };

    $scope.startPerformanceTest = function() {

        $scope.testInProgress = true;

        var datasetString = JSON.stringify(testDataFactory.getBigDataset());

        var timeStart = new Date().getTime();
        $scope.db.transaction(function (tx) {
                for (var i = 0; i < amountOfData; i++) {
                    tx.executeSql("INSERT INTO " + tableName + "(keyName, value) VALUES(?,?)", ['dataset_' + i, datasetString]);
                }
            }, function errorHandler(transaction, error) {
                console.log("Error : " + transaction.message);
                console.log("Error : " + error.message);
            }, function () {
                console.log('success callback');
                var timeEnd = new Date().getTime();
                var timeDiff = timeEnd - timeStart;
                $scope.results.push({iteration:  iteration,  time: timeDiff });
                $scope.testInProgress = false;
                $scope.isPrepared = false;
                iteration++;
                $scope.$apply();
            }
        );

    };

    $scope.initWebSQL = function () {
        console.log('initWebSQL start');
        $scope.db = window.openDatabase(dbName, dbVersion, dbName, 2 * 1024 * 1024);
        $scope.db.transaction($scope.createTable, $scope.errorHandlerWebSQL);
        console.log('initWebSQL executed');
        $scope.databaseOpened = true;
    };

    $scope.createTable = function (tx) {
        console.log('createTable start');
        //Define the structure of the database
        tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tableName + '(keyName TEXT PRIMARY KEY, value TEXT)');
        console.log('createTable executed');
    };

    $scope.errorHandlerWebSQL = function (e) {
        console.log('errorHandlerWebSQL start');
        alert(e.message);
        console.log(e.message);
        console.log('errorHandlerWebSQL executed');
    };

});