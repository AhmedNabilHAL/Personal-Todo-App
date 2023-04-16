class Todo < ApplicationRecord
  belongs_to :todo_list
  belongs_to :user

  validates :todo, presence: true
  validates :todo_list_id, presence: true
  validates :user_id, presence: true


end
