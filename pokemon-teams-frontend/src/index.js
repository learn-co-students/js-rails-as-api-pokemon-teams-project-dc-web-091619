const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// DO DOM CONTENT LOADED HERE
document.addEventListener("DOMContentLoaded", () => {

//DO FETCH HERE TO GET THE TRAINERS
  fetch("http://localhost:3000/trainers")
  .then(response => response.json())
  .then(trainersArray => trainersArray.forEach(trainer => renderTrainer(trainer)))

})


//SHOWING THE TRAINERS WITH DIV
//FIND THE TRAINER CONTAINER TO APPEND. WHEN CREATING DIV MUST
//APPEND TO CONTAINER
function renderTrainer(trainer) {
  const container = document.querySelector("#trainer-container")
  const trainerDiv = document.createElement("div")
  trainerDiv.classList.add("card")
  trainerDiv.id = `trainer-${trainer.id}`
  container.appendChild(trainerDiv)

  //PUTTING TRAINER NAME AND APPENDING TO DIV
  const trainerName = document.createElement("p")
  trainerDiv.appendChild(trainerName)
  trainerDiv.innerText = trainer.name

  //CREATING A DOCUMENT ELEMENT AND ADDING EVENT LISTENER TO IT
  const button = document.createElement("button")
  trainerDiv.appendChild(button)
  button.innerText = "Add Pokemon"
  button.addEventListener("click", addPokemonToTeam)

  //CREATING THE UL
  const pokemonUl = document.createElement("ul")
  trainerDiv.appendChild(pokemonUl)

//GETTING THE POKEMONS OF THE TRAINER
  const pokemonsOfTrainer = trainer.pokemons
  pokemonsOfTrainer.forEach(pokemon => addPokemonLi(pokemon, pokemonUl))
}


//CALLBACK FUNCTION FOR ABOVE FUNCTION/ADDING POKEMONS
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


//EVENT LISTENER FOR ABOVE FUNCTION/DOING A FETCH FOR POST/CREATE
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


//DELETE POKEMEN FUNCTION WITH EVENT
function deletePokemon(event) {
  const pokemonId = parseInt(event.target.id.split("-")[1], 10)
  fetch(`http://localhost:3000/pokemons/${pokemonId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    }
  })//THIS IS TO MANIPULATE THE DOM SO IT USER DOES NOT REFRESH
  .then(response => response.json())
  .then(pokemon => deletePokemonLi(pokemon))
}

//ACTUAL POKEMON DELITION THAT WAS A CALLBACK FROM ABOVE EVENT
function deletePokemonLi(pokemon) {
  const pokemonLi = document.querySelector(`#pokemon-${pokemon.id}`).parentElement
  pokemonLi.remove()
}