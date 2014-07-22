module IconHelper

  def clipboard_tag_for( gist )
    button_tag class: "btn btn-default", 
      id: "copytoclipboard-button-#{ gist.id }", 
      data: { 
        toggle: 'tooltip', 
        placement: 'top',
        "clipboard-text" => "<script src='#{ embed_link_url(gist.user, gist) }.js'></script>" 
        },
      title: "Copy" do
        content_tag(:span, '',class: "fa fa-clipboard")
    end
  end

  def tool_radio_tag value, opts={}
    locals = opts.deep_merge({
      value: value,
      html: {},
      selected_class: nil
    })

    if opts[:checked]
      locals[:html] = { :checked => true }
      locals[:selected_class] = 'selected'
    end

    render('gists/form/tool_radio_tag', locals)
  end

end