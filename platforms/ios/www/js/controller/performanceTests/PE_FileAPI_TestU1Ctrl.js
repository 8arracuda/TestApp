sdApp.controller('PE_FileAPI_TestU1Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory, FileApiDeleteAllFilesFactory) {

    var dataForUpdate;
    var dataForPreparation;

    var iteration = 1;

    $scope.testInProgress = false;

    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testU1a = PE_ParameterFactory.amountOfData_testU1a;
    var amountOfData_testU1b = PE_ParameterFactory.amountOfData_testU1b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestU1a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testU1a + ' items';
    $scope.testName2 = 'TestU1b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testU1b + ' items';

    $scope.results = [];

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestU1a') {
            amountOfData = amountOfData_testU1a;
        } else {
            amountOfData = amountOfData_testU1b;
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

    function loadDataForPreparation() {

        dataForPreparation = testDataFactory.testData();

    }

    function loadDataForUpdate() {
        dataForUpdate = testDataFactory.testDataForUpdateTests();
    }

    $scope.prepare = function () {
        $scope.prepareInProgress=true;
        $scope.$apply();
        deleteAllFiles = FileApiDeleteAllFilesFactory.deleteAllFiles(function() {
            loadDataForPreparation()
            saveAddressData();
            loadDataForUpdate();
            $scope.isPrepared = true;
            $scope.prepareInProgress=false;
            $scope.$apply();
        });

    };

    //function saveAddressData() {
    //
    //    if (dataForPreparation == null) {
    //        alert('error: no data loaded');
    //        console.error('no data loaded (in saveAddressData)');
    //    } else {
    //
    //        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
    //            function (fs) {
    //
    //                function writeAddress(i) {
    //                    if (i < amountOfData) {
    //                        var filename = i + '.txt';
    //                        fs.root.getFile(filename, {create: true}, function (fileEntry) {
    //
    //                            fileEntry.createWriter(function (fileWriter) {
    //
    //                                fileWriter.onwriteend = function (e) {
    //                                    console.log(fileEntry.name + ' written successfully.');
    //
    //                                    //calls the function again to write the next file
    //                                    writeAddress(i + 1);
    //                                };
    //
    //                                fileWriter.onerror = function (e) {
    //                                    console.log('Write failed: ' + e.toString());
    //                                    console.dir(e);
    //                                };
    //
    //                                //overwrites the file from the beginning
    //                                fileWriter.seek(0);
    //                                fileWriter.write(JSON.stringify(dataForPreparation[i]));
    //
    //                            }, errorHandler);
    //                        }, errorHandler);
    //
    //                    } else {
    //                        //alert(amountOfData + ' addressfiles has been written.');
    //                    }
    //
    //                }
    //
    //                writeAddress(0);
    //
    //            },
    //            errorHandler
    //        );
    //
    //    }
    //
    //};

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
                            console.log(dataForPreparation.length + ' addressfiles has been written.');
                        }

                    }

                    writeAddress(0);

                },
                errorHandler
            );

        }

    };

    $scope.startPerformanceTest = function () {

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                function writeAddress(i) {
                    //
                        //var filename = i + '.txt';
                    var filename = 'address_' + i + '.txt';
                        fs.root.getFile(filename, {create: true}, function (fileEntry) {

                            fileEntry.createWriter(function (fileWriter) {

                                fileWriter.onwriteend = function (e) {
                                    console.log(fileEntry.name + ' written successfully.');

                                    //calls the function again to write the next file
                                    if (i < amountOfData) {
                                    writeAddress(i + 1);
                                        } else {

                                            //console.log(amountOfData + ' addressfiles has been written.');
                                            var timeEnd = new Date().getTime();

                                            var timeDiff = timeEnd - timeStart;

                                            $scope.results.push('iteration ' + iteration + ': ' + timeDiff + ' ms');
                                            $scope.testInProgress = false;
                                            $scope.isPrepared = false;
                                            $scope.$apply();
                                            iteration++;
                                    }
                                };

                                fileWriter.onerror = function (e) {
                                    console.log('Write failed: ' + e.toString());
                                    console.dir(e);
                                };

                                //overwrites the file from the beginning
                                fileWriter.seek(0);
                                fileWriter.write(JSON.stringify(dataForUpdate[i]));

                            }, errorHandler);
                        }, errorHandler);

                    //} else {
                    //    //console.log(amountOfData + ' addressfiles has been written.');
                    //    var timeEnd = new Date().getTime();
                    //
                    //    var timeDiff = timeEnd - timeStart;
                    //
                    //    $scope.results.push('iteration ' + iteration + ': ' + timeDiff + ' ms');
                    //    $scope.testInProgress = false;
                    //    $scope.isPrepared = false;
                    //    $scope.$apply();
                    //    iteration++;
                    //}

                }

                var timeStart= new Date().getTime();
                writeAddress(0);

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