angular.module('FileApiDeleteAllFilesFactory', [])
    .factory('FileApiDeleteAllFilesFactory', function () {
        return {
            deleteAllFiles: function (callback) {

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


                    console.log('Error: ' + msg);
                }

                console.log('deleteAllFiles started');
                //$scope.filelist = [];
                //$scope.loadingInProgress = true;
                //$scope.$apply();


                function toArray(list) {
                    return Array.prototype.slice.call(list || [], 0);
                }

                function listResults(entries, fs) {

                    //scope.loadingInProgress = true;
                    //$scope.$apply();

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
                    //scope.loadingInProgress = false;
                    //scope.isPrepared = true;
                    //scope.$apply();
                   // callback();

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
                                callback();
                            } else {
                                entries = entries.concat(toArray(results));
                                readEntries();
                            }
                        }, errorHandler);
                    };

                    readEntries();

                }, errorHandler);
                console.log('after');

            }

        };
    });