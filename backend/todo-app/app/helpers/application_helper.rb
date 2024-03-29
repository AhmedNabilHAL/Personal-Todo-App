module ApplicationHelper
    def logged_in?
        !!session[:user_id]
    end

    def current_user
        @currect_user ||= User.find_by_id(session[:user_id]) if !!session[:user_id]
    end

    def require_user_logged_in
        if !logged_in?
            render json: {error: "Not logged in."}, status: :unauthorized
        end
    end

    def require_admin
        if !logged_in?
            render json: {error: "Not logged in."}, status: :unauthorized
        end
        @currect_user = currect_user
        if @currect_user.role != "admin"
            render json: {error: "Admin privileges required."}, status: :unauthorized
        end
    end
end
