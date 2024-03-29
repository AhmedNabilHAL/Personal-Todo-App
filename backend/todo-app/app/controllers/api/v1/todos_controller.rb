class Api::V1::TodosController < ApplicationController
    include ApplicationHelper

    rescue_from Exception, :with => :handle_exception
    
    before_action :require_user_logged_in
    before_action :check_todo_owner, only: [:show, :update, :destroy]

    # GET /todos
    def index
        @todos = Todo.where(user_id: session[:user_id])
        render json: @todos, status: :ok
    end

    # GET /todos/:id
    def show
        render json: @todo, status: :ok
    end

    # POST /todos
    def create
        @todo = Todo.new(todo_text: todo_params[:todo_text], 
         todo_list_id: todo_params[:todo_list_id], user_id: session[:user_id])
        if @todo.save
            render json: @todo, status: :created
        else
            render json: { error: 'Unable to create todo'}, status: :bad_request
        end
    end

    # PATCH /todos/:id
    def update
        if @todo
            @todo.update(todo_params)
            render json: @todo, status: :ok
        else
            render json: { error: 'Unable to update todo' }, status: :bad_request
        end
    end

    # DELETE /users/:user_id/todos/:id
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
        params.require(:todo).permit(:todo_text, :todo_list_id)
    end

    def check_todo_owner
        @user = User.find(session[:user_id])
        @todo = Todo.find(params[:id])
        if !@user || @user.id != @todo.user_id
            return render json: {error: "Todo doesn't belong to user."}, status: :unauthorized
        end
    end

    def handle_exception(error)
        render json: { error: error.message }, status: :bad_request
    end
end
