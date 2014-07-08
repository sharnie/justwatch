Rails.application.routes.draw do
  root "gists#index"

  resources :visuals
  resources :gists
  
end
