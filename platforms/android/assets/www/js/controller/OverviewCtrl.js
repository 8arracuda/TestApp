sdApp.controller('OverviewCtrl', function ($scope, techSupportFactory) {

    $scope.stringForTitle = 'Overview';
    $scope.stringForRightButton = 'OVV';

    $scope.techniques = techSupportFactory.techSupport();


    //TODO remove at the end - Only a method to generate data - has nothing to do with the tests
    $scope.generate = function () {

        resultString = '"';
        for (var i = 0; i < 5000; i++) {

            resultString = resultString + ',"' +$scope.fillWithZeroes(40, i) + '"';
            //resultString = resultString + ',"' + i + '"';

        }
        console.log(resultString);
    };


    //TODO remove at the end - Only a method to generate data - has nothing to do with the tests
    $scope.fillWithZeroes = function (fillToLength, number) {

        //for (var i = 0; i < 110; i++) {

        var len = number.toString().length;
        //console.log('i: ' + i + ' - ' + len);

        var number_new = '';
        if (len < fillToLength) {
            var zeroesToAdd = fillToLength - len;

            for (var k = 0; k < zeroesToAdd; k++) {
                number_new = '0' + number_new;
            }
            //   i_new = i_new + i;
            //console.log(i_new);
        }
        return number_new + "" + number;

        //}

    };

});