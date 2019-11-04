const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(){
    console.log('DOM is loaded')
    fetchTrainers()
})

function fetchTrainers() {
    fetch('http://localhost:3000/trainers')
        .then(res => res.json())
        .then(trainersArray => {
            trainersArray.forEach(trainer => renderTrainer(trainer))
        })

}

function renderTrainer(trainer) {
    let trainerContainer = document.querySelector('#trainers-container')
    let trainerDiv = document.createElement('div');
    trainerDiv.classList.add("card");
    trainerContainer.appendChild(trainerDiv);
    trainerDiv.innerHTML = `<h1>${trainer.name}</h1>
    <button id="add-pokemon-${trainer.id}">Add Pokemon</button>
    <h3>Pokemon:</h3>
    <ul id="trainer-${trainer.id}"></ul>`;
    document.getElementById(`add-pokemon-${trainer.id}`).addEventListener("click",addPokemon)
    trainer.pokemons.forEach(createPokemon)
}


function deletePokemon(e){
    let idee = e.target.id;
    let deadLi = e.target.parentNode;
    deadLi.parentNode.removeChild(deadLi);
    fetch(`http://localhost:3000/pokemons/${idee}`,{
        method: 'DELETE',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(
            {id:idee})
    }).then(res => res.json())
        .then(json => alert(`You Killed ${json.nickname}`))
}

function addPokemon(e) {

    let idee = e.target.id.split("-")[2]
    list = e.target.parentNode.querySelector(`#trainer-${idee}`);
    if (list.childNodes.length < 6 ) {
        fetch('http://localhost:3000/pokemons', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(
                {trainer_id: idee})
        }).then(res => res.json())
            .then(createPokemon)
    } else {
        alert("This trainer has their maximimum amount of pokemon!!!!!!!")
    }
 }

 function createPokemon(pokemon) {
     let trainersList = document.querySelector(`#trainer-${pokemon.trainer_id}`);
     let item = document.createElement("li");
     item.innerText = `${pokemon.nickname}, ${pokemon.species}`;
     let button = document.createElement("button");
     button.innerText="Release";
     button.id = `${pokemon.id}`;
     button.addEventListener("click",deletePokemon);
     item.appendChild(button);
     trainersList.appendChild(item);
 }