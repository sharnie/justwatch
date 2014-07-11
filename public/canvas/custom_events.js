$( document ).on('page:change', function() {

  // drag event
  $( '*' ).on('mousedown mouseup mousemove', function( e ){
    var 
      $this = $( this ),
      eventData = {};

      _.extend( eventData, _.pick( e, 'offsetX', 'offsetY' ) );

    if( e.type === 'mousedown'){
      $this.data('mousedown', true);
      _.extend( eventData, { type: 'drag:begin' } );
      
      $this.trigger( eventData );

      return;
    }else if( e.type === 'mouseup' ){
      _.extend( eventData, { type: 'drag:end' } );
      
      $this.trigger( eventData );
      $this.data('mousedown', false);

      return;
    }

    if( e.type === 'mousemove' && $this.data('mousedown') ){

      _.extend( eventData, { type: 'drag:move' } );
      
      $this.trigger( eventData );
    }

  });

});