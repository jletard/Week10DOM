class Player {
    constructor(name, id, rating) {
        this.name = name;
        this.id = id;
        this.rating = rating;
    }
}

class Section {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.players = [];
    }

    addPlayer(player) {
        this.players.push(player);
    }

    deletePlayer(player) {
        let index = this.players.indexOf(player);
        this.players.splice(index, 1);
    }
}

let sections = [];
let sectionNumber = 0;

onClick('new-section', () => {
    sections.push(new Section(sectionNumber++, getValue('new-section-title')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let sectionDiv = document.getElementById('tableArea')
    clearElement(sectionDiv);
    for (let section of sections) {
        let table = createSectionTable(section);
        let title = document.createElement('h2');
        title.innerHTML = section.name;
        title.appendChild(CreateDeleteSectionButton(section));
        sectionDiv.appendChild(title);
        sectionDiv.appendChild(table);
        for (let player of section.players) {
            createPlayerRow(section, table, player)
        }
    }
}

function createPlayerRow(section, table, player) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = player.name;
    row.insertCell(1).innerHTML = player.id;
    row.insertCell(2).innerHTML = player.rating;
    let actions = row.insertCell(3);
    actions.appendChild(createDeleteRowButton(section, player));
    if (section.id > 0) {
        actions.appendChild(createMoveUpButton(section, player));
    }
    if (section.id < sections.length-1) {
        actions.appendChild(createMoveDownButton(section, player));
    }
}

function initButton(btnName) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = btnName;
    return btn;
}

function createDeleteRowButton(section, player) {
    let btn = initButton('Delete');
    btn.onclick = () => {
        let index = section.players.indexOf(player);
        section.players.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createMoveUpButton(section, player) {
    let btn = initButton('Move Up');
    btn.onclick = () => {
        let index = section.players.indexOf(player);
        sections[section.id - 1].players.push(player);
        section.players.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createMoveDownButton(section, player) {
    let btn = initButton('Move Down');
    btn.onclick = () => {
        let index = section.players.indexOf(player);
        sections[section.id + 1].players.push(player);
        section.players.splice(index, 1);
        drawDOM();
    };
    return btn;    
}

function CreateDeleteSectionButton(section) {
    let btn = initButton('Delete Section');
    btn.onclick = () => {
        let index = sections.indexOf(section);
        sections.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createAddPlayerButton(section) {
    let btn=initButton('Create');
    btn.onclick = () => {
        section.players.push(new Player(getValue(`name-input-${section.id}`), getValue(`id-input-${section.id}`), getValue(`rating-input-${section.id}`)));
        drawDOM();
    };
    return btn;
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function initInput(id) {
    let inputName = document.createElement('input');
    inputName.setAttribute('id', id);
    inputName.setAttribute('type', 'text');
    inputName.setAttribute('class', 'form-control');
    return inputName;
}

function createSectionTable(section) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let idColumn = document.createElement('th');
    let ratingColumn = document.createElement('th');
    let buttonColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    idColumn.innerHTML = 'ID';
    ratingColumn.innerHTML = 'Rating';
    buttonColumn.innerHTML = '';
    row.appendChild(nameColumn);
    row.appendChild(idColumn);
    row.appendChild(ratingColumn);
    row.appendChild(buttonColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let idTh = document.createElement('th');
    let ratingTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = initInput(`name-input-${section.id}`);
    let idInput = initInput(`id-input-${section.id}`);
    let ratingInput = initInput(`rating-input-${section.id}`);
    let newPlayerButton = createAddPlayerButton(section);
    nameTh.appendChild(nameInput);
    idTh.appendChild(idInput);
    ratingTh.appendChild(ratingInput);
    createTh.appendChild(newPlayerButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(idTh);
    formRow.appendChild(ratingTh);
    formRow.appendChild(createTh);
    return table;
}