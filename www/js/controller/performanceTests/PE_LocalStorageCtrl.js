sdApp.controller('PE_LocalStorageCtrl', function ($scope, $rootScope) {

    $rootScope.section = 'PE';


    $scope.enableTab_Actions = function () {
        $scope.tab = 1;
        $scope.stringForTitle = 'LocalStorage - Actions';
        $scope.stringForRightButton = 'ACT';
    }

    $scope.enableTab_List = function () {
        $scope.tab = 2;
        $scope.stringForTitle = 'LocalStorage - List';
        $scope.stringForRightButton = 'LST';
    }

    $scope.enableTab_Edit = function () {
        $scope.tab = 3;
        $scope.stringForTitle = 'LocalStorage - Edit';
        $scope.stringForRightButton = 'EDIT';
    }

    $scope.enableTab_Perf = function () {
        $scope.tab = 4;
        $scope.stringForTitle = 'LocalStorage - Perf';
        $scope.stringForRightButton = 'PER';
    }

    $scope.enableTab_Image = function () {
        $scope.tab = 5;
        $scope.stringForTitle = 'LocalStorage - Image';
        $scope.stringForRightButton = 'IMG';
    }

    $scope.enableTab_List2 = function () {
        $scope.tab = 6;
        $scope.stringForTitle = 'LocalStorage - List2';
        $scope.stringForRightButton = 'LST2';
    }


    $scope.stringWithResults = '';
    $scope.localStorage = [];
    $scope.localStorage = localStorage;

    $scope.myOverlayTitle = 'title';
    $scope.myOverlayText = 'text';

    var numberOfTests = 3;
    $scope.results = [];

    for (var i = 0; i < numberOfTests; i++) {
        //
        //    var result = {finished: false, time: -1};
        var result = -1;
        $scope.results.push(result);
    }



    $scope.showAlert = function () {
        alert('foo');
        ;
    };

    $scope.openOverlay = function (title, text) {
        $scope.myOverlayTitle = 'key: ' + title;
        $scope.myOverlayText = 'value: ' + text;
        //$scope.myOverlayText = text;
        $scope.toggle('myOverlay', 'on');
    };

    $scope.enableTab_Actions();

    $scope.startPerformanceTest = function () {
        $scope.stringWithResults = 'result';

        var time;

        myLoop();
        var i = 0;
        //loop logic from
        //https://stackoverflow.com/a/3583740/2405372
        function myLoop() {           //  create a loop function
            setTimeout(function () {    //  call a 3s setTimeout when the loop is called

                time = $scope.perf_storeItems(10000);

                //$scope.stringWithResults = $scope.stringWithResults + ', ' + time;
                //$scope.testProgress = i + ' / ' + numberOfTests + ' (in Progress)';

                $scope.results[i] = 'Iteration ' + i + ': ' + time + 'ms';
                $scope.$apply();

                i++;                     //  increment the counter
                if (i < numberOfTests) {            //  if the counter < 10, call the loop function
                    myLoop();             //  ..  again which will trigger another
                }                        //  ..  setTimeout()
            }, 1000)
        }

    };

    $scope.perf_storeItems = function (amountOfData) {
        //console.log('perf_storeItems(' + amount + ') started');

        var timeStart = new Date().getTime();

        for (i = 0; i < amountOfData; ++i) {
            localStorage.setItem(('test' + i), 'test' + i);
        }

        var timeEnd = new Date().getTime();

        for (i = 0; i < amountOfData; ++i) {
            localStorage.removeItem(('test' + i));
        }

        timeDiff = timeEnd - timeStart;


        return timeDiff;
    };

});