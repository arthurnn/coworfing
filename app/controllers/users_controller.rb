class UsersController < ApplicationController

  before_filter :authenticate_user!, except: [:index]
  load_and_authorize_resource

  def show
    @user = User.first(conditions: { username: params[:username] })
  end

  def index
    @featured = User.accessible_by(current_ability).excludes(username: nil).excludes(photo: nil)
    @users = User.accessible_by(current_ability).excludes(username: nil) - @featured

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @users }
  end
end
