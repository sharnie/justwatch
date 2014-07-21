JW.$document.on( 'page:change', function(){

  var
    $toolButtons   = $( '#canvas-tools input:radio[name="tool"]' ),
    $colorInput    = $( '#canvas-tools input[type="color"][name="brush-color"]' ),
    $opacitySlider = $( '#canvas-tools #opacity-slider' ),
    $brushSlider   = $( '#canvas-tools #brush-slider' ),
    $undoButton    = $( '#undo-button[role="undo"]' ),
    $editor        = $( '#editor' );

  $toolButtons.on( 'change', function( e ){
    var
      $this = $( this ),
      tool  = $this.val();
      
    // show that tools are selected by adding '.selected' css class ----------|
    $( '#canvas-tools span.radio-button.selected' ).removeClass( 'selected' );
    $this.parent( 'span.radio-button' ).addClass( 'selected' );
    //------------------------------------------------------------------------|

    // allow switching of context between writing and drawing
    //-----------------------------|
    if( tool === 'text'){
      $editor
        .css({ opacity: 0.8 })
        .removeClass( 'back' )
        .addClass( 'front' );
      JW.canvas.$canvas
        .removeClass( 'front' )
        .addClass( 'back' );
    } else {
      $editor
        .css({ opacity: 1 })
        .removeClass( 'front' )
        .addClass( 'back' );
      JW.canvas.$canvas
        .removeClass( 'back' )
        .addClass( 'front' );

      JW.canvas.use( $this.val() );
    }
    //-----------------------------|
  });

  $colorInput.on( 'change', function( e ){
    // change drawing color ---------------------|
    JW.canvas.changeColor( $( this ).val() );
    //-------------------------------------------|
  });

  // create opacity slider --------------------------------|
  $opacitySlider.slider({
    orientation: 'vertical',
    min: 10,
    range: 'min',
    max: 100,
    value: 100,
    slide: function( e, ui ){
      // actual opacity change ---------------------|      |
      JW.canvas.changeOpacity( ui.value / 100 );
      //--------------------------------------------|      |
    }
  });
  //-------------------------------------------------------|


  // create brush slider ----------------------------------|
  $brushSlider.slider({
    orientation: 'vertical',
    min: 1,
    range: 'min',
    max: 20,
    value: 1,
    slide: function( e, ui ){
      // actual brush size change -----------|             |
      JW.canvas.changeSize( ui.value );
      //-------------------------------------|             |
    }
  });
  //-------------------------------------------------------|


  // undo button -------------------
  $undoButton.on( 'click', function(){
    JW.canvas.undo();
  });
});