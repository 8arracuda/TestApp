sdApp.controller('PE_SessionStorage_TestU1Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory) {
    var iteration = 1;

    var dataForUpdate;
    var dataForPreparation;

    //prepare results-array
    $scope.results = [];

    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testU1a = PE_ParameterFactory.amountOfData_testU1a;
    var amountOfData_testU1b = PE_ParameterFactory.amountOfData_testU1b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Clears SessionStorage and saves a predefined set of addresses.';
    $scope.mainTestDecription = 'Tests the performance when updating x items from SessionStorage';
    $scope.testName1 = 'Test U1-500';
    $scope.testDecription1 = 'Stores ' + amountOfData_testU1a + ' items';
    $scope.testName2 = 'Test U1-2000';
    $scope.testDecription2 = 'Stores ' + amountOfData_testU1b + ' items';

    $scope.reset = function () {

        var answer = confirm('Do you really want to reset this page. All test results will be removed!');

        if (answer) {
            iteration = 1;
            $scope.isPrepared = false;
            $scope.results = [];
            $scope.selectedTestVariant = '';
        }

    };

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestU1a') {
            amountOfData = amountOfData_testU1a;
        } else {
            amountOfData = amountOfData_testU1b;
        }
        console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');

    };

    $scope.startPerformanceTest = function () {

        var timeStart = new Date().getTime();

        for (var i = 0; i < amountOfData; ++i) {

            sessionStorage.setItem(dataForUpdate[i][0], JSON.stringify(dataForUpdate[i]));
        }

        var timeEnd = new Date().getTime();

        var timeDiff = timeEnd - timeStart;

        $scope.results.push({iteration:  iteration,  time: timeDiff});
        $scope.isPrepared = false;
        $scope.$apply();
        iteration++;

    };


    function saveAddressData() {

        if (dataForPreparation == null) {
            alert('error: no data loaded');
            console.error('no data loaded (in saveAddressData)');
        } else {

            //Same logic as in DE_SessionStorage_strDaten Test-Method 2

            for (var i = 0; i < dataForPreparation.length; i++) {

                //Set the Id as key
                sessionStorage.setItem(dataForPreparation[i][0], JSON.stringify(dataForPreparation[i]));

            }

            console.log('saved ' + dataForPreparation.length + ' addresses.');

        }

    };

    function clearSessionStorage() {

        sessionStorage.clear();

    }

    function loadDataForPreparation() {

        dataForPreparation = testDataFactory.testData();

    }

    function loadDataForUpdate() {
        dataForUpdate = testDataFactory.testDataForUpdateTests();
    }

    $scope.prepare = function () {

        clearSessionStorage();
        loadDataForPreparation();
        saveAddressData();
        loadDataForUpdate();
        $scope.isPrepared = true;
        console.log('prepare function finished');
        $scope.$apply();
    };

})
;