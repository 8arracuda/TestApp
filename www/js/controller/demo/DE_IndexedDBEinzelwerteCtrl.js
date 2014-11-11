sdApp.controller('DE_IndexedDBEinzelwerteCtrl', function ($scope) {

    const dbName = "TestAppDatabase";
    const objStoreName = "einzelwerte";

    $scope.databaseOpened = false;
    $scope.keyToLoad = "a";
    $scope.keyToSave = "a";
    $scope.valueToSave = "b";



    //TODO Error occurs, when a key already exists
    $scope.saveEinzelwerte = function () {
        if ($scope.keyToSave == '' || $scope.valueToSave == '') {
            alert('You need to enter a key and a value');
        } else {

            var transaction = db.transaction([objStoreName], "readwrite");

            var objectStore = transaction.objectStore(objStoreName);
            var keyValuePair = {key: $scope.keyToSave, value: $scope.valueToSave};
            objectStore.add(keyValuePair);

            // Do something when all the data is added to the database.
            transaction.oncomplete = function (event) {
                console.log('transaction.oncomplete');
                alert("All done!");
            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror');
                //console.error(event.error);
                // Don't forget to handle errors!
            };

        }
    };

    $scope.updateEinzelwerteView = function () {

        $scope.keyLoaded = $scope.keyToLoad;

        var transaction = db.transaction([objStoreName], "readonly");

        var objectStore = transaction.objectStore(objStoreName);
        var request = objectStore.get($scope.keyToLoad);


        // Do something when all the data is added to the database.
        transaction.oncomplete = function (event) {
            console.log('transaction.oncomplete');
            alert("All done!");

            $scope.keyToLoad = $scope.keyLoaded;
        };

        transaction.onerror = function (event) {
            console.error('transaction.onerror');
            // Don't forget to handle errors!
        };

        request.onsuccess = function (event) {
            console.log('request.onsuccess');

            //if there was a result
            if (request.result) {
                $scope.valueLoadedFromIndexedDB = 'has value "' + request.result.value + '"';
                // event.target.result == customerData[i].ssn;

            } else {
                $scope.valueLoadedFromIndexedDB = 'does not exist';
            }

            $scope.$apply();
        };

        //var objectStore = transaction.objectStore("customers");
        //var objectStore = transaction.objectStore(dbName);

        //    var request = objectStore.add(customerData[i]);
        //    request.onsuccess = function (event) {
        //        console.log('request.onsuccess');
        //        // event.target.result == customerData[i].ssn;
        //    };

        request.onerror = function (event) {
            console.error('request.onerror');
            // event.target.result == customerData[i].ssn;
        };

    };

    $scope.removeKeyFromObjectStore= function () {

        var request = db.transaction([objStoreName], "readwrite")
            .objectStore(objStoreName)
            .delete($scope.keyToRemove);
        request.onsuccess = function (event) {
            // It's gone!
            alert('key ' + $scope.keyToRemove + ' was removed');
        };

    };


    $scope.listObjectStores = function () {
        console.log('function listObjectStores() called');
        var request = window.indexedDB.open(dbName, 1);

        request.onerror = function (event) {
            console.error('request.onerror');
            alert("Database error: " + event.target.errorCode);
            // Machen Sie etwas mit request.errorCode!
        };
        request.onsuccess = function (event) {
            console.log('request.onsuccess');
            db = request.result;


            //$scope.objectStores = db.objectStoreNames;
            $scope.$apply();

        };

    };


    //old stuff

    $scope.customers = [];


    //Code von
    //https://developer.mozilla.org/de/docs/IndexedDB/IndexedDB verwenden

    $scope.openDatabase = function () {
        console.log('openDatabase start');

        //Quelle: https://developer.mozilla.org/de/docs/IndexedDB/IndexedDB_verwenden
        if (!window.indexedDB) {
            window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
        } else {

            var request = window.indexedDB.open(dbName, 2);

            request.onerror = function (event) {
                console.error('request.onerror');
                alert("Database error: " + event.target.errorCode);
                // Machen Sie etwas mit request.errorCode!
            };
            request.onsuccess = function (event) {
                console.log('request.onsuccess');
                db = request.result;
                // Machen Sie etwas mit request.result!

                $scope.databaseOpened = true;
                //$scope.$apply();
            };

            request.onupgradeneeded = function (event) {
                console.log('request.onupgradeneeded start');
                var db = event.target.result;

                var objectStore = db.createObjectStore(objStoreName, {keyPath: "key"});

                objectStore.createIndex("key", "key", {unique: true});

                //create foo-data
                fooData = [];
                for (var k = 0; k < 5; k++) {
                    fooItem = {key: k, value: 'value is ' + k};
                    fooData.push(fooItem);
                }

                // Store FooData in  newly created objectStore.
                for (var i in fooData) {
                    objectStore.add(fooData[i]);
                }

                console.log('request.onupgradeneeded start');
            }
        }
    };

//    $scope.saveDatabase = function () {
//
//        //var transaction = db.transaction(["customers"], "readwrite");
//        var transaction = db.transaction([dbName], "readwrite");
//// Note: Older experimental implementations use the deprecated constant IDBTransaction.READ_WRITE instead of "readwrite".
//// In case you want to support such an implementation, you can just write:
//// var transaction = db.transaction(["customers"], IDBTransaction.READ_WRITE);
//
//        // Do something when all the data is added to the database.
//        transaction.oncomplete = function (event) {
//            console.log('transaction.oncomplete');
//            alert("All done!");
//        };
//
//        transaction.onerror = function (event) {
//            console.error('transaction.onerror');
//            // Don't forget to handle errors!
//        };
//
//
//        //var objectStore = transaction.objectStore("customers");
//        var objectStore = transaction.objectStore(dbName);
//        for (var i in customerData) {
//            var request = objectStore.add(customerData[i]);
//            request.onsuccess = function (event) {
//                console.log('request.onsuccess');
//                // event.target.result == customerData[i].ssn;
//            };
//            request.onerror = function (event) {
//                console.error('request.onerror');
//                // event.target.result == customerData[i].ssn;
//            };
//        }
//
//    };
//
//    $scope.showList = function () {
//        alert('showList was called');
//
//        //$scope.customers = [];
//
//        //var objectStore = db.transaction("customers").objectStore("customers");
//        var objectStore = db.transaction(dbName).objectStore("customers");
//
//        objectStore.openCursor().onsuccess = function (event) {
//            alert('objectStore.openCursor().onsuccess');
//            var cursor = event.target.result;
//            if (cursor) {
//                $scope.customers.push(cursor.value);
//                cursor.continue();
//            }
//            else {
//                //cusor has no more items
//                //-> notify angularJS to reload
//                //$scope.$apply();
//            }
//        };
//
//    };
//
//
//    $scope.showObjectStores = function () {
//        var request = window.indexedDB.open(dbName, 1);
//        request.onsuccess = function (event) {
//            console.log('request.onsuccess');
//            db = request.result;
//            //alert(JSON.stringify(db.objectStoreNames));
//            $scope.objectStoreNames = db.objectStoreNames;
//        };
//
//    };

});