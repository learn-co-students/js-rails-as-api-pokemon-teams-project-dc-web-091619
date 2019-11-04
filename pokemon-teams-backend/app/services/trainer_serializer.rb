class TrainerSerializer

    def initialize(trainer_object)
        @trainer = trainer_object
    end

    def to_serialized_json
        @trainer.to_json(:include => {
            :pokemons => {:except => [:created_at, :updated_at]}
        }, :except => [:updated_at,:created_at])
    end
end