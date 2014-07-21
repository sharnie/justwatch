class Gist < ActiveRecord::Base
  before_validation :establish_url

  belongs_to :user
  has_one :visual, dependent: :destroy

  validates_presence_of :content, :user_id, :name, :url
  validates_uniqueness_of :url

  accepts_nested_attributes_for :visual

  def to_param
    self.url
  end

  private
    def establish_url
      self.url = SecureRandom.hex(10)
    end
end
