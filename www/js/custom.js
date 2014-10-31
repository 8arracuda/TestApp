var sdApp = angular.module('sdApp', ["ngRoute", "mobile-angular-ui", "techSupportFactory", "ngAnimate"]);

sdApp.directive('ngStrDatenDatasetLoader', function () {
    return {
        restrict: 'A',
        templateUrl: 'strDatenDatasetLoader.html'
    }
})
    .controller('strDatenDatasetLoaderCtrl', function ($scope, $rootScope) {

        $scope.datasets = [
            'data01_small.json',
            'data01.json',
            'data02.json',
            'data03.json',
            'data04.json',
            'data05.json',
            'data06.json',
            'data07.json',
            'data08.json',
            'data09.json',
            'data10.json'
        ];

        $rootScope.numberOfRows = 5;

        $rootScope.data = [];
        $rootScope.tableOriginal = [];

        //kopiert und modifiziert von http://thiscouldbebetter.wordpress.com/2013/01/31/reading-a-string-from-a-file-in-javascript/
        startJSONImport = function () {
            var pathOfFileToRead = 'res/' + $scope.selectedDataset;

            var contentsOfFileAsString = FileHelper.readStringFromFileAtPath
            (
                pathOfFileToRead
            );

            $rootScope.data = JSON.parse(contentsOfFileAsString);

            console.log('dataset ' + $scope.selectedDataset + " loaded successfully");

        };

        $scope.createTable = function () {

            $rootScope.tableOriginal = [];

            for (var i = 0; i < $rootScope.numberOfRows; i++) {

                $rootScope.tableOriginal.push($rootScope.data[i]);

            }

            //set animation
            //color changes for 1.5 seconds and then changes back

            if (animationsEnabled) {

                $scope.cssVarForSourceTable = 'sourceTableWasUpdated';

                setTimeout(function () {
                    $scope.cssVarForSourceTable = '';
                    $scope.$apply();
                }, 1500);

            };
        };

        $scope.selectAndLoadDataset = function (dataset) {

            $scope.selectedDataset = dataset;
            startJSONImport();
            $rootScope.numberOfRows = 5;
            $scope.createTable();
            animationsEnabled = true;

        };

        //kopiert von http://thiscouldbebetter.wordpress.com/2013/01/31/reading-a-string-from-a-file-in-javascript/
        function FileHelper() {
        }

        {
            FileHelper.readStringFromFileAtPath = function (pathOfFileToReadFrom) {
                var request = new XMLHttpRequest();
                request.open("GET", pathOfFileToReadFrom, false);
                request.send(null);
                var returnValue = request.responseText;

                return returnValue;
            }
        }

        //variable is set to false, to avoid animation after loading the page
        var animationsEnabled = false;

        $scope.selectAndLoadDataset($scope.datasets[0]);

        $scope.openDatasetSelectionOverlay = function () {
            $scope.toggle('datasetSelectionOverlay', 'on');
        };

        $scope.test = function () {
            alert('test');
        };

        $scope.decreaseNumberOfRowsBy = function (i) {
            $rootScope.numberOfRows = $rootScope.numberOfRows - i;

            if ($rootScope.numberOfRows < 0) {
                $rootScope.numberOfRows = 0;
            }
        };

        $scope.increaseNumberOfRowsBy = function (i) {
            $rootScope.numberOfRows = $rootScope.numberOfRows + i;

            if ($rootScope.numberOfRows > $rootScope.data.length) {
                $rootScope.numberOfRows = $rootScope.data.length;
            }
        };
    });


sdApp.directive('ngMediendatenImageSelector', function () {
    return {
        restrict: 'A',
        templateUrl: 'MediendatenImageSelector.html'
    }
})
    .controller('MediendatenImageSelectorCtrl', function ($scope, $rootScope) {

        $rootScope.images = [
            'res/logo_brs.jpg', 'res/logo_angularJS.jpg', 'res/logo_cordova.jpg'
        ];

        //$scope.currentImage = 0;
        $rootScope.currentImage = 0;

        $scope.image_next = function () {
            if ($rootScope.currentImage == $rootScope.images.length - 1) {
                $rootScope.currentImage = 0;
            } else {
                $rootScope.currentImage++;
            }
        };

        $scope.image_prev = function () {
            if ($rootScope.currentImage == 0) {
                $rootScope.currentImage = $rootScope.images.length - 1;
            } else {
                $rootScope.currentImage--;
            }
        };

    });

sdApp.directive('ngMediendatenVideoSelector', function () {
    return {
        restrict: 'A',
        templateUrl: 'MediendatenVideoSelector.html'
    }
})
    .controller('MediendatenVideoSelectorCtrl', function ($scope, $rootScope) {

        $rootScope.videos = [
            'res/H264_test4_Talkingheadclipped_mp4_480x320.mp4', 'res/H264_test1_Talkinghead_mp4_480x360.mp4', 'res/mov_bbb.mp4'
        ];

        $rootScope.currentVideo = 0;

        $scope.video_next = function () {
            if ($rootScope.currentVideo == $rootScope.videos.length - 1) {
                $rootScope.currentVideo = 0;
            } else {
                $rootScope.currentImage++;
            }
        };

        $scope.video_prev = function () {
            if ($rootScope.currentVideo == 0) {
                $rootScope.currentVideo = $rootScope.videos.length - 1;
            } else {
                $rootScope.currentVideo--;
            }
        };

    });

sdApp.config(function ($routeProvider) {

    $routeProvider.
        when('/overview', {
            templateUrl: 'overview.html',
            controller: 'OverviewCtrl'
        }).
        when('/PL_sessionStorage', {
            templateUrl: 'PL_sessionStorage.html',
            controller: 'PL_SessionStorageCtrl'
        }).
        when('/PL_localStorage', {
            templateUrl: 'PL_localStorage.html',
            controller: 'PL_LocalStorageCtrl'
        }).
        when('/PE_localStorage', {
            templateUrl: 'PE_localStorage.html',
            controller: 'PE_LocalStorageCtrl'
        }).
        when('/PE_sessionStorage', {
            templateUrl: 'PE_sessionStorage.html',
            controller: 'PE_SessionStorageCtrl'
        }).
        when('/PE_indexedDB', {
            templateUrl: 'PE_indexedDB.html',
            controller: 'PE_IndexedDBCtrl'
        }).
        when('/PE_webSql', {
            templateUrl: 'PE_webSql.html',
            controller: 'PE_WebSqlCtrl'
        }).
        when('/PE_fileAPI', {
            templateUrl: 'PE_fileAPI.html',
            controller: 'PE_FileAPICtrl'
        }).
        when('/PE_PGSQLite', {
            templateUrl: 'PE_PG_SQLite.html',
            controller: 'PE_PGSQLiteCtrl'
        }).
        when('/DE_localStorage', {
            templateUrl: 'DE_localStorage.html',
            controller: 'DE_LocalStorageCtrl'
        }).
        when('/DE_sessionStorage', {
            templateUrl: 'DE_sessionStorage.html',
            controller: 'DE_SessionStorageCtrl'
        }).
        when('/DE_indexedDB', {
            templateUrl: 'DE_indexedDB.html',
            controller: 'DE_IndexedDBCtrl'
        }).
        when('/DE_webSql', {
            templateUrl: 'DE_webSql.html',
            controller: 'DE_WebSqlCtrl'
        }).
        when('/DE_fileAPI', {
            templateUrl: 'PD_fileAPI.html',
            controller: 'PD_FileAPICtrl'
        }).
        when('/DE_PGSQLite', {
            templateUrl: 'DE_PG_SQLite.html',
            controller: 'DE_PGSQLiteCtrl'
        }).
        when('/localStorage/list2/:key', {
            templateUrl: 'localStorage_list2_details.html',
            controller: 'LocalStorageList2DetailsCtrl'
        }).
        when('/sessionStorage', {
            templateUrl: 'sessionStorage.html',
            controller: 'SessionStorageCtrl'
        }).
        when('/indexedDB', {
            templateUrl: 'indexedDB.html',
            controller: 'IndexedDBCtrl'
        }).
        when('/webSql', {
            templateUrl: 'webSql.html',
            controller: 'WebSqlCtrl'
        }).
        when('/PGSQLite', {
            templateUrl: 'PG_SQLite.html',
            controller: 'PGSQLiteCtrl'
        }).
        when('/acc', {
            templateUrl: 'acc.html',
            controller: 'AccCtrl'
        }).
        when('/cam', {
            templateUrl: 'cam.html',
            controller: 'CamCtrl'
        }).
        when('/vid', {
            templateUrl: 'vid.html',
            controller: 'VidCtrl'
        }).
        when('/loadImage', {
            templateUrl: 'loadImage.html',
            controller: 'LoadImageCtrl'
        }).
        when('/devOrientation', {
            templateUrl: 'devOrientation.html',
            controller: 'DevOrientationCtrl'
        }).
        when('/directoryVariables', {
            templateUrl: 'directoryVariables.html',
            controller: 'DirectoryVariablesCtrl'
        }).
        otherwise({
            redirectTo: '/overview'
        });
});
