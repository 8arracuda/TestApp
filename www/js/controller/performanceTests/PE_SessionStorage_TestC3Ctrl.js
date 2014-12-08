sdApp.controller('PE_SessionStorage_TestC3Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory) {

    var iteration = 1;

    $scope.results = [];

    $scope.isPrepared = false;

    var amountOfData_testC3a = PE_ParameterFactory.amountOfData_testC3a;
    var amountOfData = amountOfData_testC3a;

    $scope.selectedTestVariant = 'TestC3a';
    $scope.preparationText = 'Prepare clears all data in SessionStorage.';
    $scope.mainTestDecription = 'Saving long strings (dataset strings)';
    $scope.testName1 = 'TestC3a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testC3a + ' times 4,000 addresses in a single key/value pair.';


    $scope.reset = function () {

        var answer = confirm('Do you really want to reset this page. All test results will be removed!');

        if (answer) {
            iteration = 1;
            $scope.isPrepared = false;
            $scope.results = [];
        }

    };

    $scope.prepare = function () {

        sessionStorage.clear();
        $scope.isPrepared = true;
        console.log('prepare function finished');
        $scope.$apply();
    };

    $scope.startPerformanceTest = function () {

        var timeDiffSum = 0;

        //The 7th dataset can't be saved on Safari (iOS 8) due to exceeded quota
        //Error: QuotaExceededError: DOM Exception 22
        //setItem@[native code]
        for (var i = 0; i < amountOfData; i++) {

            var datasetString = testDataFactory.getDatasetWithOffset(i);

            var timeStart = new Date().getTime();
            try {
                sessionStorage.setItem('dataset_' + i, datasetString);

                //The time taken is calculated step by step inside the loop
                //because the fetching of the string from the files is also taking
                //a long time. This time is not relevant when looking at the storage-techniques!
                timeDiffSum = +new Date().getTime() - timeStart;
                //console.log('saved dataset ' + datasetFiles[i] + ' to localstorage');
            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    alert('quota exceeded when writing dataset_' + i + '. The results for this test cannot be used!');
                    break;
                }
            }

        }

        $scope.results.push({iteration:  iteration,  time: timeDiffSum});
        $scope.testInProgress = false;
        $scope.isPrepared = false;
        $scope.$apply();
        iteration++;

    }
});