sdApp.controller('PE_FileAPI_TestC1Ctrl', function ($scope, $rootScope) {
    var iteration = 1;

    $scope.testInProgress = false;

    //TODO kann nicht so bleiben! muss false sein!
    //Löschen der vorhandenen Daten muss noch implementiert werden.
    $scope.isPrepared = true;

    var amountOfData;
    var amountOfData_testC1a = 1000;
    var amountOfData_testC1b = 5000;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestC1a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testC1a + ' items';
    $scope.testName2 = 'TestC1b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testC1b + ' items';

    $scope.results = [];

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestC1a') {
            amountOfData = amountOfData_testC1a;
        } else {
            amountOfData = amountOfData_testC1b;
        }
        console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');

    };

    $scope.reset = function () {

        var answer = confirm('Do you really want to reset this page. All test results will be removed!');

        if (answer) {
            iteration=1;
            $scope.isPrepared = false;
            $scope.results = [];
            $scope.selectedTestVariant = '';
        }

    };

    $scope.startPerformanceTest = function () {

        console.log('saveEinzelwerte');

        $scope.inProgress = true;

        var timeStart = new Date().getTime();
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                var k = 0;

                writeFile();

                function writeFile() {

                    console.log('writeFile (k= ' + k + ')')
                    if (k < amountOfData) {
                        var filename = 'key' + k + '.txt';
                        fs.root.getFile(filename, {create: true}, function (fileEntry) {

                            fileEntry.createWriter(function (fileWriter) {

                                fileWriter.onwriteend = function (e) {

                                    //after write has been successful the next file can be written
                                    k++;
                                    writeFile();
                                };

                                fileWriter.onerror = function (e) {
                                    console.log('Write failed: ' + e.toString());
                                    console.dir(e);
                                };

                                //overwrites the file from the beginning
                                fileWriter.seek(0);
                                fileWriter.write('' + k);

                            }, errorHandler);

                        }, errorHandler);
                    } else {
                        console.error('end of loop');

                        var timeEnd = new Date().getTime();

                        var timeDiff = timeEnd - timeStart;

                        $scope.results.push('iteration ' + iteration + ': ' + timeDiff + ' ms');
                        $scope.testInProgress = false;
                        $scope.isPrepared = false;
                        $scope.$apply();
                        iteration++;
                    }

                }

            },
            errorHandler
        );

    };

    function errorHandler(e) {
        var msg = '';

        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                alert('QUOTA_EXCEEDED_ERR');
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR(1)';
                break;
            case FileError.SECURITY_ERR:
                msg = 'SECURITY_ERR';
                break;
            case FileError.INVALID_MODIFICATION_ERR:
                msg = 'INVALID_MODIFICATION_ERR';
                break;
            case FileError.INVALID_STATE_ERR:
                msg = 'INVALID_STATE_ERR';
                break;
            default:
                msg = 'Unknown Error';
                break;
        }
        ;

        console.log('Error: ' + msg);
    }

});