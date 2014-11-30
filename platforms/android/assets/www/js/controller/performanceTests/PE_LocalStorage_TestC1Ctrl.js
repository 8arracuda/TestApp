sdApp.controller('PE_LocalStorage_TestC1Ctrl', function ($scope, $rootScope, testDataFactory) {
        var iteration = 1;

        //prepare results-array
        var data;
        $scope.results = [];

        $scope.isPrepared = false;

        var amountOfData;
        var amountOfData_testC1a = 100;
        var amountOfData_testC1b = 500;

        $scope.selectedTestVariant = '';
        $scope.preparationText = 'Clears LocalStorage and fetches addressData to be written during the test.';
        $scope.mainTestDecription = 'In this test stores addresses to LocalStorage.';
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

        $scope.startPerformanceTest = function() {

            console.log('method1');
            $scope.testInProgress = true;
            $scope.$apply();


            setTimeout(function () {

                var timeStart = new Date().getTime();

                for (var i = 0; i < amountOfData; ++i) {
                    var addressToSave = data[i];
                    localStorage.setItem(addressToSave[0], JSON.stringify(addressToSave));
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

        function clearLocalStorage() {

            localStorage.clear();

        }

        function loadData() {

            data = testDataFactory.testData();

        }

        $scope.prepare = function () {

            clearLocalStorage();
            loadData();
            $scope.isPrepared = true;

        };

    }
)
;