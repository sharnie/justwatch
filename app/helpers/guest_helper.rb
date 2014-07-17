module GuestHelper
  def current_or_guest_user
    if current_user
      if session[:guest_user_id]
        loggin_in
        guest_user.destroy
        session[:guest_user_id] = nil
      end
      current_user
    else
      guest_user
    end
  end

  def loggin_in
    guest_user.gists.each do |gist|
      current_user.gists.create(name: gist.name, content: gist.content, visual_attributes: { :url => gist.visual.url } )
    end
  end

  def guest_user
    @cached_guest ||= Guest.find(session[:guest_user_id] ||= create_guest_user.id)
  rescue ActiveRecord::RecordNotFound
    session[:guest_user_id] = nil
    guest_user
  end

  def create_guest_user
    Guest.new.tap do |guest|
      guest.save!
      session[:guest_user_id] = guest.id
    end
  end
end