// 브라우저 체크
(function () {
	var thisBrowser = navigator.userAgent.toLowerCase();
	var html = $("html");

	// IE 클래스 추가
	if(thisBrowser.indexOf("msie") > -1 || thisBrowser.indexOf('trident') > -1) {

		if(thisBrowser.indexOf("msie 7") > -1) {
			html.addClass("ltIE9");
			html.addClass("ie7");
		}
		if(thisBrowser.indexOf("msie 8") > -1) {
			html.addClass("ltIE9");
			html.addClass("ie8");
		}
		if(thisBrowser.indexOf("msie 9") > -1) {
			html.addClass("gtIE9");
			html.addClass("ie9");
		}
		if(thisBrowser.indexOf("msie 10") > -1) {
			html.addClass("gtIE9");
			html.addClass("ie10");
		}
	} else {
		html.addClass("noIE");
	}

	// 모바일 클래스 추가
	if(
		thisBrowser.indexOf("ipod") > -1 ||
		thisBrowser.indexOf("iphone") > -1 ||
		thisBrowser.indexOf("ipad") > -1 ||
		thisBrowser.indexOf("android") > -1 ||
		thisBrowser.indexOf("windows phone") > -1
	) {
		html.addClass("mob");
	}
	else{
		html.addClass("pc");
	}
})();

//GNB
var navigation = {
	sub_gnb_height: [],
	max_height: 0,
	heightFlag: false,
	nav_add_timeout: function(){},
	gnb_timeout: function(){},
	init: function(callback){
		var that = this;
		var resizeFlag = false;
		$(window).resize(function(){
			if($(window).width() > 979)
				resizeFlag = true;
			else
				resizeFlag = false;
		}).resize();

		$(".gnb_list_box").on('mouseover', function(e){
			var subGnb;
			var maxHeight = that.max_height;
			var target = e.target;
			var idx = target.parentNode.getAttribute("data-idx");
			if(!resizeFlag)
				return;

			subGnb = $(".gnb_list .main").children(".sub");
			if(!that.heightFlag){
				subGnb.show(0);
				for(var i = 0; i < subGnb.length; i++)
					that.sub_gnb_height[i] = $(".gnb_list .main").eq(i).children(".sub").outerHeight();

				that.max_height = Math.max.apply(null, that.sub_gnb_height);
				maxHeight = that.max_height;
				subGnb.hide(0);
				that.heightFlag = true;
			}
			clearTimeout(that.nav_add_timeout);

			that.gnb_timeout = setTimeout(function(){
				subGnb.show(0);
			}, 350);
			subGnb.stop().animate({"height": "378px"}, 100, function(){  /* 2021-12-06 : 높이값 수정 */
				$(".nav_add").show(0);
			});
			// subGnb.show(0);
			// subGnb.stop().animate({"height": maxHeight}, 100, function(){
			// 	$(".nav_add").show(0);
			// });
			$(this).addClass("on");
			subGnb.parent().removeClass("hover");

			//data-idx를 찾지 못했을시 false(-1)으로 인한 조건문
			if(idx-1 > -1)
				subGnb.parent().eq(idx-1).addClass("hover");
		}).on('mouseout', function(){
			if(!resizeFlag)
				return;
			var subGnb = $(".gnb_list .main").children(".sub");
			clearTimeout(that.gnb_timeout);
			that.nav_add_timeout = setTimeout(function(){
				$(".nav_add").hide(0);
			}, 20);
			subGnb.stop().animate({"height": 0}, 100, function(){
				$(this).hide(0);
			});
			$(this).removeClass("on");
		});

		//왼쪽 상단 메뉴펼치기
		$("#Header").on('click touchenter', function(e){
			var mWrap = $(".nav_mobile_wrap");
			var mContainer = $(".nav_mobile_container");
			var clsArr = ["btn_mobile_nav_close", "nav_mobile_wrap", "btn_m_menu", "nav_mobile_container"];
			var clsCount = 0;
			for(var i = 0; i < clsArr.length; i++){
				if(e.target.getAttribute("class") != clsArr[i]){
					clsCount++;
				}else{
					clsCount = 0;
				}
			}
			if(clsCount == clsArr.length) return;

			if(mWrap.css("display") == "none"){
				mWrap.fadeIn('fast');
				mContainer.animate({"left": "0"}, 300);
				$("html").addClass("scr_block");
			}else{
				mWrap.fadeOut('fast');
				mContainer.animate({}, 300);
				mContainer.animate({"left": -320}, 300);
				$("html").removeClass("scr_block");
			}
		});

		//펼침메뉴 안에 카테고리 열고 닫기
		$(".nav_mobile_list dl dt a").on('click', function(e){
			e.preventDefault();
			var that = $(this);
			var ctgrMenu = that.parent().next();

			if(ctgrMenu.css("display") == "none"){
				ctgrMenu.slideDown('fast');
				that.removeClass("on");
			}else{
				ctgrMenu.slideUp('fast');
				that.addClass("on");
			}
		});

		//푸시알림
		$(".btn_m_mail").on('click', function(){
			if(callback.message){
				$("#user_message_wrap").addClass("on");
				$("html").addClass("scr_block");
			}
		});

		//로그인시 학습지수
		$(".btn_m_login, .btn_person").on('click', function(e){
			e.preventDefault();
			if(callback.login()){
				checkMyListTab();
				$("#user_learning_wrap").addClass("on");
				$("html").addClass("scr_block");
			}
		});
		//우측 푸시 알림 및 학습지수 닫기
		$(".btn_user_lect_close").on('click', function(){
			if($("html").hasClass("scr_block")){
				$(".user_lect_wrap").removeClass("on");
				$("html").removeClass("scr_block");
			}
		});

		//서브메뉴 레이어
		$(".btn_menu_layer").on('click', function(){
			var menuLayer = $(".menu_layer");
			if(menuLayer.css("display") == "none"){
				menuLayer.stop().slideDown('fast');
			}else{
				menuLayer.stop().slideUp('fast');
			}
		});
		// 2018-10-10추가 LNB 펼침메뉴 안에 카테고리 열고 닫기
		$(".menu_layer ul.main li .btn_sub").on('click', function(e){
			//e.preventDefault();
			var lnb_that = $(this);
			var lnb_ctgrMenu = $(this).siblings('ul.sub');

			if(lnb_ctgrMenu.css("display") == "none"){
				lnb_ctgrMenu.slideDown('fast');
				lnb_that.removeClass("on");
			}else{
				lnb_ctgrMenu.slideUp('fast');
				lnb_that.addClass("on");
			}
		});
	}
}
/*
	네비게이션 및 하단 서비스 영역 스와이프
*/
var commonSlider = {
	size: {
		tablet: 979,
		mobile: 767,
		currentSize: function(){
			return $(window).width();
		}
	},
	swipeSelector:[],
	swipeSlide: function(selector){
		var that = this;
		var size = that.size;
		var tablet = size.tablet;
		var mobile = size.mobile;
		var gnbPosition = that.mognbIdx;// 2018-07-11 추가

		if(selector.hasClass("gnb_list")){
			/* 2018-07-11 추가 */
			selector.on('initialized.owl.carousel', function(e){
				var mognbIdx = $('.main.on'),
					onTargetIdx = mognbIdx.attr('data-idx')-1;

				setTimeout(function(){
					selector.trigger('to.owl.carousel', [onTargetIdx, 0, true]);
				}, 1);

			});
			/* //2018-07-11 추가 끝 */
			if($('html').hasClass('mob')==true){
				//$('.gnb_list').children('.mhed').remove();
				selector.owlCarousel({
					nav:false,
					startPosition: gnbPosition,// 2018-07-11 추가
					responsive:{
						979: {
							items: 4
						},
						768: {
							items: 4
						},
						500:{
							items: 4
						},
						0: {
							items: 3
						}
					}
				});
			}else{
				//$('.gnb_list').children('.phed').remove();
				selector.owlCarousel({
					nav:false,
					startPosition: gnbPosition,// 2018-07-11 추가
					responsive:{
						979: {
							items: 6
						},
						768: {
							items: 5
						},
						500:{
							items: 4
						},
						0: {
							items: 3
						}
					}
				});
			}

		}else if(selector.hasClass("service_list")){
			selector.owlCarousel({
				nav:false,
				responsive: {
					979: {
						items: 7
					},
					768: {
						items: 6
					},
					650:{
						items: 5
					},
					400: {
						items: 4
					},
					0: {
						items: 3
					}
				}
			});
		}else if(selector.hasClass("JisikMenu")){
			if($('html').hasClass('mob')==true){
				selector.owlCarousel({
					nav:false,
					responsive: {
						979: {
							items: 5
						},
						768: {
							items: 4
						},
						400: {
							items: 4
						},
						0: {
							items: 3
						}
					}
				});
			}else{
				selector.owlCarousel({
					nav:false,
					responsive: {
						979: {
							items: 6
						},
						768: {
							items: 4
						},
						400: {
							items: 4
						},
						0: {
							items: 3
						}
					}
				});
			}
		}
		else{
			selector.owlCarousel({
				nav:false,
				autoWidth:true
			});
		}
	},
	swipe: function(){
		var that = this;
		var size = that.size;
		var tablet = size.tablet;
		var mobile = size.mobile;

		that.swipeSelector = [
			$('.gnb_list'),
			$('#Section_service .service_list'),
			$('#Section_fnht .JisikMenu')
		];
		if($(window).width() <= tablet && $(window).width() >= $("#Document").width()){
			for(var i = 0; i < that.swipeSelector.length; i++)
				that.swipeSlide(that.swipeSelector[i]);
		}else if($('html').hasClass('mob')==true && $(window).width() > mobile){
			for(var i = 0; i < that.swipeSelector.length; i++)
				that.swipeSlide(that.swipeSelector[i]);
		}else{
			for(var i = 0; i < that.swipeSelector.length; i++)
				that.swipeSelector[i].trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
		}

		$(window).resize(function(){
			var size = $(window).width();
			if(size <= tablet && size >= $("#Document").width()){
				for(var i = 0; i < that.swipeSelector.length; i++)
				that.swipeSlide(that.swipeSelector[i]);
			}else if($('html').hasClass('mob')==true && $(window).width() > mobile){
				for(var i = 0; i < that.swipeSelector.length; i++)
					that.swipeSlide(that.swipeSelector[i]);
			}else{
				for(var i = 0; i < that.swipeSelector.length; i++)
					that.swipeSelector[i].trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
			}
		}).resize();
	},
	init: function(){
		var that = this;
		that.swipe();
	}
}



//quick 소스
var quick = function(obj){
	this.obj = obj;
}
quick.prototype.top = function(){
	var quickBox = this.obj.selector.children();
	var height = quickBox.length > 0 ? quickBox.offset().top : 0;
	return height;
},
quick.prototype.scrTop = function(callback){
	// document.body.onscroll = function(){
	// 	callback();
	// }
	window.onscroll = function(){
		callback();
	}
}
quick.prototype.init = function(){
	var t = this;
	var height = t.top();
	var quickBox = t.obj.selector.children();

	t.scrTop(function(){
		var scrTop = document.documentElement.scrollTop;
		var stopH = $(document).height() - ($("#footer").height()+ 10 + $(".quick_box").outerHeight(true));
		var topH = stopH;
		if(height < scrTop){
			quickBox.css({"position": "fixed","top": "20px"});
		}else{
			quickBox.attr("style", "");
		}
		if(stopH < scrTop){
			quickBox.css({"position": "absolute","top": topH -311});
		}
	});

}

//footer
var footDropdown = {
	el: function(){
		return $(".footer_site");
	},
	init: function(){
		var that = this;
		if(that.el().length <= 0)
			return;
		that.bindEvents();
	},
	bindEvents: function(){
		var that = this;
		that.el().on('click' , '.site_wrap .btn_site', function(e){
			e.preventDefault();

			that.el().find('.site_wrap .site_box').stop().slideUp(200);
			$(this).next('.site_box').stop().slideDown(200);
		});

		that.el().on('click', '.site_wrap .btn_site_close', function(e){
			e.preventDefault();
			$(this).closest('.site_box').stop().slideUp(200);
			$(this).closest('.site_box').prev('.btn_site').focus();
		});
		$(document).off('click').on('click', function(e){
			if($(e.target).closest('.site_wrap').find('.site_box').size() == 0)
				that.el().find('.site_box').stop().slideUp(200);
		});
	}
}

/*
	탭 공백 컬럼 추가
	인자에 들어가는 값
	selector,
	기본 컬럼 개수,
	와이드 컬럼 개수,
	모바일 컬럼 개수
*/
var tabEmptyCount = {
	each: function(selector, columnSize, wideColumnSize, mobileColumnSize){
		var t = this;
		var winWidth = $(window).width();
		var tabBox = selector;
		var tabSize = selector.children("li").size();
		var fullSize = 0;
		var rowSize = 0;
		var listSize = columnSize;
		if(winWidth >= 1280)
			listSize = wideColumnSize;
		else if(winWidth < 980){
			listSize = mobileColumnSize;
		}

		for(var i = 0; i <tabSize; i++){
			if(tabBox.children().eq(i).children().size() == 1){
				fullSize++;
			}
			else{
				tabBox.children().eq(fullSize).remove();
			}
		}
		tabSize = fullSize;
		rowSize = Math.ceil(tabSize/listSize);
		for(var i = 0; i <tabSize; i++){
			if(tabSize < rowSize*listSize){
				tabSize++;
				tabBox.append("<li/>");
			}
		}
	},
	init: function(selector, columnSize, wideColumnSize, mobileColumnSize){
		var t = this;
		$(window).resize(function(){
			t.each(selector, columnSize, wideColumnSize, mobileColumnSize);
		}).resize();
	}
}
//구매강좌 학습일 지정 버튼 기능
var setStudyLayer = function() {

	var setStudy = $(".set_startday"),
		setStudyBtn = $(".setStdyPeriodBtn"),
		winWidth = $(window).width(),
		videoP = (($(window).height()) /2)-150;

	setStudyBtn.click(function(e){

		e.preventDefault();
		setStudy.show();
		setStudy.parent().append('<div class="dim"></div>');

		if(winWidth >= 980){
			setStudy.css({'position':'absolute','top':'0'})
		}else if(winWidth < 979){
			setStudy.css({
				'position':'fixed',
				'top': videoP + 'px'
			});
		}

		$(window).resize(function(){
			var setStudy = $(".set_startday"),
				winWidth = $(window).width(),
				videoP = (($(window).height()) /2)-150;

			if(winWidth >= 980){
				setStudy.css({'position':'absolute','top':'0'})
			}else if(winWidth < 979){
				setStudy.css({
					'position':'fixed',
					'top': videoP + 'px'
				});
			}
		});

		//학습방 전달값
		$( "form #courseId" ).val( $( this ).siblings( ".class_courseId" ).val() );
		$( "form #stepId" ).val( $( this ).siblings( ".class_stepId" ).val() );
		$( "form #enrolSno" ).val( $( this ).siblings( ".class_enrolSno" ).val() );

		//layer 강좌명
		$( "#set_startday" ).find( "#courseNmSpan" ).text( $( this ).siblings( ".courseNmSpan" ).val() );

		//layer 기간값
		var studyPeriodValue = $( this ).siblings( ".studyPeriodSpan" ).val();
		var reviewPeriodValue = $( this ).siblings( ".reviewPeriodSpan" ).val();
		$( "#set_startday" ).find( "#studyPeriodSpan" ).text( studyPeriodValue );
		$( "#set_startday" ).find( "#reviewPeriodSpan" ).text( reviewPeriodValue );
		$( "#set_startday" ).find( "#totalPeriodSpan" ).text( parseInt( studyPeriodValue ) + parseInt( reviewPeriodValue ) );

		//layer 날짜
		var now = new Date();
		var newday = new Date();
		newday.setDate( now.getDate() + parseInt( studyPeriodValue ) + parseInt( reviewPeriodValue ) );
		$( "#set_startday" ).find( "#startDate" ).text( now.getFullYear() + "년 " + ( now.getMonth() + 1 ) + "월 " + now.getDate() + "일" );
		$( "#set_startday" ).find( "#endDate" ).text( newday.getFullYear() + "년 " + ( newday.getMonth() + 1 ) + "월 " + newday.getDate() + "일" );

	});

	$(".btn_more, .btn_cancel").click(function(e){
		e.preventDefault();
		setStudy.hide();
		$(".dim").remove();
	});

}

// 공유하기 레이어
var showSnsBtn = function(){

	var btnSnsShare = $(".btn_sns_share");
	btnSnsShare.on('click', function(){
		showSnsBtn();
		return false;
	})

	function showSnsBtn() {
		var btn_wrap = $(".sns_share_new .wrap .btn_wrap");
		if (btn_wrap.css("display") == "none"){
			btn_wrap.show();
		}else{
			btn_wrap.hide();
		}
	}

}

// 강좌 설명 & 목표 진도 설정
function lectArrowFn(eq){
	$(".lect_arrow").hide();
	$(".lect_arrow").eq(eq).show();
}

/* 2022-04-04 모바일 메뉴 on 스크롤 이동 */
function NavOfs(){
	if( $(".gnb_list .main").hasClass("on") ){
		var ScrMov = $(".gnb_list .main.on").offset().left;
		$('.scr_wrap').scrollLeft(ScrMov - 30);
	}

}

/* 2022-04-13 */
$(function(){
	ScrMv();
	$(".scr_wrap").on("scroll",ScrMv);
});

/* 2022-04-04 모바일 메뉴 */
var MobNav = function(){
	if(!$("body").find("#Document").length){
		return false;
	}
	var slider = document.querySelector(".scr_wrap");
	var preventClick = function(e) {
	  e.preventDefault();
	  e.stopImmediatePropagation();
	};
	var isDown = false;
	var isDragged = false;
	var startX;
	var scrollLeft;

	slider.addEventListener("mousedown", function(e) {
	  isDown = true;
	  slider.classList.add("active");
	  startX = e.pageX - slider.offsetLeft;
	  scrollLeft = slider.scrollLeft;
	});
	slider.addEventListener("mouseleave", function(e) {
	  isDown = false;
	  slider.classList.remove("active");
	});
	slider.addEventListener("mouseup", function(e) {
	  isDown = false;
	  var elements = document.querySelectorAll("a");
	  if (isDragged) {
		for (var i = 0; i < elements.length; i++) {if (window.CP.shouldStopExecution(0)) break;
		  elements[i].addEventListener("click", preventClick);
		}window.CP.exitedLoop(0);
	  } else
	  {
		for (var i = 0; i < elements.length; i++) {if (window.CP.shouldStopExecution(1)) break;
		  elements[i].removeEventListener("click", preventClick);
		}window.CP.exitedLoop(1);
	  }
	  slider.classList.remove("active");
	  isDragged = false;
	});
	slider.addEventListener("mousemove", function(e) {
	  if (!isDown) return;
	  isDragged = true;
	  e.preventDefault();
	  var x = e.pageX - slider.offsetLeft;
	  var walk = (x - startX) * 2;
	  slider.scrollLeft = scrollLeft - walk;
	});
}

/* 2022-04-13 */
function ScrMv(){
	if(!$("body").find("#Document").length){
		return false;
	}
	if ( $(".gnb_list .main").offset().left >= 20 ){
		$(".prev_arrow").hide();
		$(".next_arrow").show();
	}else if ( Math.ceil($(this).scrollLeft() + $(this).width()) >= $(".gnb_list").width() ){
		$(".prev_arrow").show();
		$(".next_arrow").hide();
	}else {
		$(".prev_arrow").show();
		$(".next_arrow").show();
		return false;
	}
}

// LnbMenu 2022-11-14
function LnbMenu(){
	$(".lnb_menu .lnb_close").click(function(){
		if ( $(".lnb_menu").hasClass("on") ){
			$(".lnb_menu").removeClass("on");
			$(".lnb_menu").stop().animate({left:'0'});
			setTimeout(function(){
				$(".lnb_menu .lnb_close").removeClass("act");
			});
			setCookieLnbPage('lnbMenuCookie3', 'Y', 0);
		}else {
			$(".lnb_menu").addClass("on");
			$(".lnb_menu").stop().animate({left:'-165px'});
			$(".lnb_menu .lnb_close").addClass("act");
			setCookieLnbPage('lnbMenuCookie3', 'N', 1);
		}
	});
	$(".lnb_menu .grade_lecture").click(function(){
		if ( $(".lnb_menu .grade_lecture").parent("li").hasClass("on") ){
			//닫는 중
			setCookieLnbPage('lnbMenuCookie4', 'N', 1);
		} else {
			//여는 중
			setCookieLnbPage('lnbMenuCookie4', 'Y', 0);
		}
		$(".lnb_menu .grade_lecture").parent("li").toggleClass("on");
		$(".lnb_menu .grade_lecture").next("ul").stop().slideToggle();
	});
}
//쿠키 굽기 기능
function setCookieLnbPage( name, value, expiredays ){
	var todayDate = new Date();
	todayDate.setDate( todayDate.getDate() + expiredays );

	if (expiredays == 0) {
		document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";";
	} else {
		document.cookie = name + "=" + escape( value ) + "; path=/;";
	}


}
$(document).ready(function (){
	$(".btn_top").on("click", function(e){
		e.preventDefault();
		$("html, body").stop().animate({scrollTop: 0}, 100);
	});

	//퀵실행
	new quick({
		selector: $(".quick_wrap")
	}).init();

	//설정 열기
	$(".btn_setup").on('click', function(e){
		e.preventDefault ? e.preventDefault() : e.returnValue = false;
		$(".quick_setup_box").stop().fadeIn();
	});
	$(".btn_setup_close").on('click', function(e){
		$(".quick_setup_box").stop().fadeOut('fast');
	});

	// 2022-04-04 commonSlider.init();
	footDropdown.init();//하단 공통 영역

	setStudyLayer();//구매강좌 학습일 지정 버튼 기능
	showSnsBtn();// sns 공유하기
	rwdTabmenu ();// 강좌상세 tab

	NavOfs();// 2022-04-04 모바일 메뉴 스크롤 이동
	MobNav();// 2022-04-04 모바일 메뉴

	LnbMenu();// 2022-11-14 LnbMenu

	// 문제클립 선생님소개 레이어 토클처리 클릭 이벤트 등록
	$( ".info_table .link_teacher" ).bind( "click", function( e ) {
		$( this ).toggleClass( "on" );
		$( this ).next( ".teacher_layer" ).toggle();
		return false;
	} );

	// 강좌상세 tab
	function rwdTabmenu (){
		if(!$("html").hasClass("ltIE9")){
			var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				slidesPerView: "8",
				spaceBetween: 0,
				breakpoints: {
					980: {
						slidesPerView: 5
					}
				},
				onPaginationRendered: function(swiper){
					//리사이즈시 크기변경시 paging 변경 이용
					var index = $(".swiper-container .swiper-slide.on").index();
					swiper.slideTo(index);
				}
			});
		}
	}
	$(window).on('resize', function () {
		// only mobile action
		var wW = $(window).width();
		var slider = $(".swiper-slide");
	    if(wW>980){
			slider.addClass("swiper-no-swiping")
		}else{
			slider.removeClass("swiper-no-swiping")
		}
	}).resize();

	/* 2023-09-18 */
	$(".gnb_list_box .gnb_list li.clear").bind("mouseover",function (e) {
		$(this).addClass("sub_on");
	});
	$(".gnb_list_box .gnb_list li.clear").bind("mouseleave",function (e) {
		$(this).removeClass("sub_on");
	});

});

/* 2019-04-18 bottom 정보 추가 */
/*
	$(document).ready(function(e) {
		$(".txt_licensee .btn_licensee").click(function(){
			$(this).toggleClass("on");
			$(".footer_m_licensee").toggle();
		});

	});
*/

// 2024-04 [2차 추가개편] START
$(document).ready(function (){
	//검색 열기닫기
	$(".btn_search_open").click(function() {
		if ($(".layer_search_box").css("display") == "none") {
			$(".layer_search_box").css("display", "block");
			$(".dim_ly").css("display", "block");
			$(".layer_total_menu").css("display", "none");
			$(".lnb_menu").css("display", "none");
			$(".top_ad").css("z-index", "100003");
			$("#pc_header").css("z-index", "100003");
		} else {
			$(".layer_search_box").css("display", "none");
			$(".dim_ly").css("display", "none");
			$(".lnb_menu").css("display", "block");
			$(".top_ad").css("z-index", "0");
			$("#pc_header").css("z-index", "0");
		}
	});
	/* $(".btn_search_open").click(function() {
		$(".layer_search_box").css("display", "block");
		$(".dim_ly").css("display", "block");
		$(".layer_total_menu").css("display", "none");
		$(".lnb_menu").css("display", "none");
		$(".top_ad").css("z-index", "100003");
		$("#pc_header").css("z-index", "100003");
	}); */
	$(".btn_search_close").click(function() {
		$(".layer_search_box").css("display", "none");
		$(".dim_ly").css("display", "none");
		$(".lnb_menu").css("display", "block");
		$(".top_ad").css("z-index", "0");
		$("#pc_header").css("z-index", "0");
	});
	//전체메뉴 열기닫기
	$(".btn_total_menu_open").click(function() {
		$(".layer_total_menu").css("display", "block");
		$(".layer_search_box").css("display", "none");
		$(".dim_ly").css("display", "block");
		$(".lnb_menu").css("display", "none");
		$(".top_ad").css("z-index", "100003");
		$("#pc_header").css("z-index", "100003");
	});
	$(".btn_total_menu_close").click(function() {
		$(".layer_total_menu").css("display", "none");
		$(".dim_ly").css("display", "none");
		$(".lnb_menu").css("display", "block");
		$(".top_ad").css("z-index", "0");
		$("#pc_header").css("z-index", "0");
	});
	//사용자 메뉴로인한 z-index 제어
	$(".btn_person").click(function() {
		$(".layer_total_menu").css("display", "none");
		$(".layer_search_box").css("display", "none");
		$(".lnb_menu").css("display", "block");
		$(".dim_ly").css("display", "none");
		$(".top_ad").css("z-index", "0");
		$("#pc_header").css("z-index", "0");
	});

	/* 2025-03-20 추가 시작*/
	//dim 클릭시 메뉴닫기
	$('.dim_ly').click(function() {
		$('.layer_total_menu').css('display', 'none');
		$('.dim_ly').css('display', 'none');
		$('.lnb_menu').css('display', 'block');
		$('.top_ad').css('z-index', '0');
		$('#pc_header').css('z-index', '0');
	});

	//전체메뉴 닫는 액션들 실행할때에는 2뎁스 메뉴 접고 버튼 모두 + 로 변경 & defult_on	펼침 기능 추가
	$('.dim_ly , .btn_total_menu_close').click(function() {
		$('.menu_btn_spread').show();
		$('.menu_btn_fold').hide();
		$('.layer_total_list .list_cnt ul li > ul').css('display', 'none');

		var defaultMenu = $('.layer_total_list .list_cnt ul li > ul.defult_on');
        defaultMenu.show();

		if (defaultMenu.length) {
            defaultMenu.parent().find('.menu_btn_fold').show();
            defaultMenu.parent().find('.menu_btn_spread').hide();
        }
	});
	//2댑스 ul display block 일때 버튼 바꾸기
	$('.layer_total_list .list_cnt ul li > ul').each(function() {
		if ($(this).css('display') === 'block') {
			$(this).siblings('.menu_btn_fold').show(); // menu_btn_fold 보이기
			$(this).siblings('.menu_btn_spread').hide(); // menu_btn_spread 숨기기
		}
	});
	//2댑스 메뉴 펼침 접기 형태
	$('.menu_btn_spread').click(function() {
		$(this).closest('li').find('ul').css('display', 'block');
		$(this).hide();
		$(this).closest('li').find('.menu_btn_fold').show();
	});
	$('.menu_btn_fold').click(function() {
		$(this).closest('li').find('ul').css('display', 'none');
		$(this).hide();
		$(this).closest('li').find('.menu_btn_spread').show();
	});
	/* 2025-03-20 추가 끝*/

	//GNB SMALL 배너
    var header_swiper = $('.header_swiper .slide');
    header_swiper.owlCarousel({
        items: 1,
		loop: true,
        autoplay: true,
		autoplayTimeout: 3000,
        autoplaySpeed: 1000,
		animateOut: 'slideOutUp',
		animateIn: 'slideInUp',
        autoplayHoverPause: true,
        nav: true,
        dots: false,
		mouseDrag: false,
		touchDrag: false,
    });
});
// 2024-04 [2차 추가개편] END

