$(document).on('page:change', function(){
  new ZeroClipboard( document.getElementById("copytoclipboard-button"), {
    moviePath: "ZeroClipboard.swf"
  });
});

