sdApp.controller('PE_WebSql_TestR2Ctrl', function ($scope, $rootScope, testDataFactory) {
    //var iteration = 1;
    //
    //const dbName = "PE_TestR2";
    //const tableName = "PE_TestR2";
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

    const dbName = "PE_TestR2";
    const tableName = "PE_TestR2";
    const dbVersion = "1.0";

    //bool value used for the status-light in the "open database" section
    $scope.databaseOpened = false;

    $scope.testInProgress = false;

    //TODO Change for real tests
    var amountOfData;
    var amountOfData_testR2a = 100;
    var amountOfData_testR2b = 500;

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
        loadData();
        saveAddressData();

    };

    function saveAddressData() {

        console.log('saveTable1ToWebSQL start');

        $scope.db.transaction(function (tx) {

            for (var i = 0; i < data.length; i++) {
                tx.executeSql("INSERT INTO " + tableName + "(id, firstName, lastName, street, zipcode, city, email, randomNumber1, randomNumber2) VALUES(?,?,?,?,?,?,?,?,?)", [data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5], data[i][6], data[i][7], data[i][8]]);
            }

            console.log(data.length + ' addresses saved in WebSQL database  -' + tableName + '-?');

        }, function errorHandler(transaction, error) {
            alert("Error : " + transaction.message);
            alert("Error : " + error.message);
        });

        console.log('saveTable1ToWebSQL executed');

    }

    function loadData() {

        data = testDataFactory.testData();

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

        if (addressIdsToLoad.length<amountOfData) {
            alert('Warning: Too few address Ids defined. The test will produce wrong results!');
        }

        var timeStart = new Date().getTime();
        var onSuccessCounter = 0;

        $scope.keyLoaded = $scope.keyToLoad;

        $scope.db.transaction(function (tx) {

            for (var i = 0; i < addressIdsToLoad.length; i++) {
                // console.log('SELECT * FROM einzelwerte WHERE keyName = ' +  addressIdsToLoad[i]);

                tx.executeSql("SELECT * FROM " + tableName + " WHERE id = ?", [addressIdsToLoad[i]], function (transaction, results) {

                    onSuccessCounter = onSuccessCounter + 1;

                    //the last result is there....
                    if (onSuccessCounter == addressIdsToLoad.length) {
                        var timeEnd = new Date().getTime();

                        var timeDiff = timeEnd - timeStart;
                        $scope.testInProgress = false;
                        $scope.results.push('Iteration ' + iteration + ': ' + timeDiff + ' ms');
                        iteration++;
                        $scope.$apply();
                    }

                    //$scope.$apply();

                }, function (t, e) {
                    // couldn't read database
                    alert("couldn't read database (" + e.message + ")");
                });
            }

        });

    }

});