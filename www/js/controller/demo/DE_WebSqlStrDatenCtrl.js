sdApp.controller('DE_WebSqlStrDatenCtrl', function ($scope, $rootScope) {

    //bool value used for the staus-light in the "open database" section
    $scope.databaseOpened = false;

    const dbName = "strDaten";
    const dbVersion = "1.0";
    const tableName = "strDaten";


    $scope.initWebSQL = function () {
        console.log('initWebSQL start');
        $scope.db = window.openDatabase(dbName, dbVersion, dbName, 2 * 1024 * 1024);
        //$scope.db.transaction($scope.setupWebSQL, $scope.errorHandlerWebSQL, $scope.dbReadyWebSQL);
        $scope.db.transaction($scope.createTableStrDaten, $scope.errorHandlerWebSQL);
        console.log('initWebSQL executed');
        $scope.databaseOpened = true;
    };

    $scope.createTableStrDaten = function (tx) {
        console.log('createTableStrDaten start');
        tx.executeSql('CREATE TABLE IF NOT EXISTS strDaten(id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, street TEXT, zipcode TEXT, city TEXT, email TEXT)');
        console.log('createTableStrDaten executed');
    };

    $scope.errorHandlerWebSQL = function (e) {
        console.log('errorHandlerWebSQL start');
        //alert(e.message);
        console.log(e.message);
        console.log('errorHandlerWebSQL executed');
    };

    $scope.loadTableFromWebSQL = function () {

        $scope.tableFromWebSQL = [];


        $scope.db.transaction(function (tx) {

            console.log('SELECT * FROM strDaten');

            tx.executeSql("SELECT * FROM strDaten", [], function (transaction, results) {

                var length = results.rows.length;

                for (var i = 0; i < length; i++) {

                    var address = [];

                    var addressFromResults = results.rows.item(i);

                    address[0] = addressFromResults.firstName;
                    address[1] = addressFromResults.lastName;
                    address[2] = addressFromResults.street;
                    address[3] = addressFromResults.zipcode;
                    address[4] = addressFromResults.city;
                    address[5] = addressFromResults.email;

                    $scope.tableFromWebSQL.push(address);

                }

                highlightDestinationTableTitle();

            }, function (t, e) {
                // couldn't read database
                alert("couldn't read database (" + e.message + ")");
            });

        });

    };

    function highlightDestinationTableTitle() {
        $scope.cssVarForDestinationTable = 'destinationTableWasUpdated';

        $scope.$apply();

        setTimeout(function () {
            $scope.cssVarForDestinationTable = '';
            $scope.$apply();
        }, 1500);
    }

    $scope.saveTable1ToWebSQL = function () {

        $scope.clearTable();

        console.log('saveTable1ToWebSQL start');
        //i = 0;
        //alert(JSON.stringify($rootScope.data[i]));

        $scope.db.transaction(function (tx) {
            //tx.executeSql("INSERT INTO strDaten(firstName, lastName, street, city, zipcode, email) VALUES(?,?,?,?,?)", [$rootScope.data[i][0], $rootScope.data[i][1], $rootScope.data[i][2], $rootScope.data[i][3], $rootScope.data[i][4], $rootScope.data[i][5] ]);

            for (var i = 0; i < $rootScope.numberOfRows; i++) {
                tx.executeSql("INSERT INTO strDaten(firstName, lastName, street, zipcode, city, email) VALUES(?,?,?,?,?,?)", [$rootScope.data[i][0], $rootScope.data[i][1], $rootScope.data[i][2], $rootScope.data[i][3], $rootScope.data[i][4], $rootScope.data[i][5]]);
            }

            alert($rootScope.numberOfRows + ' addresses saved in WebSQL database  -' + tableName + '-?');
            //}, $scope.fooErrorHandler);
        }, function errorHandler(transaction, error) {
            alert("Error : " + transaction.message);
            alert("Error : " + error.message);
        });

        console.log('saveTable1ToWebSQL executed');


    };

    //$scope.fooErrorHandler = function () {
    //    alert('fooErrorHandler');
    //};


    //$scope.dbReadyWebSQL = function () {
    //    console.log('dbReadyWebSQL start');
    //    $scope.db.transaction(function (tx) {
    //
    //        tx.executeSql("INSERT INTO einzelwerte(keyName, value) VALUES(?, ?)", [$scope.keyToSave, $scope.valueToSave]);
    //        console.log('dbReadyWebSQL executed');
    //    }, $scope.errorHandlerWebSQL, function () {
    //        console.log('error occured in dbReadyWebSQL')
    //    });
    //};

    $scope.clearTable = function () {

        //var answer = confirm('Do you really want to remove all entries from the database -strDaten-?');


        $scope.db.transaction(function (tx) {
            tx.executeSql("DELETE FROM strDaten", [], clearedTableCallback, $scope.errorHandlerWebSQL);
        });
        // $scope.$apply();


    };

    function clearedTableCallback(transaction, results) {
        console.log('Table ' + tableName + ' has been cleared');
    }

});