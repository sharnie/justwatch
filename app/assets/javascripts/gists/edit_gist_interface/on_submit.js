JW.$document.on('page:change', function(){
  // Here lives the code that allows the switching of context
  // between editor and canvas
  var
    $gistForm     = $( 'form[id*="_gist"][method="post"][action*="/gists"]' ),
    $textarea     = $( '#gist_content' );

  $textarea.hide();
  // user must choose canvas size before submitting
  // --------------------------------------------------|  
  $gistForm.on('submit', function( e ){

    // subject to change -------|
    JW.toggleEditMode( 'canvas' );
    JW.canvas.use( 'crop' );
    //--------------------------|
    e.preventDefault();
    return;
  });
  //---------------------------------------------------|

  

});