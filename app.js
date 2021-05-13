
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

const createHTMLBanner = (type, id, text, parent) =>{
    const htmlBanner = document.createElement("H"); 
    htmlBanner.innerHTML = `<${type} id ="${id}">${text}</${type}>`; 
    parent.appendChild(htmlBanner); 

}

const getDinoBannersInfo = (object) =>{
    return [
                {
                    type: 'h2',
                    id:  `fact-${object.name}`,
                    text: `${object.fact}`,
                },
                {
                    type: 'h3',
                    id: `where-${object.name}`,
                    text: `Where?`
                },
                {
                    type: 'h3',
                    id: `when-${object.name}`,
                    text: `When?`
                },
                {
                    type: 'h3',
                    id: `compare-${object.name}`,
                    text: `How do I compare?`
                }
        ]; 
}

function createTile(object, human){
    const grid = document.getElementById('grid');
    let newTile = document.createElement('div');
    const hiddenTile = document.createElement('p');
    hiddenTile.id = `hidden-info-${object.name}`; 
    newTile.classList.add('grid-item'); 
    newTile.innerHTML = `
    <h3 id='name-${object.name}'>${object.name}</h3>`;

    if (object instanceof Dinosaur){

        const dinoBanners = getDinoBannersInfo(object); 
        dinoBanners.forEach((info) =>{
            createHTMLBanner(info.type, info.id, info.text, newTile); 
        }); 

    }


    newTile.innerHTML += `<img src="images/${object.image}">
    `;
    newTile.appendChild(hiddenTile); // hidden paragraph for hover 
    grid.appendChild(newTile); 
}

function createTiles(dinos, human){
    const middleOfArray = 4; 
    dinos.splice(middleOfArray, 0, human);
    dinos.forEach((dino) => {createTile(dino, human)});
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

const getBanners = (object) =>{
    const bannerIds = [`where-${object.name}`, `when-${object.name}`, `compare-${object.name}`]; 
    return bannerIds.map((id) => document.getElementById(id) );
}

const getHTMLMappings = (object, human) =>{
    return [`<p>The ${object.name} is from: ${object.where}`, 
            `<p>The ${object.name} was during the time of: ${object.when}`,
             `
             <p>${object.compareDiet(human.diet)}
                ${object.compareWeight(human.weight)}
                ${object.compareHeight(human.height)}</p>
            `]; 
}

const validField = (field) => {return field.length > 0}; 

const submitButton = document.getElementById('btn');
const modalClose = document.getElementsByClassName("close")[0];

submitButton.addEventListener('click', function() {
    const ids = ['name', 'feet', 'inches', 'weight', 'diet'];
    const vals = ids.map(getValue);

    if (vals.every(validField)){
        const tileObjects = loadNewPage(); // returns the modified objects that are on the 9 by 9 grid 
        const human = getHuman(); 

        tileObjects.forEach( (tile, i) =>{

            const hiddenText = document.getElementById(`hidden-info-${tile.name}`); 
            hiddenText.style.display = "none"; // doesn't work without this line of code here

            if (tile instanceof Dinosaur){

                const banners = getBanners(tile); 
                const htmlMappings = getHTMLMappings(tile, human); 
                banners.forEach( (banner, j) =>{

                    banner.addEventListener('mouseenter', ()=>{
                        banner.style.color = 'black';
                        banner.style.cursor = 'default';
                        hiddenText.style.display = 'block'; 
                        hiddenText.innerHTML = htmlMappings[j];

                    });

                    banner.addEventListener('mouseleave', () =>{
                        banner.style.color = null;
                        hiddenText.style.display = 'none'; 
                    })

                });
            }
            

        }); 
    }

    else{ // one or more invalid fields 
        const modal = document.getElementById("myModal");
        displayError(modal);
    }

});

modalClose.addEventListener('click', hideError); 