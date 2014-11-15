sdApp.controller('DE_WebSqlStrDatenCtrl', function ($scope, $rootScope) {

    $scope.databaseOpened = false;

    $scope.initWebSQL = function () {
        console.log('initWebSQL start');
        $scope.db = window.openDatabase("test", "1.0", "test", 2 * 1024 * 1024);
        //$scope.db.transaction($scope.setupWebSQL, $scope.errorHandlerWebSQL, $scope.dbReadyWebSQL);
        $scope.db.transaction($scope.createTableStrDaten, $scope.errorHandlerWebSQL);
        console.log('initWebSQL executed');
        $scope.databaseOpened = true;
    };

    $scope.createTableStrDaten = function (tx) {
        console.log('createTableStrDaten start');
        tx.executeSql('CREATE TABLE IF NOT EXISTS strDaten(id INTEGER PRIMARY KEY AUTOINCREMENT, firstName TEXT, lastName TEXT, street TEXT, city TEXT, zipcode TEXT, email TEXT)');
        console.log('createTableStrDaten executed');
    };

    $scope.errorHandlerWebSQL = function (e) {
        console.log('errorHandlerWebSQL start');
        alert(e.message);
        console.log(e.message);
        console.log('errorHandlerWebSQL executed');
    };

    $scope.initWebSQL();

    $scope.saveTable1ToWebSQL = function () {

        if (!$scope.databaseOpened) {
            alert('WebSQL database needs to be opened first!');
        } else {

            //alert('will save ' + $rootScope.tableOriginal.length + " addresses to LocalStorage");
            //alert('will save ' + $rootScope.numberOfRows + " addresses to WebSQL");

            console.log('saveTable1ToWebSQL start');
            //i = 0;
            //alert(JSON.stringify($rootScope.data[i]));



            $scope.db.transaction(function (tx) {
                //tx.executeSql("INSERT INTO strDaten(firstName, lastName, street, city, zipcode, email) VALUES(?,?,?,?,?)", [$rootScope.data[i][0], $rootScope.data[i][1], $rootScope.data[i][2], $rootScope.data[i][3], $rootScope.data[i][4], $rootScope.data[i][5] ]);
                i =/**/ 0;
                for (var i = 0; i < $rootScope.numberOfRows; i++) {
                    tx.executeSql("INSERT INTO strDaten(firstName, lastName, street, city, zipcode, email) VALUES(?,?,?,?,?,?)", [$rootScope.data[i][0], $rootScope.data[i][1], $rootScope.data[i][2], $rootScope.data[i][3], $rootScope.data[i][4], $rootScope.data[i][5]]);
                }

                alert($rootScope.numberOfRows + ' addresses saved in WebSQL database -strDaten-.')
            //}, $scope.fooErrorHandler);
            }, function errorHandler(transaction, error) {
                alert("Error : " + transaction.message);
                alert("Error : " + error.message);
            });

            console.log('saveTable1ToWebSQL executed');
            //$scope.deleteTable1FromLocalStorage();

            //for (var i = 0; i < $rootScope.numberOfRows; i++) {
            //
            //    localStorage.setItem('table1_' + i + '_firstname', $rootScope.data[i][0]);
            //    localStorage.setItem('table1_' + i + '_lastname', $rootScope.data[i][1]);
            //    localStorage.setItem('table1_' + i + '_street', $rootScope.data[i][2]);
            //    localStorage.setItem('table1_' + i + '_zipcode', $rootScope.data[i][3]);
            //    localStorage.setItem('table1_' + i + '_city', $rootScope.data[i][4]);
            //    localStorage.setItem('table1_' + i + '_email', $rootScope.data[i][5]);
            //
            //}

            //localStorage.setItem('table1_numberOfAddresses', $rootScope.numberOfRows);
        }

    };

    $scope.fooErrorHandler = function () {
        alert('fooErrorHandler');
    };


    $scope.dbReadyWebSQL = function () {
        console.log('dbReadyWebSQL start');
        $scope.db.transaction(function (tx) {

            tx.executeSql("INSERT INTO einzelwerte(keyName, value) VALUES(?, ?)", [$scope.keyToSave, $scope.valueToSave]);
            console.log('dbReadyWebSQL executed');
        }, $scope.errorHandlerWebSQL, function () {
            console.log('error occured in dbReadyWebSQL')
        });
    };

});