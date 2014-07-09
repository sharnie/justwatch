class Visual < ActiveRecord::Base
  belongs_to :gist
  # validates :url, :presence => true
end
