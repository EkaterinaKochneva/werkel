window.onload = function () {

	// Кнопки в шапке

	$(".header-search-btn-js").click(function (e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(".body-header__search").slideToggle().find('input').focus();
	});

	$(".mob-phone-js").click(function () {		
		$(this).toggleClass("active");
		$(".body-header__column--info--js").slideToggle();
	});

	$('.catalog-btn-js').click(function () {
		$('.catalog-header__content').toggleClass('active');
		$('body').toggleClass('fixed-mb');
	});
	$('.catalog-header__close-btn--js').click(function () {
		$('.catalog-header__content').removeClass('active');
		$('body').removeClass('fixed-mb');
	});

	// Слайдеры
	const swiper = new Swiper('.top-slider__swiper', {
		loop: true,
		autoplay: {
			delay: 5000,
		  },

		pagination: {
		  el: '.top-slider__pagination',
		  clickable: true,
		},
		navigation: {
			hide: false,
			nextEl: '.top-slider__button-next',
			prevEl: '.top-slider__button-prev',
		  },
		slidesPerView: 1,
	  });

	document.querySelectorAll('.products-slider').forEach(n => {
		const swiperNew = new Swiper(n.querySelector('.products-slider__swiper'), {
			slidesPerView: 1,		
			loop: true,	
			watchSlidesProgress: true,		
			breakpoints: {
				1401: {
					slidesPerView: 5,
					spaceBetween: 30,
					autoHeight: true,
				},
				1199: {
					slidesPerView: 4,
					spaceBetween: 20,
					autoHeight: true,
				},
				991: {
					slidesPerView: 3,
					autoHeight: true,
				},
				767: {
					slidesPerView: 2,	
					autoHeight: true,				
				},
				575: {
					autoHeight: true,	
				}
			},
			
			navigation: {
				hide: false,
				nextEl: n.querySelector('.swiper-button-next'),
				prevEl: n.querySelector('.swiper-button-prev'),
			  },
			scrollbar: {
			hide: false,
			el: n.querySelector('.products-slider__scrollbar'),
			draggable: true,
	
			},
	
		  });
	});

	const swiperExpertHelp = new Swiper('.expert-help__swiper', {
		slidesPerView: 1,
		loop: true,
		autoplay: {
			delay: 5000,
		},
		pagination: {
		  el: '.expert-help__pagination',
		  clickable: true,
		},

	});

	const swiperProductThumbs = new Swiper('.product-thumbs__swiper', {

		slidesPerView: 'auto',
		spaceBetween: 15,

	});
	const swiperProduct = new Swiper('.product-slider__swiper', {

		slidesPerView: 1,
		draggable: true,

		thumbs: {
			swiper: swiperProductThumbs,
		  },
	});

	const swiperAbout = new Swiper('.about-slider__swiper', {

		slidesPerView: 1,

		pagination: {
		  el: '.about-slider__pagination',
		  clickable: true,
		},

	});


// Аккардион FAQ
	$('.faq__btn').click(function(){
		if(!$(this).hasClass('active')){	
			$(this).parents('.faq__wrapper').find('.faq__btn').removeClass('active'); 
			$(this).parents('.faq__wrapper').find('.faq__answer').slideUp(); 
			$(this).addClass('active');	
			$(this).parent().next().slideDown();	
		} else {	
			$(this).removeClass('active');
			$(this).parent().next().slideUp();
		}
	});

// Tabs
	$('.tabs__caption').on('click', '.tabs__btn:not(.active)', function (e) {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('.tabs').find('.tabs__content').hide().removeClass('active')
			.eq($(this).index()).fadeIn().addClass('active');

	});

// Плавная прокрутка
	$(".smooth-scroll-link-js").on("click", function (e) {
		e.preventDefault();
		var get_id = $(this).attr('href');
		var target = $(get_id).offset().top; 
		$("html, body").animate({ scrollTop: target }, 500);
	});

//Активация таба
	$(".tabs-link-js").on("click", function (e) {
		e.preventDefault();
		var get_id = $(this).attr('href');
		$(get_id)[0].click(); 
	});

// Фильтр категории

	$('.filter-btn-js').click(function () {
		$('.category-filter').addClass('active');
		$('body').addClass('fixed-mb');
	});
	$('.category-filter__close-btn--js').click(function () {
		$('.category-filter').removeClass('active');
		$('body').removeClass('fixed-mb');
	});

    $('.category-filter__title').click(function () {
		$(this).toggleClass("active");
		let parent = $(this).parents('.category-filter__item');
		parent.children(".category-filter__body").slideToggle();
	});

// Кастомный ползунок
	function currencyFormat(num) {
		return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
	} // currencyFormat(num)

	$(".range-wrap").each(function () {
		let _this = $(this);

		var $range = _this.find(".range-slider-js");
		var $inputFrom = _this.find(".input_from");
		var $inputTo = _this.find(".input_to");

		var instance,
				from,
				to,
				min = $range.data('min'),
				max = $range.data('max');
		$range.ionRangeSlider({
			skin: "round",
			type: "double",
			grid: false,
			grid_snap: false,
			hide_min_max: true,
			hide_from_to: true,
			onStart: updateInputs,
			onChange: updateInputs,
			onFinish: updateInputs
		});
		instance = $range.data("ionRangeSlider");

		function updateInputs(data) {
			from = data.from;
			to = data.to;
			$inputFrom.prop("value", currencyFormat(from));
			$inputTo.prop("value", currencyFormat(to)); // InputFormat();
		}

		$inputFrom.on("change input ", function () {
			var val = +$(this).prop("value").replace(/\s/g, ''); // validate

			if (val < min) {
				val = min;
			} else if (val > to) {
				val = to;
			}

			instance.update({
				from: val
			});
			$(this).prop("value", currencyFormat(val));
			console.log(val);
		});
		$inputTo.on("change input ", function () {
			var val = +$(this).prop("value").replace(/\s/g, ''); // validate

			if (val < from) {
				val = from;
			} else if (val > max) {
				val = max;
			}

			instance.update({
				to: val
			});
			$(this).prop("value", currencyFormat(val));
		});
	});

// Модалки
	const link = ".link-modal-js";
	$(link).fancybox({
		arrows: false,
		infobar: false,
		touch: false,
		type: 'inline',
		autoFocus: false,
		i18n: {
			en: {
				CLOSE: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад" 

			}
		}
	});
	$(".modal-close-js").click(function () {
		$.fancybox.close();
	});
	$.fancybox.defaults.backFocus = false;
	// const linkModal = document.querySelectorAll(link);

	// function addData() {
	// 	linkModal.forEach(element => {
	// 		element.addEventListener('click', () => {
	// 			let modal = document.querySelector(element.getAttribute("href"));
	// 			const data = element.dataset;

	// 			function setValue(val, elem) {
	// 				if (elem && val) {
	// 					const el = modal.querySelector(elem);
	// 					el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
	// 				}
	// 			}

	// 			setValue(data.title, '.ttu');
	// 			setValue(data.text, '.after-headline');
	// 			setValue(data.btn, '.btn');
	// 			setValue(data.order, '.order');
	// 		});
	// 	});
	// }

	// if (linkModal) addData();


// mask for input
let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
Inputmask("+7(999)999-99-99", {
	showMaskOnHover: false
}).mask(InputTel);


// Прокрутка наверх страницы
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 100) {
			$('.button-up').addClass('scroll');
		} else {
			$('.button-up').removeClass('scroll');
		}
	});
	$('.button-up').click(function(){
		$('body,html').animate({
		scrollTop: 0
		}, 500);
		return false;
	});

}