sdApp.controller('PE_FileAPI_TestR1Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory, FileApiDeleteAllFilesFactory) {
    var iteration = 1;

    var dataForPreparation;

    $scope.testInProgress = false;

    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testR1a = PE_ParameterFactory.amountOfData_testR1a;
    var amountOfData_testR1b = PE_ParameterFactory.amountOfData_testR1b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestR1-500';
    $scope.testDecription1 = 'Stores ' + amountOfData_testR1a + ' items';
    $scope.testName2 = 'TestR1-2000';
    $scope.testDecription2 = 'Stores ' + amountOfData_testR1b + ' items';

    $scope.results = [];

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestR1a') {
            amountOfData = amountOfData_testR1a;
        } else {
            amountOfData = amountOfData_testR1b;
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

    $scope.prepare = function () {
        $scope.prepareInProgress=true;
        $scope.$apply();
        deleteAllFiles = FileApiDeleteAllFilesFactory.deleteAllFiles(function() {
            loadForPreparationData();
            saveAddressData();
            $scope.isPrepared = true;
            $scope.prepareInProgress=false;
            console.log('prepare function finished');
            $scope.$apply();
        });

    };


    //sequential requests for fetching the addresses
    //$scope.startPerformanceTest_sequential = function () {
    $scope.startPerformanceTest = function () {
        console.log('startPerformanceTest_variant2');
        //var callbackNumber = 0;
        $scope.testInProgress = true;
        $scope.$apply();


        var addressIdsToLoad = testDataFactory.getRandomIndices();


        if (addressIdsToLoad.length<amountOfData) {
            alert('Warning: Too few address Ids defined. The test will produce wrong results!');
        }

        var timeStart = new Date().getTime();
        console.log('before');
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                //var callbackNumber = 0;
                function loadAddress(i) {

                    var filename = addressIdsToLoad[i] + '.txt';
                    console.log('trying to load ' + filename);
                    fs.root.getFile(filename, {}, function (fileEntry) {

                        // Get a File object representing the file,
                        // then use FileReader to read its contents.
                        fileEntry.file(function (file) {
                            var reader = new FileReader();

                            reader.onloadend = function (e) {

                                //---Test-Output to check the returned values---
                                //console.log(JSON.stringify(this.result));
                                if (i == PE_TestR1_indexToCheck) {
                                    console.log('check Test R1:' + JSON.stringify(this.result));
                                }

                                if (i == addressIdsToLoad.length-1) {

                                    var timeEnd = new Date().getTime();

                                    var timeDiff = timeEnd - timeStart;
                                    $scope.results.push({iteration:  iteration,  time: timeDiff});
                                    $scope.testInProgress = false;
                                    $scope.$apply();

                                    iteration++;
                                } else {
                                    loadAddress(i + 1);
                                }
                            };

                            reader.readAsText(file);
                        }, errorHandler);
                    }, errorHandler);
                }

                loadAddress(0);

            },
            errorHandler
        );

    };


    //Not working on Android -> NOT_FOUND_ERR(1)
    ////asynchronous requests for fetching the addresses
    //$scope.startPerformanceTest_parallel = function () {
    //    var callbackNumber = 0;
    //    $scope.testInProgress = true;
    //    $scope.$apply();
    //
    //    var addressIdsToLoad = testDataFactory.getRandomIndices();
    //
    //    var timeStart = new Date().getTime();
    //
    //    window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
    //        function (fs) {
    //
    //            for (var i = 0; i < addressIdsToLoad.length; i++) {
    //
    //                var filename = 'address_' + addressIdsToLoad[i] + '.txt';
    //
    //                fs.root.getFile(filename, {}, function (fileEntry) {
    //
    //                    // Get a File object representing the file,
    //                    // then use FileReader to read its contents.
    //                    fileEntry.file(function (file) {
    //                        var reader = new FileReader();
    //
    //                        reader.onloadend = function (e) {
    //
    //                            //---Test-Output to check the returned values---
    //                            //console.log(JSON.stringify(this.result));
    //
    //                            callbackNumber++;
    //                            if (callbackNumber == amountOfData) {
    //                                var timeEnd = new Date().getTime();
    //
    //                                var timeDiff = timeEnd - timeStart;
    //                                $scope.results.push({iteration:  iteration,  time: timeDiff});
    //                                $scope.testInProgress = false;
    //                                $scope.$apply();
    //
    //                                iteration++;
    //                            }
    //
    //                        };
    //
    //                        reader.readAsText(file);
    //                    }, errorHandler);
    //                }, errorHandler);
    //            }
    //        },
    //        errorHandler
    //    )
    //    ;
    //
    //
    //
    //};

    function loadForPreparationData() {

        dataForPreparation = testDataFactory.testData();

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
                            var filename = id + '.txt';
                            fs.root.getFile(filename, {create: true}, function (fileEntry) {

                                fileEntry.createWriter(function (fileWriter) {

                                    fileWriter.onwriteend = function (e) {
                                            //fileentry has been written successfully.');

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