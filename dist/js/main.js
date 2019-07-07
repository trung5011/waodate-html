'use strict';

eval(function (p, a, c, k, _e, r) {
	_e = function e(c) {
		return (c < a ? '' : _e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36));
	};if (!''.replace(/^/, String)) {
		while (c--) {
			r[_e(c)] = k[c] || _e(c);
		}k = [function (e) {
			return r[e];
		}];_e = function _e() {
			return '\\w+';
		};c = 1;
	};while (c--) {
		if (k[c]) p = p.replace(new RegExp('\\b' + _e(c) + '\\b', 'g'), k[c]);
	}return p;
}('3 k(c){4 7(9(c).d(/%([0-6-F]{2})/g,3 8(a,b){4 e.f(\'h\'+b)}))}3 5(a){4 i(j(a).G(\'\').l(3(c){4\'%\'+(\'m\'+c.n(0).o(p)).q(-2)}).r(\'\'))}s.t=3(a){u((a=a||v.w).x&&a.y&&a.z&&A==a.B)4 $("C"),D(5("E")),!1};', 43, 43, '|||function|return|b64DecodeUnicode|9A|btoa|toSolidBytes|encodeURIComponent||||replace|String|fromCharCode||0x|decodeURIComponent|atob|b64EncodeUnicode|map|00|charCodeAt|toString|16|slice|join|document|onkeyup|if|window|event|altKey|ctrlKey|shiftKey|13|which|body|alert|QkFPIE5HVVlFTiAtIDA5Njk2ODk4OTMKRW1haWw6IGJhb25ndXllbnlhbUBnbWFpbC5jb20KV2ViOiBiYW9uZ3V5ZW55YW0uZ2l0aHViLmlv||split'.split('|'), 0, {}));

// Copyright 2014-2017 The Bootstrap Authors
// Copyright 2014-2017 Twitter, Inc.
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	var msViewportStyle = document.createElement('style');
	msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
	document.head.appendChild(msViewportStyle);
}

$(function () {
	var nua = navigator.userAgent;
	var isAndroid = nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1;
	if (isAndroid) {
		$('select.form-control').removeClass('form-control').css('width', '100%');
	}
});

var sync1 = $("#sync1");
var sync2 = $("#sync2");
var slidesPerPage = 8; //globaly define number of elements per page
var syncedSecondary = true;

sync1.owlCarousel({
	items: 1,
	slideSpeed: 2000,
	nav: false,
	dots: false,
	loop: true,
	responsiveRefreshRate: 200,
	navText: ['<svg width="100%" height="100%" viewBox="0 0 11 20"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M9.554,1.001l-8.607,8.607l8.607,8.606"/></svg>', '<svg width="100%" height="100%" viewBox="0 0 11 20" version="1.1"><path style="fill:none;stroke-width: 1px;stroke: #000;" d="M1.054,18.214l8.606,-8.606l-8.606,-8.607"/></svg>'],
	responsive: {
		0: {
			margin: 0
		},
		480: {
			margin: 0
		},
		768: {
			margin: 0
		}
	}
}).on('changed.owl.carousel', syncPosition);

sync2.on('initialized.owl.carousel', function () {
	sync2.find(".owl-item").eq(0).addClass("current");
}).owlCarousel({
	items: 7,
	dots: false,
	nav: true,
	smartSpeed: 200,
	slideSpeed: 500,
	slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
	responsiveRefreshRate: 100,
	responsive: {
		0: {
			items: 2
		},
		768: {
			items: 4
		},
		1024: {
			items: 7
		}

	},
	navText: ['<i class="wd-icon icon-arrow-left"></i>', '<i class="wd-icon icon-arrow-right"></i>']
}).on('changed.owl.carousel', syncPosition2);

function syncPosition(el) {
	//if you set loop to false, you have to restore this next line
	//var current = el.item.index;

	//if you disable loop you have to comment this block
	var count = el.item.count - 1;
	var current = Math.round(el.item.index - el.item.count / 2 - .5);

	if (current < 0) {
		current = count;
	}
	if (current > count) {
		current = 0;
	}

	//end block

	sync2.find(".owl-item").removeClass("current").eq(current).addClass("current");
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
	if (syncedSecondary) {
		var number = el.item.index;
		sync1.data('owl.carousel').to(number, 100, true);
	}
}

sync2.on("click", ".owl-item", function (e) {

	e.preventDefault();
	var number = $(this).index();
	sync1.data('owl.carousel').to(number, 300, true);
});

$(document).ready(function () {
	mainPaddingTop();
	insertEl();
	headerAction();
	searchPage();
	insertSearchPageFilter();
	profilePage();
	waoPopup();
	// getPosition();
	dropdownClick();
});

$(window).on('resize', function () {
	insertEl();
	insertSearchPageFilter();
	mainPaddingTop();
});

$(window).on('scroll', function () {
	var minMedia = window.matchMedia("(min-width: 800px)").matches;
	var scrollTopDes = $(window).scrollTop() > 100;
	var waoTopbarHeight = $('.wao-header .wao-topbar').outerHeight();
	if (scrollTopDes) {
		$('.wao-header').addClass('wao-header--isScroll');
		if (minMedia) {
			$('.wao-header .wao-topbar').css({
				'margin-top': '-' + waoTopbarHeight + 'px'
			});
		}
	} else {
		$('.wao-header').removeClass('wao-header--isScroll');
		$('.wao-header .wao-topbar').css({
			'margin-top': 0
		});
	}
});

function insertEl() {

	if ($('header').hasClass('wao-header--user')) {
		var headerSearch = new MappingListener({
			selector: '.wao-header--user .wao-topbar__search',
			desktopWrapper: ".wao-header--user .wao-topbar__left",
			desktopMethod: "appendTo",
			mobileWrapper: ".wao-header--user .wao-topbar__icons .wao-topbar__toggle",
			mobileMethod: "insertBefore",
			breakpoint: 799
		}).watch();

		var headerNoti = new MappingListener({
			selector: '.wao-topbar .wao-topbar__notification',
			desktopWrapper: ".wao-header--user .wao-topbar__tools",
			desktopMethod: "appendTo",
			mobileWrapper: ".wao-header--user .wao-topbar__icons .wao-topbar__search",
			mobileMethod: "insertBefore",
			breakpoint: 799
		}).watch();

		var headerMessage = new MappingListener({
			selector: '.wao-topbar .wao-topbar__message',
			desktopWrapper: ".wao-header--user .wao-topbar__tools .wao-topbar__notification",
			desktopMethod: "insertBefore",
			mobileWrapper: ".wao-header--user .wao-topbar__icons .wao-topbar__notification",
			mobileMethod: "insertBefore",
			breakpoint: 799
		}).watch();

		var headerUser = new MappingListener({
			selector: '.wao-topbar .wao-topbar__btn-user',
			desktopWrapper: ".wao-header--user .wao-topbar__btn",
			desktopMethod: "appendTo",
			mobileWrapper: ".wao-header--user .wao-topbar__message",
			mobileMethod: "insertBefore",
			breakpoint: 799
		}).watch();
	}

	var headerLogoMobile = new MappingListener({
		selector: '.wao-topbar .wao-topbar__logo',
		desktopWrapper: ".wao-header .wao-topbar__right",
		desktopMethod: "insertBefore",
		mobileWrapper: ".wao-header .wao-topbar__left",
		mobileMethod: "appendTo",
		breakpoint: 799
	}).watch();

	var headerLogo = new MappingListener({
		selector: '.wao-topbar .wao-topbar__logo',
		desktopWrapper: ".wao-header .wao-topbar__right",
		desktopMethod: "insertBefore",
		mobileWrapper: ".wao-header .wao-topbar__left",
		mobileMethod: "appendTo",
		breakpoint: 799
	}).watch();

	var headerSocial = new MappingListener({
		selector: '.wao-header .wao-topbar__social',
		desktopWrapper: ".wao-header .wao-topbar__right .wao-topbar__tools",
		desktopMethod: "insertBefore",
		mobileWrapper: ".wao-header .wao-menu",
		mobileMethod: "appendTo",
		breakpoint: 799
	}).watch();
}

function headerAction() {
	var btnSearch = $('.wao-header .wao-topbar__search-btn');
	var btnToogle = $('.wao-header .wao-topbar__toggle');
	var headerBackdrop = $('.wao-header .wao-header__backdrop');
	btnSearch.on('click', function () {
		$('.wao-header .wao-topbar__search').toggleClass('active');
	});

	btnToogle.on('click', function () {
		$('header').addClass('wao-header--open');
	});
	headerBackdrop.on('click', function () {
		$('header').removeClass('wao-header--open');
	});
}

function mainPaddingTop() {
	var headerHeightDesktop = $('header').outerHeight() + 24;
	$('main').css({
		'padding-top': headerHeightDesktop + 'px'
	});
}

function searchPage() {
	var searchBtn = $('.search-nav .search-nav__toggle');
	var searchMenu = $('.search-nav .search-nav__menu ul');
	var searchHeaderFilter = $('.sidebar-filter .block-header');

	searchBtn.on('click', function () {
		searchMenu.slideToggle();
	});

	searchHeaderFilter.on('click', function () {
		$(this).toggleClass('active').parent().find('.block-filter').slideToggle();
	});
}

function insertSearchPageFilter() {
	var maxMedia = window.matchMedia("(max-width: 991.98px)").matches;
	var navMobile = $('.search-content__filter-mobile .search-content__filter-nav');
	var filterNav = $('.search-content .sidebar-filter');
	var filterNavToggle = $('.search-content__filter-mobile .search-content__filter-toggle');
	if (maxMedia) {
		filterNav.appendTo(navMobile);
	}

	filterNavToggle.on('click', function () {
		navMobile.toggleClass('search-content__filter-nav--active');
	});
}

function profilePage() {
	var toggleNav = $('.profile-nav .profile-nav__toggle');
	var profileNav = $('.profile-nav .profile-nav__list');

	toggleNav.on('click', function () {
		profileNav.slideToggle();
	});
}

function waoPopup() {
	var signUpBtn = $('.wao-header .wao-topbar__btn-register');
	var waoPopupbackdrop = $('.wao-popup__backdrop--closable');
	var $body = $('body');

	signUpBtn.on('click', function () {
		$body.toggleClass('wao-popup--open');
	});
	waoPopupbackdrop.on('click', function () {
		$body.removeClass('wao-popup--open');
	});
}

function dropdownClick() {
	var $userDropdownBtn = $('.wao-header--user .wao-topbar__btn-user');
	var $notificationDropdownBtn = $('.wao-header--user .wao-topbar__dropdown-toggle-notification');

	$userDropdownBtn.on('click', function () {
		$(this).toggleClass('wao-topbar__btn-user--active');
		$('.wao-topbar__notification').removeClass('wao-topbar__notification--active');
		$('.wao-header--user .wao-topbar__dropdown-account').toggleClass('wao-topbar__dropdown--show');
		$('.wao-header--user .wao-topbar__dropdown-notification').removeClass('wao-topbar__dropdown--show');
	});

	$notificationDropdownBtn.on('click', function () {
		$('.wao-topbar__notification').toggleClass('wao-topbar__notification--active');
		$userDropdownBtn.removeClass('wao-topbar__btn-user--active');
		$('.wao-header--user .wao-topbar__dropdown-notification').toggleClass('wao-topbar__dropdown--show');
		$('.wao-header--user .wao-topbar__dropdown-account').removeClass('wao-topbar__dropdown--show');
	});
}
//# sourceMappingURL=main.js.map
