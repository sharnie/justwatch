module GistsHelper
  require 'digest'

  def gravatar_image_tag_for( user, size = 50, opts={} )
    digest = Digest::MD5.hexdigest( user.email )
    image_tag("http://www.gravatar.com/avatar.php?gravatar_id=#{digest}?size=#{size}", opts)
  end

  def coderay(text, lang = :javascript)  
    sanitized = Hash.new do |hash, key|
      case key
      when /C\/C++/i
        :c
      else
        key.to_s.underscore.to_sym
      end
    end

    CodeRay.scan(text, sanitized[ lang ]).div( :line_numbers => :table, :code => :pre )
  end
  
  def supported_languages
    ["text", "C/C++", "Clojure", "CSS", "Groovy", "HAML", "HTML", "Java", "JavaScript", "JSON", "Lua", "PHP", "Python", "Ruby", "Sass", "SQL", "XML", "YAML"]
  end
end
