const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener('DOMContentLoaded', () => {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainers => trainers.forEach(trainer => renderTrainer(trainer)))
})


function renderTrainer(trainer) {
    const pokemons = trainer.pokemons
    const mainDiv = document.getElementsByTagName('main')[0]
    const trainerDiv = document.createElement('div')
    trainerDiv.classList.add('card')
    trainerDiv.id = `card-${trainer.id}`;
    const trainerName = document.createElement('p')
    trainerName.innerText = trainer.name;
    const addButton = document.createElement('button');
    addButton.addEventListener('click', addPokemon)
    addButton.innerText = 'Add Pokemon';
    addButton.id = `button-${trainer.id}`
    mainDiv.appendChild(trainerDiv)
    trainerDiv.appendChild(trainerName)
    trainerDiv.appendChild(addButton)
    const ulElem = document.createElement('ul')
    trainerDiv.appendChild(ulElem);
    pokemons.forEach(pokemon => renderPokemon(pokemon))
}

function addPokemon() {
    const pokeUl = event.target.nextSibling
    const trainerId = Number(event.target.id.split("-")[1])
    if (pokeUl.childElementCount >= 6) {
        alert("Your team is full!")
    } else {
        const configObj = {
            method: "POST",
            headers: {"Content-Type": 'application/json'},
            body: JSON.stringify({"trainer_id" : trainerId})
        }
        fetch(POKEMONS_URL, configObj)
        .then(response => response.json())
        .then(pokemon => renderPokemon(pokemon))
    }
}

function releasePokemon() {
    const pokeId = event.target.id.split("-")[1]
    const configObj = {
        method: "DELETE",
        headers: {
            "Content-Type": 'application/json'
        }
    }
    fetch(`${POKEMONS_URL}/${pokeId}`, configObj)
    .then(response => response.json())
    .then(response => console.log(response))
    event.target.parentNode.remove()
}

function renderPokemon (pokemon) {
    const trainerList = document.getElementById(`card-${pokemon.trainer_id}`).getElementsByTagName("ul")[0]
    const liElem = document.createElement('li')
    liElem.innerText = `${pokemon.nickname} (${pokemon.species})`
    const rlsButton = document.createElement('button')
    rlsButton.id = `pokemon-${pokemon.id}`
    trainerList.appendChild(liElem);
    liElem.appendChild(rlsButton)
    rlsButton.classList.add('release')
    rlsButton.innerText = "Release"
    rlsButton.addEventListener('click', releasePokemon)
}