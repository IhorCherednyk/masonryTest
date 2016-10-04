$(function() {
	var webServiceRootUrl = '/service.php';
	var carouselHtmlInitial = false;

	var hash = window.location.hash;

	$.ajax({
		method: "POST",
		url: webServiceRootUrl,
		data: { currentWidth : window.innerWidth, action : 'getImageByResolution', bundleHash : hash }
	}).done(function( response ) {
		response = jQuery.parseJSON( response );
		switch(response.status) {
			case 'error':
			alert(response.message)
			break;
			case 'success':
			initCarouselWithCorrectImageSize(response.data)
			break;
			default:
	    	//alert('huy')
	    }
	});

	function initCarouselWithCorrectImageSize(imagesList) {
		console.log(imagesList)
		$.each(imagesList, function(key,value) {
			 var currImages = value[0];
			 var currSlideHTML = '';
			 
			 if($(currImages).length === 1) {
			 	currSlideHTML = '<div class="photo-wrapper" data-hash=' + key + '>';
			 	currSlideHTML += '<img class="owl-lazy" data-src='+'"' + currImages + '"' + 'alt="Photo">'
			 } else if ($(currImages).length === 2) {
			 	currSlideHTML = '<div class="photo-wrapper two-img" data-hash=' + key + '>';
			 	$.each(currImages, function(key, imageUrl) {
			 		currSlideHTML += '<img class="owl-lazy" data-src='+'"' + imageUrl + '"' + 'alt="Photo">'
			 	});
			 } else {
			 	alert('Not correct number of images in one bundle. Should be 1 or 2')
			 }
			 currSlideHTML += '</div>';

			$('#owl-desctop').append(currSlideHTML);
		});

		carouselHtmlInitial = true

		$.each(imagesList, function(key,value){
		 	if(value.isActive){
		 		window.history.pushState({}, '', '#'+key);
		 	}
		 });

		carouselInit(carouselHtmlInitial);
	}

	function carouselInit(flag){
		if(flag){
			var owldesc = $('#owl-desctop');
			owldesc.on('initialized.owl.carousel', function(event) {     
				var items = event.item.count;
				var page = event.page.index;
				$('.pages-counter').text(items)
				$('.current-page').text("1")
			});
			owldesc.on('changed.owl.carousel', function(event) {
				var page = event.page.index;
				$('.current-page').text(page + 1)

			});
			owldesc.owlCarousel({
				loop:true,
				items:1,
				margin:10,
				nav:true,
				lazyLoad:true,
				navText:false,
				URLhashListener:true,
				startPosition: 'URLHash',
				navSpeed: 1000

			});
		}else{
			return false
		}
		
	};
});	