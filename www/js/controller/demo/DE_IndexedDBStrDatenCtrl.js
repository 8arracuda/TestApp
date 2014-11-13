sdApp.controller('DE_IndexedDBStrDatenCtrl', function ($scope, $rootScope) {

        const dbName = "StrDaten";
        const objStoreName = "StrDaten";
        $scope.databaseOpened = false;
        $scope.db;

        $scope.clearObjectStore = function () {

            var request = $scope.db.transaction([objStoreName], "readwrite").objectStore(objStoreName).clear();

            request.onsuccess = function (evt) {

                console.log('objectStore "' + objStoreName + '" has been cleared');
            };
            request.onerror = function (event) {
                console.error("clearObjectStore:", event.target.errorCode);
                displayActionFailure(this.error);
            };

        };


        $scope.saveTableToIndexedDB = function () {

            $scope.clearObjectStore();

            if ($scope.keyToSave == '' || $scope.valueToSave == '') {
                alert('You need to enter a key and a value');
            } else {

                var transaction = $scope.db.transaction([objStoreName], "readwrite");

                var objectStore = transaction.objectStore(objStoreName);

                for (var i = 0; i < $rootScope.numberOfRows; i++) {
                    var address = {};

                    address.firstName = $rootScope.data[i][0];
                    address.lastName = $rootScope.data[i][1];
                    address.street = $rootScope.data[i][2];
                    address.zipcode = $rootScope.data[i][3];
                    address.city = $rootScope.data[i][4];
                    address.email = $rootScope.data[i][5];

                    objectStore.put(address);
                }

                console.log('addded ' + $rootScope.numberOfRows + ' addresses to ObjectStore strDaten.');

                transaction.oncomplete = function (event) {
                    console.log('transaction.oncomplete (in saveTableToIndexedDB)');
                };

                transaction.onerror = function (event) {
                    console.error('transaction.onerror (in saveTableToIndexedDB)');
                };

            }
        };

        $scope.loadTableFromIndexedDB = function () {

            $scope.tableFromIndexedDB = [];

            var transaction = $scope.db.transaction([objStoreName], "readonly");

            var objectStore = transaction.objectStore(objStoreName);

            var request = objectStore.openCursor();

            transaction.oncomplete = function (event) {
                console.log('transaction.oncomplete');

            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror');
            };

            request.onsuccess = function (event) {
                console.log('request.onsuccess (in loadTableFromIndexedDB)');

                var cursor = event.target.result;

                if (cursor) {

                    var address = [];

                    address[0] = cursor.value.firstName;
                    address[1] = cursor.value.lastName;
                    address[2] = cursor.value.street;
                    address[3] = cursor.value.zipcode;
                    address[4] = cursor.value.city;
                    address[5] = cursor.value.email;

                    $scope.tableFromIndexedDB.push(address);

                    cursor.continue();
                }

                highlightDestinationTableTitle();

                $scope.$apply();
            };


        };

        function highlightDestinationTableTitle() {
            $scope.cssVarForDestinationTable = 'destinationTableWasUpdated';

            $scope.$apply();

            setTimeout(function () {
                $scope.cssVarForDestinationTable = '';
                $scope.$apply();
            }, 1500);
        }

        $scope.openDatabase = function () {
            console.log('openDatabase start');

            //Quelle: https://developer.mozilla.org/de/docs/IndexedDB/IndexedDB_verwenden
            if (!window.indexedDB) {
                window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
            } else {

                var request = window.indexedDB.open(dbName, 1);

                request.onerror = function (event) {
                    console.error('request.onerror');
                    alert("Database error: " + event.target.errorCode);
                    // Machen Sie etwas mit request.errorCode!
                };
                request.onsuccess = function (event) {
                    console.log('request.onsuccess (in openDatabase)');
                    $scope.db = request.result;

                    //for updating the "status-light" on the openDatabase button
                    $scope.databaseOpened = true;
                    $scope.$apply();
                };

                request.onupgradeneeded = function (event) {
                    console.log('request.onupgradeneeded start');
                    var db = event.target.result;

                    var objectStore = $scope.db.createObjectStore(objStoreName, {keyPath: "lastName"});

                    objectStore.createIndex("lastName", "lastName", {unique: true});

                    console.log('request.onupgradeneeded start');
                }
            }
        };
    }
);

