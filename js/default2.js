// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
//(function () {"use strict";

	WinJS.Binding.optimizeBindingReferences = true;
	WinJS.Namespace.define('MoneyMagnet', {
	});
	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var nav = WinJS.Navigation;
	var saveFile = null;
	var db = null;
	var newCreate = null;
	var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
	var IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
	var startPage = false;


	app.addEventListener("activated", function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {
			if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
				// TODO: This application has been newly launched. Initialize
				// your application here.
				createDB();

			} else {
				// TODO: This application has been reactivated from suspension.
				// Restore application state here.
			}

			if (app.sessionState.history) {
				nav.history = app.sessionState.history;
			}
			args.setPromise(WinJS.UI.processAll().then(function () {

				if (nav.location) {
					nav.history.current.initialPlaceholder = true;
					return nav.navigate(nav.location, nav.state);
				} else {
					return nav.navigate(Application.navigator.home);
				}
			}));
		}
	});

	// the following scopes some global variables via a 
	// namespace definition.
	WinJS.Namespace.define("QuercusCareerFair", {
		db: db,
	});


	function createDB() {
		// Create the request to open the database, named ApplicationsDB. If it doesn't exist, create it and immediately
		// upgrade to version 1.
		var dbRequest = window.indexedDB.open("ApplicationsDb", 1);

		// Add asynchronous callback functions
		dbRequest.onerror = function () { WinJS.log && WinJS.log("Error creating database.", "Money", "error"); };
		dbRequest.onsuccess = function (evt) { dbSuccess(evt); };
		dbRequest.onupgradeneeded = function (evt) { dbVersionUpgrade(evt); };
		dbRequest.onblocked = function () { WinJS.log && WinJS.log("Database create blocked.", "Money", "error"); };

		// Reset the flag that indicates whether this is a new creation request. 
		// Assume that the database was previously created.
		newCreate = false;
	}

	function deleteDB() {

		// Close and clear the handle to the database, held in the parent SdkSample namespace.
		if (QuercusCareerFair.db) {
			QuercusCareerFair.db.close();
		}
		QuercusCareerFair.db = null;
		var dbRequest = window.indexedDB.deleteDatabase("ApplicationsDb");
		dbRequest.onerror = function () { WinJS.log && WinJS.log("Error deleting database.", "Money", "error"); };
		dbRequest.onsuccess = function () { WinJS.log && WinJS.log("Database deleted.", "Money", "status"); };
		dbRequest.onblocked = function () {
			WinJS.log && WinJS.log("Database delete blocked.", "Money", "error");
		};
	}

	// Whenever an IndexedDB is created, the version is set to "", but can be immediately upgraded by calling createDB. 
	function dbVersionUpgrade(evt) {

		// If the database was previously loaded, close it. 
		// Closing the database keeps it from becoming blocked for later delete operations.
		if (QuercusCareerFair.db) {
			QuercusCareerFair.db.close();
		}
		QuercusCareerFair.db = evt.target.result;

		// Get the version update transaction handle, since we want to create the schema as part of the same transaction.
		var txn = evt.target.transaction;

		// Create the inquiries object store, with an index on the applicant name. 
		// Note that we set the returned object store to a variable
		// in order to make further calls (index creation) on that object store.
		var applicantInquiries = QuercusCareerFair.db.createObjectStore("inquiries", { keyPath: "id", autoIncrement: true });
		applicantInquiries.createIndex("type", "type", { unique: false });
		applicantInquiries.createIndex("amount", "amount", { unique: false });
		applicantInquiries.createIndex("category", "category", { unique: false });
		applicantInquiries.createIndex("note", "note", { unique: false });
		applicantInquiries.createIndex("who", "who", { unique: false });

		// Once the creation of the object stores is finished (they are created asynchronously), log success.
		txn.oncomplete = function () { WinJS.log && WinJS.log("Database schema created.", "Money", "status"); };
		newCreate = true;
	}

	function dbSuccess(evt) {

		// Log whether the app tried to create the database when it already existed. 
		if (!newCreate) {
			// Close this additional database request
			var db = evt.target.result;
			db.close();

			WinJS.log && WinJS.log("Database schema already exists.", "sample", "error");
			return;
		}
	}


	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state
		// that needs to persist across suspensions here. If you need to 
		// complete an asynchronous operation before your application is 
		// suspended, call args.setPromise().
		app.sessionState.history = nav.history;
	};



	app.start();
//})();
