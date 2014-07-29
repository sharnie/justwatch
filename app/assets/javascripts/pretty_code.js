window.PC = {
  // pretty code's namespace
  // do not polute the global environment
  $: {
    // cache static elements/DOM objects
    // to avoid hitting the dom
    doc : $( document ),

  },
  // all listeners waiting for this event are executed at the begining of each
  // page load
  pageLoadEvent: 'page:change',
  // default edit mode
  editMode: 'editor',
  // to fully controll the order in which 'onload' code is executed
  // they are saved in an ordered stack of callbacks
  onLoadEvent: (function(){
    var 
      callbacks = [],
      index,
      length,
      currentCallback,
      attachedEvent = false;

    return function( callbackOrEventData ){
      // if given a function, add to callback stack
      // else execute callbacks when onload event is triggered
      // in the context of the PC.$ caching object
      if( typeof callbackOrEventData === 'function' ){
        callbacks.push( callbackOrEventData );
      }else if( !attachedEvent ){

          PC.$.doc.on( PC.pageLoadEvent, function( e ){
            length = callbacks.length;
            for( index = 0; index < length; index += 1 ){
              currentCallback = callbacks[ index ];
              currentCallback.call( PC.$, e, callbackOrEventData );
            }
          });

        attachedEvent = true;
      }

    };
  }()),
  adjustGistSize: function( mainSelector, additionalSelectors ) {
    var 
      $gists = $( mainSelector ),
      byHeight,
      tallest,
      shortest,
      $image,
      $lineCount,
      $gistBody,
      $code;


    $.each( $gists, function(){
      var $this  = $( this );

      $image     = $this.find( additionalSelectors.image );
      $lineCount = $this.find( additionalSelectors.lineCount );
      $gistBody  = $this.find( additionalSelectors.body );
      $code      = $this.find( additionalSelectors.code );

      byHeight = _.sortBy( [ $image, $code ], function( el ){
        return el.height();
      });

      tallest  = byHeight[ 1 ];
      shortest = byHeight[ 0 ];

      _.each( [ shortest, $gistBody, $lineCount ], function( el ){
        el.height( tallest.height() );
      });
    });

  },
  changeEditMode: function( mode ){
    var 
      backClass  = 'back',
      frontClass = 'front';

    if( !PC.$.editor || !PC.$.canvas )
      throw new Error('Canvas or Editor aren\'t mounted');

    if( mode === 'canvas' ){
      PC.$.editor
        .css({ opacity: 1 })
        .removeClass( frontClass )
        .addClass( backClass );
      PC.$.canvas
        .removeClass( backClass )
        .addClass( frontClass );
    }else if( mode === 'editor'){
      PC.$.editor
        .css({ opacity: 0.8 })
        .removeClass( backClass )
        .addClass( frontClass );
      PC.$.canvas
        .removeClass( frontClass )
        .addClass( backClass );
    }else{
      throw new Error( mode + ' is not a valid edit mode: canvas/editor' );
    }
    PC.editMode = mode;
  }
};