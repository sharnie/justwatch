Rails.application.routes.draw do
  devise_for :users, controllers: { omniauth_callbacks: "omniauth_callbacks" }
  root "gists#new"

 
  get 'embed/:user_id/:gist_id' => 'gists#embed'
  get 'embed/:user_id/:gist_id/stylesheet.css' => 'gists#embed_stylesheet', as: 'embed_stylesheet'

  resources :visuals
  resources :gists
  
end
