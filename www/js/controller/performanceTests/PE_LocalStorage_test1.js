sdApp.controller('PE_LocalStorage_Test1Ctrl', function ($scope, $rootScope) {
    var iteration = 1;

    //prepare results-array
    $scope.results = [];

    var amountOfData = 10000;
    $scope.descriptionText1 = 'Stores ' + amountOfData + ' items';
    $scope.headlineText = 'headlineText1';

    $scope.startPerformanceTest = function () {
        $scope.stringWithResults = 'result';

        var time = $scope.perf_storeItems(amountOfData);

        $scope.results.push('iteration ' + iteration + ': ' + time + ' ms');
        $scope.$apply();

        iteration++;

    };

    $scope.perf_storeItems = function (amountOfData) {
        console.log('perf_storeItems(' + amountOfData + ') started');

        var timeStart = new Date().getTime();

        for (i = 0; i < amountOfData; ++i) {
            localStorage.setItem(('test' + i), 'test' + i);
        }

        var timeEnd = new Date().getTime();

        for (i = 0; i < amountOfData; ++i) {
            localStorage.removeItem(('test' + i));
        }

        var timeDiff = timeEnd - timeStart;

        return timeDiff;
    };

});