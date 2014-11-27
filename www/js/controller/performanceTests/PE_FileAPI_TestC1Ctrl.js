sdApp.controller('PE_FileAPI_TestC1Ctrl', function ($scope, $rootScope, testDataFactory) {
    var iteration = 1;

    var fs;
    var data;
    $scope.filelist = [];

    $scope.testInProgress = false;

    $scope.isPrepared = false;

    var amountOfData;
    var amountOfData_testC1a = 100;
    var amountOfData_testC1b = 500;

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
            iteration = 1;
            $scope.isPrepared = false;
            $scope.results = [];
            $scope.selectedTestVariant = '';
        }

    };

    function loadData() {

        data = testDataFactory.testData();

    }

    $scope.prepare = function () {

        loadData();
        deleteAllFiles();

    };

    $scope.startPerformanceTest = function () {

        console.log('saveEinzelwerte');

        $scope.inProgress = true;

        var timeStart = new Date().getTime();
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                var i = 0;

                writeFile();

                function writeFile() {

                    //console.log('writeFile (k= ' + k + ')');
                    if (i < amountOfData) {
                        //address-id is filename
                        var filename = data[i][0] + '.txt';
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
                                fileWriter.write(JSON.stringify(data[i]));
                                //fileWriter.write('' + k);

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

    function deleteAllFiles() {

        console.log('showfiles started');
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

            readEntries(); // Start reading dirs.

        }, errorHandler);
        console.log('after');

    };

    function showFiles() {

        console.log('showfiles started');
        $scope.filelist = [];
        $scope.loadingInProgress = true;
        $scope.$apply();

        function toArray(list) {
            return Array.prototype.slice.call(list || [], 0);
        }

        function listResults(entries) {

            $scope.loadingInProgress = true;
            $scope.$apply();

            entries.forEach(function (entry, i) {

                if (entry.isDirectory) {
                    var fileListEntry = {name: entry.name + ' [DIR]', value: ""};
                } else {
                    var fileListEntry = {name: entry.name, value: ""};
                }

                $scope.filelist.push(fileListEntry);

            });
            $scope.loadingInProgress = false;
            $scope.$apply();

        }


        console.log('before');
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                var dirReader = fs.root.createReader();
                var entries = [];

                // Call the reader.readEntries() until no more results are returned.
                var readEntries = function () {
                    dirReader.readEntries(function (results) {
                        if (!results.length) {
                            listResults(entries.sort());
                        } else {
                            entries = entries.concat(toArray(results));
                            readEntries();
                        }
                    }, errorHandler);
                };

                readEntries(); // Start reading dirs.

            }, errorHandler);
        console.log('after');

    };

});