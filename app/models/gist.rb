class Gist < ActiveRecord::Base
  belongs_to :user
  has_one :visual
  validates_presence_of :content
  accepts_nested_attributes_for :visual
end
