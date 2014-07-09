$(document).ready(function(){
  $('.panel-body').on('click', '#switch_gist_canvas', function(e){
    e.preventDefault();

    var canvas = $('#main-canvas');

    if(canvas.hasClass('front')){
      canvas.removeClass('front');
      $('#switch_gist_canvas').html('<span class="glyphicon glyphicon-plus"></span> HIDE');
    } else {
      canvas.addClass('front');
      $('#switch_gist_canvas').html('<span class="glyphicon glyphicon-plus"></span> SHOW');
    }
  });

  var textarea = $('textarea#gist_content');
  textarea.hide();

  var editor = ace.edit("editor");

  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/javascript");

  editor.getSession().on('change', function() {
    textarea.val(editor.getSession().getValue());
  });

});