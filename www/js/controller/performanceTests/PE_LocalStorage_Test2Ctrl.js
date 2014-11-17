sdApp.controller('PE_LocalStorage_Test2Ctrl', function ($scope, $rootScope, testDataFactory) {

    var iteration = 1;
    $scope.testInProgress = false;

    var data;

    $scope.results = [];

    $scope.descriptionText1 = 'Read performance test';
    $scope.headlineText = 'Perf Test 2';

    $scope.loadAddressIds = function () {
        $scope.testInProgress = true;
        $scope.$apply();

        var addressIdsToLoad = [13, 18, 21, 35, 44, 46, 48, 49, 54, 71, 72, 74, 76, 79, 83, 86, 90, 92, 94, 100, 102, 104, 105, 110, 113, 115, 116, 118, 119, 120, 129, 130, 131, 132, 141, 142, 152, 155, 156, 166, 168, 170, 175, 176, 179, 186, 197, 212, 216, 220, 224, 226, 227, 229, 235, 237, 247, 252, 258, 260, 262, 268, 270, 276, 280, 282, 294, 296, 298, 299, 302, 309, 313, 318, 319, 322, 324, 326, 336, 337, 338, 342, 344, 345, 347, 360, 368, 371, 377, 379, 383, 384, 393, 396, 398, 400, 401, 409, 415, 419, 423, 429, 437, 456, 463, 465, 468, 483, 489, 492, 499];

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
        $scope.results.push('iteration ' + iteration + ': ' + timeDiff + ' ms');
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

    };

});