sdApp.controller('DE_PG_FileAPIStrDatenCtrl', function ($scope, $rootScope) {

    $scope.tableFromPGFileAPI = [];

    const filenameForMethod1 = 'table1';
    const filenameForMethod1NumberOfRows = 'table1_numberOfRows.txt';
    const filenameForMethod2 = 'table2.txt';


    $scope.saveTable1ToPGFileAPI = function () {


        ////write files; one file per row in sourceTable
        //for (var i = 0; i < $rootScope.numberOfRows; i++) {
        //    filename = filenameForMethod1 + '_' + i + '.txt';
        //    window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
        //        function (fs) {
        //
        //            //var filename = filenameForMethod1;
        //
        //            fs.root.getFile(filename, {create: true}, function (fileEntry) {
        //
        //                fileEntry.isFile === true;
        //                fileEntry.name == filename;
        //                fileEntry.fullPath == '/' + filename;
        //
        //                fileEntry.createWriter(function (fileWriter) {
        //
        //                    fileWriter.onwriteend = function (e) {
        //                        console.log(fileEntry.name + ' writen successfully.');
        //                        //alert('filename:' + fileEntry.name + " url:" + fileEntry.toURL());
        //                    };
        //
        //                    fileWriter.onerror = function (e) {
        //                        console.log('Write failed: ' + e.toString());
        //                    };
        //
        //                    //overwrites the file from the beginning
        //                    fileWriter.seek(0);
        //                    fileWriter.write(JSON.stringify($rootScope.data[i]));
        //                    //alert('table has been saved');
        //
        //                }, errorHandler);
        //
        //            }, errorHandler);
        //        },
        //        errorHandler
        //    );
        //}

        //write files; one file per row in sourceTable
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                for (var i = 0; i < $rootScope.numberOfRows; i++) {
                    //var filename = filenameForMethod1;

                    var filename = filenameForMethod1 + '_' + i + '.txt';
                    fs.root.getFile(filename, {create: true}, function (fileEntry) {

                        //fileEntry.isFile === true;
                        //fileEntry.name == filename;
                        //fileEntry.fullPath == '/' + filename;

                        fileEntry.createWriter(function (fileWriter) {

                            fileWriter.onwriteend = function (e) {
                                console.log(fileEntry.name + ' writen successfully.');
                                //alert('filename:' + fileEntry.name + " url:" + fileEntry.toURL());
                            };

                            fileWriter.onerror = function (e) {
                                console.log('Write failed: ' + e.toString());
                            };

                            //overwrites the file from the beginning
                            fileWriter.seek(0);
                            fileWriter.write(JSON.stringify($rootScope.data[i]));
                            //alert('table has been saved');

                        }, errorHandler);

                    }, errorHandler);
                }
            },
            errorHandler
        );


        //write numberOfRows to file "table1_numberOfRows"
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                filename = filenameForMethod1NumberOfRows;
                fs.root.getFile(filename, {create: true}, function (fileEntry) {

                    fileEntry.isFile === true;
                    fileEntry.name == filename;
                    fileEntry.fullPath == '/' + filename;

                    fileEntry.createWriter(function (fileWriter) {

                        fileWriter.onwriteend = function (e) {
                            console.log(fileEntry.name + ' writen successfully.');
                            //alert('filename:' + fileEntry.name + " url:" + fileEntry.toURL());
                        };

                        fileWriter.onerror = function (e) {
                            console.log('Write failed: ' + e.toString());
                        };

                        //overwrites the file from the beginning
                        fileWriter.seek(0);
                        fileWriter.write(JSON.stringify($rootScope.numberOfRows));
                        //alert('table has been saved');

                    }, errorHandler);

                }, errorHandler);

            },
            errorHandler
        );

    };

    $scope.loadTable1FromPGFileAPI = function () {

        var numberOfRows;

        function readNumberOfRows(fs) {


            //read NumberOfRows
            //var filename = filenameForMethod1NumberOfRows;
            fs.root.getFile(filenameForMethod1NumberOfRows, {}, function (fileEntry) {

                // Get a File object representing the file,
                // then use FileReader to read its contents.
                fileEntry.file(function (file) {
                    var reader = new FileReader();

                    reader.onloadend = function (e) {


                        //$scope.tableFromPGFileAPI = [];
                        //$scope.tableFromPGFileAPI = JSON.parse(this.result);
                        //alert(numberOfRows);
                        //highlightDestinationTableTitle($scope);


                        numberOfRows = this.result;

                        alert('numberOfRows:' + numberOfRows + ' - starting loop');

                        for (var i = 0; i < numberOfRows; i++) {

                            filename = filenameForMethod1 + '_' + i + '.txt';

                            fs.root.getFile(filename, {}, function (fileEntry) {

                                // Get a File object representing the file,
                                // then use FileReader to read its contents.
                                fileEntry.file(function (file) {
                                    var reader = new FileReader();

                                    reader.onloadend = function (e) {

                                        if (i == 0) {
                                            alert(this.result);
                                        }

                                        //numberOfRows = this.result;
                                        var address = JSON.parse(this.result);

                                        $scope.tableFromPGFileAPI.push(address);
                                        $scope.$apply();
                                    };

                                    reader.readAsText(file);
                                }, errorHandler);

                            }, errorHandler);

                        }

                    };

                    reader.readAsText(file);
                }, errorHandler);

            }, errorHandler2);
        };

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024, readNumberOfRows, errorHandler);


        //window.requestFileSystem(window.PERSISTENT, 1024 * 1024, readNumberOfRows, errorHandler);

    };

    $scope.saveTable2ToPGFileAPI = function () {

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024,
            function (fs) {

                var filename = filenameForMethod2;

                fs.root.getFile(filename, {create: true}, function (fileEntry) {

                    fileEntry.isFile === true;
                    fileEntry.name == filename;
                    fileEntry.fullPath == '/' + filename;

                    fileEntry.createWriter(function (fileWriter) {

                        fileWriter.onwriteend = function (e) {
                            console.log('Write completed.');
                            alert('filename:' + fileEntry.name + " url:" + fileEntry.toURL());
                            //$scope.inProgress = false;
                            //$scope.$apply();
                        };

                        fileWriter.onerror = function (e) {
                            console.log('Write failed: ' + e.toString());
                        };

                        //saves a subset of $rootScope.data to tableToSave
                        var tableToSave = [];
                        for (var i = 0; i < $rootScope.numberOfRows; i++) {

                            tableToSave.push($rootScope.data[i]);

                        }

                        //overwrites the file from the beginning
                        fileWriter.seek(0);
                        fileWriter.write(JSON.stringify(tableToSave));

                        alert('table has been saved');

                    }, errorHandler);

                }, errorHandler);

            },
            errorHandler
        );

    };


    $scope.loadTable2FromPGFileAPI = function () {

        function onInitFs5(fs) {


            var filename = filenameForMethod2;
            fs.root.getFile(filename, {}, function (fileEntry) {

                // Get a File object representing the file,
                // then use FileReader to read its contents.
                fileEntry.file(function (file) {
                    var reader = new FileReader();

                    reader.onloadend = function (e) {

                        alert(this.result);
                        alert(JSON.parse(this.result));
                        $scope.tableFromPGFileAPI = [];
                        $scope.tableFromPGFileAPI = JSON.parse(this.result);

                        highlightDestinationTableTitle($scope);

                    };

                    reader.readAsText(file);
                }, errorHandler);

            }, errorHandler2);
        };

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024, onInitFs5, errorHandler);

    };

    $scope.deleteTable2FromPGFileAPI = function () {
        var filename = filenameForMethod2;
        //$scope.inProgress = true;

        console.log('deleteTable2FromPGFileAPI');
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024, function (fs) {

            fs.root.getFile(filename, {create: false}, function (fileEntry) {

                fileEntry.remove(function () {
                    console.log(filename + ' has been removed.');

                    //$scope.inProgress = false;
                    //$scope.$apply();
                }, errorHandler);

            }, errorHandler);
        }, errorHandler);

    };

    function errorHandler(e) {
        var msg = '';

        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                alert('QUOTA_EXCEEDED_ERR');
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR';
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

    function errorHandler2(e) {
        var msg = '';

        switch (e.code) {
            case FileError.QUOTA_EXCEEDED_ERR:
                msg = 'QUOTA_EXCEEDED_ERR';
                alert('QUOTA_EXCEEDED_ERR');

                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR';
                $scope.tableFromPGFileAPI = [];

                highlightDestinationTableTitle($scope);

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