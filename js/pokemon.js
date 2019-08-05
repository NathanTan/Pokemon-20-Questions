// Expects a table element and an array of objects.
// Walk the array and

function populateData(tableName, dbData) {
    let col = [];
    for (let i = 0; i < dbData.length; i++) {
        for (let key in dbData[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    let table = document.getElementById(tableName);
    let tr = table.insertRow(-1);

    for (i = 0; i < col.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (i = 0; i < dbData.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = dbData[i][col[j]];
        }
    }
}