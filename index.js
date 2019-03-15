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

bookList = []; // book list container
var counter=0;
window.onload = function() {
    getJsonObject('data.json',
        function(data) {
            bookList = data; // store the book list into bookList
            var tbody = document.getElementById("rows");
            var tr = "";
            for(i in bookList) {
                tr += "<tr>" + "<td>" + "<input type=\"checkbox\" class=\"checkBox\" name=\"book" + i + "\">" + "</td>" + 
                                "<td>" + "<img src=\" " + bookList[i]['img'] + "\">" + "</td>" + 
                                "<td>" + bookList[i]['title'] + "</td>" +
                                "<td>" + bookList[i]['authors'] + "</td>" + 
                                "<td>" + bookList[i]['year'] + "</td>" +
                                "<td>" + bookList[i]['price'] + "</td>" + 
                                "<td>" + bookList[i]['publisher'] + "</td>" + 
                                "<td>" + bookList[i]['category'] + "</td>" + "</tr>";
            }
            tbody.innerHTML = tr;
        },
        function(xhr) { console.error(xhr); }
);
}

function searchFunction() {
    var searchInput = document.getElementById("search");
    var searchLowerCase = searchInput.value.toLowerCase();
    var tbody = document.getElementById("rows");
    var tableRow = tbody.getElementsByTagName("tr");
    var tableData = "";
    for (i = 0; i < tableRow.length; i++) {
        tableData = tableRow[i].getElementsByTagName("td")[2];
        if (tableData) {
           var text = tableData.textContent;
           if (text.toLowerCase().indexOf(searchLowerCase) > -1 && searchLowerCase != "") {
               tableRow[i].style.backgroundColor = "gold";
           } else if (searchLowerCase == "") {
                tableRow[i].style.backgroundColor = "#FAFCFF";
           }
           else {
            tableRow[i].style.backgroundColor = "#FAFCFF";
           }
        }
    }
}

function filterFunction() {
    var filterInput = document.getElementById("filter");
    var filterLowerCase = filterInput.value.toLowerCase();
    var tbody = document.getElementById("rows");
    var tableRow = tbody.getElementsByTagName("tr");
    var tableData = "";
    for (i = 0; i < tableRow.length; i++) {
        tableData = tableRow[i].getElementsByTagName("td")[7];
        if (tableData) {
           var text = tableData.textContent;
           if (text.toLowerCase().indexOf(filterLowerCase) > -1 || filterLowerCase === "category") {
               tableRow[i].style.display = "";
           } else {
            tableRow[i].style.display = "none";
           }
        }
    }
}

function addToCart() {
    counter=0;
    var checkBox = document.getElementsByClassName("checkBox");
    var cartCounter = document.getElementById("counter");
    for (i in checkBox) {
        if (checkBox[i].checked) {
            counter += 1;
        }
    }
    cartCounter.innerText = "(" + counter + ")";
}

function resetCart() {
    var reset = confirm("Click Ok to reset the cart");
    if (reset) {
        counter = 0;
        var checkBox = document.getElementsByClassName("checkBox");
        var cartCounter = document.getElementById("counter");
        cartCounter.innerText = "(" + counter + ")";
        for (i in checkBox) {
            if (checkBox[i].checked) {
                checkBox[i].checked = false;
            }
        }
    } else {
        counter = counter;
    }
}