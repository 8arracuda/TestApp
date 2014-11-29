angular.module('techSupportFactory', [])
    .factory('techSupport', function () {
        return {
            techSupport: function () {
                var techniques = [];

                techniques.indexedDB = Modernizr.indexeddb;
                techniques.sessionStorage = Modernizr.sessionstorage;
                techniques.localStorage = Modernizr.localstorage;
                techniques.webSQL = Modernizr.websqldatabase;

                if (navigator.accelerometer) {
                    techniques.accelerometer = true;
                } else {
                    techniques.accelerometer = false;
                }

                if (navigator.camera) {
                    techniques.camera = true;
                } else {
                    techniques.camera = false;
                }

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


                //von http://www.html5rocks.com/de/tutorials/getusermedia/intro/
                function hasGetUserMedia() {
                    // Note: Opera builds are unprefixed.
                    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
                        navigator.mozGetUserMedia || navigator.msGetUserMedia);
                }


                return techniques;
            }
        };
    });