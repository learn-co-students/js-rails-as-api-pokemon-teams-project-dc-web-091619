class PokemonsController < ApplicationController
    def index
        render json: Pokemon.all
    end

    def create
       
       name = Faker::Name.first_name
       species = Faker::Games::Pokemon.name
       newPokemon = Pokemon.create(nickname: name, species: species, trainer_id: params['trainer_id'])
       render json: newPokemon
    end

    def destroy
        poke = Pokemon.find(params[:id])
        poke.destroy
        render json: poke 
    end


end
