PC.onLoadEvent(function(){
  // to avoid hitting the dom as much as possible,
  // here we cache all meaningful html elements for future use
  // in our app.
  // using both the $#children and $#find method are
  // much faster than traversing the dom tree for an element
  
  this.html       = this.doc.children( 'html' );
  this.head       = this.html.children( 'head' );
  this.body       = this.html.children( 'body' );

  this.clipboards = this.body.find( 'a[data-clipboard=true]' );
  this.tooltips   = this.body.find( '*[data-toggle="tooltip"]' );
});

