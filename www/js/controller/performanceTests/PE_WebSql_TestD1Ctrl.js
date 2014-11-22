sdApp.controller('PE_WebSql_TestD1Ctrl', function ($scope, $rootScope, testDataFactory) {

    var iteration = 1;

    const dbName = "PE_TestD1";
    const tableName = "PE_TestD1";
    const dbVersion = "1.0";

    $scope.testInProgress = false;

    //TODO Change for real tests
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

    $scope.isPrepared = false;

    $scope.reset = function () {

        var answer = confirm('Do you really want to reset this page. All test results will be removed!');

        if (answer) {
            iteration=1;
            $scope.isPrepared = false;
            $scope.results = [];
            $scope.selectedTestVariant = '';
        }

    };

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestD1a') {
            amountOfData = amountOfData_testD1a;
        } else {
            amountOfData = amountOfData_testD1b;
        }
        console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');

    };

});