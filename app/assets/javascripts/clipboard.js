PC.onLoadEvent(function(){

  this.clipboards.click(function( e ){
    // prevent clipboard links from being clicked
    e.preventDefault();
  });

  this.clipboards.each(function(){
    // add content to clipboard 
    // when click on these elements
    new ZeroClipboard( $( this ) , {
      moviePath: "ZeroClipboard.swf"
    });
  });

});