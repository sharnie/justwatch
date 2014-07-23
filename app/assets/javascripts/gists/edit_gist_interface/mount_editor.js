// this code instantiates the ace window.mainEditor
JW.CACHE.$document.on( 'page:change', function(){

  JW.editor = ace.edit("editor");


  var 
    editor             = JW.editor,
    canvas             = JW.canvas,
    $textarea          = $( 'textarea#gist_content' ),
    $editorContentArea = $( '.ace_content' ),
    $editorScrollBar   = $( 'div.ace_scrollbar.ace_scrollbar-h' );
    
  // set the value of text editor to content of current gist
  // useful for edit page ---------------|
  editor.setValue( $textarea.val(), 1 ); 
  //-------------------------------------|

  editor.setTheme("ace/theme/eclipse");

  editor.getSession().on('change', function() {

    // update textarea for form submission ------------|
    $textarea.val( editor.getSession().getValue() );
    //-------------------------------------------------|

    // 'change' the size of the canvas to fit text area ------------|
    canvas.changeCanvasSize( { width: $editorContentArea.width() });
    //--------------------------------------------------------------|
  });



  //synchronize canvas scroll with text editor -------------------------
  //                                                                   |
  //                                                                   |
  editor.getSession().on('changeScrollTop', function( scroll ){
    canvas.scrollCanvasY( scroll );
  });
  //                                                                   |
  $editorScrollBar.on('scroll', function(){
    canvas.scrollCanvasX( $( this ).scrollLeft() );
  });
  //                                                                   |
  //--------------------------------------------------------------------


});
