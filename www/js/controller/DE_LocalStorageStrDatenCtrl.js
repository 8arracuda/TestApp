sdApp.controller('DE_LocalStorageStrDatenCtrl', function ($scope) {


    //kopiert und modifiziert von http://thiscouldbebetter.wordpress.com/2013/01/31/reading-a-string-from-a-file-in-javascript/
    startJSONImport = function () {
        var pathOfFileToRead = 'res/' + $scope.selectedDataset;


        var contentsOfFileAsString = FileHelper.readStringFromFileAtPath
        (
            pathOfFileToRead
        );

        $scope.data = JSON.parse(contentsOfFileAsString);

        console.log('dataset ' + $scope.selectedDataset + " loaded successfully");

    }


//kopiert von http://thiscouldbebetter.wordpress.com/2013/01/31/reading-a-string-from-a-file-in-javascript/
    function FileHelper() {
    }

    {
        FileHelper.readStringFromFileAtPath = function (pathOfFileToReadFrom) {
            var request = new XMLHttpRequest();
            request.open("GET", pathOfFileToReadFrom, false);
            request.send(null);
            var returnValue = request.responseText;

            return returnValue;
        }
    }


    $scope.numberOfRows = 5;

    $scope.data = [];
    $scope.tableOriginal = [];
    $scope.tableFromLocalStorage = [];


    $scope.datasets = [
        'data01_small.json',
        'data01.json',
        'data02.json',
        'data03.json',
        'data04.json',
        'data05.json',
        'data06.json',
        'data07.json',
        'data08.json',
        'data09.json',
        'data10.json'
    ];

    $scope.selectedDataset = $scope.datasets[0];
    startJSONImport();

    $scope.decreaseNumberOfRowsBy = function (i) {
        $scope.numberOfRows = $scope.numberOfRows - i;

        if ($scope.numberOfRows < 0) {
            $scope.numberOfRows = 0;
        }
    };

    $scope.increaseNumberOfRowsBy = function (i) {
        $scope.numberOfRows = $scope.numberOfRows + i;

        if ($scope.numberOfRows > $scope.data.length) {
            $scope.numberOfRows = $scope.data.length;
        }
    };



    $scope.createTable = function () {

        $scope.tableOriginal = [];

        for (var i = 0; i < $scope.numberOfRows; i++) {

            $scope.tableOriginal.push($scope.data[i]);

        }
    };


    $scope.selectAndLoadDataset = function (dataset) {

        $scope.selectedDataset = dataset;
        startJSONImport();

    };

    $scope.openDatasetSelectionOverlay = function () {
        $scope.toggle('datasetSelectionOverlay', 'on');
    };


    $scope.saveTable1ToLocalStorage = function () {

        $scope.deleteTable1FromLocalStorage();

        for (var i = 0; i < $scope.numberOfRows; i++) {

            localStorage.setItem('table1_' + i + '_firstname', $scope.data[i][0]);
            localStorage.setItem('table1_' + i + '_lastname', $scope.data[i][1]);
            localStorage.setItem('table1_' + i + '_street', $scope.data[i][2]);
            localStorage.setItem('table1_' + i + '_zipcode', $scope.data[i][3]);
            localStorage.setItem('table1_' + i + '_city', $scope.data[i][4]);
            localStorage.setItem('table1_' + i + '_email', $scope.data[i][5]);

        }

        localStorage.setItem('table1_numberOfAddresses', $scope.numberOfRows);


    };

    $scope.loadTable1FromLocalStorage = function () {

        numberOfRows = localStorage.getItem('table1_numberOfAddresses');

        $scope.tableFromLocalStorage = [];

        for (var i = 0; i < numberOfRows; i++) {

            var address = [];

            address[0] = localStorage.getItem('table1_' + i + '_firstname');
            address[1] = localStorage.getItem('table1_' + i + '_lastname');
            address[2] = localStorage.getItem('table1_' + i + '_street');
            address[3] = localStorage.getItem('table1_' + i + '_zipcode');
            address[4] = localStorage.getItem('table1_' + i + '_city');
            address[5] = localStorage.getItem('table1_' + i + '_email');

            $scope.tableFromLocalStorage.push(address);

        }

    }

    $scope.deleteTable1FromLocalStorage = function () {

        numberOfRows = localStorage.getItem('table1_numberOfAddresses');

        for (var i = 0; i < numberOfRows; i++) {

            localStorage.removeItem('table1_' + i + '_firstname');
            localStorage.removeItem('table1_' + i + '_lastname');
            localStorage.removeItem('table1_' + i + '_street');
            localStorage.removeItem('table1_' + i + '_zipcode');
            localStorage.removeItem('table1_' + i + '_city');
            localStorage.removeItem('table1_' + i + '_email');


        }

        localStorage.removeItem('table1_numberOfAddresses');

    }

});