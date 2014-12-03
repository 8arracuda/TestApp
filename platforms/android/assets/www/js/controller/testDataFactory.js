angular.module('testDataFactory', [])
    .factory('testDataFactory', function () {
        return {
            testData: function () {

                //Filehelper function is defined in custom.js
                //TODO: Change before real tests are done!!!

                //var filename = 'res/data/data01_first500.json';
                //var filename = 'res/data/data01.json';
                var filename = 'res/data/data01_tmp.json';
                var contentsOfFileAsString = FileHelper.readStringFromFileAtPath(filename);
                return JSON.parse(contentsOfFileAsString);

            },

            getRandomIndices: function () {

                //Filehelper function is defined in custom.js
                //TODO: Change before real tests are done!!!

                var filename = 'res/data/Indices_random_500.json';
                var contentsOfFileAsString = FileHelper.readStringFromFileAtPath(filename);
                return JSON.parse(contentsOfFileAsString);

            },

            getArrayWithDatasetFilenames: function() {
                return [
                    'res/data/data_5000_01.json',
                    'res/data/data_5000_02.json',
                    'res/data/data_5000_03.json',
                    'res/data/data_5000_04.json',
                    'res/data/data_5000_05.json',
                    'res/data/data_5000_06.json',
                    'res/data/data_5000_07.json',
                    'res/data/data_5000_08.json',
                    'res/data/data_5000_09.json',
                    'res/data/data_5000_10.json',
                    'res/data/data_5000_11.json',
                    'res/data/data_5000_12.json'
                ];
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