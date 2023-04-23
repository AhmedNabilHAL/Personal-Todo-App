class User < ApplicationRecord
    has_secure_password
    
    has_many :todo_lists
    has_many :todos

    validates :username, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9_]+\Z/ }
    validates :email, presence: true, uniqueness: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: 'Invalid email' }
    validates :password_digest, presence: true
end
