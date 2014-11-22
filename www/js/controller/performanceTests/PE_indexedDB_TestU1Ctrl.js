sdApp.controller('PE_IndexedDB_TestU1Ctrl', function ($scope, $rootScope, testDataFactory) {

    var iteration = 1;
    const dbName = "PE_TestU1";
    const objStoreName = "PE_TestU1";

    $scope.databaseOpened = false;
    $scope.testInProgress = false;
    $scope.isPrepared = false;

    //TODO Change for real tests
    var amountOfData;
    var amountOfData_testU1a = 1000;
    var amountOfData_testU1b = 5000;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestU1a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testU1a + ' items';
    $scope.testName2 = 'TestU1b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testU1b + ' items';

    $scope.results = [];


    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestU1a') {
            amountOfData = amountOfData_testU1a;
        } else {
            amountOfData = amountOfData_testU1b;
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