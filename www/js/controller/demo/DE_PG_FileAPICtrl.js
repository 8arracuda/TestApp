sdApp.controller('DE_PG_FileAPICtrl', function ($scope, $rootScope) {

    $rootScope.section = 'DE';
    //$scope.filelist = [];

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
    //if(!navigator.userAgent==$rootScope.userAgentForDesktopDevelopment1 || $rootScope.UserAgentForDesktopDevelopment2) {

    if (!navigator.userAgent == userAgentForDesktopDevelopment1) {
        $scope.documentsDirectory = cordova.file.documentsDirectory;
    }

    function showFiles() {

        $scope.filelist = [];

        function toArray(list) {
            return Array.prototype.slice.call(list || [], 0);
        }

        function listResults(entries) {
            // Document fragments can improve performance since they're only appended
            // to the DOM once. Only one browser reflow occurs.
            //var fragment = document.createDocumentFragment();

            entries.forEach(function (entry, i) {

                if (entry.isDirectory) {
                    var fileListEntry = {name: entry.name + '[DIR]', value: ""};
                } else {
                    var fileListEntry = {name: entry.name, value: ""};
                }
                $scope.filelist.push(fileListEntry);
                console.log('added ' + fileListEntry.name + ' to filelist-array.');
                $scope.$apply();

                //var img = entry.isDirectory ? '<img src="folder-icon.gif">' :
                //    '<img src="file-icon.gif">';
                //var li = document.createElement('li');
                //li.innerHTML = [img, '<span>', entry.name, '</span>'].join('');
                //fragment.appendChild(li);

            });

            // document.querySelector('#filelist').appendChild(fragment);
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

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024, onInitFs, errorHandler);
    };

    $scope.loadFileContent = function (index) {
        filename = $scope.filelist[index].name;

        function onInitFs8(fs) {

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

        window.requestFileSystem(window.PERSISTENT, 1024 * 1024, onInitFs8, errorHandler);


    }

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