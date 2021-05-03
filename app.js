function getDinoObjects(){
    dino = {"Dinos": [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ]
    }
    return dino['Dinos']; 
}


class Dinosaur{
    constructor(species, weight, height, diet, where, when, fact){
        this.name = species;
        this.weight = Number(weight);
        this.height = Number(height);
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
        this.image = species.toLowerCase() +'png';  
    }
    introduce(){
        return `hello I am a ${this.name} and i am a ${this.diet}`; 
    }


}

class Human{
    constructor(name, feet, inches, weight, diet, image){
        this.name = name;
        this.height = Number(feet) + Number(inches)/12;
        this.weight = Number(weight);
        this.diet = diet;
        this.image = image; 
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
    const image = 'human.png'; 
    return new Human(name, feet, inches, weight, diet, image);
}
function getDinosaurs(){
    const dinos = getDinoObjects(); //get the json as a list
    const dinoObjects = dinos.map(function(dino){
        return new Dinosaur(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact); 
    } );
    return dinoObjects; 
}

function hideForm(){
    document.getElementById('dino-compare').style.display = 'none';
}

function makeTile(object){
    const grid = document.getElementById('grid');
    let newTile = document.createElement('div');
    newTile.classList.add('grid-item'); 
    newTile.innerHTML = `
    <h3>${object.name}</h3>
    <img src="images/${object.image}">
    `;
    if (object instanceof Dinosaur){
        newTile.innerHTML += `<h3>${object.fact}`; 
    }
    grid.appendChild(newTile); 
}

function loadNewPage(){
    const human = getHuman();
    const dinoObjects = getDinosaurs();
    dinoObjects.forEach(
        (dino) => {console.log(dino.introduce()) }
        );  
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