sdApp.controller('PE_FileAPI_TestR1Ctrl', function ($scope, $rootScope) {
    var iteration = 1;

    $scope.testInProgress = false;

    //TODO kann nicht so bleiben! muss false sein!
    //Löschen der vorhandenen Daten muss noch implementiert werden.
    $scope.isPrepared = true;

    var amountOfData;
    var amountOfData_testR1a = 1000;
    var amountOfData_testR1b = 5000;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestR1a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testR1a + ' items';
    $scope.testName2 = 'TestR1b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testR1b + ' items';

    $scope.results = [];

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestR1a') {
            amountOfData = amountOfData_testR1a;
        } else {
            amountOfData = amountOfData_testR1b;
        }
        console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');

    };

});