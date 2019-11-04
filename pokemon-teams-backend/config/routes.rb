Rails.application.routes.draw do
  #resources :pokemons
  #resources :trainers
  
  get '/trainers', to: 'trainers#index'
  post '/pokemons', to: 'pokemons#create'
  delete '/pokemons/:id', to: 'pokemons#destroy'

end
