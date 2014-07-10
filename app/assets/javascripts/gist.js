$(document).on('page:change', function(){
  $('#switch_gist_canvas').on('click', function(e){
    e.stopPropagation();
    e.preventDefault();

    var canvas = window.mainCanvas.$canvas;

    if(canvas.hasClass('front')){
      canvas.removeClass('front');
      $('#editor').removeClass( 'back' );
      $('#editor').addClass('front');
      canvas.addClass('back');
      $('#switch_gist_canvas').html('<span class="glyphicon glyphicon-plus"></span> HIDE');
    } else {
      canvas.addClass( 'front' );
      $( '#editor' ).addClass( 'back' );
      canvas.removeClass( 'back' );
      $( '#editor' ).removeClass( 'front' );
      $('#switch_gist_canvas').html('<span class="glyphicon glyphicon-plus"></span> SHOW');
    }
  });

  var textarea = $('textarea#gist_content');
  textarea.hide();

  window.editor = ace.edit("editor");

  window.editor.setValue( textarea.val(), 1 );

  window.editor.setTheme("ace/theme/eclipse");
  window.editor.getSession().setMode("ace/mode/javascript");

  window.editor.getSession().on('change', function() {
    textarea.val(window.editor.getSession().getValue());
  });

  // window.editor.setReadOnly( true );

});