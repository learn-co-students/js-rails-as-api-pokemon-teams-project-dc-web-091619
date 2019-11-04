class TrainersController < ApplicationController
    def index
        render json: Trainer.all.to_json(serialized_data)
    end

    private 
    def serialized_data
        {
            :include => {:pokemons =>
                {:except => [:created_at, :updated_at]}
            },
            :only => [:id, :name]
        }
    end
end
