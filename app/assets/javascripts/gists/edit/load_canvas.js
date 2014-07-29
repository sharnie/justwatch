PC.onLoadEvent(function(){

  var prevImage = new Image();

  PC.editor.setValue( this.gistContent.val(), 1 ); 
  PC.editor.getSession().setMode( "ace/mode/" + ( PC.editorHelpers.toAceLang( this.gistLanguage.val() ) || 'text' ) );

  prevImage.src = this.gistVisualURL.val();

  PC.changeEditMode( 'editor' );

  PC.canvas.drawImage( prevImage, 0, 0 );
  PC.canvas.cacheCanvas();
});
