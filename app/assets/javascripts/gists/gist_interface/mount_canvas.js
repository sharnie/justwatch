PC.onLoadEvent(function(){

  // create crop tool
  // this tool is specific for our application
  // unlike to tools defined in canvas/canvas_config
  // which are generic tools that do not use
  // any environment information --------------------------------------|
  PC.canvas.registerTool('crop', {
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
          name: PC.$.gistName.val(),
          content: PC.$.gistContent.val(),
          language: PC.$.gistLanguage.val(),
          visual_attributes: {
            url: url
          }
        },
        preview: true
      };

      $.post('/gists', data, function( response ){

        PC.$.previewPanel
          .html( response )
          .collapse( 'show' );

        PC.$.cropPanel
          .collapse( 'hide' );
      });

      // set the image url of hidden field
      // this is important for form submission -----|
      PC.$.gistVisualURL.val( url ).trigger( 'change' );
      //--------------------------------------------|
    }
  });
  //--------------------------------------------------------------------|
});