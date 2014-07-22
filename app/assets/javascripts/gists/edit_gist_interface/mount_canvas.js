JW.$document.on( 'page:change', function(){

  JW.toggleEditMode = function( mode ){
    var $editor = $( '#editor' );

    if( mode === 'canvas' ){
      $editor
        .css({ opacity: 1 })
        .removeClass( 'front' )
        .addClass( 'back' );
      JW.canvas.$canvas
        .removeClass( 'back' )
        .addClass( 'front' );
    }else if( mode === 'editor'){
      $editor
        .css({ opacity: 0.8 })
        .removeClass( 'back' )
        .addClass( 'front' );
      JW.canvas.$canvas
        .removeClass( 'front' )
        .addClass( 'back' );
    }
    
  };
  
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
      context.font = "12px courier";
      context.fillStyle = Canvas.helpers.hexToRGB( '#666' , 1 );
      context.fillText("(" + currentX +', ' + currentY + ")", currentX, currentY);
      context.strokeStyle = Canvas.helpers.hexToRGB( '#666' , 1 );
      context.strokeRect( 0, 0, currentX, currentY );
    },
    end: function( e ){
      var
        canvas    = e.canvas.mainObject,
        currentX  = e.canvas.x,
        currentY  = e.canvas.y,
        $body     = $( 'body' ),
        toolState = e.canvas.toolStateData,
        url,
        innerBox,
        data;

      canvas.render();

      url = canvas.toDataURLcrop({
        width: currentX,
        height: currentY
      });

      toolState.previewBox = toolState.previewBox || $('<div>')
        .attr( 'id', 'preview' )
        .css({
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.5)',
          zIndex: 99999,
          display: 'none'
        });
      
      toolState.innerBox = toolState.innerBox || $( '<div>')
        .attr('id', 'inner-preview')
        .css({
          margin: '10% auto',
          width: '400px',
          background: 'white',
          borderRadius: '10px',
          padding: '2% 3%',
          border: '1px solid #6CCAC9'
        });

      if( !toolState.onClickOut ){
        toolState.onClickOut = function( e ){
          var $this = $( this );

          e.stopPropagation();
          if( $this.is( '#preview-cancel' ) || $this.is( '#preview' ) ){
            e.preventDefault();
            toolState.previewBox.fadeOut( 'fast' );
            JW.toggleEditMode( 'editor' );
          }
        };
        $body.on( 'click', '#preview, #inner-preview, #preview-submit, #preview-cancel', toolState.onClickOut );
      }

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

      $body.append( toolState.previewBox );  

      $.post('/gists', data, function( response ){
        toolState.previewBox.html( toolState.innerBox.html( response ) );
        toolState.previewBox.fadeIn( 'fast' );
      });
      
      // set the image url of hidden field
      // this is important for form submission -----|
      $( '#gist_visual_attributes_url' ).val( url );
      //--------------------------------------------|
    }
  });
  //--------------------------------------------------------------------|

});
