class Api::V1::SessionsController < ApplicationController

    rescue_from Exception, :with => :handle_exception
    # before_action :find_user, only: [:show, :update, :destroy]
    
    # POST /api/v1/login
    def login
        login_params
        @user = User.find_by(username: params[:session][:username])

        if !!@user && @user.authenticate(params[:session][:password])
            session[:user_id] = @user.id
            render json: @user, status: :ok
        else
            render json: {error: "Wrong username or password."}, status: :unauthorized 
        end
    end

    # GET /api/v1/logout
    # POST /api/v1/logout
    def destroy
        session[:user_id] = nil
        render json: {message: "Logged out succesfully."}, status: :ok
    end

    private

    def login_params
        params.require(:session).permit(:username, :password)
    end

    # def find_user
    #     @user = User.find(params[:id])
    # end

    def handle_exception(error)
        # flash[:error] = error.message
        render json: { error: error.message }, status: :bad_request
    end
end
