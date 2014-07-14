// PENCIL DEFINITION
Canvas.registerTool( 'pencil', {
  begin: function( e ) {
    var 
      canvas = e.canvas.mainObject;

    canvas.exec( 'beginPath' );
  },
  move: function( e ) {
    var
      canvas    = e.canvas.mainObject,
      x         = e.canvas.x,
      y         = e.canvas.y,
      color     = e.canvas.color,
      brushSize = e.canvas.brushSize,
      opacity   = e.canvas.opacity;

      canvas.render();
      canvas.exec( 'arc', [ x, y, 0, 0, 0, false ] );
      canvas.assign( 'lineWidth', brushSize );
      canvas.assign( 'strokeStyle', Canvas.helpers.hexToRGB( color, opacity ) );
      canvas.exec( 'stroke' );
  },
  end: function( e ) {
    var 
      canvas = e.canvas.mainObject;

    canvas.exec( 'closePath' );
    e.canvas.defaultBehavior();
  }
});


// ERASER DEFINITION
Canvas.registerTool( 'eraser', {
  begin: function( e ){

  },
  move: function( e ){
    var
      canvas    = e.canvas.mainObject,
      x         = e.canvas.x,
      y         = e.canvas.y,
      brushSize = e.canvas.brushSize;

      
      canvas.exec( 'clearRect', [ x - 5, y - 5, 10, 10 ] );
  },
  end: function( e ){
    var 
      canvas = e.canvas.mainObject;

    canvas.cacheCanvas();
  }
});


// EMPTY BOX DEFINITION
Canvas.registerTool( 'emptyBox', {
  begin: function( e ){
    var 
      x = e.canvas.x,
      y = e.canvas.y;

    e.canvas.toolStateData.beginCoordinates = e.canvas.toolStateData.beginCoordinates || [];
    e.canvas.toolStateData.beginCoordinates.unshift( { x: x , y: y } );
  },
  move: function( e ){
    var
      canvas    = e.canvas.mainObject,
      origin    = e.canvas.toolStateData.beginCoordinates[ 0 ],
      originX   = origin.x,
      originY   = origin.y,
      currentX  = e.canvas.x,
      currentY  = e.canvas.y,
      brushSize = e.canvas.brushSize,
      color     = e.canvas.color,
      opacity   = e.canvas.opacity;

    canvas.render();
    canvas.assign( 'lineWidth', brushSize );
    canvas.assign( 'strokeStyle', Canvas.helpers.hexToRGB( color, opacity ) );
    canvas.exec( 'strokeRect', [ originX, originY, currentX - originX, currentY - originY ]  );
  },
  end: function( e ){
    e.canvas.defaultBehavior();
  }
});

// FILLED BOX DEFINITION
Canvas.registerTool( 'filledBox', {
  begin: function( e ){
    var 
      x = e.canvas.x,
      y = e.canvas.y;

    e.canvas.toolStateData.beginCoordinates = e.canvas.toolStateData.beginCoordinates || [];
    e.canvas.toolStateData.beginCoordinates.unshift( { x: x , y: y } );
  },
  move: function( e ){
    var
      canvas    = e.canvas.mainObject,
      origin    = e.canvas.toolStateData.beginCoordinates[ 0 ],
      originX   = origin.x,
      originY   = origin.y,
      currentX  = e.canvas.x,
      currentY  = e.canvas.y,
      brushSize = e.canvas.brushSize,
      color     = e.canvas.color,
      opacity   = e.canvas.opacity;

    canvas.render();
    // canvas.assign( 'lineWidth', brushSize );
    canvas.assign( 'fillStyle', Canvas.helpers.hexToRGB( color, opacity ) );
    canvas.exec( 'fillRect', [ originX, originY, currentX - originX, currentY - originY ]  );
  },
  end: function( e ){
    e.canvas.defaultBehavior();
  }
});

// LINE tool
Canvas.registerTool( 'line', {
  begin: function( e ){
    var
      canvas = e.canvas.mainObject,
      x      = e.canvas.x,
      y      = e.canvas.y;

    e.canvas.toolStateData.beginCoordinates = e.canvas.toolStateData.beginCoordinates || [];
    e.canvas.toolStateData.beginCoordinates.unshift( { x: x, y: y } );
    

  },
  move: function( e ){
    var
      canvas    = e.canvas.mainObject,
      origin    = e.canvas.toolStateData.beginCoordinates[ 0 ],
      originX   = origin.x,
      originY   = origin.y,
      currentX  = e.canvas.x,
      currentY  = e.canvas.y,
      brushSize = e.canvas.brushSize,
      color     = e.canvas.color,
      opacity   = e.canvas.opacity;

    canvas.render();
    canvas.exec( 'beginPath' );

    canvas.exec( 'moveTo', [ originX, originY ] );
    canvas.exec( 'lineTo', [ currentX, currentY ] );
    canvas.assign( 'lineWidth', brushSize );
    canvas.assign( 'strokeStyle', Canvas.helpers.hexToRGB( color, opacity ) );
    canvas.exec( 'stroke' );

    canvas.exec( 'closePath' );
    
  },
  end: function( e ){
    var
      canvas = e.canvas.mainObject;

    e.canvas.defaultBehavior();

  }
});






