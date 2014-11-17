sdApp.controller('PE_FileAPI_Test1Ctrl', function ($scope, $rootScope) {
    var iteration = 1;

    $scope.testInProgress = false;

    //TODO kann nicht so bleiben! muss false sein!
    $scope.isPrepared = true;

    //TODO Change for real tests
    var amountOfData = 100;
    $scope.testDecription = 'Stores ' + amountOfData + ' items (files)';

    $scope.results = [];

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