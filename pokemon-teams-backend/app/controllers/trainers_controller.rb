class TrainersController < ApplicationController

  def index
    render json: Trainer.all.to_json({
      include: [:pokemons]
    })
  end

end
