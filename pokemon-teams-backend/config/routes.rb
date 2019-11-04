Rails.application.routes.draw do

  get '/trainers', to: 'trainers#index'
  patch '/trainers/:id', to: 'trainers#update'
  
  get '/pokemons', to: 'pokemons#index'
  post '/pokemons', to: 'pokemons#create'
  delete '/pokemons/:id', to: 'pokemons#destroy'
  
end
