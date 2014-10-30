sdApp.controller('DE_IndexedDBStrDatenCtrl', function ($scope, $rootScope) {

    $scope.alertFoo = function() {
        //alert('foo');

        //alert($scope.data);
        //alert($scope.tableOriginal);
        //alert($scope.tableFromWebSQL);

        alert('data: ' + $rootScope.data);
        alert('tableOriginal: ' + $rootScope.tableOriginal);
        alert('tableFromWebSQL: ' + $rootScope.tableFromWebSQL);
    }
});
