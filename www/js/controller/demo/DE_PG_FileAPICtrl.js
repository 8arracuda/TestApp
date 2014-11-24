sdApp.controller('DE_PG_FileAPICtrl', function ($scope, $rootScope) {

    $rootScope.section = 'DE';
    $scope.filelist = [];

    //<für alle Tabs>
    $scope.stringForRightButton = 'show files';
    $scope.stringForTitle = 'File API-Plugin';
    $scope.functionForRightButton = function () {
        $rootScope.toggle('myOverlay', 'on');
        showFiles();
    };
    //</für alle Tabs>

    $scope.enableTab_einzelwerte = function () {
        $scope.tab = 1;
        //$scope.stringForTitle = 'LocalStorage';
        //$scope.stringForRightButton = 'EZW';
    };

    $scope.enableTab_strDaten = function () {
        $scope.tab = 2;
        //$scope.stringForTitle = 'LS - strDaten';
        //$scope.stringForRightButton = 'STR';
    };

    $scope.enableTab_mediendaten = function () {
        $scope.tab = 3;
        //$scope.stringForTitle = 'LS Mediendaten';
        //$scope.stringForRightButton = 'MED';
    };

    $scope.enableTab_einzelwerte();

    //Functions for the Overlay

    //TODO For debugging in Chrome (remove at the end)
    if (navigator.userAgent == userAgentForDesktopDevelopment1 || navigator.userAgent == userAgentForDesktopDevelopment2) {
        $scope.documentsDirectory = cordova.file.documentsDirectory;
    }


    $scope.reloadFileList = function() {
     showFiles();
    };

    function showFiles() {

        console.log('showfiles started');
        $scope.filelist = [];

        function toArray(list) {
            return Array.prototype.slice.call(list || [], 0);
        }

        function listResults(entries) {

            if (entries.length > 100) {
                alert('Showing ' + entries.length + ' files - This may take a while.');
            }

            entries.forEach(function (entry, i) {

                if (entry.isDirectory) {
                    var fileListEntry = {name: entry.name + '[DIR]', value: ""};
                } else {
                    var fileListEntry = {name: entry.name, value: ""};
                }

                $scope.filelist.push(fileListEntry);

            });
            $scope.$apply();

        }

        function onInitFs(fs) {

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

        }

        console.log('before');
        window.requestFileSystem(window.PERSISTENT, 1024 * 1024, onInitFs, errorHandler);
        console.log('after');

    };

    $scope.loadFileContent = function (index) {
        filename = $scope.filelist[index].name;

        function getFileContent(fs) {

            fs.root.getFile(filename, {}, function (fileEntry) {

                // Get a File object representing the file,
                // then use FileReader to read its contents.
                fileEntry.file(function (file) {
                    var reader = new FileReader();

                    reader.onloadend = function (e) {

                        $scope.filelist[index].value = this.result;
                        $scope.$apply();
                    };

                    reader.readAsText(file);
                }, errorHandler);

            }, errorHandler);
        };

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024, getFileContent, errorHandler);


    };

    $scope.deleteFile = function (filename) {
        var answer = confirm('do you really want to delete key "' + filename + '"?')

        if (answer == true) {
            window.requestFileSystem(window.PERSISTENT, 1024 * 1024, function (fs) {
                //var filename = f
                fs.root.getFile(filename, {create: false}, function (fileEntry) {

                    fileEntry.remove(function () {
                        console.log(filename + ' has been removed.');

                        $scope.inProgress = false;
                        $scope.$apply();
                    }, errorHandler);

                }, errorHandler);
            }, errorHandler);
        }
    };

    $scope.deleteAllFiles = function () {

        if ($scope.filelist.length == 0) {
            alert('Cannot delete files - No files found');
        } else {

            window.requestFileSystem(window.PERSISTENT, 1024 * 1024, function (fs) {
                var filename = $scope.filelist[0].name;
                fs.root.getFile(filename, {create: false}, function (fileEntry) {

                    fileEntry.remove(function () {
                        console.log(filename + ' has been removed.');

                        $scope.inProgress = false;
                        $scope.$apply();
                    }, errorHandler);

                }, errorHandler);
            }, errorHandler);

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

});