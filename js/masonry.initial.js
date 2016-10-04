// $(function() {


	// var goToTopFlag = true;
	// var windowInnerWidth = window.innerWidth;
	// var isMasonryInitial = false;

// VARIANT NUMBER 1

// $('.grid').imagesLoaded( function() {}).always( function( instance ) {
// 	var $grid = $('.grid');
// 	$grid.masonry({
// 		itemSelector: '.grid-item',
// 		percentPosition: true,
// 		columnWidth: '.grid-sizer'
// 	});
// });


// VARIANT NUMBER 2

var $grid = $('.grid').imagesLoaded( function() {
  $grid.masonry({
    itemSelector: '.grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer'
  }); 
});

$('.bit').click(function(){
	alert('click')
	$grid.masonry('layout');
})


var $container = $('.grid');
$container.imagesLoaded(function(){
    $container.masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer'
    });
    $('.grid-item img').addClass('not-loaded');
    $('.grid-item img.not-loaded').lazyload({
        effect: 'fadeIn',
        load: function() {
            console.log($(this))
            $(this).removeClass("not-loaded");
            $container.masonry('layout');
        }
    });
    $('.item img.not-loaded').trigger('scroll');
});



// });
