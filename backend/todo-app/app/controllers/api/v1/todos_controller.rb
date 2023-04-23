class Api::V1::TodosController < ApplicationController
    include ApplicationHelper

    rescue_from Exception, :with => :handle_exception
    
    before_action :require_user_logged_in
    before_action :check_todo_owner, only: [:show, :update, :destroy]
    before_action :check_todo_list_owner, only: [:index, :show, :create, :update, :destroy]

    # GET /users/:user_id/todo_lists/:todo_list_id/todos
    def index
        @todo = Todo.where(user_id: params[:user_id], todo_list_id: params[:todo_list_id])
        render json: @todo, status: :ok
    end

    # GET /users/:user_id/todo_lists/:todo_list_id/todos/:id
    def show
        render json: @todo, status: :ok
    end

    # POST /users/:user_id/todo_lists/:todo_list_id/todos
    def create
        @todo = Todo.new(todo_params)
        if @todo.save
            render json: @todo, status: :created
        else
            render json: { error: 'Unable to create todo'}, status: :bad_request
        end
    end

    # PATCH /users/:user_id/todo_lists/:todo_list_id/todos/:id
    def update
        if @todo
            @todo.update(todo_params)
            render json: @todo, status: :ok
        else
            render json: { error: 'Unable to update todo' }, status: :bad_request
        end
    end

    # DELETE /users/:user_id/todo_lists/:todo_list_id/todos/:id
    def destroy
        if @todo
            @todo.destroy
            render json: { message: 'Todo deleted successfully' }, status: :ok
        else
            render json: { error: 'Unable to delete todo' }, status: :bad_request
        end
    end

    private

    def todo_params
        puts(params)
        params.require(:todo).permit(:todo_text, :user_id, :todo_list_id)
    end

    def check_todo_list_owner
        @user = User.find(params[:user_id])
        @todo_list = TodoList.find(params[:todo_list_id])
        if @user[:id] != @todo_list[:user_id]
            return render json: {error: "Todo list doesn't belong to user."}, status: :unauthorized
        end
    end

    def check_todo_owner
        @user = User.find(params[:user_id])
        @todo_list = TodoList.find(params[:todo_list_id])
        @todo = Todo.find(params[:id])
        if @user[:id] != @todo[:user_id]
            return render json: {error: "Todo doesn't belong to user."}, status: :unauthorized
        elsif @todo_list[:id] != @todo[:todo_list_id]
            return render json: {error: "Todo doesn't belong to todo list."}, status: :unauthorized
        end
    end

    def handle_exception(error)
        render json: { error: error.message }, status: :bad_request
    end
end
