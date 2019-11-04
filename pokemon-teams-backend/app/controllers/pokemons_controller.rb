class PokemonsController < ApplicationController

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    
    newPokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
    
    render json: newPokemon
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy

    render json: pokemon
  end


end
