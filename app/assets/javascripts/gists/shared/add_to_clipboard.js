
$(document).on('page:change', function(){

  var $clipboards = $( 'button[id^="copytoclipboard-button-"]' );


  $clipboards.each(function(){

    new ZeroClipboard( this , {
      moviePath: "ZeroClipboard.swf"
    });
    
  });

});

