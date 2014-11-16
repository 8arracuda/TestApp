angular.module('testDataFactory', [])
    .factory('testDataFactory', function () {
        return {
            testData: function () {

                //Filehelper function is defined in custom.js
                var contentsOfFileAsString = FileHelper.readStringFromFileAtPath('res/data/data01+02.json');

                return JSON.parse(contentsOfFileAsString);

            },

            getDataFromFile: function (filename) {

                //Filehelper function is defined in custom.js
                var contentsOfFileAsString = FileHelper.readStringFromFileAtPath(filename);

                return JSON.parse(contentsOfFileAsString);

            }
        };
    });