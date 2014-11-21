sdApp.controller('PE_LocalStorage_TestD1Ctrl', function ($scope, $rootScope, testDataFactory) {
    var iteration = 1;

    //prepare results-array
    $scope.results = [];

    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_test1A = 1000;
    var amountOfData_test1B = 5000;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestD1-xk';
    $scope.testDecription1 = 'Stores ' + amountOfData_test1A + ' items';
    $scope.testName2 = 'TestD1-yk';
    $scope.testDecription2 = 'Stores ' + amountOfData_test1B + ' items';

})
;