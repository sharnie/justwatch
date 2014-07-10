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

  var editor = ace.edit("editor");

  editor.setTheme("ace/theme/eclipse");
  editor.getSession().setMode("ace/mode/javascript");

  editor.getSession().on('change', function() {
    textarea.val(editor.getSession().getValue());
  });



});