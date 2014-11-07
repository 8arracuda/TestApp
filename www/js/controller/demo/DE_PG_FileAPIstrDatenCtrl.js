sdApp.controller('DE_PG_FileAPIStrDatenCtrl', function ($scope, $rootScope) {

    $scope.tableFromPGFileAPI = [];

    const filenameForMethod1 = 'table1.txt';
    const filenameForMethod2 = 'table2.txt';


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

                        $scope.cssVarForDestinationTable = 'destinationTableWasUpdated';

                        $scope.$apply();

                        setTimeout(function () {
                            $scope.cssVarForDestinationTable = '';
                            $scope.$apply();
                        }, 1500);

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
                break;
            case FileError.NOT_FOUND_ERR:
                msg = 'NOT_FOUND_ERR';
                $scope.tableFromPGFileAPI = [];

                $scope.cssVarForDestinationTable = 'destinationTableWasUpdated';
                //TODO In Methode auslagern

                $scope.$apply();

                setTimeout(function () {
                    $scope.cssVarForDestinationTable = '';
                    $scope.$apply();
                }, 1500);

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