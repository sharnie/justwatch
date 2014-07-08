$( document ).on('page:change', function() {

  $( '*' ).on('mousedown mouseup mousemove', function( e ){
    var 
      $this = $( this ),
      eventData = {};

    if ( !$this.data('mousedown') ){
      $this.data('mousedown', false);
    }

    if( e.type === 'mousedown'){
      $this.data('mousedown', true);
      
    }else if( e.type === 'mouseup'){
      $this.data('mousedown', false);
    }

    if( e.type === 'mousemove' && $this.data('mousedown') ){

      _.extend( eventData, _.pick( e, 'offsetX', 'offsetY' ), { type: 'drag' } );

      $this.trigger( eventData );
    }

  });


});