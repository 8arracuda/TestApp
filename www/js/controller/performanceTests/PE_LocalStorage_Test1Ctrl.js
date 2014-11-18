sdApp.controller('PE_LocalStorage_Test1Ctrl', function ($scope, $rootScope) {
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
    $scope.testName1 = 'Test1A';
    $scope.testDecription1 = 'Stores ' + amountOfData_test1A + ' items';
    $scope.testName2 = 'Test1B';
    $scope.testDecription2 = 'Stores ' + amountOfData_test1B + ' items';


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

        if (testVariant == 'Test1A') {
            amountOfData = amountOfData_test1A;
        } else {
            amountOfData = amountOfData_test1B;
        }
        console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');

    };

    $scope.startPerformanceTest = function () {

        var timeStart = new Date().getTime();

        for (i = 0; i < amountOfData; ++i) {
            localStorage.setItem(('test' + i), 'test' + i);
        }

        var timeEnd = new Date().getTime();

        var timeDiff = timeEnd - timeStart;

        $scope.results.push('iteration ' + iteration + ': ' + timeDiff + ' ms');
        $scope.isPrepared = false;
        $scope.$apply();
        iteration++;

    };

    $scope.prepare = function () {

        localStorage.clear();
        $scope.isPrepared = true;

    }

});