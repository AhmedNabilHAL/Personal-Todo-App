class RenameTodoToTodoText < ActiveRecord::Migration[7.0]
  def change
    rename_column :todos, :todo, :todo_text
  end
end
