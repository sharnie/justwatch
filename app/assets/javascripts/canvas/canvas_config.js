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


      canvas.cursor( 'url("icons_png/icon_347.png")' );
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
    var
      canvas = e.canvas.mainObject;

    e.canvas.toolStateData.prevComp = e.canvas.context.globalCompositeOperation;
    canvas.exec( 'beginPath' );
  },
  move: function( e ){
    var
      canvas    = e.canvas.mainObject,
      x         = e.canvas.x,
      y         = e.canvas.y,
      brushSize = e.canvas.brushSize;


      canvas.assign( 'globalCompositeOperation', 'destination-out' );
      canvas.assign( 'strokeStyle', '#fff' );
      canvas.assign( 'lineWidth', brushSize );
      canvas.exec( 'arc', [ x, y, 0, 0, 0, false ] );
      canvas.exec( 'stroke' );
  },
  end: function( e ){
    var 
      canvas = e.canvas.mainObject;

    canvas.assign( 'globalCompositeOperation', e.canvas.toolStateData.prevComp );
    canvas.exec( 'closePath' );

    canvas.cacheCanvas();
  }
});


// EMPTY BOX DEFINITION
Canvas.registerTool( 'empty_box', {
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

    canvas.cursor( 'crosshair' );
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
Canvas.registerTool( 'filled_box', {
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

    canvas.cursor( 'crosshair' );
    canvas.render();
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

    canvas.cursor( 'crosshair' );
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

//Arrow tool
Canvas.registerTool('arrow', {
  begin: function(e){
    var canvas = e.canvas.mainObject;
    var x = e.canvas.x;
    var y = e.canvas.y;

    e.canvas.toolStateData.beginCoordinates = e.canvas.toolStateData.beginCoordinates || [];
    e.canvas.toolStateData.beginCoordinates.unshift( {x: x, y: y});
  },

  move: function(e){
    var canvas = e.canvas.mainObject;
    var origin = e.canvas.toolStateData.beginCoordinates[ 0 ];
    var originX = origin.x;
    var originY = origin.y;
    var currentX = e.canvas.x;
    var currentY = e.canvas.y;
    var brushSize = e.canvas.brushSize;
    var color = e.canvas.color;
    var opacity = e.canvas.opacity;

    canvas.render();
    canvas.exec('beginPath');

    canvas.exec('moveTo', [originX, originY]);
    canvas.exec('lineTo', [currentX, currentY]);
    canvas.assign('lineWidth', brushSize);
    canvas.assign('strokeStyle', Canvas.helpers.hexToRGB(color, opacity));
    canvas.exec('stroke');

    var angle = Math.atan2(currentX-originX, currentY-originY);
    canvas.exec('save');
    canvas.exec('translate', [currentX, currentY]);
    canvas.exec('rotate', [-angle]);
    canvas.exec('moveTo', [0, 0]);
    canvas.exec('lineTo', [-10, -10]);
    canvas.exec('stroke');
    canvas.exec('moveTo', [0, 0]);
    canvas.exec('lineTo', [10, -10]);
    canvas.exec('stroke');
    canvas.exec('restore');
    // canvas.exec('save');

  },

  end: function(e){
    var canvas = e.canvas.mainObject;
    e.canvas.defaultBehavior();
  }

});

// // move
// Canvas.registerTool( 'move', {
//   begin: function( e ){
//     var
//       canvas = e.canvas.mainObject,
//       x      = e.canvas.x,
//       y      = e.canvas.y;

//     e.canvas.toolStateData.beginCoordinates = e.canvas.toolStateData.beginCoordinates || [];
//     e.canvas.toolStateData.beginCoordinates.unshift( { x: x, y: y } );
    

//   },
//   move: function( e ){
//     var
//       canvas         = e.canvas.mainObject,
//       context        = e.canvas.context,
//       origin         = e.canvas.toolStateData.beginCoordinates[ 0 ],
//       originX        = origin.x,
//       originY        = origin.y,
//       currentX       = e.canvas.x,
//       currentY       = e.canvas.y,
//       layers         = canvas.layerStack,
//       currentLayer   = canvas.currentLayer;

//       currentLayer.changePosition({ x: currentX - originX, y: currentY - originY });
//       canvas.clear();
//       layers.forEach(function( layer ){
//         layer.draw( context );
//       });

//   },
//   end: function( e ){    
//     var 
//       canvas = e.canvas.mainObject;

//     canvas.cacheCanvas();

//   }
// });



