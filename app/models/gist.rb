class Gist < ActiveRecord::Base
  before_create :establish_url
  before_create :establish_name

  belongs_to :user
  has_one :visual, dependent: :destroy

  validates_presence_of :content, :user_id, :url, :name
  validates_uniqueness_of :url

  accepts_nested_attributes_for :visual

  scope :recent, lambda{ |limit = 10|
    order(:created_at => :desc).limit(limit)
  }

  def to_param
    self.url
  end

  private
    def establish_name
      self.name ||= "prettyCode-#{self.url}"
    end

    def establish_url
      self.url = SecureRandom.hex(10)
    end
end
