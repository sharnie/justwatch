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
