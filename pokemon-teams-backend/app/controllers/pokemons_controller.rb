class PokemonsController < ApplicationController
  #pokemon controller
  def index
    render json: Pokemon.all.to_json(except: [:created_at, :updated_at])
  end

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    new_po = Pokemon.create(nickname: name, species: species, trainer_id: params["trainer_id"])
    render json: new_po
  end

  def destroy
    deleted_po = Pokemon.destroy(params[:id])
    render json: deleted_po
  end

end
