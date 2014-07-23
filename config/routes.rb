Rails.application.routes.draw do
  devise_for :users, skip: "passwords", controllers: { 
    omniauth_callbacks: "omniauth_callbacks"
  }

  devise_scope :user do
    post "/users/password"     => 'devise/passwords#create', as: 'user_password'
    get "/users/password/edit" => "devise/passwords#edit", as: 'edit_user_password'
    patch '/users/password'    => 'devise#passwords#update'
    put '/users/password'      => 'devise#passwords#update'
  end

  root "gists#new"

 
  get 'embed/:user_id/:gist_url' => 'gists#embed', as: 'embed_link'


  resources :gists, except: [:new], param: :url 

  
end
