const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    fetchTrainers()
})

function fetchTrainers() {
    fetch(TRAINERS_URL)
        .then(response => response.json())
        .then(trainersArray => { trainersArray.forEach(trainer => renderTrainers(trainer))
})
}

function renderTrainers(trainer) {
    
    let container = document.getElementById('container')
    let trainerDiv = document.createElement('div')
    trainerDiv.id = trainer.id
    trainerDiv.classList.add('card')

    let trainerName = document.createElement('p')
    trainerName.innerText = `${trainer.name}`

    let addButton = document.createElement('button')
    addButton.innerText = "Add Pokemon"
    
    let pmList = document.createElement('ul')
    
    addButton.addEventListener("click", addPokemon)
   
    


    container.appendChild(trainerDiv)
    trainerDiv.append(trainerName, addButton, pmList)
    
    

    trainer.pokemons.forEach(pokemon => {
        renderPokemon(pokemon, pmList)
    })


}

function renderPokemon(pokemon, parent) {
    let pmNickName = document.createElement('li')
        parent.appendChild(pmNickName)

        pmNickName.innerHTML = `${pokemon.nickname} (${pokemon.species})`
        pmNickName.dataset.pokemonId = pokemon.id

        let releaseButton = document.createElement('button')
        pmNickName.appendChild(releaseButton)
        releaseButton.innerText = "Release"
        releaseButton.classList.add('release')
        releaseButton.addEventListener("click", destroyPokemon)
}

function destroyPokemon(event){
    fetch(`${BASE_URL}/pokemons/${event.currentTarget.parentElement.dataset.pokemonId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    event.currentTarget.parentElement.remove()
}

function addPokemon(event){
    if (event.target.nextSibling.childNodes.length  6) {
        fetch(POKEMONS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "trainer_id": `${event.target.parentElement.id}`
            })
        })
        .then(response => response.json())
        .then(newPokemon => {
            let myEvent = event.target.parentElement
            
            renderPokemon(newPokemon, myEvent)
        })
    }
   


}