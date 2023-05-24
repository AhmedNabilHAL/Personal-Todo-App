if Rails.env === 'production' 
  Rails.application.config.session_store :cookie_store, key: '_todo_app', domain: 'http://localhost:8888'
else
  Rails.application.config.session_store :cookie_store, key: '_todo_app'
end
