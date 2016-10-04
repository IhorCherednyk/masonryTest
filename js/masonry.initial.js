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

// var $grid = $('.grid').imagesLoaded( function() {
// 	$grid.masonry({
// 		itemSelector: '.grid-item',
// 		percentPosition: true,
// 		columnWidth: '.grid-sizer'
// 	}); 
// });

// $('.bit').click(function(){
// 	alert('click')
// 	$grid.masonry('layout');
// })

var imagePreloadQuantity = 10,
allImages,
allImagesQuantity

function masonryImagePreloader(){
	
	allImages = $('img.no-loadeds');
	allImagesQuantity = allImages.length;
	allImages.each(function(key,value){
		if(key < imagePreloadQuantity && $(this).hasClass('no-loadeds')){
			var img = new Image();
			img.src = $(value).data('original');
			$(this).attr('src', $(value).data('original')).removeClass('no-loadeds') //Перезаписывам src

		}
		else if (key != 0 && key >= imagePreloadQuantity && $(this).hasClass('no-loadeds')) {
			var $grid = $('.grid').imagesLoaded( function() {
				$grid.masonry({
					itemSelector: '.grid-item',
					percentPosition: true,
					columnWidth: '.grid-sizer'
				}); 
			});
			masonryImagePreloader(allImages)
		}else {
			return false

		}
	})
}
masonryImagePreloader(allImages);

// var $container = $('.grid');
// $container.imagesLoaded(function(){
//     $container.masonry({
//         itemSelector: '.item',
//         columnWidth: '.grid-sizer'
//     });
//     $('.item img').addClass('not-loaded');
//     $('.item img.not-loaded').lazyload({
//         effect: 'fadeIn',
//         load: function() {
//             // Disable trigger on this image
//             $(this).removeClass("not-loaded");
//             $container.masonry('reload');
//         }
//     });
//     $('.item img.not-loaded').trigger('scroll');
// });



// });
