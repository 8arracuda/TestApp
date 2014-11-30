sdApp.controller('PE_LocalStorage_TestR2Ctrl', function ($scope, $rootScope, testDataFactory) {

    var data;

    var iteration = 1;

    //prepare results-array
    $scope.results = [];

    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testR2a = 1000;
    var amountOfData_testR2b = 5000;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'Read test - random addresses will be loaded';
    $scope.testName1 = 'TestR2a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testR2a + ' items';
    $scope.testName2 = 'TestR2b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testR2b + ' items';



    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestR2a') {
            amountOfData = amountOfData_testR2a;
        } else {
            amountOfData = amountOfData_testR2b;
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

    $scope.startPerformanceTest = function () {
        $scope.testInProgress = true;
        $scope.$apply();

        var addressIdsToLoad = testDataFactory.getRandomIndices();

        if (addressIdsToLoad.length<amountOfData) {
            alert('Warning: Too few address Ids defined. The test will produce wrong results!');
        }

        var timeStart = new Date().getTime();
        for (var i = 0; i < addressIdsToLoad.length; i++) {

            localStorage.getItem('address' + addressIdsToLoad[i]);

            //output to verify the results
            //if (i < 10) {
            //    console.log(localStorage.getItem('address' + addressIdsToLoad[i]));
            //}

        }

        var timeEnd = new Date().getTime();

        var timeDiff = timeEnd - timeStart;
        $scope.results.push('Iteration ' + iteration + ': ' + timeDiff + ' ms');
        $scope.testInProgress = false;
        $scope.$apply();

        iteration++;

    };

    function loadData() {

        data = testDataFactory.testData();

    };

    function saveAddressData() {

        if (data == null) {
            alert('error: no data loaded');
            console.error('no data loaded (in saveAddressData)');
        } else {

            //Same logic as in DE_LocalStorage_strDaten Test-Method 2

            for (var i = 0; i < data.length; i++) {

                //Set the Id as key
                //Address with key 42 is saved with key -address42-
                localStorage.setItem('address' + data[i][0], JSON.stringify(data[i]));

            }

            localStorage.setItem('numberOfAddresses', data.length);

            console.log('saved ' + data.length + ' addresses.');

        }

    };

    function clearLocalStorage() {

        localStorage.clear();


    }

    $scope.prepare = function () {

        clearLocalStorage();
        loadData();
        saveAddressData();
        $scope.isPrepared = true;

    };

});