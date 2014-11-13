sdApp.controller('DE_IndexedDBEinzelwerteCtrl', function ($scope) {

    const dbName = "Einzelwerte";
    const objStoreName = "Einzelwerte";

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

            //put adds or updates
            objectStore.put(keyValuePair);

            // Do something when all the data is added to the database.
            transaction.oncomplete = function (event) {
                console.log('transaction.oncomplete (in saveEinzelwerte)');
            };

            transaction.onerror = function (event) {
                console.error('transaction.onerror (in saveEinzelwerte)');
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
            console.log('transaction.oncomplete (in updateEinzelwerteView)');

            $scope.keyToLoad = $scope.keyLoaded;
        };

        transaction.onerror = function (event) {
            console.error('transaction.onerror (in updateEinzelwerteView)');
            // Don't forget to handle errors!
        };

        request.onsuccess = function (event) {
            console.log('request.onsuccess (in updateEinzelwerteView)');

            //if there was a result
            if (request.result) {
                $scope.valueLoadedFromIndexedDB = 'has value "' + request.result.value + '"';

            } else {
                $scope.valueLoadedFromIndexedDB = 'does not exist';
            }

            $scope.$apply();
        };


        request.onerror = function (event) {
            console.error('request.onerror (in updateEinzelwerteView)');
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
            console.error('request.onerror (in listObjectStores)');
            alert("Database error: " + event.target.errorCode);
            // Machen Sie etwas mit request.errorCode!
        };
        request.onsuccess = function (event) {
            console.log('request.onsuccess (in listObjectStores) ');
            db = request.result;


            //$scope.objectStores = db.objectStoreNames;
            $scope.$apply();

        };

    };


    $scope.clearObjectStore = function () {


        var request = db.transaction([objStoreName], "readwrite").objectStore(objStoreName).clear();

        request.onsuccess = function (evt) {

            console.log('objectStore "' + objStoreName + '" has been cleared');
        };
        request.onerror = function (event) {
            console.error("clearObjectStore:", event.target.errorCode);
            displayActionFailure(this.error);
        };

 alert('key ' + $scope.keyToRemove + ' was removed');
        //};

    };

    $scope.openDatabase = function () {
        console.log('openDatabase start');

        //Quelle:
        // https://developer.mozilla.org/de/docs/IndexedDB/IndexedDB_verwenden
        if (!window.indexedDB) {
            window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
        } else {

            var request = window.indexedDB.open(dbName, 2);

            request.onerror = function (event) {
                console.error('request.onerror (in openDatabase)');
                alert("Database error: " + event.target.errorCode);
                // Machen Sie etwas mit request.errorCode!
            };
            request.onsuccess = function (event) {
                console.log('request.onsuccess (in openDatabase)');
                db = request.result;


                //for updating the "status-light" on the openDatabase button
                $scope.databaseOpened = true;
                $scope.$apply();
            };

            request.onupgradeneeded = function (event) {
                console.log('request.onupgradeneeded start');
                var db = event.target.result;

                var objectStore = db.createObjectStore(objStoreName, {keyPath: "key"});

                //Column key is defined as index for the objectStore "einzelwerte"
                objectStore.createIndex("key", "key", {unique: true});

                console.log('request.onupgradeneeded start');
            }
        }
    };

});