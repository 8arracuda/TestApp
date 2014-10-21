sdApp.controller('DE_LocalStorageEinzelwerteCtrl', function ($scope) {


    $scope.key = "a";
    $scope.value = "b";

    //$scope.saveEinzelwerte = function () {
    //    if ($scope.key == '' || $scope.value == '') {
    //        alert('You need to enter a key and a value');
    //    } else {
    //        localStorage.setItem($scope.key, $scope.value);
    //        console.log('saved Value ' + $scope.value + ' for key ' + $scope.key);
    //        $scope.key = "";
    //        $scope.value = "";
    //    }
    //
    //};

    $scope.saveEinzelwerte = function () {
        if ($scope.key == '' || $scope.value == '') {
            alert('You need to enter a key and a value');
        } else {
            localStorage.setItem($scope.key, $scope.value);
            console.log('saved Value ' + $scope.value + ' for key ' + $scope.key);
            $scope.key = "";
            $scope.value = "";
        }

    };

    $scope.myTestFunction = function () {
        alert('test');
    }


});