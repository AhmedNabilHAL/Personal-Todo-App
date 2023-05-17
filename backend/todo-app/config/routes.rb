Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  namespace :api do
    namespace :v1 do

      post "/login", to: "sessions#login"
      post "/logout", to: "sessions#destroy"
      get "/logout", to: "sessions#destory"
      
      resources :users
      get "/users/profile", to: "users#show_profile"
      resources :todo_lists
      resources :todos

      namespace :admin do
        resources :users do
          resources :todo_lists
          resources :todos
        end
      end
    end
  end
end
