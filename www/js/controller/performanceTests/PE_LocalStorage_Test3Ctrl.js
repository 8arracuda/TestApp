sdApp.controller('PE_LocalStorage_Test3Ctrl', function ($scope, $rootScope, testDataFactory) {

    var iteration = 1;

    //prepare results-array
    $scope.testInProgress = false;
    $scope.results = [];

    $scope.isPrepared = false;

    $scope.testDecription = 'Saving long strings (dataset strings) ------ Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';
    $scope.headlineText = 'Perf Test 3';

    $scope.prepare = function () {
        localStorage.clear();
        $scope.isPrepared = true;
    }

    $scope.startPerformanceTest = function () {

        var datasetFiles = [
            'res/data/data01.json',
            'res/data/data02.json',
            'res/data/data03.json',
            'res/data/data05.json'
        ];

        var timeDiffSum = 0;

        for (var i = 0; i < 2; i++) {

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