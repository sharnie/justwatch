JW.CACHE.$document.on('page:change', function(){
  // Here lives the code that allows the switching of context
  // between editor and canvas
  var
    $gistForm           = JW.CACHE.$gistForm,
    $textarea           = JW.CACHE.$gistFormTextarea,
    $modal              = JW.CACHE.$cropModal,
    $modalBody          = JW.CACHE.$cropModalBody,
    $cropPanel          = JW.CACHE.$cropPanel,
    $previewPanel       = JW.CACHE.$previewPanel,

    $modalSubmit        = $( '.modal-footer a[role="submit"]' ),
    $modalTitle         = $modal.find( 'h4.modal-title' ),
    $canvasWrapper      = $gistForm.find( '#canvas-wrapper' ),
    originalDestination = $canvasWrapper.parent(), //use prepend
    $infoPop            = $modal.find( '#info-pop' );

  $textarea.hide();
  // user must choose canvas size before submitting
  // --------------------------------------------------|  
  $gistForm.on('submit', function( e ){

    
    JW.toggleEditMode( 'canvas' );
    JW.canvas.use( 'crop' );

    $canvasWrapper.addClass( 'modal-crop-state' );

    $cropPanel
      .append( $canvasWrapper )
      .collapse( 'show' );

    $modal.modal();

    //--------------------------|
    e.preventDefault();
  });
  //---------------------------------------------------|
  $modal.on( 'hide.bs.modal', function( e ){
    $canvasWrapper.removeClass( 'modal-crop-state' );
    originalDestination.prepend( $canvasWrapper );
    JW.canvas.use( JW.canvas.toolHistory[ 1 ] );
  }); 

  $infoPop.popover({
    container: 'body',
    trigger: 'click hover'
  });

  var collapseConfig = {
    parent: '.modal-body',
    toggle: true
  };

  $cropPanel.collapse( collapseConfig );
  $previewPanel.collapse( collapseConfig );

  var collapseAll = function( collection ){
    collection.forEach(function( collapsable ){
      collapsable.collapse( 'hide' );
    });
  };

  var toggleRelatedButton = function( e ){
    var $this = $( this );

    if( e.type === 'show' ){
      $modalTitle.html( $this.data( 'title' ) );

      collapseAll( [ $cropPanel, $previewPanel ] );

      $( $this.data( 'related' ) )
        .removeClass( 'btn-default' )
        .addClass( 'btn-primary' );

    }else if( e.type === 'hide' ){
      $( $this.data( 'related' ) )
        .removeClass( 'btn-primary' )
        .addClass( 'btn-default' );    
    }
  };


  $cropPanel.on( 'show.bs.collapse hide.bs.collapse', toggleRelatedButton);

  $previewPanel.on( 'show.bs.collapse hide.bs.collapse', toggleRelatedButton);
  
  $( '#gist_visual_attributes_url' ).on( 'change', function( e ){
    $modalSubmit
      .removeClass( 'btn-default' )
      .removeClass( 'disabled' )
      .removeClass( 'custom-disabled' )
      .addClass( 'btn-success' );
  });

  $modalSubmit.on( 'click', function( e ){
    e.stopPropagation();
    $( '#gist-preview' ).trigger( 'submit' );
  });

});