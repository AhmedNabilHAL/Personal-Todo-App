class User < ApplicationRecord
    has_secure_password
    has_many :todo_lists
    has_many :todos

    validates :username, presence: true, format: { with: /\A[a-zA-Z0-9_]+\Z/ }
    validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
    validates :password_digest, presence: true
end
