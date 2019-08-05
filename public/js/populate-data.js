// Expects a table element and an array of objects all with the same shape.
// Walk the array and build a table based on the data shape.
// This code copied and adapted from:
// https://www.encodedna.com/javascript/populate-json-data-to-html-table-using-javascript.htm
// https://www.encodedna.com/javascript/populate-select-dropdown-list-with-json-data-using-javascript.htm

function createButton(classname, legend, action) {
    let editButton = document.createElement('input');
    editButton.type = 'button';
    editButton.className = classname;
    editButton.value = legend;
    editButton.onclick = action;
    return editButton;
}

function populateTable(tableName, dbData) {
    // if (dbData.length <= 0)  return;

    let col = [];
    for (let key in dbData[0]) {
        if (col.indexOf(key) === -1) {
            col.push(key);
        }
    }

    let table = document.getElementById(tableName);
    let tr = table.insertRow(-1);

    for (let i = 0; i < col.length; i++) {
        let th = document.createElement("th");
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    for (let i = 0; i < dbData.length; i++) {

        tr = table.insertRow(-1);

        for (let j = 0; j < col.length; j++) {
            let tabCell = tr.insertCell(-1);
            tabCell.innerHTML = dbData[i][col[j]];
        }

        let editButton = createButton('edit_btn', 'Edit', (function(blah) {}));
        let edit = tr.insertCell(-1);
        edit.appendChild(editButton);

        let deleteButton = createButton('delete_btn', 'Delete', (function(blah) {}));
        let del = tr.insertCell(-1);
        del.appendChild(deleteButton);
    }
}

function populateSelect(selectBoxName, dbData) {
    if (dbData.length <= 0)  return;

    let col = [];
    for (let key in dbData[0]) {
        if (col.indexOf(key) === -1) {
            col.push(key);
        }
    }

    let selectBox = document.getElementById(selectBoxName);
    for (let i = 0; i < dbData.length; i++) {
        selectBox.innerHTML = selectBox.innerHTML +
            '<option value="' + dbData[i][col[0]] + '">' + dbData[i][col[1]] + '</option>';
    }
}