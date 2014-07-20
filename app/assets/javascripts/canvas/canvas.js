function Canvas( selector ) {

  this.selector           = selector;
  this.$canvas            = $( selector );
  this.context            = this.$canvas[ 0 ].getContext( '2d' );
  this.tools              = $.extend( {}, Canvas.initialTools );
  this.currentTool        = 'pencil';
  this.currentColor       = '#000000';
  this.currentOpacity     = 1
  this.brushSize          = 1;
  this.canvasCacheEnabled = true;
  this.layerCacheEnabled  = true;
  this.currentCursor      = 'default';
  this.currentLayer       = null;


  this.cachingCanvas      = this.$canvas.clone().attr( 'id', 'CACHE-CANVAS' );
  this.cachingContext     = this.cachingCanvas[ 0 ].getContext( '2d' );
  this.stateStack         = [];
  this.layerStack         = [];


  // THE FOLLOWING CODE SHOULD BE RE-WRITTEN

  //wrap in a div to allow resizing
  var canvasOutterWrapper = $( '<div>', { 
    id: 'canvas-wrapper',
    css: {
      position: 'absolute',
      top: 0,
      right: 0,
      height: this.$canvas[ 0 ].height,
      width: this.$canvas[ 0 ].width,
      maxWidth: this.$canvas[ 0 ].width,
      overflow: 'hidden'
      // border: '1px solid rgba(80, 149, 199, 1)',
    }
  });

  this.$canvas.wrap( canvasOutterWrapper );

  this.$canvas[ 0 ].width = 2000;
  this.$canvas[ 0 ].height = 2000;


  this.changeCanvasSize = function( sizes ){
    var
      height = sizes.height || canvasOutterWrapper.height(),
      width  = sizes.width || canvasOutterWrapper.width();


    $('#canvas-wrapper').css({ height: height, width: width });
  };

  this.scrollCanvasY = function( pos ){
    this.$canvas.trigger({
      type: 'scrollY'
    }, pos );

    $( '#canvas-wrapper' ).scrollTop( pos );
  };

  this.scrollCanvasX = function( pos ){
    this.$canvas.trigger({
      type: 'scrollX'
    }, pos );
    $( '#canvas-wrapper' ).scrollLeft( pos );
  };


  /////////////////////////////////////////////


  this.toDataURLcrop = function( obj ){
    var $tempCanvas = $('<canvas></canvas>'),
        tempContext = $tempCanvas[ 0 ].getContext( '2d' ),
        tempImage   = new Image(),
        x           = obj.x || 0;
        y           = obj.y || 0;

      if( this.stateStack[ 0 ] ){
        tempImage.src = this.stateStack[ 0 ].url;  
        $tempCanvas[ 0 ].width = Math.abs( obj.width );
        $tempCanvas[ 0 ].height = Math.abs( obj.height );
        tempContext.drawImage( tempImage, x, y );
      }
      
      return $tempCanvas[ 0 ].toDataURL();
  };


  // default event behaviors
  var
    DEFAULT_BEHAVIORS;

  DEFAULT_BEHAVIORS = {
    begin: function( data ){
      // placeholder
    },
    move: function( data ){
      //placeholder
    },
    end: function( data ){
      _this.cacheLayer();
      _this.cacheCanvas();
      _this.clearCache();
    }
  }

  // cache this(the abstract object) before changing context;
  var 
    _this           = this,
    canvasStateData = {},
    toolStateData   = {};

  this.$canvas.on( 'drag:begin drag:move drag:end', function( e ){
    var
      x,
      y,
      // this is the canvas element
      $this,
      eventType;

    toolStateData[ _this.currentTool ] = toolStateData[ _this.currentTool ] || {};

    eventType = e.type + ':' + _this.currentTool;
    $this     = $( this );
    x         = e.offsetX;
    y         = e.offsetY;
    eventData = { 
                  type: eventType,
                  canvas: {
                    x              : x,
                    y              : y,
                    context        : _this.context,
                    mainObject     : _this,
                    canvasStateData: canvasStateData,
                    toolStateData  : toolStateData[ _this.currentTool ],
                    color          : _this.currentColor,
                    brushSize      : _this.brushSize,
                    opacity        : _this.currentOpacity,
                    defaultBehavior: DEFAULT_BEHAVIORS[ e.type.split(':')[1] ],
                    tool           : _this.tools[ _this.currentTool ]
                  }
                };

    $this.css({ cursor: _this.currentCursor });
    $this.trigger( eventData );

  });

  // activate all tools

  var tool,
      tools,
      i,
      length,
      map;

  tools  = Object.keys( this.tools );
  length = tools.length;

  for( i = 0; i < length; i += 1 ){
    tool = tools[ i ];
    map = this.tools[ tool ];

    this.registerTool( tool, map );
  }


}

Canvas.registerTool = function( name, map ){
  Canvas.initialTools = Canvas.initialTools || {};

  Canvas.initialTools[ name ] = map;
};


Canvas.prototype.cacheLayer  = function(){
    var 
      shapeLayer;
    if( this.layerCacheEnabled ){
      shapeLayer = new Layer( this.cachingCanvas[ 0 ].toDataURL() );
      this.currentLayer = shapeLayer;
      this.layerStack.unshift( shapeLayer );
    }
  };

Canvas.prototype.cacheCanvas = function(){
  var 
    stateLayer;
  if( this.canvasCacheEnabled ){
    stateLayer = new Layer( this.$canvas[ 0 ].toDataURL() );
    this.stateStack.unshift( stateLayer );
  }
};


Canvas.prototype.clearCache    = function(){
  this.cachingContext.clearRect( 0, 0, this.cachingCanvas[ 0 ].width, this.cachingCanvas[ 0 ].height );
};

Canvas.prototype.exec = function( funcName, args ){
  this.context[ funcName ].apply( this.context, args );
  if( this.layerCacheEnabled ){
    this.cachingContext[ funcName ].apply( this.cachingContext, args );
  }
};
Canvas.prototype.assign = function( attrName, val ){
  this.context[ attrName ] = val;
  if( this.layerCacheEnabled ){
    this.cachingContext[ attrName ] = val;
  }
};
Canvas.prototype.render = function(){
  this.clearCache();
  this.clear();
  if( this.stateStack[ 0 ] ){
    this.stateStack[ 0 ].draw( this.context );
  }

};

Canvas.prototype.registerTool = function( name, map ){
  var 
    type, 
    callback;

  this.tools[ name ] = map;
  for( type in map ){
    callback = map[ type ];


    this.$canvas.on( 'drag:' + type + ':' + name, callback );
  }
};

Canvas.prototype.drawImage = function(){
  this.context.drawImage( arguments );
};


Canvas.prototype.use = function( toolName ){
  this.currentTool = toolName;
};

Canvas.prototype.changeColor = function( color ){
  this.currentColor = color;
};

Canvas.prototype.changeSize = function( size ){
  this.brushSize = size;
};

Canvas.prototype.changeOpacity = function( opacity ){
  this.currentOpacity = opacity;
};

Canvas.prototype.height = function(){
  return this.$canvas.height();
};

Canvas.prototype.width = function(){
  return this.$canvas.width();
};

Canvas.prototype.cursor = function( name, hard ){
  if( hard ){
    this.currentCursor = name;
  }else {
    this.$canvas.css({ cursor: name });
  }
};

Canvas.prototype.undo = function( steps ){
  steps = steps || 1;
  this.stateStack.splice( 0, steps );
  this.layerStack.forEach(function( layer ){
    layer.resetPosition();
  });
  this.render();
};

Canvas.prototype.select = function( layer_id ){
  this.currentLayer = this.layerStack.filter(function( layer ){
    return layer.id === layer_id;
  })[ 0 ];
};

Canvas.prototype.clear = function( x, y, width, height ){
  x      = x || 0;
  y      = y || 0;
  width  = width  || this.width();
  height = height || this.height();

  return this.context.clearRect( x, y, width, height );
};


