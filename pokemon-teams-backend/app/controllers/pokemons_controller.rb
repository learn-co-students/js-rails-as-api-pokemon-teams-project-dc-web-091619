class PokemonsController < ApplicationController


  def destroy
    pokemon = Pokemon.find(params["id"]).destroy
    render json: pokemon
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: pokemonParams["trainer_id"])
    render json: pokemon
  end

  private

  def pokemonParams
    params.require(:pokemon).permit(:nickname,:species,:trainer_id)
  end

end

