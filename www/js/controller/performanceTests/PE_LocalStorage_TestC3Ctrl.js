sdApp.controller('PE_LocalStorage_TestC3Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory) {

    var iteration = 1;

    $scope.results = [];

    $scope.isPrepared = false;

    var amountOfData_testC3a = PE_ParameterFactory.amountOfData_testC3a;
    var amountOfData = amountOfData_testC3a;

    $scope.selectedTestVariant = 'Test C3a';
    $scope.preparationText = 'The prepare function will clear all data stored with localStorage';
    $scope.mainTestDecription = 'The test stores datasets, with 4000 addresses each, into one key-value pair';
    $scope.testName1 = 'Test C3-6';
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

        localStorage.clear();
        $scope.isPrepared = true;
        console.log('prepare function finished');
        $scope.$apply();
    };

    $scope.startPerformanceTest = function () {

        console.log('startPerformanceTest');
        var timeDiffSum = 0;

        //The 7th dataset can't be saved on Safari (iOS 8) due to exceeded quota
        //Error: QuotaExceededError: DOM Exception 22
        //setItem@[native code]
        for (var i = 0; i < amountOfData; i++) {

            var datasetString = JSON.stringify(testDataFactory.getDatasetWithOffset(i));
            console.log(datasetString.length);

            var timeStart = new Date().getTime();
            try {
                localStorage.setItem('dataset_' + i, datasetString);

                //The time taken is calculated step by step inside the loop
                //because the fetching of the string from the files is also taking
                //a long time. This time is not relevant when looking at the storage-techniques!
                timeDiffSum += new Date().getTime() - timeStart;
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