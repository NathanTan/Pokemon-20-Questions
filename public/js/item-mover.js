function moveSelected(box1Name, box2Name) {
    let box1 = document.getElementById(box1Name);
    let box2 = document.getElementById(box2Name);

    let selected = [];
    for (let i = 0; i < box1.length; i++) {
        if (box1.options[i].selected === true) {
            selected.push(box1.options[i]);
        }
    }

    selected.forEach(item => {
        box2.appendChild(item.cloneNode(true));
        item.remove();
    });
}


function moveItemsById(typeList, sourceBoxId, targetBoxId) {
    let options = Array.from(document.querySelectorAll("#" + sourceBoxId + " option"));

    // Type coercion is intentional here.
    typeList.forEach(t => options.find(o => o.value == t.id).selected = true);

    moveSelected(sourceBoxId, targetBoxId);
}

function selectAllItems(boxId) {
    let options = Array.from(document.querySelectorAll("#" + boxId + " option"));
    options.forEach(o => o.selected = true);
}