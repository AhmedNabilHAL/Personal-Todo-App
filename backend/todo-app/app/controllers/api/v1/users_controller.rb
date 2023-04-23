class Api::V1::UsersController < ApplicationController
    
    rescue_from Exception, :with => :handle_exception
    before_action :find_user, only: [:show, :update, :destroy]

    # GET /users
    def index
        @users = User.all
        render json: @users, status: :ok
    end

    # GET /users/:id
    def show
        render json: @user, status: :ok
    end

    # POST /users
    def create
        @user = User.new(user_params)
        if @user.save
            session[:user_id] = @user.id
            render json: @user, status: :created
        else
            render json: { error: 'Unable to create user'}, status: :bad_request
        end
    end

    # PATCH /users/:id
    def update
        # if @user
        #     @user.update(user_params)
        #     render json: { message: 'User updated successfully' }, status: :ok
        # else
        #     render json: { error: 'Unable to update user' }, status: :bad_request
        # end
    end

    # DELETE /users/:id
    def destroy
        if @user
            @user.destroy
            render json: { message: 'User deleted successfully' }, status: :ok
        else
            render json: { error: 'Unable to delete user' }, status: :bad_request
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end

    def find_user
        @user = User.find(params[:id])
    end

    def handle_exception(error)
        # flash[:error] = error.message
        render json: { error: error.message }, status: :bad_request
    end
end
