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

            function income_storage() {
                var income = {
                    income_ammount: document.getElementById('income_ammount').value,
                    income_notes: document.getElementById('income_notes').value

                };

                localStorage['income'] = JSON.stringify(income);
                var income_object = JSON.parse(localStorage['income']);
                var ammount = income_object['income_ammount'];
                
               
                var data_array = [''];
                data_array.push = income_object;
                new function () {
                    
                    for (var i = 0; i < data_array.length; i++) {
                   
                        var p1 = document.createElement('p');
                        p1.setAttribute('id', 'income_ammount'+i);
                        p1.innerHTML = income_object['income_ammount'] + " €";

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
                   
                    //document.getElementById('textarea').innerHTML = income_object['ammount'];
                    //document.getElementById('textarea').innerHTML = income_object['notes'];
                }

                
            }

            function expense_storage() {
                var expense = {
                    expense_ammount: document.getElementById('expense_ammount').value,
                    expense_notes: document.getElementById('expense_notes').value

                };

                localStorage['expense'] = JSON.stringify(expense);
                var expense_object = JSON.parse(localStorage['expense']);
                var expense_ammount = expense_object['expense_ammount'];


                var data_array_expense = [''];
                data_array_expense.push = expense_object;
                new function () {

                    for (var i = 0; i < data_array_expense.length; i++) {

                        var p3 = document.createElement('p');
                        p3.setAttribute('id', 'expense_ammount' + i);
                        p3.innerHTML = expense_object['expense_ammount'] + " €";

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

                    

                   /*var bar = document.getElementByClass('appbar2').winControl;

                    WinJS.Namespace.define('appbar2', {
                        remove: WinJS.Utilities.markSupportedForProcessing(function(e) {
                            Windows.UI.Popups.MessageDialog("remove").showAsync();
                        })
                    });
                    //document.getElementById('textarea').innerHTML = income_object['ammount'];
                    //document.getElementById('textarea').innerHTML = income_object['notes'];*/
                }


            }
           
        }

    });

    
    
}


)();
