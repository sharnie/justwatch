JW.$document.on('page:change', function(){
  // Here lives the code that allows the switching of context
  // between editor and canvas
  var
    $mainEditor   = $( '#editor' ),
    $textarea     = $( 'textarea#gist_content' ),
    $toolBar      = $( '#canvas-tools' ),
    $gistForm     = $( '#new_gist' ),
    $mainCanvas   = JW.canvas.$canvas;

  $textarea.hide();
  
  // user must choose canvas size before submitting
  // --------------------------------------------------|  
  $gistForm.on('submit', function( e ){

    
    if( !$( '#gist_visual_attributes_url' ).val() ){
      // subject to change -------|
      alert( 'CROP YO CANVAS' );
      //--------------------------|
      e.preventDefault();
      return;
    }
  });
  //---------------------------------------------------|

  

});