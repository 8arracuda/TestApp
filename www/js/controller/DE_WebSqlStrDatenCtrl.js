sdApp.controller('DE_WebSqlStrDatenCtrl', function ($scope) {


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
    $scope.tableFromWebSQL = [];


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

    $scope.test = function() {
        alert('test');
    }

    $scope.openDatasetSelectionOverlay = function () {
        $scope.toggle('datasetSelectionOverlay', 'on');
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

});