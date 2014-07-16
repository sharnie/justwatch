$(document).on('page:change', function(){
  // Here lives the code that allows the switching of context
  // between editor and canvas

  window.mainCanvas = new Canvas( '#main-canvas' );

  var
    $mainEditor   = $( '#editor' ),
    $switchButton = $( '#switch_gist_canvas' ),
    $textarea     = $( 'textarea#gist_content' ),
    $mainCanvas   = window.mainCanvas.$canvas;


  $switchButton.on('click', function(e){
    e.stopPropagation();
    e.preventDefault();


    if($mainCanvas.hasClass('front')){

      $mainEditor.removeClass( 'back' );
      $mainEditor.addClass('front');

      $mainCanvas.removeClass('front');
      $mainCanvas.addClass('back');

      $switchButton.html('<span class="glyphicon glyphicon-plus"></span> HIDE');
    } else {

      $mainEditor.addClass( 'back' );
      $mainEditor.removeClass( 'front' );

      $mainCanvas.addClass( 'front' );
      $mainCanvas.removeClass( 'back' );

      $switchButton.html('<span class="glyphicon glyphicon-plus"></span> SHOW');
    }
  });


  $textarea.hide();
  
  $mainCanvas.on( 'drag:end', function(){
    var url = window.mainCanvas.stateStack[ 0 ].url;

    $( '#gist_visual_attributes_url' ).val( url );
  });


  $( '#canvas-tools input:radio[name="tool"]' ).on( 'change', function( e ){
    $( '#canvas-tools span.radio-button.selected' ).removeClass( 'selected' );
    $( this ).parent( 'span.radio-button' ).addClass( 'selected' );
    window.mainCanvas.use( $( this ).val() );
  });

  $( '#canvas-tools input[type="color"][name="brush-color"]' ).on( 'change', function( e ){
    window.mainCanvas.changeColor( $( this ).val() );
  });


  var
    $opacitySlider = $( '#canvas-tools #opacity-slider' ),
    $brushSlider   = $( '#canvas-tools #brush-slider' );

  $opacitySlider.slider({
    orientation: 'vertical',
    min: 0,
    range: 'min',
    max: 100,
    value: 100,
    slide: function( e, ui ){
      window.mainCanvas.changeOpacity( ui.value / 100 );
    }
  });

  $brushSlider.slider({
    orientation: 'vertical',
    min: 1,
    range: 'min',
    max: 20,
    value: 1,
    slide: function( e, ui ){
      window.mainCanvas.changeSize( ui.value );
    }
  });


});