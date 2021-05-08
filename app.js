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

class Animal{
    constructor(name,weight, diet, image){
        this.name = name;
        this.weight = weight;
        this.diet = diet;
        this.image = image;
    }
}

class Dinosaur extends Animal{
    constructor(species, weight, height, diet, where, when, fact){
        super();
        this.name = species;
        this.weight = Number(weight);
        this.height = Number(height);
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
        this.image = species.toLowerCase() +'.png';
    }
    compareHeight = function(humanHeight){
        const heightDifference = Math.abs(Math.floor(this.height - humanHeight));
        if (this.height >= humanHeight){
            return `${this.name} is bigger than you by ${heightDifference} feet`;
        }
        return `${this.name} is smaller than you by ${heightDifference} feet`;
    }
    compareWeight = function(humanWeight){
        const weightDifference = Math.abs(Math.floor(this.weight - humanWeight));
        if (this.weight >= humanWeight){
            return `${this.name} weighs more than you by ${weightDifference} pounds`; 
        }
        return `You weigh more than ${this.name} by ${weightDifference} pounds`; 
    }
    compareDiet = function(humanDiet){
        if (humanDiet === this.diet){
            return `You and ${this.name} are both ${this.diet}`;
        }
        else{
            return `You are a ${humanDiet}, whereas ${this.name} is a ${this.diet}.`;
        }
    }
    compareName  = function(humanName){
        if (this.name.length > humanName.length){
            return `You have a shorter name, human`;
        }
        else if (this.name.length === humanName.length){
            return `Our names our equal, human`;
        }
        else{
            return `Your name is longer than mine, human >:(`;
        }
    }
}

class Human extends Animal{
    constructor(name, feet, inches, weight, diet, image){
        super();
        this.name = name;
        this.height = Number(feet) + Number(inches)/12;
        this.weight = Number(weight);
        this.diet = diet;
        this.image = image;
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

function createTile(object){
    const grid = document.getElementById('grid');
    let newTile = document.createElement('div');
    newTile.classList.add('grid-item'); 
    newTile.innerHTML = `
    <h3>${object.name}</h3>
    <img src="images/${object.image}">
    `;
    if (object instanceof Dinosaur){
        newTile.innerHTML += `<h3>${object.fact}
        <h4>Click Me!</h4>`;
    }
    grid.appendChild(newTile); 
}

function createTiles(dinos, human){
    dinos.splice(4, 0, human);
    dinos.forEach((dino) => {createTile(dino)});
}


function loadNewPage(){
    const human = getHuman();
    const dinoObjects = getDinosaurs();
    hideForm(); 
    createTiles(dinoObjects, human);
    return dinoObjects; 
}

function getTile(childNum){
    return document.querySelector(`.grid-item:nth-child(${childNum})`);
}

function getTiles(tileObjects){
    const tiles = []; 
    tileObjects.forEach(function(tile, i){
        tiles.push(getTile(i+1)); // i + 1 due to zero indexing
    });
    return tiles; 
}

        
function displayError(modal){
    modal.style.display = "block";
    const modalText = document.getElementById("modal-text");
    modalText.style.color = "red";

}
function hideError(){
    const modal = document.getElementById("myModal");
    modal.style.display = "none"; 
}

const validField = (field) => {return field.length > 0}; 

const submitButton = document.getElementById('btn');
const modalClose = document.getElementsByClassName("close")[0];

submitButton.addEventListener('click', function() {
    const ids = ['name', 'feet', 'inches', 'weight', 'diet'];
    const vals = ids.map(getValue);
    if (vals.every(validField)){
        const tileObjects = loadNewPage(); // returns the modified objects that are on the 9 by 9 grid 
        const tiles = getTiles(tileObjects);
        const human = getHuman(); 

        tiles.forEach(function(tile, i){
            const originalHTMl = tile.innerHTML;
            let clicked = false; 
            tile.addEventListener('click', function(){
                if (tileObjects[i] instanceof Dinosaur 
                    && !clicked){
                    tile.innerHTML = `
                    <h3>Species: ${tileObjects[i].name}</h3>
                    <h3>Where: ${tileObjects[i].where}</h3>
                    <h3>When: ${tileObjects[i].when}</h3>
                    <h3>${tileObjects[i].compareDiet(human.diet)}</h3>
                    <h3>${tileObjects[i].compareWeight(human.weight)}</h3>
                    <h3>${tileObjects[i].compareHeight(human.height)}</h3>
                    `;
                }
                else if (tileObjects[i] && clicked){
                    tile.innerHTML = originalHTMl; 

                }
                clicked = !clicked; 

            });
            

        });
    }
    else{
        const modal = document.getElementById("myModal");
        displayError(modal);
    }

});

modalClose.addEventListener('click', hideError); 