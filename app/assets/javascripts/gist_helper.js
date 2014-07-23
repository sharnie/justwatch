$(document).on('page:change', function(){
  // var height      = $('.gist-canvas').height(),
  //     lineNumbers = $('.line-numbers').height(height + 4),
  //     body        = $('.gist-body').height(height);

  var lineNumbers  = $('.line-numbers'),
      gists        = $('.gist'),
      gist_body    = $('.gist-body');

  $.each(gists, function(index, gist){
    // console.log(gist);
    var canvas    = $(this).find('.gist-canvas'),
        lineNum   = $(this).find('.line-numbers'),
        gist_body = $(this).find('.gist-body'),
        code      = $(this).find('.code');

    if(code.height() > canvas.height()) {
      $(gist_body).height(code.height());
    } else if (canvas.height() > code.height()) {
      $(code).height(gist_body.height());
      $(lineNum).height($(canvas).height());
    }

  });

      
});