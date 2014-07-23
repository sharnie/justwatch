window.JW = {
  // cache the document object
  CACHE: {
    $document: $( document )
  }
};


JW.CACHE.$document.on( 'page:change', function(){
  $.extend( JW.CACHE, {
    $body  : $( 'body' )
  });
});