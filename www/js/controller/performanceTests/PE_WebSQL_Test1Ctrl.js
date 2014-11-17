sdApp.controller('PE_WebSql_Test1Ctrl', function ($scope, $rootScope) {
    var iteration = 1;

    const dbName = "PE_Test1";
    const tableName = "PE_Test1";
    const dbVersion = "1.0";

    $scope.testInProgress = false;

    //TODO Change for real tests
    var amountOfData = 10000;
    $scope.testDecription = 'Stores ' + amountOfData + ' items';


    $scope.results = [];

    $scope.isPrepared = false;

    function clearTable() {

        $scope.db.transaction(function (tx) {
            tx.executeSql("DELETE FROM PE_Test1", [], clearedTableCallback, $scope.errorHandlerWebSQL);
        });

        function clearedTableCallback(transaction, results) {
            console.log('Table ' + tableName + ' has been cleared');
            $scope.isPrepared = true;
            $scope.$apply();

        }

    };

    $scope.prepare = function () {
        clearTable();

    };

    $scope.startPerformanceTest = function () {
        startPerformanceTest_save_onlyOne();
    };

    function startPerformanceTest_save_onlyOne() {

        $scope.testInProgress = true;




        var timeStart = new Date().getTime();
        $scope.db.transaction(function (tx) {
                for (var i = 0; i < amountOfData; i++) {
                    //console.log('saving ' + i + ' for key ' + i);
                    //tx.executeSql("INSERT INTO PE_Test1(keyName, value) VALUES(?,?)", [i, i]);
                    tx.executeSql("INSERT INTO PE_Test1(keyName, value) VALUES(?,?)", ['' + i, '' + i]);
                    //console.log('saved ' + i + ' for key ' + i);

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
        //$scope.db.transaction($scope.setupWebSQL, $scope.errorHandlerWebSQL, $scope.dbReadyWebSQL);
        $scope.db.transaction($scope.createTableEinzelwerte, $scope.errorHandlerWebSQL);
        console.log('initWebSQL executed');
        $scope.databaseOpened = true;
    };

    $scope.createTableEinzelwerte = function (tx) {
        console.log('createTableEinzelwerte start');

        //Define the structure of the database
        tx.executeSql('CREATE TABLE IF NOT EXISTS PE_Test1(keyName TEXT PRIMARY KEY, value TEXT)');
        console.log('createTableEinzelwerte executed');
    };

    $scope.errorHandlerWebSQL = function (e) {
        console.log('errorHandlerWebSQL start');
        alert(e.message);
        console.log(e.message);
        console.log('errorHandlerWebSQL executed');
    };

});