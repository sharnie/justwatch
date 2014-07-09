$(document).ready(function(){
  $('.panel-body').on('click', '#switch_gist_canvas', function(e){
    e.preventDefault();
    var gist   = $('#gist_content');
    var canvas = $('#main-canvas');

    if(gist.hasClass('front')){
      gist.removeClass('front');
      $('#switch_gist_canvas').html('<span class="glyphicon glyphicon-plus"></span> TEXT');
    } else {
      gist.addClass('front');
      $('#switch_gist_canvas').html('<span class="glyphicon glyphicon-plus"></span> DRAW');
    }
  });

  var textarea = $('textarea#gist_content');
  textarea.hide();

  var editor = ace.edit("editor");

  editor.setTheme("ace/theme/chrome");
  editor.getSession().setMode("ace/mode/ruby");

  editor.getSession().on('change', function() {
    textarea.val(editor.getSession().getValue());
  });

});