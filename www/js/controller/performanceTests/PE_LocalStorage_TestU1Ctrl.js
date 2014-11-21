sdApp.controller('PE_LocalStorage_TestU1Ctrl', function ($scope, $rootScope, testDataFactory) {
    var iteration = 1;

    //prepare results-array
    $scope.results = [];

    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testU1a = 1000;
    var amountOfData_testU1b = 5000;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestU1-xk';
    $scope.testDecription1 = 'Stores ' + amountOfData_testU1a + ' items';
    $scope.testName2 = 'TestU1-yk';
    $scope.testDecription2 = 'Stores ' + amountOfData_testU1b + ' items';

})
;