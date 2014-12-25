sdApp.controller('PL_LocalStorageCtrl', function ($scope, $rootScope, TestHelperFactory, testDataFactory) {

    $rootScope.section = 'PL';

    $scope.result = '';
    $scope.isPrepared = false;
    $scope.testInProgress = false;

    $scope.localStorage = localStorage;

    $scope.prepare = function () {
        localStorage.clear();
        $scope.isPrepared = true;
        $scope.currentIteration = '';
        $scope.$apply();
    };

    //$scope.startPlatformTest = function () {
    //
    //    //the function writes x-items to LocalStorage.
    //    //after x-items the UI will be updated to show some progress for the user
    //    //after that the function will continue
    //    //It will continue until it reaches max quota.
    //
    //    function nextLoop() {
    //
    //        console.log('called nextLoop(' + $scope.currentIteration + ')');
    //        var loopLength= 10000;
    //        try {
    //
    //            console.log('currentIteration (before loop):' + $scope.currentIteration);
    //            var i = $scope.currentIteration;
    //            for (; i < ($scope.currentIteration + loopLength); i++) {
    //
    //                localStorage.setItem(keyPrefix + '' + TestHelperFactory.fillWithZeroes(10, i), value);
    //
    //            }
    //
    //            $scope.currentIteration = (parseInt($scope.currentIteration) + loopLength);
    //
    //            //without the timeouts the $apply function is not working for updating the UI
    //            setTimeout(
    //                function () {
    //                    //to update the UI - gives the user an update about the progress as the test progresses
    //                    $scope.$apply();
    //                    setTimeout(
    //                        nextLoop(parseInt($scope.currentIteration)), 500);
    //                }, 1000);
    //
    //        } catch (e) {
    //            if (e.name === 'QuotaExceededError') {
    //                console.log('error is QuotaExceededError');
    //
    //            }
    //
    //            $scope.result = 'exception at ' + i;
    //            alert($scope.result);
    //            console.log('result:' + $scope.result);
    //            $scope.testInProgress = false;
    //            $scope.$apply();
    //
    //        }
    //
    //    };
    //
    //    //start the test
    //    $scope.currentIteration = 0;
    //    nextLoop();
    //
    //};

    $scope.startPlatformTest = function () {

        //the function writes x-items to LocalStorage.
        //after x-items the UI will be updated to show some progress for the user
        //after that the function will continue
        //It will continue until it reaches max quota.

        function nextLoop() {

            try {

                localStorage.setItem($scope.currentIteration, datasetStringToSave);

                //timeout to allow the UI to update
                //setTimeout(
                  //  function () {
                        //to update the UI - gives the user an update about the progress as the test progresses
                        $scope.currentIteration = (parseInt($scope.currentIteration) + 1);
                        $scope.$apply();
                        setTimeout(
                            nextLoop(), 500);
                    //}, 500);

            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    //console.log('error is QuotaExceededError');
                    $scope.result = { description: 'QuotaExceededError', exceptionInIteration: $scope.currentIteration};
                    $scope.testInProgress = false;
                    $scope.$apply();
                }

            }

        };

        //start the test

        var datasetStringToSave = JSON.stringify(testDataFactory.getDatasetForPlatformTest());
        $scope.testInProgress = false;
        $scope.$apply();

        $scope.currentIteration = 1;
        nextLoop();

    };

})
;
