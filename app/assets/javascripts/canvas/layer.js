function Layer( dataUrl ){
  this.url      = dataUrl;
  this.image    = new Image();
  this.id       = "layer_" + Date.now();
  this.position = {
    x: 0,
    y: 0
  };

  this.update();
}

Layer.prototype.update = function( url ){
  this.url = url || this.url;
  this.image.src = this.url;
};

Layer.prototype.draw = function( context, x, y ){
  x = x || this.position.x;
  y = y || this.position.y;
  context.drawImage( this.image, x, y);
};

Layer.prototype.changePosition = function( obj ){
  this.position.x = obj.x;
  this.position.y = obj.y;
};

Layer.prototype.resetPosition = function(){
  this.position.x = 0;
  this.position.y = 0;
};