$(document).on('page:change', function(){

  var canvas = $('#main-canvas');
  var context = canvas[0].getContext('2d');

  canvas.on('drag:begin drag drag:end', function(e){
    e.preventDefault();

    if(e.type === 'drag:begin') {
      context.beginPath();
      // console.log(e);
    } else if(e.type === 'drag') {
      context.moveTo(e.offsetX + 1, e.offsetY + 1);
      context.lineTo(e.offsetX, e.offsetY);
      context.lineWidth = 5;
      context.fillStyle = '#8ED6FF';
      context.fill();
      context.stroke();
      // console.log(e);
    } else if(e.type === 'drag:end') {
      context.closePath();
      // console.log(e);
    }

  });

});