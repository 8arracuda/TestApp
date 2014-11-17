angular.module('testDataFactory', [])
    .factory('testDataFactory', function () {
        return {
            testData: function () {

                //Filehelper function is defined in custom.js
                //TODO: Change before real tests are done!!!
               // var contentsOfFileAsString = FileHelper.readStringFromFileAtPath('res/data/data01+02.json');
                var contentsOfFileAsString = FileHelper.readStringFromFileAtPath('res/data/data01_first500.json');

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