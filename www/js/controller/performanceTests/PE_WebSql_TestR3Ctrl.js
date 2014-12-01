sdApp.controller('PE_WebSql_TestR3Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory) {
    //var iteration = 1;
    //
    //const dbName = "PE_TestR3";
    //const tableName = "PE_TestR3";
    //const dbVersion = "1.0";
    //
    ////bool value used for the status-light in the "open database" section
    //$scope.databaseOpened = false;
    //
    //$scope.testDecription= 'Read test - random addresses will be loaded';
    //
    //$scope.isPrepared = false;
    //
    //$scope.testInProgress = false;
    //
    //$scope.results = [];

    var iteration = 1;

    const dbName = "PE_TestR3";
    const tableName = "PE_TestR3";
    const dbVersion = "1.0";

    //bool value used for the status-light in the "open database" section
    $scope.databaseOpened = false;

    $scope.testInProgress = false;

    //TODO Change for real tests
    var amountOfData;
    var amountOfData_testR3a = PE_ParameterFactory.amountOfData_testR3a;
    var amountOfData_testR3b = PE_ParameterFactory.amountOfData_testR3b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'Read test - random addresses will be loaded';
    $scope.testName1 = 'TestR3a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testR3a + ' items';
    $scope.testName2 = 'TestR3b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testR3b + ' items';

    $scope.results = [];

    $scope.isPrepared = false;


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

    $scope.prepare = function () {
        clearTable();
        saveAddressData();

    };

    function saveAddressData() {

        $scope.testInProgress = true;

        var datasetFiles =  testDataFactory.getArrayWithDatasetFilenames();

        $scope.db.transaction(function (tx) {
                for (var i = 0; i < amountOfData; i++) {
                    var datasetString = testDataFactory.getStringFromFile(datasetFiles[i]);
                    tx.executeSql("INSERT INTO " + tableName + "(id, dataset) VALUES(?,?)", ['dataset_' + i, datasetString]);

                }
            }, function errorHandler(transaction, error) {
                console.log("Error : " + transaction.message);
                console.log("Error : " + error.message);
            }
        );

        $scope.isPrepared = false;
        $scope.$apply();

    }


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
        console.log('createTableStrDaten start');
        tx.executeSql('CREATE TABLE IF NOT EXISTS ' + tableName + '(id TEXT PRIMARY KEY, dataset TEXT)');
        console.log('createTableStrDaten executed');
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

        if (addressIdsToLoad.length<amountOfData) {
            alert('Warning: Too few address Ids defined. The test will produce wrong results!');
        }


        var timeStart = new Date().getTime();
        var onSuccessCounter = 0;

        $scope.db.transaction(function (tx) {

            for (var i = 0; i < amountOfData; i++) {

                tx.executeSql("SELECT * FROM " + tableName + " WHERE id = ?", ['dataset_' + i], function (transaction, results) {

                    onSuccessCounter = onSuccessCounter + 1;

                    //the last result is there....
                    if (onSuccessCounter == amountOfData) {
                        var timeEnd = new Date().getTime();

                        var timeDiff = timeEnd - timeStart;
                        $scope.testInProgress = false;
                        $scope.results.push('Iteration ' + iteration + ': ' + timeDiff + ' ms');
                        iteration++;
                        $scope.$apply();
                    }

                }, function (t, e) {
                    // couldn't read database
                    alert("couldn't read database (" + e.message + ")");
                });
            }

        });

    }

});