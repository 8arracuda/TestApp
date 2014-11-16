sdApp.controller('PE_LocalStorage_Test1Ctrl', function ($scope, $rootScope) {

    //prepare results-array

    $scope.results = [];
    var numberOfIterations = 3;
    for (var i = 0; i < numberOfIterations; i++) {
        //
        //    var result = {finished: false, time: -1};
        var result = -1;
        $scope.results.push(result);
    }

    var amountOfData = 10000;
    $scope.descriptionText1 = 'Stores ' + numberOfIterations + 'x ' + amountOfData + ' items';
    $scope.headlineText = 'headlineText1';

    $scope.startPerformanceTest = function () {
        $scope.stringWithResults = 'result';

        var time;

        myLoop();
        var i = 0;
        //loop logic from
        //https://stackoverflow.com/a/3583740/2405372
        function myLoop() {           //  create a loop function
            setTimeout(function () {

                time = $scope.perf_storeItems(amountOfData);

                //$scope.stringWithResults = $scope.stringWithResults + ', ' + time;
                //$scope.testProgress = i + ' / ' + numberOfTests + ' (in Progress)';

                $scope.results[i] = 'Iteration ' + i + ': ' + time + 'ms';
                $scope.$apply();

                i++;                     //  increment the counter
                if (i < numberOfIterations) {            //  if the counter < 10, call the loop function
                    myLoop();             //  ..  again which will trigger another
                }                        //  ..  setTimeout()
            }, 1000)
        }

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