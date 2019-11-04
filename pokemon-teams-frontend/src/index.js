const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {

  fetch("http://localhost:3000/trainers")
  .then(response => response.json())
  .then(trainersArray => trainersArray.forEach(trainer => renderTrainer(trainer)))

})



function renderTrainer(trainer) {
  const container = document.querySelector("#trainer-container")
  const trainerDiv = document.createElement("div")
  trainerDiv.classList.add("card")
  trainerDiv.id = `trainer-${trainer.id}`
  container.appendChild(trainerDiv)

  const trainerName = document.createElement("p")
  trainerDiv.appendChild(trainerName)
  trainerDiv.innerText = trainer.name

  const button = document.createElement("button")
  trainerDiv.appendChild(button)
  button.innerText = "Add Pokemon"
  button.addEventListener("click", addPokemonToTeam)

  const pokemonUl = document.createElement("ul")
  trainerDiv.appendChild(pokemonUl)

  const pokemonsOfTrainer = trainer.pokemons
  pokemonsOfTrainer.forEach(pokemon => addPokemonLi(pokemon, pokemonUl))
}



function addPokemonLi(pokemon, pokemonUl) {
  const pokemonLi = document.createElement("li")
  pokemonUl.appendChild(pokemonLi)
  pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`
  
  const pokemonButton = document.createElement("button")
  pokemonLi.appendChild(pokemonButton)
  pokemonButton.innerText = "Release"
  pokemonButton.classList.add("release")
  pokemonButton.id = `pokemon-${pokemon.id}`
  pokemonButton.addEventListener("click", deletePokemon)
}



function addPokemonToTeam(event) {
  const trainerId = parseInt(event.target.parentElement.id.split("-")[1], 10)
  const pokemonUl = event.target.parentElement.querySelector("ul")
  if (pokemonUl.querySelectorAll("li").length < 6) {
  fetch("http://localhost:3000/pokemons", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      trainer_id: trainerId
    })
  })
  .then(response => response.json())
  .then(pokemon => addPokemonLi(pokemon, pokemonUl))
  } else {alert("You alreay have 6 pokemons!!!!")}
}



function deletePokemon(event) {
  const pokemonId = parseInt(event.target.id.split("-")[1], 10)
  fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(pokemon => deletePokemonLi(pokemon))
}

function deletePokemonLi(pokemon) {
  const pokemonLi = document.querySelector(`#pokemon-${pokemon.id}`).parentElement
  pokemonLi.remove()
}