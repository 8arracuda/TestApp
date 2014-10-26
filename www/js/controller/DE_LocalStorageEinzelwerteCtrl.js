sdApp.controller('DE_LocalStorageEinzelwerteCtrl', function ($scope) {

    $scope.keyToLoad  = "a";
    $scope.keyToSave  = "a";
    $scope.valueToSave  = "b";



    $scope.saveEinzelwerte = function () {
        if ($scope.keyToSave  == '' || $scope.valueToSave == '') {
            alert('You need to enter a key and a value');
        } else {
            localStorage.setItem($scope.keyToSave , $scope.valueToSave );
            console.log('saved Value ' + $scope.valueToSave  + ' for key ' + $scope.keyToSave );

        }

    };

    $scope.updateEinzelwerteView = function() {
        $scope.localStorage = localStorage;
        $scope.keyLoaded = $scope.keyToLoad;
        $scope.valueLoadedFromLocalStorage = localStorage.getItem($scope.keyLoaded)
    }

    $scope.removeKeyFromLocalStorage = function() {
        localStorage.removeItem($scope.keyToRemove);
    }


});