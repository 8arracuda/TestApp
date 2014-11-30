sdApp.controller('PL_LocalStorageCtrl', function ($scope, $rootScope) {

    $rootScope.section = 'PL';

    $scope.result = '';
    $scope.isPrepared = false;
    $scope.testInProgress = false;

    $scope.localStorage = localStorage;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'foo';
    $scope.mainTestDecription = 'foo';
    $scope.testName1 = 'TestFoo1';
    $scope.testDecription1 = 'foo1';
    $scope.testName2 = 'TestFoo2';
    $scope.testDecription2 = 'foo2';
    $scope.testName3 = 'TestFoo3';
    $scope.testDecription3 = 'foo3';
    $scope.testName4 = 'TestFoo4';
    $scope.testDecription4 = 'foo4';

    $scope.testA_keyPrexix = "";
    $scope.testA_value = "A";
    $scope.testB_keyPrexix = "";
    $scope.testB_value = "ABCDEFGHIJ";
    $scope.testC_keyPrexix = "THISISAVERYVERYVERYVERYLONGKEY";
    $scope.testC_value = "A";
    $scope.testD_keyPrexix = "THISISAVERYVERYVERYVERYLONGKEY";
    $scope.testD_value = "ABCDEFGHIJ";

    var keyPrefix;
    var value;

    $scope.prepare = function () {
        localStorage.clear();
        $scope.isPrepared = true;
        $scope.currentIteration = '';
        $scope.$apply();
    };


    $scope.reset = function () {

        var answer = confirm('Do you really want to reset this page. All test results will be removed!');

        if (answer) {
            $scope.isPrepared = false;
            $scope.result = '';
            $scope.selectedTestVariant = '';
        }

    };

    $scope.selectTestVariant = function (testVariant) {

        //for showing the name on a button
        $scope.selectedTestVariant = testVariant;


        switch (testVariant) {
            case 'TestLimitA':
                //$scope.keyPrefix = $scope.testA_keyPrexix;
                //$scope.value = $scope.testA_value;
                keyPrefix = $scope.testA_keyPrexix;
                value = $scope.testA_value;
                break;
            case 'TestLimitB':
                //$scope.keyPrefix = $scope.testB_keyPrexix;
                //$scope.value = $scope.testB_value;
                keyPrefix = $scope.testB_keyPrexix;
                value = $scope.testB_value;
                break;
            case 'TestLimitC':
                //$scope.keyPrefix = $scope.testC_keyPrexix;
                //$scope.value = $scope.testC_value;
                keyPrefix = $scope.testC_keyPrexix;
                value = $scope.testC_value;
                break;
            case 'TestLimitD':
                //$scope.keyPrefix = $scope.testD_keyPrexix;
                //$scope.value = $scope.testD_value;
                keyPrefix = $scope.testD_keyPrexix;
                value = $scope.testD_value;
                break;
            default:
                //$scope.keyPrefix = $scope.testA_keyPrexix;
                //$scope.value = $scope.testA_value;
                keyPrefix = $scope.testA_keyPrexix;
                value = $scope.testA_value;

        }

        console.log('selected:' + keyPrefix + ' and ' + value);

    };


    $scope.startPlatformTest = function () {


        //the function writes x-items to LocalStorage.
        //after x-items the UI will be updated to show some progress for the user
        //after that the function will continue
        //It will continue until it reaches max quota.

        function nextLoop() {

            console.log('called nextLoop(' + $scope.currentIteration + ')');
            var limit = 100000;
            try {

                console.log('currentIteration (before loop):' + $scope.currentIteration);
                var i = $scope.currentIteration;
                for (; i < ($scope.currentIteration + limit); i++) {

                    localStorage.setItem(keyPrefix + '' + fillWithZeroes(10, i), value);

                }

                $scope.currentIteration = (parseInt($scope.currentIteration) + limit);

                //without the timeouts the $apply function is not working for updating the UI
                setTimeout(
                    function () {
                        //to update the UI - gives the user an update about the progress as the test progresses
                        $scope.$apply();
                        setTimeout(
                            nextLoop(parseInt($scope.currentIteration)), 500);
                    }, 1000);

            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    console.log('error is QuotaExceededError');

                }

                $scope.result = 'exception at ' + i;
                alert($scope.result);
                console.log('result:' + $scope.result);
                $scope.testInProgress = false;
                $scope.$apply();

            }

        };

        //start the test
        $scope.currentIteration = 0;
        nextLoop();

    };

    //TODO extract this to a factory or service
    function fillWithZeroes(fillToLength, number) {

        var len = number.toString().length;

        var number_new = '';
        if (len < fillToLength) {
            var zeroesToAdd = fillToLength - len;

            for (var k = 0; k < zeroesToAdd; k++) {
                number_new = '0' + number_new;
            }
        }
        return number_new + "" + number;

    };

})
;
