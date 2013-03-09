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

            expense.onclick = function() {
                document.getElementById("expense_form").style.display = "block";
                document.getElementById("income_form").style.display = "none";
            }
        }

    
    });

    
    
}


)();
