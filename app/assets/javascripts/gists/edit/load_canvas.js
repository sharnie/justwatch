JW.$document.on( 'page:change', function(){
  var prevImage = new Image();

  prevImage.src = $( '#gist_visual_attributes_url' ).val();

  JW.canvas.drawImage( prevImage, 0, 0 );
  JW.canvas.cacheCanvas();
});