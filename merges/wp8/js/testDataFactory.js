//sdApp.factory('testDataFactory', function () {
angular.module('testDataFactory', [])
    .factory('testDataFactory', function () {
        return {
            testData: function () {

                var filename = '/www/res/data/data01_tmp.json';
                //Filehelper function is defined in custom.js
                var contentsOfFileAsString = FileHelper.readStringFromFileAtPath(filename);

                console.log(contentsOfFileAsString);
                return JSON.parse(contentsOfFileAsString);
            },

            getRandomIndices: function () {

                var filename = '/www/res/data/Indices_random_15000.json';

                //Filehelper function is defined in custom.js
                var contentsOfFileAsString = FileHelper.readStringFromFileAtPath(filename);
                return JSON.parse(contentsOfFileAsString);

            },

            getArrayWithDatasetFilenames: function () {

                return [
                    '/www/res/data/data_5000_01.json',
                    '/www/res/data/data_5000_02.json',
                    '/www/res/data/data_5000_03.json',
                    '/www/res/data/data_5000_04.json',
                    '/www/res/data/data_5000_05.json',
                    '/www/res/data/data_5000_06.json',
                    '/www/res/data/data_5000_07.json',
                    '/www/res/data/data_5000_08.json',
                    '/www/res/data/data_5000_09.json',
                    '/www/res/data/data_5000_10.json',
                    '/www/res/data/data_5000_11.json',
                    '/www/res/data/data_5000_12.json'
                ];

            },

            testDataForUpdateTests: function () {
                var filename = '/www/res/data/data02_first500_idStartingAt0.json';

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