sdApp.controller('PE_WebSql_TestC2Ctrl', function ($scope, $rootScope, testDataFactory) {
    var iteration = 1;

    var dataForPreparation;
    const dbName = "PE_TestC2";
    const tableName = "PE_TestC2";
    const dbVersion = "1.0";

    $scope.testInProgress = false;

    //TODO Change for real tests
    var amountOfData;
    var amountOfData_testC2a = PE_ParameterFactory.amountOfData_testC2a;
    var amountOfData_testC2b = PE_ParameterFactory.amountOfData_testC2b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestC2a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testC2a + ' items';
    $scope.testName2 = 'TestC2b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testC2b + ' items';

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

        if (testVariant == 'TestC2a') {
            amountOfData = amountOfData_testC2a;
        } else {
            amountOfData = amountOfData_testC2b;
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

    function loadDataForPreparation() {

        dataForPreparation = testDataFactory.testData();

    }

    $scope.prepare = function () {

        loadDataForPreparation();
        clearTable();

    };

    $scope.startPerformanceTest = function () {

        $scope.testInProgress = true;


        var timeStart = new Date().getTime();
        $scope.db.transaction(function (tx) {
                for (var i = 0; i < amountOfData; i++) {

                    var currentAddress = dataForPreparation[i];
                    tx.executeSql("INSERT INTO " + tableName + "(id, firstName, lastName, street, zipcode, city, email, randomNumber1, randomNumber2) VALUES(?,?,?,?,?,?,?,?,?)", [currentAddress[0], currentAddress[1], currentAddress[2], currentAddress[3], currentAddress[4], currentAddress[5], currentAddress[6], currentAddress[7], currentAddress[8]]);

                }
            }, function errorHandler(transaction, error) {
                console.log("Error : " + transaction.message);
                console.log("Error : " + error.message);
            }
        );

        var timeEnd = new Date().getTime();

        var timeDiff = timeEnd - timeStart;
        $scope.results.push('iteration ' + iteration + ': ' + timeDiff + ' ms');
        $scope.testInProgress = false;
        $scope.isPrepared = false;
        iteration++;
        $scope.$apply();

        console.log(amountOfData + ' items added');

    };

    $scope.initWebSQL = function () {
        console.log('initWebSQL start');
        $scope.db = window.openDatabase(dbName, dbVersion, dbName, 2 * 1024 * 1024);
        $scope.db.transaction($scope.createTableEinzelwerte, $scope.errorHandlerWebSQL);
        console.log('initWebSQL executed');
        $scope.databaseOpened = true;
    };

    $scope.createTableEinzelwerte = function (tx) {

        tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tableName + '(id INTEGER PRIMARY KEY, firstName TEXT, lastName TEXT, street TEXT, zipcode TEXT, city TEXT, email TEXT, randomNumber1 INTEGER, randomNumber2 INTEGER)');

    };

    $scope.errorHandlerWebSQL = function (e) {
        console.log('errorHandlerWebSQL start');
        alert(e.message);
        console.log(e.message);
        console.log('errorHandlerWebSQL executed');
    };

});