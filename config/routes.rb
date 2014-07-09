Rails.application.routes.draw do
  devise_for :users
  root "gists#new"

  resources :visuals
  resources :gists
  
end
