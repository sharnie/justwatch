$(document).on('page:change', function(){
  // Here lives the code that allows the switching of context
  // between editor and canvas

  var
    $mainEditor   = $( '#editor' ), // subject to change
    $switchButton = $( '#switch_gist_canvas' ),
    $textarea     = $( 'textarea#gist_content' ),
    $mainCanvas    = window.mainCanvas.$canvas;


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
    var url = window.mainCanvas.stateStack().url;

    $( '#gist_visual_attributes_url' ).val( url );
  });


  var canvas_tools = $('#canvas-tools'),
      tool;

  $('.btn-canvas-tool').click(function(e){
    e.preventDefault();
    e.stopPropagation();

    tool = $(this).data('tool');
    window.mainCanvas.use(tool);

  });

});