class TrainersController < ApplicationController
  def index
    render json: Trainer.all.to_json(
      :include => {:pokemons => {:except => [:created_at, :updated_at]}
                  },
      :except => [:created_at, :updated_at]

      #can also rewrite as
      # trainerr=Trainer.all
      # render json: trainers.to_json(serializeTrainer)
      )
  end


  # can do serialize here if want to do differently

  # private
  # def serializeTrainer
  # {
          # :include => { :pokemons => {
          #               :except => [:created_at, :updated_at]
          #     }
          # },
          # :only =>[:name, :id]
  # }
  # end

end
