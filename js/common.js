$(function() {
	
	$('.curent-active-page').click(function(){
		$('.page-list-menu').toggleClass('fullWidth')
		$('.curent-active-page > a ').toggleClass('arrow-down')

	})


	$(".toggle_mnu").click(function() {

		if ($(".sandwich").hasClass("active")) {
			$('.page-list-menu').removeClass('fullWidth');
			$(".sandwich").toggleClass("active");
			$('.curent-active-page').css('opacity', '1');
		} else {
			$(".sandwich").toggleClass("active");
			$('.page-list-menu').addClass('fullWidth');
			$('.curent-active-page').css('opacity', '0');
		};
	});


	var owldesc = $('#owl-desctop'),
		allItems, // все элементы
		curentImage, // текущий элемент
		rightSibiling, // Првый сосед
		leftSibiling  // Левый сосед



			owldesc.on('initialized.owl.carousel', function(event) {     
				var items = event.item.count;
				var page = event.page.index;
				$('.pages-counter').text(items);
				$('.current-page').text("1");
				allItems = $(".owl-item:not('.cloned')"); // Находит все не клонированые элементы
				carouselImageLoads(allItems);
			});

			owldesc.on('changed.owl.carousel', function(event) {
				var page = event.page.index;
				$('.current-page').text(page + 1);
			});
			owldesc.on('translated.owl.carousel ', function(event) {
				carouselImageLoads(allItems);
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

			function carouselImageLoads(item){
				var allImage = [];
				var imageSrcArray = [];
				item.each(function(){
					if($(this).hasClass('active')){
						curentImage = $(this);
						rightSibiling = curentImage.next();
						leftSibiling = curentImage.prev();
						allImage.push(rightSibiling.find('img'));
						allImage.push(leftSibiling.find('img'));
						for (var i = 0; i < allImage.length; i++){
							if(allImage[i].length > 1) {
								imageSrcArray.push($(allImage[i][0]).data('src'));
								imageSrcArray.push($(allImage[i][1]).data('src'));
							}else{
								imageSrcArray.push($(allImage[i][0]).data('src'));
							}
						}
						imagePreloader(imageSrcArray);
					}
				});
			}

			function imagePreloader(array){
				for(var i = 0; i < array.length; i++){
					var img = new Image();
					img.src = array[i];
					console.log(img);
				}
			}

	
});