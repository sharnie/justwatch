Rails.application.config.to_prepare do

  Devise::RegistrationsController.layout 'devise'
  Devise::SessionsController.layout 'devise'
  Devise::ConfirmationsController.layout 'devise'
  Devise::UnlocksController.layout 'devise'
  Devise::PasswordsController.layout 'devise'
end