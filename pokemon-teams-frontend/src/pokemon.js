// function getRandomPokemon(){
//     return fetch('http://localhost:3000/pokemons')
//     .then(response => response.json())
//     .then(function(pokemons){
//         let randomPokemon = pokemons[Math.floor(Math.random() * pokemons.length)];
//         return randomPokemon;
//     })
// }

function addRandomPokemon(event){
    let trainerId = event.target.id
    let teamLength = event.target.nextSibling.children.length
    if (teamLength >= 6) {
        alert("Your Team is Full!")
    } else {
        //method to create random pokemon
       fetch('http://localhost:3000/pokemons', {
           method: 'POST',
           headers: {
               "Content-Type": "application/json",
               "Accept": "application/json"
           },
           body: JSON.stringify({
               "trainer_id": trainerId
           })
       })
       .then(response => response.json())
       .then(pokemon => updateDOM(pokemon))
    }
}

function updateDOM(pokemon){
   let trainerCard = document.getElementById(`${pokemon.trainer_id.toString()}`)
   let cardUl = trainerCard.children[2]
   let pokeLi = document.createElement('li')
   pokeLi.id = `li-pokemon-${pokemon.id}`
   pokeLi.innerText = `${pokemon.nickname} (${pokemon.species})`
   cardUl.appendChild(pokeLi)

   let releasePkm = document.createElement('button')
   releasePkm.classList.add('release');
   releasePkm.id = `pokemon-${pokemon.id}`;
   releasePkm.innerText = "Release"

   releasePkm.addEventListener('click', gLeaguePokemon)

   pokeLi.appendChild(releasePkm)

}


function gLeaguePokemon(event){
    let pokeId = event.target.id.split('-')[1]
    fetch(`http://localhost:3000/pokemons/${pokeId}`, {
        method: 'delete',
        headers:{
            'Content-Type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({
            id: pokeId
        })
    })
    .then(res => res.json())
    .then(poke => deleteDom(poke)) 
}

function deleteDom(poke){
    let trainerCard = document.getElementById(`${poke.trainer_id.toString()}`)
    let pokeID = poke.id.toString();
    
    let thisLi = trainerCard.querySelector(`#li-pokemon-${pokeID}`)

    thisLi.remove()
}



