sdApp.controller('PE_LocalStorage_Test1Ctrl', function ($scope, $rootScope) {
    var iteration = 1;

    //prepare results-array
    $scope.results = [];

    $scope.isPrepared = false;

    var amountOfData = 2000;
    $scope.testDecription = 'Stores ' + amountOfData + ' items';
    $scope.headlineText = 'headlineText1';

    $scope.startPerformanceTest = function () {
        $scope.stringWithResults = 'result';

        var timeStart = new Date().getTime();

        for (i = 0; i < amountOfData; ++i) {
            localStorage.setItem(('test' + i), 'test' + i);
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


    }


});