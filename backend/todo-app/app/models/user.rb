class User < ApplicationRecord
    has_secure_password
    
    has_many :todo_lists
    has_many :todos

    validates :username, presence: true, uniqueness: true, format: { with: /\A[a-zA-Z0-9_]+\Z/ }
    validates :email, presence: true, uniqueness: true, format: { with: /\A[^@\s]+@[^@\s]+\z/, message: 'Invalid email' }
    validates :password_digest, presence: true

    VALID_ROLES = ['admin', 'client']

    validates :role, presence:true, inclusion: { in: VALID_ROLES }

    def as_json(options = {})
        # this coerces the option into an array and merges the passed
        # values with defaults
        excluding = [options[:except]].flatten
                                        .compact
                                        .union([:password_digest])
        super(options.merge(except: excluding))
    end
end
