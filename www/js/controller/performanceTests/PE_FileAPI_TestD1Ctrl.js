sdApp.controller('PE_FileAPI_TestD1Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory, FileApiDeleteAllFilesFactory) {

    var iteration = 1;

    var dataForPreparation;

    $scope.testInProgress = false;

    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testD1a = PE_ParameterFactory.amountOfData_testD1a;
    var amountOfData_testD1b = PE_ParameterFactory.amountOfData_testD1b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestD1a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testD1a + ' items';
    $scope.testName2 = 'TestD1b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testD1b + ' items';

    $scope.results = [];

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestD1a') {
            amountOfData = amountOfData_testD1a;
        } else {
            amountOfData = amountOfData_testD1b;
        }
        console.log('selectedTestVariant= ' + $scope.selectedTestVariant + ' (amountOfData= ' + amountOfData + ')');

    };

    function loadDataForPreparation() {

        dataForPreparation = testDataFactory.testData();

    }

    $scope.startPerformanceTest = function () {
        console.log('deleteAllFiles started');
        $scope.filelist = [];
        $scope.testInProgress = true;
        $scope.$apply();

        //function toArray(list) {
        //    return Array.prototype.slice.call(list || [], 0);
        //}

        var deletedFilesCounter = 0;
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024, function (fs) {
            for (var i = 0; i < amountOfData; i++) {

                var filename = 'address_' + i + '.txt';

                if (filename != '.DS_Store') {

                    var timeStart = new Date().getTime();
                    fs.root.getFile(filename, {create: false}, function (fileEntry) {

                        fileEntry.remove(function () {
                            deletedFilesCounter++;
                            if (deletedFilesCounter == amountOfData) {
                                var timeEnd = new Date().getTime();

                                var timeDiff = timeEnd - timeStart;

                                $scope.results.push({iteration:  iteration,  time: timeDiff});
                                $scope.testInProgress = false;
                                $scope.isPrepared = false;
                                $scope.$apply();
                                iteration++;
                            }

                            console.log(filename + ' has been removed.');

                        }, errorHandler);

                    }, errorHandler);

                }
            }
        }, errorHandler);

        $scope.testInProgress = false;
        $scope.$apply();


        //console.log('before');
        //window.requestFileSystem(window.PERSISTENT, 1024 * 1024, function (fs) {
        //    var dirReader = fs.root.createReader();
        //    var entries = [];
        //
        //    // Call the reader.readEntries() until no more results are returned.
        //    var readEntries = function () {
        //        dirReader.readEntries(function (results) {
        //            if (!results.length) {
        //                listResults(entries.sort(), fs);
        //            } else {
        //                entries = entries.concat(toArray(results));
        //                readEntries();
        //            }
        //        }, errorHandler);
        //    };
        //
        //    readEntries();
        //
        //}, errorHandler);
        //console.log('after');
    };

    $scope.prepare = function () {

        deleteAllFiles = FileApiDeleteAllFilesFactory.deleteAllFiles(function() {
            alert('all files deleted!');
            loadDataForPreparation()
            saveAddressData();
            $scope.isPrepared = true;
            $scope.$apply();

        });

    };

    function saveAddressData() {

        if (dataForPreparation == null) {
            alert('error: no data loaded');
            console.error('no data loaded (in saveAddressData)');
        } else {

            window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
                function (fs) {

                    function writeAddress(i) {
                        //if (i < amountOfData) {
                        if (i < dataForPreparation.length) {
                            var id = dataForPreparation[i][0];
                            var filename = 'address_' + id + '.txt';
                            fs.root.getFile(filename, {create: true}, function (fileEntry) {

                                fileEntry.createWriter(function (fileWriter) {

                                    fileWriter.onwriteend = function (e) {
                                        console.log(fileEntry.name + ' written successfully.');

                                        //calls the function again to write the next file
                                        writeAddress(i + 1);
                                    };

                                    fileWriter.onerror = function (e) {
                                        console.log('Write failed: ' + e.toString());
                                        console.dir(e);
                                    };

                                    //overwrites the file from the beginning
                                    fileWriter.seek(0);
                                    fileWriter.write(JSON.stringify(dataForPreparation[i]));

                                }, errorHandler);
                            }, errorHandler);

                        } else {
                            alert(amountOfData + ' addressfiles has been written.');
                        }

                    }

                    writeAddress(0);

                },
                errorHandler
            );

        }

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

    //FileApiDeleteAllFilesFactory




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

})
;