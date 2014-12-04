sdApp.controller('PE_LocalStorage_TestR2Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory) {

    var dataForPreparation;

    var iteration = 1;

    //prepare results-array
    $scope.results = [];

    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testR2a = PE_ParameterFactory.amountOfData_testR2a;
    var amountOfData_testR2b = PE_ParameterFactory.amountOfData_testR2b;

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

            var addressId =  addressIdsToLoad[i];
            localStorage.getItem(addressId + '_id');
            localStorage.getItem(addressId + '_firstname');
            localStorage.getItem(addressId + '_lastname');
            localStorage.getItem(addressId + '_zipcode');
            localStorage.getItem(addressId + 'city');
            localStorage.getItem(addressId + '_email');
            localStorage.getItem(addressId + '_randomNumber1');
            localStorage.getItem(addressId + '_randomNumber2');

            //---Test-Output to check the returned values---
            //console.log(localStorage.getItem(addressId + '_id'));
            //console.log(localStorage.getItem(addressId + '_firstname'));
            //console.log(localStorage.getItem(addressId + '_lastname'));
            //console.log(localStorage.getItem(addressId + '_zipcode'));
            //console.log(localStorage.getItem(addressId + '_city'));
            //console.log(localStorage.getItem(addressId + '_randomNumber1'));
            //console.log(localStorage.getItem(addressId + '_randomNumber2'));

        }

        var timeEnd = new Date().getTime();

        var timeDiff = timeEnd - timeStart;
        $scope.results.push({iteration:  iteration,  time: timeDiff});
        $scope.testInProgress = false;
        $scope.$apply();

        iteration++;

    };

    function loadDataForPreparation() {

        dataForPreparation = testDataFactory.testData();

    };

    function saveAddressData() {
        console.log('saveAddressData');

            for (var i = 0; i < dataForPreparation.length; ++i) {

                var currentAddress = dataForPreparation[i];
                localStorage.setItem(currentAddress[0] + '_id', currentAddress[0]);
                localStorage.setItem(currentAddress[0] + '_firstname', currentAddress[1]);
                localStorage.setItem(currentAddress[0] + '_lastname', currentAddress[2]);
                localStorage.setItem(currentAddress[0] + '_zipcode', currentAddress[4]);
                localStorage.setItem(currentAddress[0] + '_city', currentAddress[5]);
                localStorage.setItem(currentAddress[0] + '_email', currentAddress[6]);
                localStorage.setItem(currentAddress[0] + '_randomNumber1', currentAddress[7]);
                localStorage.setItem(currentAddress[0] + '_randomNumber2', currentAddress[8]);

            }

    };

    function clearLocalStorage() {

        localStorage.clear();

    }

    $scope.prepare = function () {

        clearLocalStorage();
        loadDataForPreparation();
        saveAddressData();
        $scope.isPrepared = true;
        console.log('prepare function finished');
        $scope.$apply();

    };

});