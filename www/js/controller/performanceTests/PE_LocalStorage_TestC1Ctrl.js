sdApp.controller('PE_LocalStorage_TestC1Ctrl', function ($scope, $rootScope, testDataFactory) {
        var iteration = 1;

        //prepare results-array
        $scope.results = [];

        $scope.isPrepared = false;

        var amountOfData;
        var amountOfData_testC1a = 1000;
        var amountOfData_testC1b = 5000;

        $scope.selectedTestVariant = '';
        $scope.preparationText = 'Explain what the prepare function does...';
        $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
        $scope.testName1 = 'TestC1a';
        $scope.testDecription1 = 'Stores ' + amountOfData_testC1a + ' items';
        $scope.testName2 = 'TestC1b';
        $scope.testDecription2 = 'Stores ' + amountOfData_testC1b + ' items';



        $scope.selectTestVariant = function (testVariant) {
            $scope.selectedTestVariant = testVariant;

            if (testVariant == 'TestC1a') {
                amountOfData = amountOfData_testC1a;
            } else {
                amountOfData = amountOfData_testC1b;
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

            $scope.testInProgress = true;
            $scope.$apply();


            setTimeout(function() {

                //Load array with data to be saved
                //var data = testDataFactory.getDataFromFile('res/0_to_5000.txt');
                //var data = testDataFactory.getDataFromFile('res/0_to_5000_4chars.txt');
                //var data = testDataFactory.getDataFromFile('res/0_to_5000_8chars.txt');
                var data = testDataFactory.getDataFromFile('res/0_to_5000_40chars.txt');


                var timeStart = new Date().getTime();

                var itemToWrite;
                for (var i = 0; i < amountOfData; ++i) {
                    itemToWrite = data[i];
                    localStorage.setItem(itemToWrite, itemToWrite);
                }

                var timeEnd = new Date().getTime();

                var timeDiff = timeEnd - timeStart;

                $scope.results.push('iteration ' + iteration + ': ' + timeDiff + ' ms');
                $scope.isPrepared = false;
                $scope.testInProgress = false;
                $scope.$apply();
                iteration++;
            }, 2000);



        };

        $scope.prepare = function () {

            localStorage.clear();
            $scope.isPrepared = true;

        };

    }
)
;