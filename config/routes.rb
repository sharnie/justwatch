Rails.application.routes.draw do
  devise_for :users, controllers: { 
    omniauth_callbacks: "omniauth_callbacks",
    registrations: 'registrations'
  }
  root "gists#new"

 
  get 'embed/:user_id/:gist_url' => 'gists#embed', as: 'embed_link'


  resources :gists, except: [:new], param: :url 

  
end
