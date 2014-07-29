PC.onLoadEvent(function(){

  PC.collapse = {
    config: {
      parent: '.modal-body',
      toggle: true
    },
    collapseAll: function( collection ){
      collection.forEach(function( collapsable ){
        collapsable.collapse( 'hide' );
      });
    },
    toggleRelatedButton: function( showClass, hideClass ){

      return function( e ){
        var $this = $( this );

        if( e.type === 'show' ){
          PC.$.cropModalTitle.html( $this.data( 'title' ) );

          PC.collapse.collapseAll( [ PC.$.cropPanel, PC.$.previewPanel ] );

          PC.$.cropModalFooter.find( $this.data( 'related' ) )
            .removeClass( hideClass )
            .addClass( showClass );

        }else if( e.type === 'hide' ){
          PC.$.cropModalFooter.find( $this.data( 'related' ) )
            .removeClass( showClass )
            .addClass( hideClass ); 
        }
      };
    }
  };

  PC.$.cropPanel   .collapse( PC.collapse.config );
  PC.$.previewPanel.collapse( PC.collapse.config );
});