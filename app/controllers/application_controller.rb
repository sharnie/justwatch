class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :transfer_ownership


  def current_user
    super || guest_user
  end

  private

  def guest_user
   User.find_by_id(session[:guest_user_id] || session[:guest_user_id] = create_guest_user.id)
  end

  def create_guest_user
    u = User.create(:guest => true, email: "guest_#{Time.now.to_i}@jw.com")
    u.save(:validate => false)
    u
  end

  def transfer_ownership
    if guest_user && current_user.id != guest_user.id
      guest_user.gists.each do |gist|
        gist.update(:user => current_user)
      end
      guest_user.destroy
    end
  end

end
