const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
  fetchTrainers()
})

function fetchTrainers(){
  fetch(TRAINERS_URL)
    .then( response => response.json() )
    .then( trainerArray => trainerArray.forEach(trainer => renderTrainer(trainer)) )
}

function renderTrainer(trainer){
  let main = getMain()
  
  let trainerCard = document.createElement('div')
  trainerCard.classList.add("card")
  trainerCard.setAttribute("data-id", trainer.id)

  let trainerName = document.createElement('p')
  trainerName.innerText = trainer.name

  let addPokemonBtn = document.createElement('button')
  addPokemonBtn.setAttribute("data-trainer-id", trainer.id)
  addPokemonBtn.innerText = "Add Pokemon"
  addPokemonBtn.addEventListener('click', () => addPokemon())

  let pokemonUL = document.createElement('ul')
  pokemonUL.id = `trainer-${trainer.id}`

  trainer.pokemons.forEach( pokemon => listPokemon(pokemon, pokemonUL) )


  trainerCard.append(trainerName, addPokemonBtn, pokemonUL)
  main.append(trainerCard)
}

function listPokemon(pokemon, ul){
  let li = document.createElement('li')
  li.innerText = `${pokemon.nickname} (${pokemon.species})`
  li.id = `pokemon-${pokemon.id}`
  
  let releaseBtn = document.createElement('button')
  releaseBtn.classList.add("release")
  releaseBtn.setAttribute("data-pokemon-id", pokemon.id)
  releaseBtn.innerText = "Release"
  releaseBtn.addEventListener('click', () => releasePokemon(pokemon.id))

  li.append(releaseBtn)
  ul.append(li)
}

function addPokemon(){
  let trainerId = event.target.getAttribute('data-trainer-id')
  let pokemonUL = document.querySelector(`#trainer-${trainerId}`)
  let currentTeamSize = pokemonUL.childElementCount

  if (currentTeamSize < 6){
    createNewPokemon(trainerId)
  }else{
    alert("You have a team of 6")
  }

}

function createNewPokemon(trainerId){
  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      trainer_id: trainerId
    })
  })
    .then( response => response.json() )
    .then( newPokemon => addNewPokemon(newPokemon) )
}

function addNewPokemon(newPokemon){
  let trainerId = newPokemon.trainer_id
  let pokemonUL = document.querySelector(`#trainer-${trainerId}`)

  listPokemon(newPokemon, pokemonUL)
}

function releasePokemon(id){
  fetch(`${POKEMONS_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type" : "application/json"
    }
  })
    .then( response => response.json() )
    .then( pokemon => removeFromDOM(pokemon) )
}

function removeFromDOM(pokemon){
  let deadPokemon = document.querySelector(`#pokemon-${pokemon.id}`)
  deadPokemon.remove()
}

// DOM Nodes
function getMain(){
  return document.querySelector('main')
}
