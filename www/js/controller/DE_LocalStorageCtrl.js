sdApp.controller('DE_LocalStorageCtrl', function ($scope, $rootScope) {

    $rootScope.section = 'DE';

    $scope.localStorage = localStorage;

    //<für alle Tabs>
    $scope.stringForRightButton = 'show keys';
    $scope.functionForRightButton = function () {
        $rootScope.toggle('myOverlay', 'on');
    };
    //</für alle Tabs>

    $scope.enableTab_einzelwerte = function () {
        $scope.tab = 1;
        $scope.stringForTitle = 'LocalStorage';
        //$scope.stringForRightButton = 'EZW';
    };

    $scope.enableTab_strDaten = function () {
        $scope.tab = 2;
        $scope.stringForTitle = 'LS - strDaten';
        //$scope.stringForRightButton = 'STR';
    };

    $scope.enableTab_mediendaten = function () {
        $scope.tab = 3;
        $scope.stringForTitle = 'LS Mediendaten';
        //$scope.stringForRightButton = 'MED';
    };

    $scope.enableTab_einzelwerte();

    $scope.key = "a";
    $scope.value = "b";

    $scope.saveEinzelwerte = function () {
        if ($scope.key == '' || $scope.value == '') {
            alert('You need to enter a key and a value');
        } else {
            localStorage.setItem($scope.key, $scope.value);
            console.log('saved Value ' + $scope.value + ' for key ' + $scope.key);
            $scope.key = "";
            $scope.value = "";
        }

    };

    showLocalStorage = function () {
        $rootScope.toggle('myOverlay', 'on');
    };


    $scope.images = [
        'res/logo_brs.jpg', 'res/logo_angularJS.jpg', 'res/logo_cordova.jpg'
    ];

    $scope.currentImage = 0;

    $scope.image_next = function () {
        if ($scope.currentImage == $scope.images.length - 1) {
            $scope.currentImage = 0;
        } else {
            $scope.currentImage++;
        }
    };

    $scope.image_prev = function () {
        if ($scope.currentImage == 0) {
            $scope.currentImage = $scope.images.length - 1;
        } else {
            $scope.currentImage--;
        }
    };

    $scope.saveImageToLocalStorage = function () {
        imageFilename = $scope.images[$scope.currentImage];
        imageData = convertImageToBase64Format(imageFilename, "image/jpeg");
        localStorage.setItem('image', imageData);
    };


    $scope.loadImageFromLocalStorage = function () {


        imageData = localStorage.getItem('image');
        document.getElementById("imagePlaceholder").src = imageData;

    };

    //Funktion übernommen von http://forums.mozillazine.org/viewtopic.php?f=19&t=856865
    function convertImageToBase64Format(imageURI, aType) {
        var canvas = document.createElementNS("http://www.w3.org/1999/xhtml", "html:canvas");
        var image = document.createElementNS("http://www.w3.org/1999/xhtml", "html:img");
        image.src = imageURI;

        canvas.width = image.width;
        canvas.height = image.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL(aType);
    };

    $scope.showImageInLocalStorage = function() {
        alert(localStorage.getItem('image'));
    };

    $scope.deleteImageFromLocalStorage = function() {
        localStorage.removeItem('image');
    }

});