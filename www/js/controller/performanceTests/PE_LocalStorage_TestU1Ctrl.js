sdApp.controller('PE_LocalStorage_TestU1Ctrl', function ($scope, $rootScope, testDataFactory) {
    var iteration = 1;

    //prepare results-array
    $scope.results = [];

    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testU1a = 1000;
    var amountOfData_testU1b = 5000;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Clears LocalStorage and saves a predefined set of addresses.';
    $scope.mainTestDecription = 'Tests the performance when updating x items from LocalStorage';
    $scope.testName1 = 'TestU1a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testU1a + ' items';
    $scope.testName2 = 'TestU1b';
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

        //Load array with data to be saved
        //var data = testDataFactory.getDataFromFile('res/0_to_5000.txt');
        //var data = testDataFactory.getDataFromFile('res/0_to_5000_4chars.txt');
        //var data = testDataFactory.getDataFromFile('res/0_to_5000_8chars.txt');
        var data = testDataFactory.getDataFromFile('res/0_to_5000_40chars.txt');

        var timeStart = new Date().getTime();

        for (var i = 0; i < amountOfData; ++i) {

            localStorage.setItem(data[i], data[amountOfData-i]);
        }

        var timeEnd = new Date().getTime();

        var timeDiff = timeEnd - timeStart;

        $scope.results.push('iteration ' + iteration + ': ' + timeDiff + ' ms');
        $scope.isPrepared = false;
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

})
;