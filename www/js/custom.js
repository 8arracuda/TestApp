//app.initialize();

var sdApp = angular.module('sdApp', ["ngRoute", "mobile-angular-ui", "techSupportFactory"]);

lsTest = '1';

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


//    sdApp.factory('techSupportFactory', function () {
//        return {
//            techSupport: function () {
//                var techniques = [];
//
//                var tech = {};
//                tech.name = 'LocalStorage';
//                tech.support = Modernizr.localstorage;
//                techniques.push(tech);
//
//                var tech = {};
//                tech.name = 'SessionStorage';
//                tech.support = Modernizr.sessionstorage;
//                techniques.push(tech);
//
//                var tech = {};
//                tech.name = 'WebSQL';
//                tech.support = Modernizr.websqldatabase;
//                techniques.push(tech);
//
//                var tech = {};
//                tech.name = 'IndexedDB';
//                tech.support = Modernizr.indexeddb;
//                techniques.push(tech);
//
//                var tech = {};
//                tech.name = 'Accelerometer';
//                if (navigator.accelerometer) {
//                    tech.support = true;
//                } else {
//                    tech.support = false;
//                }
//                techniques.push(tech);
//
//                var tech = {};
//                tech.name = 'Camera';
//                if (navigator.camera) {
//                    tech.support = true;
//                } else {
//                    tech.support = false;
//                }
//                techniques.push(tech);
//
//                var tech = {};
//                tech.name = 'hasGetUserMedia';
//                tech.support = hasGetUserMedia();
//                techniques.push(tech);
//
//                var tech = {};
//                tech.name = 'device motion';
//                tech.support = Modernizr.devicemotion;
//                techniques.push(tech);
//
//                var tech = {};
//                tech.name = 'device orientation';
//                tech.support = Modernizr.deviceorientation;
//                tech.support = Modernizr.dev;
//                techniques.push(tech);
//
//
//                //$scope.techniques = techniques;
//                //$scope.Modernizr = Modernizr;
//
//
//                //von http://www.html5rocks.com/de/tutorials/getusermedia/intro/
//                function hasGetUserMedia() {
//                    // Note: Opera builds are unprefixed.
//                    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
//                        navigator.mozGetUserMedia || navigator.msGetUserMedia);
//                }
//
//
//                return techniques;
//            }
//        };
//    });

});
