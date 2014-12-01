sdApp.controller('PE_FileAPI_TestU1Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory) {

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

    function loadData() {

        dataForPreparation = testDataFactory.testData();

    }

    function loadDataForUpdate() {
        dataForUpdate = testDataFactory.testDataForUpdateTests();
    }

    $scope.prepare = function () {

        deleteAllFiles();
        loadData();
        saveAddressData();
        loadDataForUpdate();
        $scope.isPrepared = true;
    };

    function saveAddressData() {

        if (dataForPreparation == null) {
            alert('error: no data loaded');
            console.error('no data loaded (in saveAddressData)');
        } else {

            window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
                function (fs) {

                    function writeAddress(i) {
                        if (i < amountOfData) {
                            var filename = i + '.txt';
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
                            //alert(amountOfData + ' addressfiles has been written.');
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
                    if (i < amountOfData) {
                        var filename = i + '.txt';
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
                                fileWriter.write(JSON.stringify(dataForUpdate[i]));

                            }, errorHandler);
                        }, errorHandler);

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

                }

                var timeStart= new Date().getTime();
                writeAddress(0);

            },
            errorHandler
        );

    }

    function deleteAllFiles() {

        console.log('deleteAllFiles started');
        $scope.filelist = [];
        $scope.loadingInProgress = true;
        $scope.$apply();

        function toArray(list) {
            return Array.prototype.slice.call(list || [], 0);
        }

        function listResults(entries, fs) {

            $scope.loadingInProgress = true;
            $scope.$apply();

            entries.forEach(function (entry, i) {

                if (!entry.isDirectory) {
                    console.log('fs.root in listResults');
                    console.log('entry.name:' + entry.name);

                    var filename = entry.name;

                    if (filename != '.DS_Store') {

                        fs.root.getFile(filename, {create: false}, function (fileEntry) {

                            fileEntry.remove(function () {
                                console.log(filename + ' has been removed.');

                            }, errorHandler);

                        }, errorHandler);

                    }
                }

            });
            $scope.loadingInProgress = false;
            $scope.isPrepared = true;
            $scope.$apply();

        }

        console.log('before');
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024, function (fs) {
            var dirReader = fs.root.createReader();
            var entries = [];

            // Call the reader.readEntries() until no more results are returned.
            var readEntries = function () {
                dirReader.readEntries(function (results) {
                    if (!results.length) {
                        listResults(entries.sort(), fs);
                    } else {
                        entries = entries.concat(toArray(results));
                        readEntries();
                    }
                }, errorHandler);
            };

            readEntries();

        }, errorHandler);
        console.log('after');

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