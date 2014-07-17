class Guest < User

  def save!
    self.email = "jw_guest#{Time.now.to_i}@jw.com"
    super(validate: false)
  end
end