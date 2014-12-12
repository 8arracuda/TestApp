sdApp.controller('PL_FileAPICtrl', function ($scope, $rootScope, FileApiDeleteAllFilesFactory, testDataFactory, TestHelperFactory) {

    $rootScope.section = 'PL';

    $scope.result = '';
    $scope.isPrepared = false;
    $scope.testInProgress = false;

    $scope.localStorage = localStorage;

    $scope.selectedTestVariant = '';
    $scope.preparationText = 'foo';
    $scope.mainTestDecription = 'foo';
    $scope.testName1 = 'TestFoo1';
    $scope.testDecription1 = 'foo1';
    $scope.testName2 = 'TestFoo2';
    $scope.testDecription2 = 'foo2';
    $scope.testName3 = 'TestFoo3';
    $scope.testDecription3 = 'foo3';
    $scope.testName4 = 'TestFoo4';
    $scope.testDecription4 = 'foo4';

    $scope.testA_keyPrexix = "";
    $scope.testA_value = "A";
    $scope.testB_keyPrexix = "";
    $scope.testB_value = "ABCDEFGHIJ";
    $scope.testC_keyPrexix = "THISISAVERYVERYVERYVERYLONGKEY";
    $scope.testC_value = "A";
    $scope.testD_keyPrexix = "THISISAVERYVERYVERYVERYLONGKEY";
    $scope.testD_value = "ABCDEFGHIJ";

    $scope.selectTestVariant = function (testVariant) {

        //for showing the name on a button
        $scope.selectedTestVariant = testVariant;


        switch (testVariant) {
            case 'TestLimitA':
                //$scope.keyPrefix = $scope.testA_keyPrexix;
                //$scope.value = $scope.testA_value;
                keyPrefix = $scope.testA_keyPrexix;
                value = $scope.testA_value;
                break;
            case 'TestLimitB':
                //$scope.keyPrefix = $scope.testB_keyPrexix;
                //$scope.value = $scope.testB_value;
                keyPrefix = $scope.testB_keyPrexix;
                value = $scope.testB_value;
                break;
            case 'TestLimitC':
                //$scope.keyPrefix = $scope.testC_keyPrexix;
                //$scope.value = $scope.testC_value;
                keyPrefix = $scope.testC_keyPrexix;
                value = $scope.testC_value;
                break;
            case 'TestLimitD':
                //$scope.keyPrefix = $scope.testD_keyPrexix;
                //$scope.value = $scope.testD_value;
                keyPrefix = $scope.testD_keyPrexix;
                value = $scope.testD_value;
                break;
            default:
                //$scope.keyPrefix = $scope.testA_keyPrexix;
                //$scope.value = $scope.testA_value;
                keyPrefix = $scope.testA_keyPrexix;
                value = $scope.testA_value;

        }

        console.log('selected:' + keyPrefix + ' and ' + value);

    };

    $scope.prepare = function () {
        $scope.prepareInProgress = true;
        $scope.$apply();
        deleteAllFiles = FileApiDeleteAllFilesFactory.deleteAllFiles(function () {

            $scope.isPrepared = true;
            $scope.prepareInProgress = false;
            $scope.$apply();
        });

    };

    $scope.startPlatformTest = function() {

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                var i = 0;

                $scope.testInProgress = true;
                $scope.$apply();
                writeFile();
                var datasetStringToSave = testDataFactory.getDatasetWithOffset(0);
                function writeFile() {

                    //if (i < amountOfData) {
                        //address-id is filename
                        var filename = i + '.txt';
                        console.log('fs.root in writeFile');
                        fs.root.getFile(filename, {create: true}, function (fileEntry) {

                            fileEntry.createWriter(function (fileWriter) {

                                fileWriter.onwriteend = function (e) {

                                    //after one file has been successfully written the next file can be written
                                    i++;
                                    writeFile();
                                };

                                fileWriter.onerror = function (e) {
                                    console.log('Write failed: ' + e.toString());
                                    console.dir(e);
                                };

                                //overwrites the file from the beginning
                                fileWriter.seek(0);
                                //fileWriter.write(JSON.stringify(data[i]));
                                fileWriter.write(JSON.stringify(datasetStringToSave));

                            }, errorHandler);

                        }, errorHandler);
                    //} else {
                    //    console.error('end of loop');
                    //
                    //    alert('end of loop - quota exceeded?!');
                    //}

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
        alert('error!');

        console.log('Error: ' + msg);
    }
});