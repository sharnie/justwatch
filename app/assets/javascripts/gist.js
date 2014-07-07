$( document ).on('page:change', function(){
  var $canvas = $( '#main-canvas' ),
      context = $canvas[0].getContext('2d'),
      strokes;

  strokes = [];

  $canvas.on( 'mousedown', function( e ){
    context.beginPath();
  });

  $canvas.on( 'drag', function( e ){
    var 
      x = e.offsetX,
      y = e.offsetY;

    strokes.push({ x: x, y: y });
    context.moveTo(x, y);
    context.lineTo(x + 1, y + 1);
    context.stroke();
  });

  $canvas.on( 'mouseup', function( e ){
    context.closePath();
  });


  $( '#canvas-form' ).on( 'submit', function( e ){
    e.preventDefault();

    $.post('gist/create', { "strokes[]": strokes });
  });

});