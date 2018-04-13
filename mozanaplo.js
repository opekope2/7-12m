var loc = document.getElementById("jegyhelpgomb").parentElement;
var avgbtn = document.createElement("button");
avgbtn.innerHTML = "Súlyozott átlag";
avgbtn.className = "css3_button blue";
avgbtn.addEventListener("click", disp, false);
loc.appendChild(avgbtn);
function disp() {
    var values = [];
    values["rgb(34, 30, 31)"] = 1;
    values["rgb(51, 170, 0)"] = 0.5;
    values["rgb(49, 102, 255)"] = 0.5;
    values["rgb(34, 30, 31)"] = 1;
    values["rgb(52, 0, 150)"] = 1;
    values["rgb(153, 51, 0)"] = 1.5;
    values["rgb(255, 17, 0)"] = 2;
    var avgwin = window.open("", "Átlag", "width=400,height=300");
    avgwin.document.write("<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0'></head><body><div style='width: 100%'>");
    var statistics = document.getElementById("statistics");
    for (var i = 2, row; row = statistics.rows[i]; i++) {
        var grades = [];
        for (var j = selected_szemeszter(), col; col = row.cells[j]; j++) {
            for (var k = 0, child; child = col.children[k]; k++) {
                var g = child.innerText;
                g = g.replace("1/2", "1.5");
                g = g.replace("2/3", "2.5");
                g = g.replace("3/4", "3.5");
                g = g.replace("4/5", "4.5");
                grades.push({ grade: g, multiplier: values[child.style.color] });
            }
        }
        var div = "";
        div += "<div style='border-style: solid; max-width: 400px; display: table; margin: 0 auto;'>";
        div += "<h1 style='text-align: center;'>" + row.cells[0].innerText + "</h1>";
        div += "<table border='0'>";
        div += "<tr><td>Matematikai átlag:</td><td>" + avg(grades).normal + "</td></tr>";
        div += "<tr><td>Súlyozott átlag:</td><td>" + avg(grades).weighted + "</td></tr>";
        div += "</table>";
        div += "</div><br />";
        avgwin.document.write(div);
    }
    avgwin.document.write("</div></body></html>");
    window.grades = grades;
}
function avg(arr) {
    if (!arr.length)
        return { normal: "(nincs osztályzat)", weighted: "(nincs osztályzat)" };
    var normal = Number(0);
    var weighted = Number(0);
    var nums = Number(0);
    for (var v = 0; v < arr.length; v++) {
        weighted += Number(arr[v].grade) * Number(arr[v].multiplier);
        nums += Number(arr[v].multiplier);
        normal += Number(arr[v].grade);
    }
    return { normal: normal / arr.length, weighted: weighted / nums };
}
function selected_szemeszter() {
    return parseInt(document.getElementById("selected_szemeszter").value.split("/")[1]);
}
