sdApp.controller('DE_LocalStorageMediendatenCtrl', function ($scope) {

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

    $scope.showImageInLocalStorage = function () {
        alert(localStorage.getItem('image'));
    };

    $scope.deleteImageFromLocalStorage = function () {
        localStorage.removeItem('image');
    };




});