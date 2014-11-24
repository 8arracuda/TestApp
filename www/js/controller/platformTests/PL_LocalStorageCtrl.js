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
    $scope.testA_value = "Z";
    $scope.testB_keyPrexix = "";
    $scope.testB_value = "ZZ";
    $scope.testC_keyPrexix = "THISISAVERYVERYVERYVERYLONGKEY";
    $scope.testC_value = "Z";
    $scope.testD_keyPrexix = "THISISAVERYVERYVERYVERYLONGKEY";
    $scope.testD_value = "ZZ";

    var keyPrefix;
    var value;

    $scope.prepare = function () {
        localStorage.clear();
        $scope.isPrepared = true;
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

        //console.log('selected:' + $scope.keyPrefix + ' and ' + $scope.value);
        console.log('selected:' + keyPrefix + ' and ' + value);

        //if (testVariant == 'TestC1a') {
        //amountOfData = amountOfData_testC1a;
        //} else {
        //amountOfData = amountOfData_testC1b;
        //}
        //   console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');

    };

    //$scope.startPlatformTest = function () {
    //
    //    //var answer = confirm('This test will delete all entries in LocalStorage. Do you want to continue?');
    //
    //    //if (answer) {
    //
    //    $scope.testInProgress = true;
    //    $scope.currentIteration = 0;
    //    $scope.$apply();
    //
    //
    //    //delay the execution for one second to allow the ui to update
    //    setTimeout(function () {
    //
    //        try {
    //
    //
    //            var interval = setInterval(function(){
    //                $scope.currentIteration = i;
    //                $scope.$apply();
    //            }, 1000);
    //
    //            for (var i = 0; true; i++) {
    //
    //                localStorage.setItem(keyPrefix + i, value);
    //
    //            }
    //
    //            clearInterval(interval);
    //
    //        } catch (e) {
    //            if (e.name === 'QuotaExceededError') {
    //                console.log('error is QuotaExceededError');
    //            }
    //
    //            //  alert(functionName + ': Quota Exceeded Error at:' + i);
    //            //console.log(e);
    //            //alert(e);
    //            //console.log(JSON.stringify(e));
    //            //alert(JSON.stringify(e));
    //            $scope.result = 'exception at ' + i;
    //            $scope.testInProgress = false;
    //            $scope.$apply();
    //
    //        }
    //
    //        //removes everything that was saved, to avoid further slowdowns
    //        localStorage.clear();
    //        //}
    //
    //    }, 1000);
    //
    //
    //};

    $scope.startPlatformTest = function () {

        //var answer = confirm('This test will delete all entries in LocalStorage. Do you want to continue?');

        //if (answer) {

        $scope.testInProgress = true;
        $scope.currentIteration = 0;
        $scope.$apply();
        var i;


        //delay the execution for one second to allow the ui to update
        setTimeout(function () {

            //function recursiveLoop(startIndex) {
            //    //for (var i = startIndex; 10000; i++) {
            //
            //    //    localStorage.setItem(keyPrefix + startIndex, value);
            //
            //    //}
            //
            //    if (startIndex % 50000 == 0) {
            //        setTimeout(function () {
            //            //console.log(startIndex);
            //            $scope.currentIteration = startIndex;
            //            $scope.$apply();
            //            return recursiveLoop(startIndex + 1);
            //        }, 1000);
            //
            //    } else {
            //        return recursiveLoop(startIndex + 1);
            //    }
            //}

            function loopTestLimit(startIndex, iterations) {
                for (var i = startIndex; iterations; i++) {
                    localStorage.setItem(keyPrefix + startIndex, value);
                }

            }
            $scope.currentIteration = 0;
            try {

                var interval = setInterval(function () {
                    loopTestLimit($scope.currentIteration);
                    $scope.currentIteration = $scope.currentIteration+50000;
                    $scope.$apply();
                }, 2000);

                //i = 0;
                //i = recursiveLoop(i);

                //for (var i = 0; true; i++) {
                //    $scope.currentIteration = i * 50000;
                //    $scope.$apply();
                //    setTimeout(function () {
                //
                //        loopTestLimit(i * 50000, 50000);
                //
                //
                //    }, 1000);
                //
                //}

                //var interval = setInterval(function () {
                //    $scope.currentIteration = i;
                //    $scope.$apply();
                //}, 1000);


                //for (var i = 0; true; i++) {
                //
                //    localStorage.setItem(keyPrefix + i, value);
                //
                //}

                //clearInterval(interval);

            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    console.log('error is QuotaExceededError');
                }

                //  alert(functionName + ': Quota Exceeded Error at:' + i);
                //console.log(e);
                //alert(e);
                //console.log(JSON.stringify(e));
                //alert(JSON.stringify(e));
                $scope.result = 'exception at ' + $scope.currentIteration;
                $scope.testInProgress = false;
                $scope.$apply();

            }

            //removes everything that was saved, to avoid further slowdowns
            localStorage.clear();
            //}

        }, 1000);


    };

    //$scope.testLimit1 = function () {
    //    //Key-Prefix: ""
    //    //Value: ZZ
    //    saveKeys("testLimit1", "", "Z");
    //
    //
    //};
    //
    //$scope.testLimit2 = function () {
    //    //Key-Prefix: ""
    //    //Value: ZZ
    //    saveKeys("testLimit2", "", "ZZ");
    //
    //};
    //
    //$scope.testLimit3 = function () {
    //    //Key-Prefix: "THISISAVERYVERYVERYVERYLONGKEY"
    //    //Value: Z
    //    saveKeys("testLimit3", "THISISAVERYVERYVERYVERYLONGKEY", "Z");
    //
    //};
    //
    //$scope.testLimit4 = function () {
    //    //Key-Prefix: "THISISAVERYVERYVERYVERYLONGKEY"
    //    //Value: ZZ
    //    saveKeys("testLimit4", "THISISAVERYVERYVERYVERYLONGKEY", "ZZ");
    //
    //};


});