class Gist < ActiveRecord::Base
  belongs_to :user
  has_one :visual, dependent: :destroy

  validates_presence_of :content, :user_id, :name

  accepts_nested_attributes_for :visual
end
