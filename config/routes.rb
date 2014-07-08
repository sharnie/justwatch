Rails.application.routes.draw do
  root 'gist#new'

  resources :visuals

  get 'gist/new'

  post 'gist/create'

end
