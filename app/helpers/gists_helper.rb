module GistsHelper
  require 'digest'

  def gravatar_image_tag_for( user, size = 50, opts={} )
    digest = Digest::MD5.hexdigest( user.email )
    image_tag("http://www.gravatar.com/avatar.php?gravatar_id=#{digest}?size=#{size}", opts)
  end
end
