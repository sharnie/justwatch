Rails.application.routes.draw do
  root "gists#new"

  resources :visuals
  resources :gists
  
end
