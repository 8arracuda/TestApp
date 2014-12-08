sdApp.controller('PE_LocalStorage_TestR3Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory) {

    var data;

    var iteration = 1;

    //prepare results-array
    $scope.results = [];

    $scope.isPrepared = false;

    var amountOfData = PE_ParameterFactory.amountOfData_testR3a;


    $scope.selectedTestVariant = 'TestR3a';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'Read test - random addresses will be loaded';
    $scope.testName1 = 'TestR3a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testR3a + ' items';
    //$scope.testName2 = 'TestR3b';
    //$scope.testDecription2 = 'Stores ' + amountOfData_testR3b + ' items';


    //$scope.selectTestVariant = function (testVariant) {
    //    $scope.selectedTestVariant = testVariant;
    //
    //    if (testVariant == 'TestR3a') {
    //        amountOfData = amountOfData_testR3a;
    //    } else {
    //        amountOfData = amountOfData_testR3b;
    //    }
    //    console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');
    //
    //};

    $scope.reset = function () {

        var answer = confirm('Do you really want to reset this page. All test results will be removed!');

        if (answer) {
            iteration = 1;
            $scope.isPrepared = false;
            $scope.results = [];
        }

    };

    $scope.startPerformanceTest = function () {
        $scope.testInProgress = true;
        $scope.$apply();

        var timeStart = new Date().getTime();
        for (var i = 0; i < amountOfData; i++) {

            localStorage.getItem('dataset_' + i);
            //---Test-Output to check the returned values---
            console.log(localStorage.getItem('dataset_' + i));
            console.log(localStorage.getItem('dataset_' + i));

        }

        var timeEnd = new Date().getTime();

        var timeDiff = timeEnd - timeStart;
        $scope.results.push({iteration: iteration, time: timeDiff});
        $scope.testInProgress = false;
        $scope.$apply();

        iteration++;

    };

    //TODO: Problem -> geht nur bis ...1
    function saveAddressData() {
        console.log('in saveAddressData 1');

        for (var i = 0; i < amountOfData; i++) {
            console.log('in saveAddressData 2');
            //var datasetString = testDataFactory.getDatasetWithOffset(i);
            var datasetString = testDataFactory.getDatasetWithOffset(i);
            console.log('in saveAddressData 3');
            try {
                console.log('in saveAddressData 4');
                localStorage.setItem('dataset_' + i, datasetString);
                console.log('in saveAddressData 5');
            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    alert('quota exceeded when writing dataset_' + i + '. The results for this test cannot be used!');
                    break;
                }
            }
            console.log('in saveAddressData 6');
        }
    };

    function clearLocalStorage() {

        localStorage.clear();

    }

    $scope.prepare = function () {

        clearLocalStorage();
        saveAddressData();
        $scope.isPrepared = true;
        console.log('prepare function finished');
        $scope.$apply();

    };

});