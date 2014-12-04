sdApp.controller('PE_FileAPI_TestR3Ctrl', function ($scope, $rootScope, testDataFactory, PE_ParameterFactory, FileApiDeleteAllFilesFactory) {
    var iteration = 1;

    var data;

    $scope.testInProgress = false;

    //TODO change to false
    $scope.isPrepared = true;

    var amountOfData;
    var amountOfData_testR3a = PE_ParameterFactory.amountOfData_testR3a;
    var amountOfData_testR3b = PE_ParameterFactory.amountOfData_testR3b;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'Explain what the prepare function does...';
    $scope.mainTestDecription = 'In this test x simple key-value pairs are saved.';
    $scope.testName1 = 'TestR3a';
    $scope.testDecription1 = 'Stores ' + amountOfData_testR3a + ' items';
    $scope.testName2 = 'TestR3b';
    $scope.testDecription2 = 'Stores ' + amountOfData_testR3b + ' items';

    $scope.results = [];

    $scope.selectTestVariant = function (testVariant) {
        $scope.selectedTestVariant = testVariant;

        if (testVariant == 'TestR3a') {
            amountOfData = amountOfData_testR3a;
        } else {
            amountOfData = amountOfData_testR3b;
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
            loadData();
            saveAddressData();
            $scope.isPrepared = true;
            $scope.prepareInProgress=false;
            console.log('prepare function finished');
            $scope.$apply();
        });


    };


    //Sequential requests for fetching the addresses
    $scope.startPerformanceTest_variant2 = function () {
        console.log('startPerformanceTest_variant2');
        //var callbackNumber = 0;
        $scope.testInProgress = true;
        //$scope.$apply();

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
                    console.log('loadAddress start (' + i + ')');
                    //  if (i < addressIdsToLoad.length) {

                    var filename = 'address_' + addressIdsToLoad[i] + '.txt';
                    console.log('trying to load ' + filename);
                    fs.root.getFile(filename, {}, function (fileEntry) {

                        // Get a File object representing the file,
                        // then use FileReader to read its contents.
                        fileEntry.file(function (file) {
                            var reader = new FileReader();

                            reader.onloadend = function (e) {
                                //loadAddress(i++);
                                if (i == addressIdsToLoad.length-1) {
                                    var timeEnd = new Date().getTime();

                                    var timeDiff = timeEnd - timeStart;
                                    $scope.results.push('Iteration ' + iteration + ': ' + timeDiff + ' ms');
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
                    //}
                    //      console.log('loadAddress end (' + i + ')');
                }

                //              console.log('before(2)');
                loadAddress(0);
//                console.log('after(2)');

            },
            errorHandler
        )
        ;
        //console.log('after');

        //function addOne() {
        //    callbackNumber++;
        //    if (callbackNumber == addressIdsToLoad.length) {
        //        var timeEnd = new Date().getTime();
        //
        //        var timeDiff = timeEnd - timeStart;
        //        $scope.results.push('Iteration ' + iteration + ': ' + timeDiff + ' ms');
        //        $scope.testInProgress = false;
        //        $scope.$apply();
        //
        //        iteration++;
        //    }
        //
        //
        //}

    };


    //asynchronous requests for fetching the addresses
    $scope.startPerformanceTest_variant1 = function () {
        var callbackNumber = 0;
        $scope.testInProgress = true;
        $scope.$apply();

        var addressIdsToLoad = [13, 18, 21, 35, 44, 46, 48, 49, 54, 71, 72, 74, 76, 79, 83, 86, 90, 92, 94, 100, 102, 104, 105, 110, 113, 115, 116, 118, 119, 120, 129, 130, 131, 132, 141, 142, 152, 155, 156, 166, 168, 170, 175, 176, 179, 186, 197, 212, 216, 220, 224, 226, 227, 229, 235, 237, 247, 252, 258, 260, 262, 268, 270, 276, 280, 282, 294, 296, 298, 299, 302, 309, 313, 318, 319, 322, 324, 326, 336, 337, 338, 342, 344, 345, 347, 360, 368, 371, 377, 379, 383, 384, 393, 396, 398, 400, 401, 409, 415, 419, 423, 429, 437, 456, 463, 465, 468, 483, 489, 492, 499];

        var timeStart = new Date().getTime();

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                for (var i = 0; i < addressIdsToLoad.length; i++) {

                    var filename = 'address_' + addressIdsToLoad[i] + '.txt';
                    console.log('trying to load ' + filename);
                    fs.root.getFile(filename, {}, function (fileEntry) {

                        // Get a File object representing the file,
                        // then use FileReader to read its contents.
                        fileEntry.file(function (file) {
                            var reader = new FileReader();

                            reader.onloadend = function (e) {
                                addOne();

                            };

                            reader.readAsText(file);
                        }, errorHandler);
                    }, errorHandler);
                }
            },
            errorHandler
        )
        ;

        function addOne() {
            callbackNumber++;
            if (callbackNumber == addressIdsToLoad.length) {
                var timeEnd = new Date().getTime();

                var timeDiff = timeEnd - timeStart;
                $scope.results.push('Iteration ' + iteration + ': ' + timeDiff + ' ms');
                $scope.testInProgress = false;
                $scope.$apply();

                iteration++;
            }


        }

    };

    function loadData() {

        data = testDataFactory.testData();

    };

    function saveAddressData() {

        if (data == null) {
            alert('error: no data loaded');
            console.error('no data loaded (in saveAddressData)');
        } else {

            window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
                function (fs) {

                    function writeAddress(i) {
                        if (i < amountOfData) {
                            var filename = 'address_' + i + '.txt';
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
                                    fileWriter.write(JSON.stringify(data[i]));

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