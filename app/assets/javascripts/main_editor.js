$( document ).on( 'page:change', function(){
  var 
    editor    = ace.edit("editor"),
    $textarea = $( 'textarea#gist_content' );

  editor.setValue( $textarea.val(), 1 );

  editor.setTheme("ace/theme/eclipse");
  editor.getSession().setMode("ace/mode/javascript");

  editor.getSession().on('change', function() {
    $textarea.val(editor.getSession().getValue());
  });
});