(function () {
    "use strict";
    
    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        
        ready: function (element, options) {
            
            // TODO: Initialize the page here.
            var income = document.getElementById('income_selected');
            var expense = document.getElementById('expense_selected');
            income.onclick = function () {
                document.getElementById("income_form").style.display = "block";
                document.getElementById("expense_form").style.display = "none";
            }

            document.getElementsByTagName('img')
            
            WinJS.Application.onloaded = function () {
                WinJS.Resources.processAll();
            }

            document.getElementById("save_income").onclick = function () {

                income_storage();
            };

            document.getElementById("save_expense").onclick = function () {

                expense_storage();
            };

            expense.onclick = function () {
                document.getElementById("expense_form").style.display = "block";
                document.getElementById("income_form").style.display = "none";
            }

            var appData = Windows.Storage.ApplicationData.current;
            
            function insertData() {
                validateFileExistence();
                if (MoneyMagnet.saveFile == null) createFile();
                writeText();
            }

            function validateFileExistence() {
                Windows.Storage.KnownFolders.documentsLibrary.getFileAsync("MoneyMagnet\\data.txt").done(
                    function (file) {
                        // If file exists.
                        MoneyMagnet.saveFile = file;
                    },
                    function (err) {
                        // If file doesn't exist, indicate users to use scenario 1.
                        MoneyMagnet.saveFile = null;
                        WinJS.log && WinJS.log("The file 'data.txt' does not exist.", "data", "error");
                    }
                );
            }
    
            // Creates file
            function createFile() {                              
                    Windows.Storage.KnownFolders.documentsLibrary.createFolderAsync("MoneyMagnet", Windows.Storage.CreationCollisionOption.replaceExisting).done(
                    Windows.Storage.KnownFolders.documentsLibrary.createFileAsync("MoneyMagnet\\data.txt", Windows.Storage.CreationCollisionOption.replaceExisting).done(
                    function (file) {
                        MoneyMagnet.saveFile = file;
                    },
                    function (error) {
                        WinJS.log && WinJS.log(error, "data", "error");
                    }));
            }

            // Writes some text to 'data.txt'
            function writeText() {
                if (MoneyMagnet.saveFile !== null) {
                    var income_amount = document.getElementById("income_amount").value;
                    var income_notes = document.getElementById("income_notes").value;
                    var outputDiv = document.getElementById("result");
                    var contents = "";
                    if (income_amount !== "") {
                        var contents = income_amount + "," + income_notes + ",";
                    }
                    if (contents !== "") {
                        Windows.Storage.FileIO.appendTextAsync(MoneyMagnet.saveFile, contents).done(function () {
                            readText();
                        },
                        function (error) {
                            WinJS.log && WinJS.log(error, "data", "error");
                        });
                    } else {
                        outputDiv.innerHTML = "The text box is empty, please write something and then click 'Write' again.";
                    }
                }
                }

            // Reads text from 'data.txt'
            function readText() {
                if (MoneyMagnet.saveFile !== null) {
                    Windows.Storage.KnownFolders.documentsLibrary.getFileAsync("MoneyMagnet\\data.txt").done (
                        Windows.Storage.FileIO.readTextAsync(MoneyMagnet.saveFile).done(function (fileContent) {
                            var outputDiv = document.getElementById("result");
                            outputDiv.innerHTML = "The following text was read from '" + MoneyMagnet.saveFile.name + "':<br /><br />" + fileContent;
                        },
                        function (error) {
                            WinJS.log && WinJS.log(error, "sample", "error");
                        }));
                    }
            }

            function income_storage() {

                var income = {
                    income_amount: document.getElementById('income_amount').value,
                    income_notes: document.getElementById('income_notes').value

                };

                localStorage['income'] = JSON.stringify(income);
                var income_object = JSON.parse(localStorage['income']);
                var amount = income_object['income_amount'];
               
                var data_array = [''];
                data_array.push = income_object;
                new function () {
                    
                    for (var i = 0; i < data_array.length; i++) {
                   
                        var p1 = document.createElement('p');
                        p1.setAttribute('id', 'income_amount'+i);
                        p1.innerHTML = income_object['income_amount'] + " €";

                        var p2 = document.createElement('p');
                        p2.setAttribute('id', 'income_note'+i);
                        p2.innerHTML = income_object['income_notes'];
                        var div = document.createElement('div');
                        div.setAttribute('class', "income_div");
                        if (i % 2) {
                            div.style.msGridColumn = '1';
                        }
                        else {
                            div.style.msGridColumn = '2';
                        }
                        div.style.msGridRow = 'auto';
                        document.getElementById('result').appendChild(div);
                        div.appendChild(p1);
                        div.appendChild(p2);
                    }                                                            
                   
                    //document.getElementById('textarea').innerHTML = income_object['amount'];
                    //document.getElementById('textarea').innerHTML = income_object['notes'];
                }

                insertData();
 
            }

            function expense_storage() {
                var expense = {
                    expense_amount: document.getElementById('expense_amount').value,
                    expense_notes: document.getElementById('expense_notes').value

                };

                localStorage['expense'] = JSON.stringify(expense);
                var expense_object = JSON.parse(localStorage['expense']);
                var expense_amount = expense_object['expense_amount'];


                var data_array_expense = [''];
                data_array_expense.push = expense_object;
                new function () {

                    for (var i = 0; i < data_array_expense.length; i++) {

                        var p3 = document.createElement('p');
                        p3.setAttribute('id', 'expense_amount' + i);
                        p3.innerHTML = expense_object['expense_amount'] + " €";

                        var p4 = document.createElement('p');
                        p4.setAttribute('id', 'expense_note' + i);
                        p4.innerHTML = expense_object['expense_notes'];
                        var div = document.createElement('div');
                        div.setAttribute('class', "expense_div");
                        if (i % 2) {
                            div.style.msGridColumn = '1';
                        }
                        else {
                            div.style.msGridColumn = '2';
                        }
                        div.style.msGridRow = 'auto';
                        document.getElementById('result').appendChild(div);
                        div.appendChild(p3);
                        div.appendChild(p4);
                    }

                }

            }

        }

    });
    
}


)();
