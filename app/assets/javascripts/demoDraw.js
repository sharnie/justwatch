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
      // context.lineTo(e.offsetX, e.offsetY);
      context.arc(e.offsetX, e.offsetY, 2, 0, 2 * Math.PI, false);
      context.lineWidth = 1;
      context.fillStyle = 'red';
      context.fill();
      // context.strokeStyle = '#003300';
      // context.stroke();
      // console.log(e);
    } else if(e.type === 'drag:end') {
      context.closePath();
      // console.log(e);
    }

  });

});