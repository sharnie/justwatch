class Gist < ActiveRecord::Base
  belongs_to :user
  has_one :visual
  accepts_nested_attributes_for :visual
end
