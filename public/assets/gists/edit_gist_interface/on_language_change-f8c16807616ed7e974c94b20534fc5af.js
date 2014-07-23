// list of supported languages all live in GistsHelper ---------------|
//--------------------------------------------------------------------|

JW.CACHE.$document.on( 'page:change', function(){
  var 
    gistLanguage,
    supportedLanguages,
    toAceLang,
    editor,
    language;

  language           = $( '#gist_language' ).val();
  editor             = JW.editor,
  $gistLanguage      = $('#gist_language'),
  supportedLanguages = JSON.parse('["text","C/C++","Clojure","CSS","Groovy","HAML","HTML","Java","JavaScript","JSON","Lua","PHP","Python","Ruby","Sass","SQL","XML","YAML"]');

  // handle odd language cases from
  // dropdown -----------------------|
  toAceLang = function( lang ){
    switch( lang ){
      case 'C/C++':
        return 'c_cpp';
        break;
  //                                 |
      default:
        return lang.toLowerCase();
    }
  };
  //---------------------------------|


  editor.getSession().setMode( "ace/mode/" + (toAceLang( language ) || 'text') );

  $gistLanguage.on( 'change', function() {
    // change ace syntax highlighting accordingly to selected
    // language --------------------------------------------------------|
    var 
      $this    = $(this),
      language = $this.val();
    //                                                                  |
    if( supportedLanguages.indexOf( language ) >= 0 ){
      editor.session.getUndoManager().markClean();
      editor.getSession().setMode('ace/mode/' + toAceLang( language ) );
    }
    //------------------------------------------------------------------|
  });
});
