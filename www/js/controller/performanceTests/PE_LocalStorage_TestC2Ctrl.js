sdApp.controller('PE_LocalStorage_TestC2Ctrl', function ($scope, $rootScope, testDataFactory) {
        var iteration = 1;

        //prepare results-array
        $scope.results = [];

        $scope.isPrepared = false;

        var amountOfData;
        var amountOfData_testC2a = 1000;
        var amountOfData_testC2b = 5000;

        $scope.selectedTestVariant = '';
        $scope.preparationText = 'Explain what the prepare function does...';
        $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
        $scope.testName1 = 'TestC2a';
        $scope.testDecription1 = 'Stores ' + amountOfData_testC2a + ' items';
        $scope.testName2 = 'TestC2b';
        $scope.testDecription2 = 'Stores ' + amountOfData_testC2b + ' items';

        $scope.selectTestVariant = function (testVariant) {
            $scope.selectedTestVariant = testVariant;

            if (testVariant == 'TestC2a') {
                amountOfData = amountOfData_testC2a;
            } else {
                amountOfData = amountOfData_testC2b;
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

        $scope.startPerformanceTest = function () {




        };

        $scope.prepare = function () {

            localStorage.clear();
            $scope.isPrepared = true;

        };

    }
)
;