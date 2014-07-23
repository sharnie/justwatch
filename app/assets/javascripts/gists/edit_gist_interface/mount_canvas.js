JW.CACHE.$document.on( 'page:change', function(){

  // declare canvas 
  // must execute first -----------------------|
  JW.canvas = new Canvas( JW.CACHE.$canvas );
  //-------------------------------------------|

  // create crop tool
  // this tool is specific for our application
  // unlike to tools defined in canvas/canvas_config
  // which are generic tools that do not use
  // any environment information --------------------------------------|
  JW.canvas.registerTool('crop', {
    begin: function( e ){},
    move: function( e ){
      var
        canvas    = e.canvas.mainObject,
        context   = e.canvas.context,
        currentX  = e.canvas.x,
        currentY  = e.canvas.y;

      canvas.cursor( 'crosshair' );
      canvas.render();
      context.lineWidth = 1 ;
      context.font = "12px courier";
      context.fillStyle = Canvas.helpers.hexToRGB( '#666' , 1 );
      context.fillText("(" + Math.floor( currentX ) +', ' + Math.floor( currentY ) + ")", currentX, currentY);
      context.strokeStyle = Canvas.helpers.hexToRGB( '#666' , 1 );
      context.strokeRect( 0, 0, currentX, currentY );
    },
    end: function( e ){
      var
        canvas    = e.canvas.mainObject,
        currentX  = e.canvas.x,
        currentY  = e.canvas.y,
        url,
        data;

      canvas.render();

      url = canvas.toDataURLcrop({
        width: currentX,
        height: currentY
      });


      data = {
        gist: {
          name: $( '#gist_name' ).val(),
          content: $( '#gist_content' ).val(),
          language: $( '#gist_language' ).val(),
          visual_attributes: {
            url: url
          }
        },
        preview: true
      };

      var 
        $modal         = $( '#crop-modal' ),
        $previewPanel  = $modal.find( '#preview-panel' );
        $cropPanel     = $modal.find( '#crop-panel' );

      $.post('/gists', data, function( response ){

        $previewPanel
          .html( response )
          .collapse( 'show' );

        $cropPanel
          .collapse( 'hide' );
      });

      // set the image url of hidden field
      // this is important for form submission -----|
      $( '#gist_visual_attributes_url' )
        .val( url )
        .trigger( 'change' );
      //--------------------------------------------|
    }
  });
  //--------------------------------------------------------------------|

});
