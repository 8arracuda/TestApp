sdApp.controller('DE_LocalStorageStrDatenCtrl', function ($scope, $rootScope) {

    $scope.tableFromWebSQL = [];

    //Method1: As seperate key/value pairs

    $scope.saveTable1ToLocalStorage = function () {

        //alert('will save ' + $rootScope.numberOfRows + " addresses to LocalStorage");

        $scope.deleteTable1FromLocalStorage();

        for (var i = 0; i < $rootScope.numberOfRows; i++) {

            localStorage.setItem('table1_' + i + '_firstname', $rootScope.data[i][0]);
            localStorage.setItem('table1_' + i + '_lastname', $rootScope.data[i][1]);
            localStorage.setItem('table1_' + i + '_street', $rootScope.data[i][2]);
            localStorage.setItem('table1_' + i + '_zipcode', $rootScope.data[i][3]);
            localStorage.setItem('table1_' + i + '_city', $rootScope.data[i][4]);
            localStorage.setItem('table1_' + i + '_email', $rootScope.data[i][5]);

        }

        localStorage.setItem('table1_numberOfAddresses', $rootScope.numberOfRows);

    };

    $scope.loadTable1FromLocalStorage = function () {

        var numberOfRows = localStorage.getItem('table1_numberOfAddresses');

        $scope.tableFromLocalStorage = [];

        for (var i = 0; i < numberOfRows; i++) {

            var address = [];

            address[0] = localStorage.getItem('table1_' + i + '_firstname');
            address[1] = localStorage.getItem('table1_' + i + '_lastname');
            address[2] = localStorage.getItem('table1_' + i + '_street');
            address[3] = localStorage.getItem('table1_' + i + '_zipcode');
            address[4] = localStorage.getItem('table1_' + i + '_city');
            address[5] = localStorage.getItem('table1_' + i + '_email');

            $scope.tableFromLocalStorage.push(address);

        }

    };

    $scope.deleteTable1FromLocalStorage = function () {

        numberOfRows = localStorage.getItem('table1_numberOfAddresses');

        for (var i = 0; i < numberOfRows; i++) {

            localStorage.removeItem('table1_' + i + '_firstname');
            localStorage.removeItem('table1_' + i + '_lastname');
            localStorage.removeItem('table1_' + i + '_street');
            localStorage.removeItem('table1_' + i + '_zipcode');
            localStorage.removeItem('table1_' + i + '_city');
            localStorage.removeItem('table1_' + i + '_email');

        }

        localStorage.removeItem('table1_numberOfAddresses');

    };


    //Method2: As JSON-String with JSON.stringify


    $scope.saveTable2ToLocalStorage = function () {

        //alert('will save ' + $rootScope.numberOfRows + " addresses to LocalStorage");

        var tableToSave = [];
        for (var i = 0; i < $rootScope.numberOfRows; i++) {

            tableToSave.push($rootScope.data[i]);

        }

        localStorage.setItem('table1_JSON', JSON.stringify(tableToSave));

    };

    $scope.loadTable2FromLocalStorage = function () {

        $scope.tableFromLocalStorage = [];
        var tableFromLocalStorage = localStorage.getItem('table1_JSON');
        $scope.tableFromLocalStorage = JSON.parse(tableFromLocalStorage);

    };

    $scope.deleteTable2FromLocalStorage = function () {

        localStorage.removeItem('table1_JSON');

    };

});