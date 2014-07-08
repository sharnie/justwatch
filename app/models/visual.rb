class Visual < ActiveRecord::Base

  validates :url, :presence => true
end
