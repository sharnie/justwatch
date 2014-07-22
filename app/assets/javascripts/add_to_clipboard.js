
JW.$document.on('page:change', function(){

  var $clipboards = $( 'a[data-clipboard=true]' );

  $clipboards.click(function( e ){
    e.preventDefault();
  });

  $clipboards.each(function(){

    new ZeroClipboard( $( this ) , {
      moviePath: "ZeroClipboard.swf"
    });
    
  });

});

