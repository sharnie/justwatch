function Canvas( selector ){
  // Canvas class
  // responsible for abstracting the functionality of the canvas
  var $CANVAS = $( selector ),
      CONTEXT = $CANVAS[0].getContext( '2d' );


  $CANVAS.on( 'drag:begin drag drag:end', function( e ){

  });

  this.selector = selector;

  this.draw = function(){
    
  };

  this.clear = function(){

  };

};

// var mainCanvas = new Canvas( '#main-canvas' );


