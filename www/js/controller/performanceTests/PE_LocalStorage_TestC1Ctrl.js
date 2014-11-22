sdApp.controller('PE_LocalStorage_TestC1Ctrl', function ($scope, $rootScope, testDataFactory) {
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
        $scope.testName1 = 'TestC1-xk';
        $scope.testDecription1 = 'Stores ' + amountOfData_test1A + ' items';
        $scope.testName2 = 'TestC1-yk';
        $scope.testDecription2 = 'Stores ' + amountOfData_test1B + ' items';




        //TODO remove at the end - Only a method to generate data - has nothing to do with the tests
        $scope.generate = function () {

            resultString = '"';
            for (var i = 0; i < 5000; i++) {

                resultString = resultString + ',"' +$scope.fillWithZeroes(40, i) + '"';
                //resultString = resultString + ',"' + i + '"';

            }
            console.log(resultString);
        };


        //TODO remove at the end - Only a method to generate data - has nothing to do with the tests
        $scope.fillWithZeroes = function (fillToLength, number) {

            //for (var i = 0; i < 110; i++) {

            var len = number.toString().length;
            //console.log('i: ' + i + ' - ' + len);

            var number_new = '';
            if (len < fillToLength) {
                var zeroesToAdd = fillToLength - len;

                for (var k = 0; k < zeroesToAdd; k++) {
                    number_new = '0' + number_new;
                }
                //   i_new = i_new + i;
                //console.log(i_new);
            }
            return number_new + "" + number;

            //}

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
            $scope.$apply();
            iteration++;

        };

        $scope.prepare = function () {

            localStorage.clear();
            $scope.isPrepared = true;

        };

    }
)
;