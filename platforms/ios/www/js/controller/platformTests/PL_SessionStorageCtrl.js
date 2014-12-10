sdApp.controller('PL_SessionStorageCtrl', function ($scope, $rootScope) {

    $rootScope.section = 'PL';
    $scope.loadedAddresses = [];

    $scope.saveAddresses1 = function () {

        var addresses = [[10, "Merlin", "Blick", "18566 Gleason Causeway", "38245", "Port Erwinchester", "Aliyah.Zieme@ewald.io", 655, 980],
            [11, "Melvina", "Gottlieb", "74820 Aubree Extensions", "68276-7571", "Effertzland", "Braxton@willis.biz", 322, 766],
            [12, "Nikolas", "Lowe", "97364 Matilde Garden", "53147", "East Winonashire", "Newton_OConnell@maegan.com", 679, 295]];

        sessionStorage.setItem('addresses', JSON.stringify(addresses));

    };

    $scope.saveAddresses2 = function () {

        var addresses = [[28, "Benjamin", "Hamill", "730 Madge Views", "54301-2521", "Port Abbigailville", "Norval.Beahan@colby.com", 811, 36],
            [29, "Yessenia", "Daniel", "4247 Nash Causeway", "33779-6594", "North Angel", "Bette@max.me", 522, 270],
            [30, "Danika", "Schroeder", "81439 Domenick Pike", "4897", "Lindgrenchester", "Garland_Herzog@keara.org", 874, 280]];
        sessionStorage.setItem('addresses', JSON.stringify(addresses));

    };

    $scope.loadAddresses = function () {

        $scope.loadedAddresses = JSON.parse(sessionStorage.getItem('addresses'));
    }

});