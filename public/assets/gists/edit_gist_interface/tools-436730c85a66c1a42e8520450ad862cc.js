JW.CACHE.$document.on( 'page:change', function(){

  var
    $tools         = JW.CACHE.$tools,
    $toolButtons   = $tools.find( 'input:radio[name="tool"]' ),
    $colorInput    = $tools.find( 'input[type="color"][name="brush-color"]' ),
    $opacitySlider = $tools.find( '#opacity-slider' ),
    $brushSlider   = $tools.find( '#brush-slider' ),
    $undoButton    = $tools.find( '#undo-button[role="undo"]' );

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
      JW.toggleEditMode( 'editor' );
    } else {
      JW.toggleEditMode( 'canvas' );

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

  // undo button ---------------------|
  $undoButton.on( 'click', function(){
    JW.canvas.undo();
  });
  //----------------------------------|
});
