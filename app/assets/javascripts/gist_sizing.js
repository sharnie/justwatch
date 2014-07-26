PC.onLoadEvent(function(){
  // adjust the size of gists when
  // document is ready
  PC.adjustGistSize( '.gist', {
    image    : '.gist-canvas',
    lineCount: '.line-numbers',
    body     : '.gist-body',
    code     : '.code'
  });

});