function Layer( dataUrl ){
  this.url   = dataUrl;
  this.image = new Image();

  this.update = function( url ){
    this.url = url || this.url;
    this.image.src = this.url;
  };

  this.draw = function( context, x, y ){
    x = x || 0;
    y = y || 0;
    context.drawImage( this.image, x, y);
  };

  this.update();
};