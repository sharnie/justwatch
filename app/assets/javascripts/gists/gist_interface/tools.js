PC.onLoadEvent(function(){

  this.toolButtons.on( 'change', function( e ){
    var
      $this = $( this ),
      tool  = $this.val();
      
    // show that tools are selected by adding '.selected' css class ----------|
    PC.$.tools.find( '.selected' ).removeClass( 'selected' );
    $this.parent( 'span.radio-button' ).addClass( 'selected' );
    //------------------------------------------------------------------------|

    // allow switching of context between writing and drawing
    //-----------------------------|
    if( tool === 'text'){
      PC.changeEditMode( 'editor' );
    } else {
      PC.changeEditMode( 'canvas' );

      PC.canvas.use( tool );
    }
    //-----------------------------|
  });

  this.colorInput.on( 'change', function( e ){
    // change drawing color ---------------------|
    PC.canvas.changeColor( $( this ).val() );
    //-------------------------------------------|
  });

  // create opacity slider --------------------------------|
  this.opacitySlider.slider({
    orientation: 'vertical',
    min: 10,
    range: 'min',
    max: 100,
    value: 100,
    slide: function( e, ui ){
      // actual opacity change ---------------------|      |
      PC.canvas.changeOpacity( ui.value / 100 );
      //--------------------------------------------|      |
    }
  }).find('.ui-slider-handle').tooltip({
    placement: 'right',
    title: 'Opacity'
  });
  //-------------------------------------------------------|


  // create brush slider ----------------------------------|
  this.brushSlider.slider({
    orientation: 'vertical',
    min: 1,
    range: 'min',
    max: 20,
    value: 1,
    slide: function( e, ui ){
      // actual brush size change -----------|             |
      PC.canvas.changeSize( ui.value );
      //-------------------------------------|             |
    }
  }).find('.ui-slider-handle').tooltip({
    placement: 'right',
    title: 'Brush Size'
  });
  //-------------------------------------------------------|

  // undo button ---------------------|
  this.undoButton.on( 'click', function(){
    PC.canvas.undo();
  });
  //----------------------------------|
});