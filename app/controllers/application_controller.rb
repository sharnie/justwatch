class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  include GuestHelper

  def current_ability
    @current_ability ||= Ability.new(current_or_guest_user)
  end

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to root_path, alert: "You are not allowed to do that."
  end
end
