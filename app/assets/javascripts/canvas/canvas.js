function Canvas( selector ) {
  this.selector           = selector;
  this.$canvas            = $( selector );
  this.context            = this.$canvas[ 0 ].getContext( '2d' );
  this.tools              = [];
  this.currentTool        = 'pencil';
  this.currentColor       = '#000000';
  this.currentOpacity     = 1
  this.brushSize          = 1;
  this.canvasCacheEnabled = true;
  this.layerCacheEnabled  = true;

  this.exec        = function( funcName, args ){
    this.context[ funcName ].apply( this.context, args );
    if( this.layerCacheEnabled ){
      CACHE_CONTEXT[ funcName ].apply( CACHE_CONTEXT, args );
    }
  };
  this.assign      = function( attrName, val ){
    this.context[ attrName ] = val;
    if( this.layerCacheEnabled ){
      CACHE_CONTEXT[ attrName ] = val;
    }
  };
  this.render      = function(){
    clearCache();
    this.clear();
    if( STATE_STACK[ 0 ] ){
      STATE_STACK[ 0 ].draw( this.context );
    }

  };

  this.cacheLayer  = function(){
    var 
      shapeLayer;
    if( this.layerCacheEnabled ){
      shapeLayer = new Layer( CACHE_CANVAS[ 0 ].toDataURL() );
      LAYER_STACK.unshift( shapeLayer );
    }
  };

  this.cacheCanvas = function(){
    var 
      stateLayer;
    if( this.canvasCacheEnabled ){
      stateLayer = new Layer( _this.$canvas[ 0 ].toDataURL() );
      STATE_STACK.unshift( stateLayer );
      // $( 'body' ).append( '<img src="'+ STATE_STACK[ 0 ].url +'" >' );
    }
  };

  var
    CACHE_CANVAS,
    CACHE_CONTEXT,
    STATE_STACK,
    LAYER_STACK,
    clearCache;

  CACHE_CANVAS  = this.$canvas.clone().attr( 'id', 'CACHE-CANVAS' );
  CACHE_CONTEXT = CACHE_CANVAS[ 0 ].getContext( '2d' );
  STATE_STACK   = [];
  LAYER_STACK   = [];

  clearCache    = function(){
    CACHE_CONTEXT.clearRect( 0, 0, CACHE_CANVAS[ 0 ].width, CACHE_CANVAS[ 0 ].height );
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
      clearCache();
    }
  }

  // cache this(the abstract object) before changing context;
  var 
    _this           = this,
    canvasStateData = {},
    toolStateData   = {};

  $( this.selector ).on( 'drag:begin drag:move drag:end', function( e ){
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
                    defaultBehavior: DEFAULT_BEHAVIORS[ e.type.split(':')[1] ]
                  }
                };

    $this.trigger( eventData );


  });

}


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

Canvas.prototype.use = function( toolName ){
  this.currentTool = toolName;
};

Canvas.prototype.color = function( color ){
  this.currentColor = color;
};

Canvas.prototype.height = function(){
  return this.$canvas.height();
};

Canvas.prototype.width = function(){
  return this.$canvas.width();
};

Canvas.prototype.clear = function( x, y, width, height ){
  x      = x || 0;
  y      = y || 0;
  width  = width  || this.width();
  height = height || this.height();

  return this.context.clearRect( x, y, width, height );
};


