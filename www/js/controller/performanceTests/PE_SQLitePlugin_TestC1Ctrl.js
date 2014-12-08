sdApp.controller('PE_SQLitePlugin_TestC1Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory) {
    var iteration = 1;

    var data;
    var dbName = "PE_TestC1";
    var tableName = "PE_TestC1";
    var dbVersion = "1.0";

    $scope.testInProgress = false;

    var amountOfData;
    var amountOfData_testC1a = PE_ParameterFactory.amountOfData_testC1a;
    var amountOfData_testC1b = PE_ParameterFactory.amountOfData_testC1b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestC1-500';
    $scope.testDecription1 = 'Stores ' + amountOfData_testC1a + ' items';
    $scope.testName2 = 'TestC1-2000';
    $scope.testDecription2 = 'Stores ' + amountOfData_testC1b + ' items';

    $scope.results = [];

    $scope.isPrepared = false;

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

        if (testVariant == 'TestC1a') {
            amountOfData = amountOfData_testC1a;
        } else {
            amountOfData = amountOfData_testC1b;
        }
        console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');

    };

    function clearTable() {

        $scope.db.transaction(function (tx) {
            tx.executeSql("DELETE FROM " + tableName, [], clearedTableCallback, $scope.errorHandlerSQLitePlugin);
        });

        function clearedTableCallback(transaction, results) {
            console.log('Table ' + tableName + ' has been cleared');
            $scope.isPrepared = true;
            $scope.$apply();

        }

    };

    function loadData() {
        data = testDataFactory.testData();
    }

    $scope.prepare = function () {
        $scope.prepareInProgress=true;
        $scope.$apply();
        loadData();
        clearTable();
        $scope.prepareInProgress=false;
        $scope.isPrepared = true;
        console.log('prepare function finished');
        $scope.$apply();

    };

    $scope.startPerformanceTest = function () {

        $scope.testInProgress = true;

        var timeStart = new Date().getTime();
        $scope.db.transaction(function (tx) {
                for (var i = 0; i < amountOfData; i++) {

                    //data[i][0] + '' converts the id to a string
                    tx.executeSql("INSERT INTO " + tableName + "(id, address) VALUES(?,?)", [data[i][0] + '', JSON.stringify(data[i])]);

                }
            }, function errorHandler(transaction, error) {
                console.log("Error : " + transaction.message);
                console.log("Error : " + error.message);
            }, function() {
                var timeEnd = new Date().getTime();

                var timeDiff = timeEnd - timeStart;
                $scope.results.push({iteration:  iteration,  time: timeDiff});
                $scope.testInProgress = false;
                $scope.isPrepared = false;
                iteration++;
                $scope.$apply();

                console.log(amountOfData + ' items added');
            }
        );




    };

    $scope.initSQLitePlugin = function () {
        console.log('initSQLitePlugin start');
        $scope.db = sqlitePlugin.openDatabase(dbName, dbVersion, dbName, 10 * 1024 * 1024);
        //$scope.db.transaction($scope.setupSQLitePlugin, $scope.errorHandlerSQLitePlugin, $scope.dbReadySQLitePlugin);
        $scope.db.transaction($scope.createTable, $scope.errorHandlerSQLitePlugin);
        console.log('initSQLitePlugin executed');
        $scope.databaseOpened = true;
    };

    $scope.createTable = function (tx) {

        //Define the structure of the database
        tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tableName + '(id TEXT PRIMARY KEY, address TEXT)');

    };

    $scope.errorHandlerSQLitePlugin = function (e) {
        console.log('errorHandlerSQLitePlugin start');
        alert(e.message);
        console.log(e.message);
        console.log('errorHandlerSQLitePlugin executed');
    };

});