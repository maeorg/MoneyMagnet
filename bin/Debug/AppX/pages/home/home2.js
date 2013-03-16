//(function () {"use strict";
    
	WinJS.UI.Pages.define("/pages/home/home.html", {
		// This function is called whenever a user navigates to this page. It
		// populates the page elements with the app's data.
        
		ready: function (element, options) {
			//var item = options && options.item ? Data.resolveItemReference(options.item) : Data.items.getAt(0);

			$('.category').on('click', 'img', function () {
				$('.category div img').css('border', '0');
				$(this).css('border', 'solid #000 1px');
			});

		//document.querySelector('.moneyType').addEventListener('click', function () {
		$(document).on('click', '.moneyType', function() {
			var userType = this.value;
			$('#type').val(userType);
		});

		addApplicantInfo();

		// check if the applicantSubmitButton is on the form. 
		var btnApplicantSubmit = element.querySelector("#money_form");
		if (btnApplicantSubmit != null) {
			$(document).on("click", "#test", function (evt) {
				// prevent the click event from acting like a regular html form submit.
				evt.preventDefault();

				// get references to the input elements.
				var type = $("#type").val() == 'Income' ? 1 : 0;
				var amount = $("#amount").val();
				var category = $("#category").val();
				var note = $("#notes").val();
				var who = $("#who").val();

				// create an instance of the newApplicantInfo object (which is a variable that was defined
				// at a global level).
				newApplicantInfo = {
					type: type,
					amount: amount,
					category: category,
					note: note,
					who: who
				};

				// call the method to add the applicant info to the IndexedDB instance.
				addApplicantInfo();

				// display a message to say that the information was received.
				$("#result").innerHTML = "<p> </p><p>Thanks for your interest</p><p>We'll be in contact with you soon!</p>";
			});
		}
		// on first load, set focus on the content area.
		//element.querySelector(".content").focus();


		function addApplicantInfo() {
			var dbRequest = window.indexedDB.open("ApplicationsDb", 1);
			// Add asynchronous callback functions
			dbRequest.onerror = function () { WinJS.log && WinJS.log("Error opening database.", "Applicants", "error"); };
			dbRequest.onsuccess = function (evt) { dbSuccess(evt); };
			dbRequest.onupgradeneeded = function (evt) { WinJS.log && WinJS.log("Database wrong version.", "Applicants", "error"); if (QuercusCareerFair.db) { QuercusCareerFair.db.close(); } };
			dbRequest.onblocked = function () { WinJS.log && WinJS.log("Database access blocked.", "Applicants", "error"); };
		}


		function dbSuccess(evt) {
			// If the database was previously loaded, close it... this keeps the database from becoming blocked for later deletes
			if (QuercusCareerFair.db) {
				QuercusCareerFair.db.close();
			}
			QuercusCareerFair.db = evt.target.result;
			if (QuercusCareerFair.db.objectStoreNames.length === 0) {
				WinJS.log && WinJS.log("Database schema does not exist. Complete the first scenario before continuing.", "Applicants", "error");
				QuercusCareerFair.db.close();
				QuercusCareerFair.db = null;
				window.indexedDB.deleteDatabase("ApplicationsDb", 1);
			} else {
				if (startPage) {
					loadData(evt);
				}
				else {
					startPage = true;
					testmydb(evt);
				}
			}
		}


		function loadData(evt) {

			var transaction = QuercusCareerFair.db.transaction("inquiries", "readwrite");
			var inquiriesStore = transaction.objectStore("inquiries");
			var addResult = inquiriesStore.add(newApplicantInfo);
			addResult.onsuccess = function (evt) {
				var mydata = newApplicantInfo;
				// do some other magic here if you want. 
				// for example, I output a bunch of data to a csv file. 
			}
		}


		/*
		var request = indexedDB.open("ApplicationsDb", 1);
		request.onerror = function (evt) {
			console.log("Database error code: " + evt.target.errorCode);
		};
		request.onsuccess = function (evt) {
			db = request.result;
		};*/

		function testmydb(evt) {
			var transaction2 = QuercusCareerFair.db.transaction("inquiries", "readwrite");
			var objectStore = transaction2.objectStore("inquiries");
			var request = objectStore.openCursor();
			request.onsuccess = function (evt) {
				var cursor = evt.target.result;
				if (cursor) {
					var p3 = document.createElement('p');
					p3.setAttribute('id', 'expense_ammount' + cursor.key);
					p3.innerHTML = cursor.value.amount + " €";

					var p4 = document.createElement('p');
					p4.setAttribute('id', 'expense_note' + cursor.key);
					p4.innerHTML = cursor.value.note;
					var div = document.createElement('div');
					div.setAttribute('class', "expense_div");
					if (cursor.key % 2) {
						div.style.msGridColumn = '1';
					}
					else {
						div.style.msGridColumn = '2';
					}
					div.style.msGridRow = 'auto';
					document.getElementById('result').appendChild(div);
					div.appendChild(p3);
					div.appendChild(p4);

					//console.log("id: " + cursor.key + " is " + cursor.value.note + " ");
					cursor.continue();
				}
				else {
					console.log("No more entries!");
				}
				//alert("Name for id 1 " + request.result.who);
			};
		}
		/*
		var request = window.indexedDB.open("ApplicationsDb", 1);
		request.onsuccess = function (sender, args) {
			console.log(sender.target.result.objectStoreNames);
		};
		*/




		}

	});

//})();
