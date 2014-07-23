JW.CACHE.$document.on( 'page:change', function(){

  $.extend( JW.CACHE, {
    $editor             : $( '#editor' ),
    $canvas             : $( '#main-canvas' ),
    $cropModal          : $( '#crop-modal' ),
    $cropModalBody      : $( '#crop-modal' ).find( '.modal-body' ),
    $previewPanel       : $( '#preview-panel' ),
    $cropPanel          : $( '#crop-panel' ),
    $gistForm           : $( 'form[id*="_gist"][method="post"][action*="/gists"]' ),
    $gistFormTextarea   : $( '#gist_content' ),
    $tools              : $( '#canvas-tools' )
  });

  $.extend( JW, {
    toggleEditMode: function( mode ){
      var 
        editor = this.CACHE.$editor,
        canvas = this.CACHE.$canvas;

      if( mode === 'canvas' ){
        editor
          .css({ opacity: 1 })
          .removeClass( 'front' )
          .addClass( 'back' );
        canvas
          .removeClass( 'back' )
          .addClass( 'front' );
      }else if( mode === 'editor'){
        editor
          .css({ opacity: 0.8 })
          .removeClass( 'back' )
          .addClass( 'front' );
        canvas
          .removeClass( 'front' )
          .addClass( 'back' );
      }
      
    }
  });
});