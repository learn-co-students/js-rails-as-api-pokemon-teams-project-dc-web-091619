function fetchTrainers(){
    fetch('http://localhost:3000/trainers')
    .then(response => response.json())
    .then(trainer => trainer.forEach(trainer => {
        renderTrainer(trainer);
    }))
}

function renderTrainer(trainer){
    console.log(trainer);
    let container = document.querySelector('#all-container');

    //creating elements
    //DIV
    let trainerCard = document.createElement('div')
    trainerCard.classList.add('card')
    trainerCard.id = trainer.id
    container.appendChild(trainerCard);

    //name
    let trainerName = document.createElement('p')
    trainerName.innerText = trainer.name;

    trainerCard.appendChild(trainerName);

    //Add Pokemon Button
    let addPokemonBtn = document.createElement('button');
    addPokemonBtn.id = `${trainer.id}`
    addPokemonBtn.innerText = "Add Pokemon"
    addPokemonBtn.addEventListener('click', addRandomPokemon);
    trainerCard.appendChild(addPokemonBtn);

    //ul for pokemons
    let pokedex = document.createElement('ul');

    trainer.pokemons.forEach(pokemon => {
        let pkmLi = document.createElement('li')
        pkmLi.innerText = `${pokemon.nickname} (${pokemon.species})`
        pkmLi.id = `li-pokemon-${pokemon.id}`


        let releasePkm = document.createElement('button')
        releasePkm.classList.add('release');
        releasePkm.id = `pokemon-${pokemon.id}`;
        releasePkm.innerText = "Release"

        releasePkm.addEventListener('click', gLeaguePokemon)

        pkmLi.appendChild(releasePkm); //appending the Release button to the li
        pokedex.appendChild(pkmLi)  //appending the LI to the UL 
    })

    trainerCard.appendChild(pokedex); //appending pokemon UL to trainer card

}