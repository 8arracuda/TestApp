sdApp.controller('DE_IndexedDBStrDatenCtrl', function ($scope, $rootScope) {

        const dbName = "strDaten";
        const objStoreName = "strDaten";
        $scope.databaseOpened = false;
        var db;

        //$scope.alertFoo = function () {
        //    alert('foo');
        //
        //    alert('data: ' + $rootScope.data);
        //
        //};


        $scope.clearTable = function () {

            //console.log('clearTable start');
            //var request = db.transaction([objStoreName], "readwrite").objectStore(objStoreName).clear;
            //
            //request.onsuccess = function (event) {
            //    //alert('objectStore "' + objStoreName + '" has been cleared');
            //    console.log('objectStore "' + objStoreName + '" has been cleared');
            //}
            //


            //var store = getObjectStore(objStoreName, 'readwrite');
            //var req = db.transaction([objStoreName], "readwrite").clear();
            var req = db.transaction([objStoreName], "readwrite").objectStore(objStoreName).clear();
            //var req = store.clear();
            req.onsuccess = function (evt) {
                //displayActionSuccess("Store cleared");
                //displayPubList(store);
                console.log('objectStore "' + objStoreName + '" has been cleared');
            };
            req.onerror = function (evt) {
                console.error("clearObjectStore:", evt.target.errorCode);
                displayActionFailure(this.error);
            };


            //var request = db.transaction([objStoreName], "readwrite")
            //    .objectStore(objStoreName)
            //    .clear();
            //request.onsuccess = function (event) {
            //    // It's gone!
            //    //alert('key ' + $scope.keyToRemove + ' was removed');
            //    console.log('objectStore "' + objStoreName + '" has been cleared');
            //};


            //var request = db.transaction([objStoreName], "readwrite")
            //    .objectStore(objStoreName)
            //    .delete($scope.keyToRemove);
            //request.onsuccess = function (event) {
            //    // It's gone!
            //    alert('key ' + $scope.keyToRemove + ' was removed');
            //};

        };


        $scope.saveTableToIndexedDB = function () {
            if ($scope.keyToSave == '' || $scope.valueToSave == '') {
                alert('You need to enter a key and a value');
            } else {

                var transaction = db.transaction([objStoreName], "readwrite");


                var objectStore = transaction.objectStore(objStoreName);
                // var keyValuePair = {key: $scope.keyToSave, value: $scope.valueToSave};
                //objectStore.add(keyValuePair);


               // for (var i = 0; i < $rootScope.numberOfRows; i++) {
                    var i =0;
                    var address = {};

                    address.firstName = $rootScope.data[i][0];
                    address.lastName = $rootScope.data[i][1];
                    address.street = $rootScope.data[i][2];
                    address.zipcode = $rootScope.data[i][3];
                    address.city = $rootScope.data[i][4];
                    address.email = $rootScope.data[i][5];

                    //alert(JSON.stringify(address));


                    objectStore.add(address);
                  //  console.log('added an address (index: ' + i + ")");
               // }

                //console.log('added ' + $rootScope.numberOfRows + )

                // Do something when all the data is added to the database.
                transaction.oncomplete = function (event) {
                    console.log('transaction.oncomplete (in saveTableToIndexedDB)');
                    alert("All done!");
                };

                transaction.onerror = function (event) {
                    console.error('transaction.onerror (in saveTableToIndexedDB)');
                    console.error(event.error);
                    console.error(transaction.error);
                    // Don't forget to handle errors!
                };

            }
        };

        $scope.loadTableFromIndexedDB = function () {

            $scope.tableFromIndexedDB = [];

            var transaction = db.transaction([objStoreName], "readonly");

            var objectStore = transaction.objectStore(objStoreName);

            //var request = objectStore.index('lastName').openKeyCursor();
            var request = objectStore.openCursor();
            //var transaction = db.transaction.objectStore("some_store").index('id').openKeyCursor();

            // Do something when all the data is added to the database.
            transaction.oncomplete = function (event) {
                console.log('transaction.oncomplete');
                alert("All done!");

                //$scope.keyToLoad = $scope.keyLoaded;

            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror');
                // Don't forget to handle errors!
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

                    //alert(JSON.stringify(address));
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
                    db = request.result;
                    // Machen Sie etwas mit request.result!

                    $scope.databaseOpened = true;
                    //$scope.$apply();
                };

                request.onupgradeneeded = function (event) {
                    console.log('request.onupgradeneeded start');
                    var db = event.target.result;

                    var objectStore = db.createObjectStore(objStoreName, {keyPath: "lastName"});

                    objectStore.createIndex("lastName", "lastName", {unique: true});

                    //create foo-data
                    //fooData = [];
                    //for (var k = 0; k < 5; k++) {
                    //    fooItem = {key: k, value: 'value is ' + k};
                    //    fooData.push(fooItem);
                    //}
                    //
                    //// Store FooData in  newly created objectStore.
                    //for (var i in fooData) {
                    //    objectStore.add(fooData[i]);
                    //}

                    console.log('request.onupgradeneeded start');
                }
            }
        };
    }
)
;
