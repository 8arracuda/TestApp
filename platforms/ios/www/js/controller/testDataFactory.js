angular.module('testDataFactory', [])
    .factory('testDataFactory', function () {
        return {
            testData: function () {

                //Filehelper function is defined in custom.js
                //TODO: Change before real tests are done!!!

                var filename = 'res/data/data01_first500.json';
                var contentsOfFileAsString = FileHelper.readStringFromFileAtPath(filename);
                return JSON.parse(contentsOfFileAsString);

            },

            testDataForUpdateTests: function () {
                var filename = 'res/data/data02_first500_idStartingAt0.json';
                var contentsOfFileAsString = FileHelper.readStringFromFileAtPath(filename);
                return JSON.parse(contentsOfFileAsString);
            },

            getDataFromFile: function (filename) {

                //Filehelper function is defined in custom.js
                var contentsOfFileAsString = FileHelper.readStringFromFileAtPath(filename);

                return JSON.parse(contentsOfFileAsString);

            },

            getStringFromFile: function (filename) {

                //Filehelper function is defined in custom.js
                return FileHelper.readStringFromFileAtPath(filename);

            }
        };
    });