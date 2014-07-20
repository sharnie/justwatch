module ApplicationHelper

  def has_page_specific_js!
    content_for(:head) do
      javascript_include_tag( File.join( params[:controller], params[:action], 'index' ), 'data-turbolinks-track' => true )
    end
  end

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


  def coderay(text, lang = :javascript)  
    sanitized = Hash.new do |hash, key|
      case key
      when /C\/C++/i
        :c
      else
        key.to_s.underscore.to_sym
      end
    end

    CodeRay.scan(text, sanitized[ lang ]).span
  end

end
