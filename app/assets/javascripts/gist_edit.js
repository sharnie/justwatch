JW.$document.on('page:change', function(){
  // Here lives the code that allows the switching of context
  // between editor and canvas
  var
    $mainEditor   = $( '#editor' ),
    $switchButton = $( '#switch_gist_canvas' ),
    $textarea     = $( 'textarea#gist_content' ),
    $toolBar      = $( '#canvas-tools' ),
    $gistForm     = $( '#new_gist' ),
    $mainCanvas   = JW.canvas.$canvas;


  // enable the switch of context
  // between canvas and editor -------------------------------------------------|
  $switchButton.on('click', function(e){
    e.stopPropagation();
    e.preventDefault();

    if($mainCanvas.hasClass('front')){

      $mainEditor.removeClass( 'back' );
      $mainEditor.addClass('front');

      $mainCanvas.removeClass('front');
      $mainCanvas.addClass('back');

      $toolBar.hide();

      $switchButton.html('<span class="glyphicon glyphicon-plus"></span> draw');
    } else {

      $mainEditor.addClass( 'back' );
      $mainEditor.removeClass( 'front' );

      $mainCanvas.addClass( 'front' );
      $mainCanvas.removeClass( 'back' );

      $toolBar.show();

      $switchButton.html('<span class="glyphicon glyphicon-plus"></span> text');
    }
  });
  //-----------------------------------------------------------------------------|


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