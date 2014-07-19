JW.$document.on( 'page:change', function(){
  
  // declare canvas 
  // must execute first -----------------------|
  JW.canvas = new Canvas( '#main-canvas' );
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
      context.strokeStyle = Canvas.helpers.hexToRGB( '#666' , 1 );
      context.strokeRect( 0, 0, currentX, currentY );
    },
    end: function( e ){
      var
        canvas    = e.canvas.mainObject,
        currentX  = e.canvas.x,
        currentY  = e.canvas.y;

      canvas.render();
      var url = canvas.toDataURLcrop({
        width: currentX,
        height: currentY
      });
      
      // set the image url of hidden field
      // this is important for form submission -----|
      $( '#gist_visual_attributes_url' ).val( url );
      //--------------------------------------------|
    }
  });
  //--------------------------------------------------------------------|

});
