$(document).on('page:change', function(){
  var clip = new ZeroClipboard( document.getElementById("copytoclipboard-button"), {
  moviePath: "ZeroClipboard.swf"
} );
});
