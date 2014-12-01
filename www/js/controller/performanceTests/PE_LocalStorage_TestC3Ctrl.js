sdApp.controller('PE_LocalStorage_TestC3Ctrl', function ($scope, $rootScope, testDataFactory) {

    var iteration = 1;

    $scope.results = [];

    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testC3a = 1000;
    var amountOfData_testC3b = 5000;

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

        //var datasetFiles = [
        //    'res/data/data01.json',
        //    'res/data/data02.json',
        //    'res/data/data03.json',
        //    'res/data/data05.json'
        //];

        var datasetFiles = [
            'res/data/data_5000_01.json',
            'res/data/data_5000_02.json',
            'res/data/data_5000_03.json',
            'res/data/data_5000_04.json',
            'res/data/data_5000_05.json',
            'res/data/data_5000_06.json',
            'res/data/data_5000_07.json',
            'res/data/data_5000_08.json',
            'res/data/data_5000_09.json',
            'res/data/data_5000_10.json',
            'res/data/data_5000_11.json',
            'res/data/data_5000_12.json'
        ];

        var timeDiffSum = 0;


        //The 5th dataset can't be saved on Safari (iOS 8) due to exceeded quota
        //Error: QuotaExceededError: DOM Exception 22
        //setItem@[native code]
        for (var i = 0; i < 4; i++) {

            var datasetString = testDataFactory.getStringFromFile(datasetFiles[i]);

            var timeStart = new Date().getTime();
            localStorage.setItem('dataset_' + i, datasetString);

            //The time taken is calculated step by step inside the loop
            //because the fetching of the string from the files is also taking
            //a long time. This time is not relevant when looking at the storage-techniques!
            timeDiffSum = +new Date().getTime() - timeStart;
            console.log('saved dataset ' + datasetFiles[i] + ' to localstorage');

        }

        $scope.results.push('Iteration ' + iteration + ': ' + timeDiffSum + ' ms');
        $scope.testInProgress = false;
        $scope.isPrepared = false;
        $scope.$apply();
        iteration++;

    }
});