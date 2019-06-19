
	var sync1 = $("#sync1");
	var sync2 = $("#sync2");
	var slidesPerPage = 8; //globaly define number of elements per page
	var syncedSecondary = true;
  
	sync1.owlCarousel({
	  items : 1,
	  slideSpeed : 2000,
	  nav:false,
	  dots: false,
	  loop: true,
	  responsiveRefreshRate : 200,
	  navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>','<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
	  responsive : {
		0 : {
			margin:0
		},
		480 : {
			margin:0
		},
		768 : {
			margin:0
		}
	}
	}).on('changed.owl.carousel', syncPosition);
  
	sync2
	  .on('initialized.owl.carousel', function () {
		sync2.find(".owl-item").eq(0).addClass("current");
	  })
	  .owlCarousel({
	  items : 7,
	  dots: false,
	  nav: true,
	  smartSpeed: 200,
	  slideSpeed : 500,
	  slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
	  responsiveRefreshRate : 100,
	  responsive : {
		0 : {
			items : 2,
		},
		768 : {
			items : 4,
		},
		1024 : {
			items : 7,
		},

		},
	  navText: ['<i class="wd-icon icon-arrow-left"></i>','<i class="wd-icon icon-arrow-right"></i>'],
	}).on('changed.owl.carousel', syncPosition2);
  
	function syncPosition(el) {
	  //if you set loop to false, you have to restore this next line
	  //var current = el.item.index;
	  
	  //if you disable loop you have to comment this block
	  var count = el.item.count-1;
	  var current = Math.round(el.item.index - (el.item.count/2) - .5);
	  
	  if(current < 0) {
		current = count;
	  }
	  if(current > count) {
		current = 0;
	  }
	  
	  //end block
  
	  sync2
		.find(".owl-item")
		.removeClass("current")
		.eq(current)
		.addClass("current");
	  var onscreen = sync2.find('.owl-item.active').length - 1;
	  var start = sync2.find('.owl-item.active').first().index();
	  var end = sync2.find('.owl-item.active').last().index();
	  
	  if (current > end) {
		sync2.data('owl.carousel').to(current, 100, true);
	  }
	  if (current < start) {
		sync2.data('owl.carousel').to(current - onscreen, 100, true);
	  }
	}
	
	function syncPosition2(el) {
	  if(syncedSecondary) {
		var number = el.item.index;
		sync1.data('owl.carousel').to(number, 100, true);
	  }
	}
	
	sync2.on("click", ".owl-item", function(e){

	  e.preventDefault();
	  var number = $(this).index();
	  sync1.data('owl.carousel').to(number, 300, true);
	});

	$(document).ready(function() {
		mainPaddingTop();
		insertEl();
		headerAction();
	})

	$(window).on('resize', function(){
		insertEl();
	});

	$(window).on('scroll', function() {
		if ($(window).scrollTop() > 100) {
			$('.wao-header').addClass('wao-header--isScroll');
		} else {
			$('.wao-header').removeClass('wao-header--isScroll');
		}
	});


	function insertEl() {
		let minMedia = window.matchMedia("(max-width: 767px)").matches;
		let headerLogo = $('.wao-topbar .wao-topbar__logo');
		let topbarLeft = $('.wao-topbar .wao-topbar__left');
		let topbarRight = $('.wao-topbar .wao-topbar__right');
		let waoNav = $('.wao-header .wao-menu')

		if (minMedia) {
			headerLogo.appendTo(topbarLeft);
			topbarRight.appendTo(waoNav);
		}
	}

	function headerAction() {
		let btnSearch = $('.wao-header .wao-topbar__search-btn');
		let btnToogle = $('.wao-header .wao-topbar__toggle')
		btnSearch.on('click', function(){
			$('.wao-header .wao-topbar__search').toggleClass('active');
		});

		btnToogle.on('click', function() {
			$('.wao-menu').slideToggle();
		});
	}

	function mainPaddingTop() {
		let minMedia = window.matchMedia("(min-width: 767px)").matches;
		let maxMedia = window.matchMedia("(max-width: 766.68px)").matches;


		

		if (minMedia) {
			let headerHeightDesktop = $('header').outerHeight() + 24;
			$('main').css({
				'padding-top': headerHeightDesktop + 'px'
			});
		} else if (maxMedia) {
			let headerHeightMobile = $('header').outerHeight();
			$('main').css({
				// 'padding-top': headerHeightMobile + 'px'
				'padding-top': 70 + 'px'
			});
		}
	}
