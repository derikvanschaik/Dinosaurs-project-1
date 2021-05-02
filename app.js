class Human{
    constructor(name, feet, inches, weight, diet){
        this.name = name;
        this.height = Number(feet) + Number(inches)/12;
        this.weight = Number(weight);
        this.diet = diet;
    }
    introduce(){
        return `hello I am ${this.name} and i am a ${this.diet}`; 
    }

}

function getValue(id){
    const val = document.getElementById(id).value;
    return val;
}

function getHuman(){
    const name = getValue('name');
    const feet = getValue('feet');
    const inches = getValue('inches');
    const weight = getValue('weight');
    const diet = getValue('diet'); 
    return new Human(name, feet, inches, weight, diet); 
}

function hideForm(){
    document.getElementById('dino-compare').style.display = 'none';
}

function makeTile(text){
    const grid = document.getElementById('grid'); 
    let newTile = document.createElement('div');
    let tileText = document.createTextNode(text);
    newTile.append(tileText);
    grid.append(newTile); 

}

function loadNewPage(vals, ids){
    const human = getHuman();
    hideForm(); 
    makeTile(human.introduce());
}

const validField = (field) => {return field.length > 0}; 

const submitButton = document.getElementById('btn');

submitButton.addEventListener('click', function() {
    const ids = ['name', 'feet', 'inches', 'weight', 'diet'];
    const vals = ids.map(getValue);
    if (vals.every(validField)){
        loadNewPage();
    }

});