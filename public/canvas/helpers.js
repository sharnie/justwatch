
(function(){
  
  this.Canvas.helpers = {
    hexToRGB: function( hex, opacity ){
      var standardHex = hex,
          rgb;

      opacity = opacity || 1;

      if( hex[0] === '#' ){
        standardHex = hex.substr( 1, hex.length );
      }

      if( standardHex.length === 3){
        standardHex = standardHex.replace(/[0-9a-f]/gi, '$&$&');
      }

      rgb = standardHex.split( /([0-9a-f]{2})/gi ).filter(function( ch ){ 
        return ch; 
      }).map(function( hChar ){
        return parseInt( hChar, 16 );
      });

      return 'rgba(' + rgb.join(', ') + ', ' + opacity + ')';
    }
  };

}).call( this );

