sdApp.controller('DE_IndexedDBEinzelwerteCtrl', function ($scope) {

    const dbName = "TestAppDatabase";
    $scope.keyToLoad  = "a";
    $scope.keyToSave  = "a";
    $scope.valueToSave  = "b";

    $scope.updateEinzelwerteView = function () {

        $scope.keyLoaded = $scope.keyToLoad;

        //// Öffnen unserer Datenbank
        //var request = window.indexedDB.open(dbName, 1);
        //
        //request.onerror = function (event) {
        //    console.error('request.onerror');
        //    alert("Database error: " + event.target.errorCode);
        //    // Machen Sie etwas mit request.errorCode!
        //};
        //request.onsuccess = function (event) {
        //    console.log('request.onsuccess');
        //    db = request.result;
        //    // Machen Sie etwas mit request.result!
        //
        //
        //
        //};

        var transaction = db.transaction(["customers"], "readwrite");
// Note: Older experimental implementations use the deprecated constant IDBTransaction.READ_WRITE instead of "readwrite".
// In case you want to support such an implementation, you can just write:
// var transaction = db.transaction(["customers"], IDBTransaction.READ_WRITE);

        // Do something when all the data is added to the database.
        transaction.oncomplete = function (event) {
            console.log('transaction.oncomplete');
            alert("All done!");
        };

        transaction.onerror = function (event) {
            console.error('transaction.onerror');
            // Don't forget to handle errors!
        };

        var objectStore = transaction.objectStore("customers");
        for (var i in customerData) {
            var request = objectStore.add(customerData[i]);
            request.onsuccess = function (event) {
                console.log('request.onsuccess');
                // event.target.result == customerData[i].ssn;
            };
            request.onerror = function (event) {
                console.error('request.onerror');
                // event.target.result == customerData[i].ssn;
            };
        }

    };

    $scope.removeKeyFromWebSQL = function () {

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
            //$scope.$apply();

        };

    };



    //old stuff

    $scope.customers = [];


    //Code von
    //https://developer.mozilla.org/de/docs/IndexedDB/IndexedDB verwenden

    $scope.openDatabase = function () {
        console.log('openDatabase start');

        if (!window.indexedDB) {
            window.alert("Ihr Browser unterstützt keine stabile Version von IndexedDB. Dieses und jenes Feature wird Ihnen nicht zur Verfügung stehen.");
        } else {

            //const customerData = [
            //    {ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com"},
            //    {ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org"}
            //];


            // Öffnen unserer Datenbank
            var request = window.indexedDB.open(dbName, 1);

            request.onerror = function (event) {
                console.error('request.onerror');
                alert("Database error: " + event.target.errorCode);
                // Machen Sie etwas mit request.errorCode!
            };
            request.onsuccess = function (event) {
                console.log('request.onsuccess');
                db = request.result;
                // Machen Sie etwas mit request.result!
            };

            request.onupgradeneeded = function (event) {
                console.log('openDatabase start');
                var db = event.target.result;

                // Create an objectStore to hold information about our customers. We're
                // going to use "ssn" as our key path because it's guaranteed to be
                // unique.
                var objectStore = db.createObjectStore("einzelwerte", {keyPath: "key"});

                // Create an index to search customers by name. We may have duplicates
                // so we can't use a unique index.
                //objectStore.createIndex("name", "name", {unique: false});

                // Create an index to search customers by email. We want to ensure that
                // no two customers have the same email, so use a unique index.
                //objectStore.createIndex("email", "email", {unique: true});

                // Store values in the newly created objectStore.
                //for (var i in customerData) {
                //    objectStore.add(customerData[i]);
               //}
                console.log('openDatabase end');
            }
        }
    };

    $scope.saveDatabase = function () {

        var transaction = db.transaction(["customers"], "readwrite");
// Note: Older experimental implementations use the deprecated constant IDBTransaction.READ_WRITE instead of "readwrite".
// In case you want to support such an implementation, you can just write:
// var transaction = db.transaction(["customers"], IDBTransaction.READ_WRITE);

        // Do something when all the data is added to the database.
        transaction.oncomplete = function (event) {
            console.log('transaction.oncomplete');
            alert("All done!");
        };

        transaction.onerror = function (event) {
            console.error('transaction.onerror');
            // Don't forget to handle errors!
        };

        var objectStore = transaction.objectStore("customers");
        for (var i in customerData) {
            var request = objectStore.add(customerData[i]);
            request.onsuccess = function (event) {
                console.log('request.onsuccess');
                // event.target.result == customerData[i].ssn;
            };
            request.onerror = function (event) {
                console.error('request.onerror');
                // event.target.result == customerData[i].ssn;
            };
        }

    };

    $scope.showList = function () {
        alert('showList was called');

        //$scope.customers = [];

        var objectStore = db.transaction("customers").objectStore("customers");

        objectStore.openCursor().onsuccess = function (event) {
            alert('objectStore.openCursor().onsuccess');
            var cursor = event.target.result;
            if (cursor) {
                $scope.customers.push(cursor.value);
                cursor.continue();
            }
            else {
                //cusor has no more items
                //-> notify angularJS to reload
                $scope.$apply();
            }
        };

    };


    $scope.showObjectStores = function () {
        var request = window.indexedDB.open(dbName, 1);
        request.onsuccess = function (event) {
            console.log('request.onsuccess');
            db = request.result;
            //alert(JSON.stringify(db.objectStoreNames));
            $scope.objectStoreNames = db.objectStoreNames;
        };

    };

});