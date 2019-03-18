var bookList = [];
var counter=0;
var addedBooks = [];
function getJsonObject(path, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
            } else {
                if (error) error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

window.onload = function() {
    getJsonObject('data.json',
        function(data) {
            bookList = data;
            var tbody = document.getElementById("rows");
            var tableRow = "";
            for(var i in bookList) {
                tableRow += "<tr>" + "<td>" + "<input type=\"checkbox\" class=\"checkBox\" name=\"book" + i + "\">" + "</td>"
                             + "<td>" + "<img src=\" " + bookList[i]['img'] + "\">" + "</td>"
                             + "<td class=\"titleStyle\">" + bookList[i]['title'] + "</td>"
                             + "<td>" + bookList[i]['authors'] + "</td>" 
                             + "<td>" + bookList[i]['year'] + "</td>"
                             + "<td>" + bookList[i]['price'] + "</td>" 
                             + "<td>" + bookList[i]['publisher'] + "</td>"
                             + "<td>" + bookList[i]['category'] + "</td>" + "</tr>";
            }
            tbody.innerHTML = tableRow;
        },
        function(xhr) { console.error(xhr); }
);
}

function titleSearch() {
    var searchInput = document.getElementById("search");
    var searchUpperCase = searchInput.value.toUpperCase();
    var tbody = document.getElementById("rows");
    var tableRow = tbody.getElementsByTagName("tr");
    var tableData = "";
    var titleNotFound = 0;
    for (var i = 0; i < tableRow.length; i++) {
        tableData = tableRow[i].getElementsByTagName("td")[2];
        if (tableData) {
           var text = tableData.textContent;
           if (text.toUpperCase().indexOf(searchUpperCase) > -1 && searchUpperCase != "") {
               tableRow[i].style.backgroundColor = "gold";
           } else if (searchUpperCase === "") {
                tableRow[i].style.backgroundColor = "#FAFCFF";
           }
           else {
            titleNotFound+=1;
            tableRow[i].style.backgroundColor = "#FAFCFF";
           }
        }
    }
    if (titleNotFound === 10) {
        alert("Sorry, There is no book under " + searchInput.value + " title.");
        searchInput.value = "";
    }
}

function categoryFilter() {
    var filterInput = document.getElementById("filter");
    var filterUpperCase = filterInput.value.toUpperCase();
    var tbody = document.getElementById("rows");
    var tableRow = tbody.getElementsByTagName("tr");
    var tableData = "";
    var categoryNotFound = 0;
    for (i = 0; i < tableRow.length; i++) {
        tableData = tableRow[i].getElementsByTagName("td")[7];
        if (tableData) {
           var text = tableData.textContent;
           if (text.toUpperCase().indexOf(filterUpperCase) > -1 || filterUpperCase === "CATEGORY") {
               tableRow[i].style.display = "";
           } else {
            categoryNotFound += 1
            tableRow[i].style.display = "none";
           }
        }
    }
    if (categoryNotFound === 10) {
        alert("Sorry, currently there are no books under \"" +  filterInput.value + "\" category.");
    }
}

function addToCart() {
    var checkBox = document.getElementsByClassName("checkBox");
    var cartCounter = document.getElementById("counter");
    for (var i in checkBox) {
        if (checkBox[i].checked) {
            counter += 1;
            addedBooks.push(bookList[i]['title']);
            checkBox[i].checked = false;
        }
    }
    cartCounter.innerText = "(" + counter + ")";
}

function resetCart() {
    if (addedBooks.length > 1) {
        var reset = confirm("Click OK to remove " + addedBooks + " books from the cart");
    } else if (addedBooks.length === 1) {
        var reset = confirm("Click OK to remove " + addedBooks + " book from the cart");
    } else {
        alert("Cart is empty.")
    }
    if (reset) {
        counter = 0;
        addedBooks.length = 0;
        var checkBox = document.getElementsByClassName("checkBox");
        var cartCounter = document.getElementById("counter");
        cartCounter.innerText = "(" + counter + ")";
        for (var i in checkBox) {
            if (checkBox[i].checked) {
                checkBox[i].checked = false;
            }
        }
    } else {
        counter = counter;
    }
}
