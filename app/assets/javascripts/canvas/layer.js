function Layer( dataUrl ){
  this.url      = dataUrl;
  this.image    = new Image();
  this.id       = "layer_" + Date.now();
  this.position = {
    x: 0,
    y: 0
  };

  this.update = function( url ){
    this.url = url || this.url;
    this.image.src = this.url;
  };

  this.draw = function( context, x, y ){
    x = x || this.position.x;
    y = y || this.position.y;
    context.drawImage( this.image, x, y);
  };

  this.changePosition = function( obj ){
    this.position.x = obj.x;
    this.position.y = obj.y;
  };

  this.resetPosition = function(){
    this.position.x = 0;
    this.position.y = 0;
  };

  this.update();
};