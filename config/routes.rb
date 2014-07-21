Rails.application.routes.draw do
  devise_for :users, controllers: { 
    omniauth_callbacks: "omniauth_callbacks",
    registrations: 'registrations'
  }
  root "gists#new"

 
  get 'embed/js/:user_id/:gist_url' => 'gists#embed', as: 'embed_link'
  get 'embed/css/:user_id/:gist_url' => 'gists#embed_stylesheet', as: 'embed_stylesheet'


  resources :gists, except: [:new], param: :url 

  
end
