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
window.onload = function() {
    getJsonObject('data.json',
        function(data) {
            tbody = document.getElementById('data');
            bookList = data; // store the book list into bookList
            var tr = "";
            for(i in bookList) {
                tr += "<tr>" + "<td>" + "<input type=\"checkbox\" name=\"book" + i + "\">" + "</td>" + 
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
    var tableRow = document.getElementsByTagName("tr");
    console.log(tableRow.length); 
}

// function myFunction() {
//     var input, filter, table, tr, td, i, txtValue;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     table = document.getElementById("myTable");
//     tr = table.getElementsByTagName("tr");
//     for (i = 0; i < tr.length; i++) {
//       td = tr[i].getElementsByTagName("td")[1];
//       if (td) {
//         txtValue = td.textContent || td.innerText;
//         if (txtValue.toUpperCase().indexOf(filter) > -1) {
//           tr[i].style.display = "";
//         } else {
//           tr[i].style.display = "none";
//         }
//       }       
//     }
//   }
