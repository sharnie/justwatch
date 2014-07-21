module GistsHelper
  require 'digest'

  def gravatar_image_tag_for( user, size = 50, opts={} )
    digest = Digest::MD5.hexdigest( user.email )
    image_tag("http://www.gravatar.com/avatar.php?gravatar_id=#{digest}?size=#{size}", opts)
  end

  def coderay(text, lang = :javascript)  
    CodeRay.scan(text, lang).div(:line_numbers => :table, :code => :pre)
  end

  def supported_languages
    ["C", "C++", "Clojure", "CSS", "Delphi", "diff", "ERB", "Go", "Groovy", "HAML", "HTML", "Java", "JavaScript", "JSON", "Lua", "PHP", "Python", "Ruby", "Sass", "SQL", "Taskpaper", "XML", "YAML"]
  end
end
