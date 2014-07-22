
JW.$document.on('page:change', function(){

  var $clipboards = $( 'button[id^="copytoclipboard-button-"]' );

  // $clipboards.click(function( e ){
  //   e.preventDefault();
  // });

  $clipboards.each(function(){
    new ZeroClipboard( this , {
      moviePath: "ZeroClipboard.swf"
    });
    
  });

});

