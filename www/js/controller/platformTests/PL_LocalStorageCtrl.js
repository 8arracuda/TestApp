sdApp.controller('PL_LocalStorageCtrl', function ($scope, $rootScope) {

    $rootScope.section = 'PL';

    $scope.localStorage = localStorage;


    function saveKeys(functionName, keyPrefix, value) {

        var answer = confirm('This test will delete all entries in LocalStorage. Do you want to continue?');

        if (answer) {

            localStorage.clear();

            try {
                for (var i = 0; true; i++) {

                    localStorage.setItem(keyPrefix + i, value);

                }
            } catch (e) {
                if (e.name === 'QuotaExceededError') {
                    console.log('error is QuotaExceededError');
                }
                alert(functionName + ': Quota Exceeded Error at:' + i);
                console.log(e);
                alert(e);
                console.log(JSON.stringify(e));
                alert(JSON.stringify(e));

            }

            localStorage.clear();
        }

    }

    $scope.findLimit1 = function () {
        //No Key-Prefix
        //Value: ZZ
        saveKeys("findLimit1", "", "Z");


    };

    $scope.findLimit2 = function () {
        //No Key-Prefix
        //Value: ZZ
        saveKeys("findLimit2", "", "ZZ");

    };

    $scope.findLimit3 = function () {
        //Key-Prefix: THISISAVERYVERYVERYVERYLONGKEY
        //Value: Z
        saveKeys("findLimit3", "THISISAVERYVERYVERYVERYLONGKEY", "Z");

    };

    $scope.findLimit4 = function () {
        //Key-Prefix: THISISAVERYVERYVERYVERYLONGKEY
        //Value: ZZ
        saveKeys("findLimit4", "THISISAVERYVERYVERYVERYLONGKEY", "ZZ");

    };

});