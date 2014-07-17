module ApplicationHelper

  def flash_class(level)
    case level
      when 'notice' then "alert alert-info"
      when 'success' then "alert alert-success"
      when 'error' then "alert alert-danger"
      when 'alert' then "alert alert-warning"
    end
  end

  def flash_messages
    flash.map do |key, val|      
      content_tag(:div, val, class: flash_class( key ))
    end.join.html_safe
  end

  def javascript(*files)
    content_for(:head){ javascript_include_tag(*files) }
  end

  def canvas_scripts
    content_for(:head) do 
      render('shared/script_tags/canvas')
    end
  end

  def coderay(text, lang = :javascript)  
    CodeRay.scan(text, lang).span
  end

  def supported_languages
    ["C/C++", "Clojure", "CSS", "ERB", "Go", "Groovy", "HAML", "HTML", "Java", "JavaScript", "JSON", "Lua", "PHP", "Python", "Ruby", "Sass", "SQL", "Taskpaper", "XML", "YAML"]
  end
end
