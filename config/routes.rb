Rails.application.routes.draw do
  devise_for :users, controllers: {omniauth_callbacks: "omniauth_callbacks"}
  root "gists#new"

  # embed route
  get 'embed/:user_id/:gist_id' => 'gists#embed'

  resources :visuals
  resources :gists
  
end
