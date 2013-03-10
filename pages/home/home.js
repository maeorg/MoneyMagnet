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

            WinJS.Application.onloaded = function () {
                WinJS.Resources.processAll();
            }

            document.getElementById("save_income").onclick = function () {

                income_storage();
            };

            expense.onclick = function () {
                document.getElementById("expense_form").style.display = "block";
                document.getElementById("income_form").style.display = "none";
            }

            var appData = Windows.Storage.ApplicationData.current;

            function income_storage() {
                var income = {
                    ammount: document.getElementById('ammount').value,
                    notes: document.getElementById('notes').value

                };

                localStorage['income'] = JSON.stringify(income);
                var income_object = JSON.parse(localStorage['income']);
                var ammount = income_object['ammount'];
                
                appData.localFolder.getFileAsync('..\data\resources.resjson').then('resources.resjson', Windows.Storage.CreationCollisionOption.replaceExisting).then(function(){Windows.Storage.FileIO.writeTextAsync( 'resources.resjson', ammount)});
                var data_array = [''];
                data_array.push = income_object;
                new function () {
                    
                    for (var i = 0; i < data_array.length; i++) {
                   
                        var p1 = document.createElement('p');
                        p1.setAttribute('id', 'ammount'+i);
                        p1.innerHTML = income_object['ammount'];

                        var p2 = document.createElement('p');
                        p2.setAttribute('id', 'note'+i);
                        p2.innerHTML = income_object['notes'];

                        document.getElementById('textarea').appendChild(p1);
                        document.getElementById('textarea').appendChild(p2);
                    }                                                            
                   
                    //document.getElementById('textarea').innerHTML = income_object['ammount'];
                    //document.getElementById('textarea').innerHTML = income_object['notes'];
                }

                
            }
        }

    });

    
    
}


)();
