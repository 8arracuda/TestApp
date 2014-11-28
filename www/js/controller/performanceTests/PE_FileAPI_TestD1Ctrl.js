sdApp.controller('PE_FileAPI_TestD1Ctrl', function ($scope, $rootScope, testDataFactory) {

    var iteration = 1;

    $scope.testInProgress = false;

    //TODO kann nicht so bleiben! muss false sein!
    //Löschen der vorhandenen Daten muss noch implementiert werden.
    $scope.isPrepared = true;

    var amountOfData;
    var amountOfData_testD1a = 1000;
    var amountOfData_testD1b = 5000;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestD1a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testD1a + ' items';
    $scope.testName2 = 'TestD1b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testD1b + ' items';

    $scope.results = [];

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestD1a') {
            amountOfData = amountOfData_testD1a;
        } else {
            amountOfData = amountOfData_testD1b;
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

});