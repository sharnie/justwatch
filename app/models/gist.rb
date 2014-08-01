class Gist < ActiveRecord::Base
  before_create :establish_url
  before_create :establish_name

  belongs_to :user
  has_one :visual, dependent: :destroy

  validates_presence_of :content, :user_id

  accepts_nested_attributes_for :visual

  scope :recent, lambda{
    order(:created_at => :desc)
  }

  def to_param
    self.url
  end

  private
    def establish_name
      if self.name.blank?
        self.name = "prettyCode-#{self.url}"
      end
    end

    def establish_url
      self.url = SecureRandom.hex(10)
    end
end
