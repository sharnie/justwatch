JW.CACHE.$document.on( 'page:change', function(){

  $.extend( JW.CACHE, {
    $editor             : $( '#editor' ),
    $canvas             : $( '#main-canvas' ),
    $cropModal          : $( '#crop-modal' ),
    $cropModalBody      : $( '#crop-modal' ).find( '.modal-body' ),
    $previewPanel       : $( '#preview-panel' ),
    $cropPanel          : $( '#crop-panel' ),
    $gistForm           : $( 'form[id*="_gist"][method="post"][action*="/gists"]' ),
    $gistFormTextarea   : $( '#gist_content' ),
    $tools              : $( '#canvas-tools' )
  });

  $.extend( JW, {
    toggleEditMode: function( mode ){
      var 
        editor = this.CACHE.$editor,
        canvas = this.CACHE.$canvas;

      if( mode === 'canvas' ){
        editor
          .css({ opacity: 1 })
          .removeClass( 'front' )
          .addClass( 'back' );
        canvas
          .removeClass( 'back' )
          .addClass( 'front' );
      }else if( mode === 'editor'){
        editor
          .css({ opacity: 0.8 })
          .removeClass( 'back' )
          .addClass( 'front' );
        canvas
          .removeClass( 'front' )
          .addClass( 'back' );
      }
      
    }
  });
});
JW.CACHE.$document.on( 'page:change', function(){

  // declare canvas 
  // must execute first -----------------------|
  JW.canvas = new Canvas( JW.CACHE.$canvas );
  //-------------------------------------------|

  // create crop tool
  // this tool is specific for our application
  // unlike to tools defined in canvas/canvas_config
  // which are generic tools that do not use
  // any environment information --------------------------------------|
  JW.canvas.registerTool('crop', {
    begin: function( e ){},
    move: function( e ){
      var
        canvas    = e.canvas.mainObject,
        context   = e.canvas.context,
        currentX  = e.canvas.x,
        currentY  = e.canvas.y;

      canvas.cursor( 'crosshair' );
      canvas.render();
      context.lineWidth = 1 ;
      context.font = "12px courier";
      context.fillStyle = Canvas.helpers.hexToRGB( '#666' , 1 );
      context.fillText("(" + Math.floor( currentX ) +', ' + Math.floor( currentY ) + ")", currentX, currentY);
      context.strokeStyle = Canvas.helpers.hexToRGB( '#666' , 1 );
      context.strokeRect( 0, 0, currentX, currentY );
    },
    end: function( e ){
      var
        canvas    = e.canvas.mainObject,
        currentX  = e.canvas.x,
        currentY  = e.canvas.y,
        url,
        data;

      canvas.render();

      url = canvas.toDataURLcrop({
        width: currentX,
        height: currentY
      });


      data = {
        gist: {
          name: $( '#gist_name' ).val(),
          content: $( '#gist_content' ).val(),
          language: $( '#gist_language' ).val(),
          visual_attributes: {
            url: url
          }
        },
        preview: true
      };

      var 
        $modal         = $( '#crop-modal' ),
        $previewPanel  = $modal.find( '#preview-panel' );
        $cropPanel     = $modal.find( '#crop-panel' );

      $.post('/gists', data, function( response ){

        $previewPanel
          .html( response )
          .collapse( 'show' );

        $cropPanel
          .collapse( 'hide' );
      });

      // set the image url of hidden field
      // this is important for form submission -----|
      $( '#gist_visual_attributes_url' )
        .val( url )
        .trigger( 'change' );
      //--------------------------------------------|
    }
  });
  //--------------------------------------------------------------------|

});
// this code instantiates the ace window.mainEditor
JW.CACHE.$document.on( 'page:change', function(){

  JW.editor = ace.edit("editor");


  var 
    editor             = JW.editor,
    canvas             = JW.canvas,
    $textarea          = $( 'textarea#gist_content' ),
    $editorContentArea = $( '.ace_content' ),
    $editorScrollBar   = $( 'div.ace_scrollbar.ace_scrollbar-h' );
    
  // set the value of text editor to content of current gist
  // useful for edit page ---------------|
  editor.setValue( $textarea.val(), 1 ); 
  //-------------------------------------|

  editor.setTheme("ace/theme/eclipse");

  editor.getSession().on('change', function() {

    // update textarea for form submission ------------|
    $textarea.val( editor.getSession().getValue() );
    //-------------------------------------------------|

    // 'change' the size of the canvas to fit text area ------------|
    canvas.changeCanvasSize( { width: $editorContentArea.width() });
    //--------------------------------------------------------------|
  });



  //synchronize canvas scroll with text editor -------------------------
  //                                                                   |
  //                                                                   |
  editor.getSession().on('changeScrollTop', function( scroll ){
    canvas.scrollCanvasY( scroll );
  });
  //                                                                   |
  $editorScrollBar.on('scroll', function(){
    canvas.scrollCanvasX( $( this ).scrollLeft() );
  });
  //                                                                   |
  //--------------------------------------------------------------------


});
JW.CACHE.$document.on('page:change', function(){
  // Here lives the code that allows the switching of context
  // between editor and canvas
  var
    $gistForm           = JW.CACHE.$gistForm,
    $textarea           = JW.CACHE.$gistFormTextarea,
    $modal              = JW.CACHE.$cropModal,
    $modalBody          = JW.CACHE.$cropModalBody,
    $cropPanel          = JW.CACHE.$cropPanel,
    $previewPanel       = JW.CACHE.$previewPanel,

    $modalSubmit        = $( '.modal-footer a[role="submit"]' ),
    $modalTitle         = $modal.find( 'h4.modal-title' ),
    $canvasWrapper      = $gistForm.find( '#canvas-wrapper' ),
    originalDestination = $canvasWrapper.parent(), //use prepend
    $infoPop            = $modal.find( '#info-pop' );

  $textarea.hide();
  // user must choose canvas size before submitting
  // --------------------------------------------------|  
  $gistForm.on('submit', function( e ){
    
    if( !e.readyToSubmit ){
      JW.toggleEditMode( 'canvas' );
      JW.canvas.use( 'crop' );

      $canvasWrapper.addClass( 'modal-crop-state' );

      $cropPanel
        .append( $canvasWrapper )
        .collapse( 'show' );

      $modal.modal();

      //--------------------------|
      e.preventDefault();
    }
  });
  //---------------------------------------------------|
  $modal.on( 'hide.bs.modal', function( e ){
    $canvasWrapper.removeClass( 'modal-crop-state' );
    originalDestination.prepend( $canvasWrapper );
    JW.canvas.use( JW.canvas.toolHistory[ 1 ] );
  }); 

  $infoPop.popover({
    container: 'body',
    trigger: 'click hover'
  });

  var collapseConfig = {
    parent: '.modal-body',
    toggle: true
  };

  $cropPanel.collapse( collapseConfig );
  $previewPanel.collapse( collapseConfig );

  var collapseAll = function( collection ){
    collection.forEach(function( collapsable ){
      collapsable.collapse( 'hide' );
    });
  };

  var toggleRelatedButton = function( e ){
    var $this = $( this );

    if( e.type === 'show' ){
      $modalTitle.html( $this.data( 'title' ) );

      collapseAll( [ $cropPanel, $previewPanel ] );

      $( $this.data( 'related' ) )
        .removeClass( 'btn-default' )
        .addClass( 'btn-primary' )
        .addClass( 'disabled' );

    }else if( e.type === 'hide' ){
      $( $this.data( 'related' ) )
        .removeClass( 'btn-primary disabled' )
        .addClass( 'btn-default' );    
    }
  };

  $cropPanel.on( 'show.bs.collapse hide.bs.collapse', toggleRelatedButton);

  $previewPanel.on( 'show.bs.collapse hide.bs.collapse', toggleRelatedButton);
  
  $( '#gist_visual_attributes_url' ).on( 'change', function( e ){
    $modalSubmit
      .removeClass( 'btn-default disabled custom-disabled' )
      .addClass( 'btn-success' );
    $( $previewPanel.data( 'related' ) )
      .removeClass( 'custom-disabled' );
  });

  $modalSubmit.on( 'click', function( e ){
    e.stopPropagation();
    $gistForm.find( '#gist_name' ).val( $( '#preview-name' ).val() );
    $gistForm.trigger({
      type: 'submit',
      readyToSubmit: true
    } );
  });

});
// list of supported languages all live in GistsHelper ---------------|
//--------------------------------------------------------------------|

JW.CACHE.$document.on( 'page:change', function(){
  var 
    gistLanguage,
    supportedLanguages,
    toAceLang,
    editor,
    language;

  language           = $( '#gist_language' ).val();
  editor             = JW.editor,
  $gistLanguage      = $('#gist_language'),
  supportedLanguages = JSON.parse('["text","C/C++","Clojure","CSS","Groovy","HAML","HTML","Java","JavaScript","JSON","Lua","PHP","Python","Ruby","Sass","SQL","XML","YAML"]');

  // handle odd language cases from
  // dropdown -----------------------|
  toAceLang = function( lang ){
    switch( lang ){
      case 'C/C++':
        return 'c_cpp';
        break;
  //                                 |
      default:
        return lang.toLowerCase();
    }
  };
  //---------------------------------|


  editor.getSession().setMode( "ace/mode/" + (toAceLang( language ) || 'text') );

  $gistLanguage.on( 'change', function() {
    // change ace syntax highlighting accordingly to selected
    // language --------------------------------------------------------|
    var 
      $this    = $(this),
      language = $this.val();
    //                                                                  |
    if( supportedLanguages.indexOf( language ) >= 0 ){
      editor.session.getUndoManager().markClean();
      editor.getSession().setMode('ace/mode/' + toAceLang( language ) );
    }
    //------------------------------------------------------------------|
  });
});
JW.CACHE.$document.on( 'page:change', function(){

  var
    $tools         = JW.CACHE.$tools,
    $toolButtons   = $tools.find( 'input:radio[name="tool"]' ),
    $colorInput    = $tools.find( 'input[type="color"][name="brush-color"]' ),
    $opacitySlider = $tools.find( '#opacity-slider' ),
    $brushSlider   = $tools.find( '#brush-slider' ),
    $undoButton    = $tools.find( '#undo-button[role="undo"]' );

  $toolButtons.on( 'change', function( e ){
    var
      $this = $( this ),
      tool  = $this.val();
      
    // show that tools are selected by adding '.selected' css class ----------|
    $( '#canvas-tools span.radio-button.selected' ).removeClass( 'selected' );
    $this.parent( 'span.radio-button' ).addClass( 'selected' );
    //------------------------------------------------------------------------|

    // allow switching of context between writing and drawing
    //-----------------------------|
    if( tool === 'text'){
      JW.toggleEditMode( 'editor' );
    } else {
      JW.toggleEditMode( 'canvas' );

      JW.canvas.use( $this.val() );
    }
    //-----------------------------|
  });

  $colorInput.on( 'change', function( e ){
    // change drawing color ---------------------|
    JW.canvas.changeColor( $( this ).val() );
    //-------------------------------------------|
  });

  // create opacity slider --------------------------------|
  $opacitySlider.slider({
    orientation: 'vertical',
    min: 10,
    range: 'min',
    max: 100,
    value: 100,
    slide: function( e, ui ){
      // actual opacity change ---------------------|      |
      JW.canvas.changeOpacity( ui.value / 100 );
      //--------------------------------------------|      |
    }
  });
  //-------------------------------------------------------|


  // create brush slider ----------------------------------|
  $brushSlider.slider({
    orientation: 'vertical',
    min: 1,
    range: 'min',
    max: 20,
    value: 1,
    slide: function( e, ui ){
      // actual brush size change -----------|             |
      JW.canvas.changeSize( ui.value );
      //-------------------------------------|             |
    }
  });
  //-------------------------------------------------------|

  // undo button ---------------------|
  $undoButton.on( 'click', function(){
    JW.canvas.undo();
  });
  //----------------------------------|
});
JW.CACHE.$document.on( 'page:change', function(){
  // enable tooltip for tools and sliders ---------|
  $("*[data-toggle='tooltip']").tooltip();


  $("#opacity-slider .ui-slider-handle").tooltip({
    placement: 'right',
    title: 'Opacity'
  });

  $("#brush-slider .ui-slider-handle").tooltip({
    placement: 'right',
    title: 'Brush Size'
  });
  //-----------------------------------------------|
});
/*





*/
;
