PC.onLoadEvent(function(){

  this.gistLanguage.on( 'change', function() {
    // change ace syntax highlighting accordingly to selected
    // language --------------------------------------------------------|
    var language = $( this ).val();
    if( PC.supportedLanguages.indexOf( language ) >= 0 ){
      PC.editor.session.getUndoManager().markClean();
      PC.editor.getSession().setMode('ace/mode/' + PC.editorHelpers.toAceLang( language ) );
    }
    //------------------------------------------------------------------|
  });
});