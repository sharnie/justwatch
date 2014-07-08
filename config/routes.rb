Rails.application.routes.draw do
  root 'gist#new'

  resources :visuals
  resources :gists
  
end
