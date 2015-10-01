$(function(){
	
	$(".grid__item").find(".slider__item").click(function(){
		var thisItemWidth = $(this).parent().parent().parent().width();
		var thisItemHeight = $(this).parent().parent().parent().height();
		var adcontents = $(this).parent().html().replace("flickity-slider","slider");
		$("#AdContent").remove();										
		$('<div id="AdContent"></div>')
		.appendTo("body")
		.html('<div class="grid__item" style="width:100%"><div class="slider">'+ adcontents +'</div></div>')
		.dialog({
			width: thisItemWidth,
			height: thisItemHeight+60,
			modal: true,
		})
		$("#AdContent").find("img").css({
			width:"100%"
		});
		dialogEven();
	});
	
});

function dialogEven(){
	(function(window) {

		'use strict';

		var support = { animations : Modernizr.cssanimations },
			animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
			animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ],
			onEndAnimation = function( el, callback ) {
				var onEndCallbackFn = function( ev ) {
					if( support.animations ) {
						if( ev.target != this ) return;
						this.removeEventListener( animEndEventName, onEndCallbackFn );
					}
					if( callback && typeof callback === 'function' ) { callback.call(); }
				};
				if( support.animations ) {
					el.addEventListener( animEndEventName, onEndCallbackFn );
				}
				else {
					onEndCallbackFn();
				}
			};

		function throttle(fn, delay) {
			var allowSample = true;

			return function(e) {
				if (allowSample) {
					allowSample = false;
					setTimeout(function() { allowSample = true; }, delay);
					fn(e);
				}
			};
		}

		// sliders - flickity
		var sliders = [].slice.call($("#AdContent").find('.slider')),
			// array where the flickity instances are going to be stored
			flkties = [],
			// grid element
			grid = $("#AdContent").find('.grid'),
			// isotope instance
			iso,
			// filter ctrls
			filterCtrls = [].slice.call($("#AdContent").find('.filter > button'));

		function init() {
			// preload images
			imagesLoaded(grid, function() {
				initFlickity();
				initIsotope();
				initEvents();
				classie.remove(grid, 'grid--loading');
			});
		}

		function initFlickity() {
			sliders.forEach(function(slider){
				var flkty = new Flickity(slider, {
					prevNextButtons: false,
					wrapAround: true,
					cellAlign: 'left',
					contain: true,
					resize: false
				});

				// store flickity instances
				flkties.push(flkty);
			});
		}

		function initIsotope() {
			iso = new Isotope( grid, {
				isResizeBound: false,
				itemSelector: '.grid__item',
				percentPosition: true,
				masonry: {
					// use outer width of grid-sizer for columnWidth
					columnWidth: '.grid__sizer'
				},
				transitionDuration: '0.6s'
			});
		}

		function initEvents() {
			filterCtrls.forEach(function(filterCtrl) {
				filterCtrl.addEventListener('click', function() {
					classie.remove(filterCtrl.parentNode.querySelector('.filter__item--selected'), 'filter__item--selected');
					classie.add(filterCtrl, 'filter__item--selected');
					iso.arrange({
						filter: filterCtrl.getAttribute('data-filter')
					});
					recalcFlickities();
					iso.layout();
				});
			});

			// window resize / recalculate sizes for both flickity and isotope/masonry layouts
			window.addEventListener('resize', throttle(function(ev) {
				recalcFlickities()
				iso.layout();
			}, 50));

			// add to cart
			
		}


		function recalcFlickities() {
			for(var i = 0, len = flkties.length; i < len; ++i) {
				flkties[i].resize();
			}
		}

		init();

	})(window);
	
}