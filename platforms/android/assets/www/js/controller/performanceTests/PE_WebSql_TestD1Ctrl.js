sdApp.controller('PE_WebSql_TestD1Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory) {

    var iteration = 1;

    var dataForPreparation;

    var dbName = "PE_TestD1";
    var tableName = "PE_TestD1";
    var dbVersion = "1.0";

    $scope.testInProgress = false;

    var amountOfData;
    var amountOfData_testD1a = PE_ParameterFactory.amountOfData_testD1a;
    var amountOfData_testD1b = PE_ParameterFactory.amountOfData_testD1b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'The prepare function will clear the table ' + tableName + '. After that it saves the files needed for the test';
    $scope.mainTestDecription = 'The test deletes addresses by their ids.';
    $scope.testName1 = 'Test D1-500';
    $scope.testDecription1 = 'Stores ' + amountOfData_testD1a + ' items';
    $scope.testName2 = 'Test D1-2000';
    $scope.testDecription2 = 'Stores ' + amountOfData_testD1b + ' items';

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

        if (testVariant == 'TestD1a') {
            amountOfData = amountOfData_testD1a;
        } else {
            amountOfData = amountOfData_testD1b;
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

    $scope.initWebSQL = function () {
        console.log('initWebSQL start');
        $scope.db = window.openDatabase(dbName, dbVersion, dbName, 2 * 1024 * 1024);
        $scope.db.transaction($scope.createTable, $scope.errorHandlerWebSQL);
        //TODO rename all CreateTableEinzelwerte / CreateTableMediendaten method names to createTable!
        console.log('initWebSQL executed');
        $scope.databaseOpened = true;
    };

    $scope.createTable = function (tx) {
        console.log('createTable start');

        //Define the structure of the database
        tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tableName + '(id TEXT PRIMARY KEY, address TEXT)');
        console.log('createTable executed');
    };

    $scope.errorHandlerWebSQL = function (e) {
        console.log('errorHandlerWebSQL start');
        alert(e.message);
        console.log(e.message);
        console.log('errorHandlerWebSQL executed');
    };

    function saveAddressData() {
        $scope.db.transaction(function (tx) {
                for (var i = 0; i < dataForPreparation.length; i++) {

                    //data[i][0] + '' because otherwise id's like 1.0, 2.0 are stored
                    tx.executeSql("INSERT INTO " + tableName + "(id, address) VALUES(?,?)", [dataForPreparation[i][0] + '', JSON.stringify(dataForPreparation[i])]);

                }
            }, function errorHandler(transaction, error) {
                console.log("Error : " + transaction.message);
                //console.log("Error : " + error.message);
            }
        );

    }

    $scope.startPerformanceTest = function () {

        $scope.testInProgress = true;

        var timeStart = new Date().getTime();
        $scope.db.transaction(function (tx) {
                for (var i = 0; i < amountOfData; i++) {

                    //tx.executeSql("DELETE FROM " + tableName + " WHERE id = ?", [dataForUpdate[i][0] + '']);
                    tx.executeSql("DELETE FROM " + tableName + " WHERE id = ?", [i+'']);

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

            }
        );

    };


    $scope.prepare = function () {
        $scope.prepareInProgress=true;
        $scope.$apply();
        clearTable();
        loadDataForPreparation();
        saveAddressData();
        loadDataForUpdate();
        $scope.prepareInProgress=false;
        $scope.isPrepared = true;
        console.log('prepare function finished');
        $scope.$apply();
    };

    function loadDataForPreparation() {

        dataForPreparation = testDataFactory.testData();

    }

    function loadDataForUpdate() {
        dataForUpdate = testDataFactory.testDataForUpdateTests();
    }


});