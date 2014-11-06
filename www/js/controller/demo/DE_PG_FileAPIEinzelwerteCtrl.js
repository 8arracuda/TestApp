sdApp.controller('DE_PG_FileAPIEinzelwerteCtrl', function ($scope, $rootScope) {

        $scope.keyToLoad = "a";
        $scope.keyToSave = "a";
        $scope.valueToSave = "b";
        $scope.keyToRemove = "";

        $scope.saveEinzelwerte = function () {
            //if ($scope.keyToSave == '' || $scope.valueToSave == '') {
            //    alert('You need to enter a key and a value');
            //} else {
            //    localStorage.setItem($scope.keyToSave, $scope.valueToSave);
            //    console.log('saved Value ' + $scope.valueToSave + ' for key ' + $scope.keyToSave);
            //
            //}
        };

        $scope.updateEinzelwerteView = function () {
            //$scope.localStorage = localStorage;
            //$scope.keyLoaded = $scope.keyToLoad;
            //$scope.valueLoadedFromLocalStorage = localStorage.getItem($scope.keyLoaded)
        };

        $scope.removeKeyFromFileAPI = function () {
            //localStorage.removeItem($scope.keyToRemove);
        };




    // Note: The file system has been prefixed as of Google Chrome 12:
    //window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

    $scope.InitTemporaryFs = function () {
        alert('InitTemporaryFs');
        //Code von http://www.html5rocks.com/en/tutorials/file/filesystem/
        window.requestFileSystem(window.TEMPORARY, 5*1024*1024 , onInitFs, errorHandler);
    };

    $scope.InitPersistentFs = function () {
        alert('InitPersistentFs');
        //Code von http://www.html5rocks.com/en/tutorials/file/filesystem/
        window.requestFileSystem(window.PERSISTENT, 5*1024*1024 , onInitFs, errorHandler);
    };


    $scope.createFile = function() {

        window.requestFileSystem(window.PERSISTENT, 5*1024*1024 , onInitFs2, errorHandler);


    };

    function onInitFs2(fs) {

        fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {

            // fileEntry.isFile === true
            // fileEntry.name == 'log.txt'
            // fileEntry.fullPath == '/log.txt'

        }, errorHandler);

    }

    function onInitFs(fs) {
        console.log('Opened file system: ' + fs.name);
    }

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
        };

        console.log('Error: ' + msg);
    }




});