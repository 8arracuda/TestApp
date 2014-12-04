var sdApp = angular.module('sdApp', ["ngRoute", "mobile-angular-ui", "techSupportFactory", "IndexedDBClearObjectStore", "FileApiDeleteAllFilesFactory", "testDataFactory", "PE_ParameterFactory", "ngAnimate"]);

//copied from
// http://thiscouldbebetter.wordpress.com/2013/01/31/reading-a-string-from-a-file-in-javascript/
function FileHelper() {

}
{
    FileHelper.readStringFromFileAtPath = function (pathOfFileToReadFrom) {
        var request = new XMLHttpRequest();
        request.open("GET", pathOfFileToReadFrom, false);
        request.send(null);
        var returnValue = request.responseText;
        console.log('FileHelper read: ' + returnValue.substr(0,50) + ' .....');
        return returnValue;
    }
}

function highlightSourceTableTitle(scope) {
    scope.cssVarForSourceTable = 'sourceTableWasUpdated';
    scope.$apply();

    setTimeout(function () {
        scope.cssVarForSourceTable = '';
        scope.$apply();
    }, 1500);
}

console.log('--9--');

function highlightDestinationTableTitle(scope) {
    scope.cssVarForDestinationTable = 'destinationTableWasUpdated';
    scope.$apply();

    setTimeout(function () {
        scope.cssVarForDestinationTable = '';
        scope.$apply();
    }, 1500);
}

console.log('--10--');

sdApp.directive('ngStrDatenDatasetLoader', function () {

    return {
        restrict: 'A',
        templateUrl: 'customAngularDirectives/StrDatenDatasetLoader.html'
    }

})
    .controller('strDatenDatasetLoaderCtrl', function ($scope, $rootScope, testDataFactory) {

        $rootScope.verifyTestsOutput = true;

        $scope.datasets = [
            'data01_small.json',
            'data01.json',
            'data02.json',
            'data03.json',
            'data04.json',
            'data05.json',
            'data01+02.json'
            //'data06.json',
            //'data07.json',
            //'data08.json',
            //'data09.json',
            //'data10.json',
            //'data01-05.json',
            //'data06-10.json',
            //'data01-10.json'
        ];

        //set the default value for numberOfRows
        $rootScope.numberOfRows = 5;

        $rootScope.data = [];
        $rootScope.tableOriginal = [];

        //copied and modified from
        // http://thiscouldbebetter.wordpress.com/2013/01/31/reading-a-string-from-a-file-in-javascript/
        startJSONImport = function () {

            var pathOfFileToRead = 'res/data/' + $scope.selectedDataset;

            $rootScope.data = testDataFactory.getDataFromFile(pathOfFileToRead);

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
                highlightSourceTableTitle($scope);
            }

        };

        $scope.selectAndLoadDataset = function (dataset) {

            $scope.selectedDataset = dataset;
            startJSONImport();
            $rootScope.numberOfRows = 5;
            $scope.createTable();
            animationsEnabled = true;

        };

        //variable is set to false, to avoid animation after loading the page
        var animationsEnabled = false;

        $scope.selectAndLoadDataset($scope.datasets[0]);

        $scope.openDatasetSelectionOverlay = function () {
            $scope.toggle('datasetSelectionOverlay', 'on');
        };

        //$scope.test = function () {
        //    alert('test');
        //};

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


sdApp.directive('ngStartPerformanceTestButtonWithDatabase', function () {

    return {
        restrict: 'A',
        templateUrl: 'customAngularDirectives/StartPerformanceTestButtonWithDatabase.html'
    }


});

sdApp.directive('ngStartPerformanceTestButtonWithoutDatabase', function () {

    return {
        restrict: 'A',
        templateUrl: 'customAngularDirectives/StartPerformanceTestButtonWithoutDatabase.html'
    }


});

sdApp.directive('ngPrepareSectionForTests', function () {

    return {
        restrict: 'A',
        templateUrl: 'customAngularDirectives/PrepareSectionForTests.html'

    }

});

sdApp.directive('ngOpenDatabaseSectionWebsql', function () {

    return {
        restrict: 'A',
        templateUrl: 'customAngularDirectives/OpenDatabaseSectionWebsql.html'
    }

});

sdApp.directive('ngOpenDatabaseSection', function () {

    return {
        restrict: 'A',
        templateUrl: 'customAngularDirectives/OpenDatabaseSection.html'
    }

});

sdApp.directive('ngResultsForPerformanceTests', function () {

    return {
        restrict: 'A',
        templateUrl: 'customAngularDirectives/ResultsForPerformanceTests.html'
    }

});

sdApp.directive('ngMediendatenImageSelector', function () {

    return {
        restrict: 'A',
        templateUrl: 'customAngularDirectives/MediendatenImageSelector.html'
    }


})
    .controller('MediendatenImageSelectorCtrl', function ($scope, $rootScope) {


        $rootScope.images = [
            'res/logo_brs.jpg', 'res/logo_angularJS.jpg', 'res/logo_cordova.jpg'
        ];


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
        templateUrl: 'customAngularDirectives/MediendatenVideoSelector.html'
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

//Code take from http://www.stephenpauladams.com/articles/angularjs-cordova-windows-phone-quirk/
//it makes links work in Windows Phone
//Without this Windows Phone want's to search for an appropiate app for that link.
sdApp.config([
    '$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
    }
]);