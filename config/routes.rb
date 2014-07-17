Rails.application.routes.draw do
  devise_for :users, controllers: { 
    omniauth_callbacks: "omniauth_callbacks",
    registrations: 'registrations'
  }
  root "gists#new"

 
  get 'embed/:user_id/:gist_id' => 'gists#embed', as: 'embed_link'
  get 'embed/:user_id/:gist_id/stylesheet.css' => 'gists#embed_stylesheet', as: 'embed_stylesheet'

  resources :visuals
  resources :gists, except: [:new]
  
end
