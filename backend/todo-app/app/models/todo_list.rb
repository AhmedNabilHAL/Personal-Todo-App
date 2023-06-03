class TodoList < ApplicationRecord
  belongs_to :user
  has_many :todos

  # validates :name, presence: true
  validates :user_id, presence: true

end
