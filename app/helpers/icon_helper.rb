module IconHelper

  def clipboard_tag_for( gist )
    link_to '#', 
      class: "btn btn-default", 
      id: "copytoclipboard-button-#{ gist.id }", 
      data: { "clipboard-text" => "<script src='#{ embed_link_url(gist.user, gist) }.js' ></script>"  }  do
        tag(:span, class: "fa fa-clipboard")
    end
  end

  def tool_radio_tag value, opts={}
    locals = {
      value: value,
      html: {}
    }.deep_merge(opts)

    render('gists/form/tool_radio_tag', locals)
  end

end