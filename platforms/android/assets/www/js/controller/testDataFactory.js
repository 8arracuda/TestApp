angular.module('testDataFactory', [])
    .factory('testDataFactory', function () {
        return {
            testData: function () {
                console.log('testData1');
                //Filehelper function is defined in custom.js
                //TODO: Change before real tests are done!!!

                //var filename = 'res/data/data01_first500.json';
                //var filename = 'res/data/data01.json';
                if (device.platform == 'Win32NT') {
                    console.log('testData2');
                    var filename = '/www/res/data/data01_tmp.json';
                    console.log('testData3');
                } else {
                    console.log('testData4');
                    var filename = 'res/data/data01_tmp.json';
                    console.log('testData5');
                }
                console.log('testData6');
                var contentsOfFileAsString = FileHelper.readStringFromFileAtPath(filename);
                console.log('testData7');
                return JSON.parse(contentsOfFileAsString);

            },

            getRandomIndices: function () {

                //Filehelper function is defined in custom.js
                //TODO: Change before real tests are done!!!

                //var filename = 'res/data/Indices_random_500.json';

                if (device.platform == 'Win32NT') {
                    var filename = '/www/res/data/Indices_random_15000.json';
                } else {
                    var filename = 'res/data/Indices_random_15000.json';
                }
                var contentsOfFileAsString = FileHelper.readStringFromFileAtPath(filename);
                return JSON.parse(contentsOfFileAsString);

            },

            getArrayWithDatasetFilenames: function () {
                if (device.platform == 'Win32NT') {
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
                } else {
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
                }
            },

            testDataForUpdateTests: function () {
                if (device.platform == 'Win32NT') {
                    var filename = '/www/res/data/data02_first500_idStartingAt0.json';
                } else {
                    var filename = 'res/data/data02_first500_idStartingAt0.json';
                }
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