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
