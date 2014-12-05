var sdApp = angular.module('sdApp', ["ngRoute", "mobile-angular-ui", "techSupportFactory", "IndexedDBClearObjectStore", "FileApiDeleteAllFilesFactory", "testDataFactory", "PE_ParameterFactory", "ngAnimate"]);

var PE_TestR1_indexToCheck = 100;
var PE_TestR2_indexToCheck = 0;
var PE_TestR3_indexToCheck = 0;

//copied from
// http://thiscouldbebetter.wordpress.com/2013/01/31/reading-a-string-from-a-file-in-javascript/
//On Windows Phone this cannot be used to fetch files from the local file system.
//It is used only for Android and iOS.
//
function FileHelper() {

}
{
    FileHelper.readStringFromFileAtPath = function (pathOfFileToReadFrom) {
        var request = new XMLHttpRequest();

        //false = synchronous!
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


//Code take from http://www.stephenpauladams.com/articles/angularjs-cordova-windows-phone-quirk/
//it makes links work in Windows Phone
//Without this Windows Phone want's to search for an appropiate app for that link.
sdApp.config([
    '$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);
    }
]);