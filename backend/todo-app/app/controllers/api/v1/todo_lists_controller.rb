class Api::V1::TodoListsController < ApplicationController
    include ApplicationHelper

    rescue_from Exception, :with => :handle_exception
    
    before_action :require_user_logged_in
    before_action :find_todo_list, only: [:show, :update, :destroy]
    before_action :find_user, only: [:index, :show, :create, :update, :destroy]

    # GET /users/:user_id/todo_lists
    def index
        @todo_lists = TodoList.where(user_id: params[:user_id])
        render json: @todo_lists, status: :ok
    end

    # GET /users/:user_id/todo_lists/:id
    def show
        if (@todo_list[:user_id] == @user[:id])
            render json: @todo_list, status: :ok
        else 
            render json: {error: "Todo list doesn't belong to user" }, status: :unauthorized
        end
    end

    # POST /users/:user_id/todo_lists
    def create
        @todo_list = TodoList.new(todo_list_params)
        if @todo_list.save && @todo_list[:user_id] == @user[:id]
            render json: @todo_list, status: :created
        else
            render json: { error: 'Unable to create todo list'}, status: :bad_request
        end
    end

    # PATCH /users/:id/todo_lists/:id
    def update
        if @todo_list && @todo_list[:user_id] == @user[:id]
            @todo_list.update(todo_list_params)
            render json: @todo_list, status: :ok
        else
            render json: { error: 'Unable to update todo list' }, status: :bad_request
        end
    end

    # DELETE /users/:user_id/todo/todo_lists/:id
    def destroy
        if @todo_list && @todo_list[:user_id] == @user[:id]
            @todo_list.destroy
            render json: { message: 'Todo list deleted successfully' }, status: :ok
        else
            render json: { error: 'Unable to delete todo list' }, status: :bad_request
        end
    end

    private

    def todo_list_params
        params.require(:todo_list).permit(:name, :user_id)
    end

    def find_user
        @user = User.find(params[:user_id])
    end

    def find_todo_list
        @todo_list = TodoList.find(params[:id])
    end

    def handle_exception(error)
        render json: { error: error.message }, status: :bad_request
    end
end
