sdApp.controller('PE_LocalStorage_TestC3Ctrl', function ($scope, $rootScope, testDataFactory) {

    var iteration = 1;

    $scope.results = [];

    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testC3a = 4;
    var amountOfData_testC3b = 12;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'Saving long strings (dataset strings)';
    $scope.testName1 = 'TestC3a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testC3a + ' items';
    $scope.testName2 = 'TestC3b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testC3b + ' items';


    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestC3a') {
            amountOfData = amountOfData_testC3a;
        } else {
            amountOfData = amountOfData_testC3b;
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

    $scope.prepare = function () {
        localStorage.clear();
        $scope.isPrepared = true;
    };

    $scope.startPerformanceTest = function () {

        var datasetFiles = testDataFactory.getArrayWithDatasetFilenames();

        var timeDiffSum = 0;

        //The 5th dataset can't be saved on Safari (iOS 8) due to exceeded quota
        //Error: QuotaExceededError: DOM Exception 22
        //setItem@[native code]
        for (var i = 0; i < amountOfData; i++) {

            var datasetString = testDataFactory.getStringFromFile(datasetFiles[i]);

            var timeStart = new Date().getTime();
            try {
                localStorage.setItem('dataset_' + i, datasetString);


                //The time taken is calculated step by step inside the loop
                //because the fetching of the string from the files is also taking
                //a long time. This time is not relevant when looking at the storage-techniques!
                timeDiffSum = +new Date().getTime() - timeStart;
                console.log('saved dataset ' + datasetFiles[i] + ' to localstorage');
            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    alert('quota exceeded when writing dataset_' + i + '. The results for this test cannot be used!');
                    break;
                }
            }

        }

        $scope.results.push('Iteration ' + iteration + ': ' + timeDiffSum + ' ms');
        $scope.testInProgress = false;
        $scope.isPrepared = false;
        $scope.$apply();
        iteration++;

    }
});