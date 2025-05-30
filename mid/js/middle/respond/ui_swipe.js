var mainCmmn = {
	size: {
		tablet: 979,
		mobile: 767,
		currentSize: function(){
			return $(window).width();
		}
	},
	funHotIdx: 0,
	funHot: function(){
		var that = this;
		var fnhtWrap = $("#Section_fnht");
		var fnhtTab = fnhtWrap.find(".JisikMenu").find(".tab");
		var fnhtScrn = fnhtWrap.find(".JisikWrap").children();
		var fnhtTabSize = fnhtTab.size();
		var random = Math.floor(Math.random() * fnhtTabSize);
		that.funHotIdx = random;
		fnhtTab.eq(random).addClass("on");
		fnhtScrn.eq(random).fadeIn('fast');
		fnhtWrap.addClass("jBg_0"+(random+1));
	},
	funHotEvnt: function(callback){
		var that = this;
		var fnhtWrap = $("#Section_fnht");
		var fnhtTab = fnhtWrap.find(".JisikMenu").find(".tab");
		var fnhtTabA = fnhtTab.find("a");
		var fnhtScrn = fnhtWrap.find(".JisikWrap").children();
		fnhtTabA.on('click', function(){
			var prevIdx = 0;
			for(var i = 0; i < fnhtTab.length; i++){
				if(fnhtTab.eq(i).hasClass("on"))
					prevIdx = i;
			}
			var idx = fnhtTabA.index(this);
			that.funHotIdx = idx;
			fnhtTab.removeClass("on");
			fnhtScrn.fadeOut(0);
			$(this).parent().addClass("on");
			fnhtScrn.eq(idx).fadeIn('fast');
			fnhtWrap.removeClass();
			fnhtWrap.addClass("jBg_0"+(idx+1));
			//fnhtWrap.addClass("lazyi");
			callback(prevIdx, idx);

		});
	},
	//스와이프 기능만 있는 영역 fun & hot 탭
	swipeSelector:[],
	swipeSlide: function(selector){
		var that = this;
		var size = that.size;
		var tablet = size.tablet;
		var mobile = size.mobile;

		if(selector.hasClass("JisikMenu")){
			var startPosition = that.funHotIdx;
			selector.owlCarousel({
				nav: false,
				startPosition: startPosition,
				responsive: {
					979: {
						items: 5
					},
					768: {
						items: 4
					},
					400: {
						items: 3
					},
					0: {
						items: 2
					}
				}
			});

		}else{
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
			$("#Section_fnht .JisikScrollWrap .JisikMenu")
		];
		if($(window).width() <= tablet && $(window).width() >= $("#Document").width()){
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
			}else{
				for(var i = 0; i < that.swipeSelector.length; i++)
					that.swipeSelector[i].trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
			}
		}).resize();

		that.funHotEvnt(function(prevIdx, idx){
			var autoMovieSlider = "";
			for(var i = 0; i < that.swipeSelector.length; i++){
				if(autoMovieSlider == ""){
					autoMovieSlider = that.swipeSelector[i];
				}
				else{
					break;
				}
			}
			if(prevIdx < idx)
				autoMovieSlider.trigger('next.owl.carousel');
			if(prevIdx > idx)
				autoMovieSlider.trigger('prev.owl.carousel');
		});
	},
	//메인에서 사용되는 비슷한 형태의 슬라이더
	basicSelector: [],
	basicSlide: function(selector){
		if(selector.hasClass("bookbox")){
			selector.owlCarousel({
				loop:true,
				nav:true,
				autoplay:true,			// 2022-11-01 추가
				autoplayTimeout:2000,	// 2022-11-01 추가
				responsive: {
					980: {
						items: 5
					},
					768: {
						items: 4
					},
					0: {
						items: 3
					}
				}
			});
		}else{
			selector.owlCarousel({
				loop:true,
				nav:true,
				responsive: {
					980: {
						items: 4
					},
					768: {
						items: 3
					},
					0: {
						items: 2
					}
				}
			});
		}
	},
	//2018-03-23 pc,모바일 사용되는 프로모션 슬라이드 수정
	promSlide: function(flag){
		var promo = $('.left_prom');
		if(flag){
			promo.owlCarousel({
				loop:true,
				autoplay:false,
				autoplayTimeout:4000,
				items:1,
				responsive: {
					980: {
						autoplay:true	
					}
				}
			});
		}else{
			promo.owlCarousel({
				loop:true,
				autoplay:false,
				autoplayTimeout:3000,
				items:1,
				responsive: {
					980: {
						autoplay:true	
					}
				}
			});
		}

		// ie8
		if($('html').hasClass('mob') && $(window).width() > 979){
			promo.owlCarousel({
				loop:true,
				autoplay:false,
				autoplayTimeout:4000,
				items:1,
				responsive: {
					980: {
						autoplay:true	
					}
				}
			});
		} else if($('html').hasClass('pc') && $(window).width() > 979){
			promo.owlCarousel({
				loop:true,
				autoplay:false,
				autoplayTimeout:4000,
				items:1,
				responsive: {
					980: {
						autoplay:true	
					}
				}
			});
		}

		/* 모바일만 사용되는 프로모션 슬라이드
		var promo = $('.left_prom');
		if(flag){
			promo.owlCarousel({
				loop:true,
				items:1
			});
		}else{
			promo.owlCarousel({
				loop:true,
				items:1
			});
		}

		// 2017-11-09 ie8 수정
		if($('html').hasClass('mob') && $(window).width() > 979){
			promo.owlCarousel({
				loop:true,
				items:1
			});
		} else if($('html').hasClass('pc') && $(window).width() > 979){
			promo.owlCarousel({
				loop:true,
				items:1
			});
		}*/

		// promo.owlCarousel({
		// 	loop:true,
		// 	items:1
		// });
		// if($('html').hasClass('pc') && $(window).width() > 979){
		// 	promo.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
		// }
	},
	slides: function(){
		var that = this;
		var size = that.size;
		var tablet = size.tablet;
		var mobile = size.mobile;
		that.basicSelector = [
			$('.bookebs .bookbox'),
			$('#Section_middle .Sect_cont .sect2_car'),
			$('#Section_premium .Sect_cont:first-child .sect2_car'),
			$('#Section_premium .Sect_cont:last-child .sect2_car'),
			$('#Section_event .sect2_car')
		];
		
		for(var i = 0; i < that.basicSelector.length; i++)
			that.basicSlide(that.basicSelector[i]);
	
		$(window).resize(function(){
			var size = $(window).width();
			if(size < tablet && size >= $("#Document").width())
				that.promSlide(true);
			else
				that.promSlide(false);
		}).resize();
	},
	init: function(){
		var that = this;
		var overFlag = false;

		//메인에 사용되는 컨텐츠 X버튼 쿠키
		$(".sect_close a").on('click', function(){
			var closeClss = $(this).parent();
			if(!closeClss.hasClass("on")){
				if($(this).parent().parent().parent().parent().parent().attr("id") == "Section_premium"){
					closeClss.addClass("on");
					closeClss.parent().addClass("Default");
					$(this).parent().parent().parent().parent().find(".ToggleW").slideUp();
					$(this).parent().parent().parent().parent().next().find(".ToggleW").slideUp();
				}else{
					closeClss.addClass("on");
					closeClss.parent().addClass("Default");
					closeClss.parent().parent().next(".ToggleW").slideUp();
				}
			}else{
				if($(this).parent().parent().parent().parent().parent().attr("id") == "Section_premium"){
					closeClss.removeClass("on");
					closeClss.parent().removeClass("Default");
					$(this).parent().parent().parent().parent().find(".ToggleW").slideDown();
					$(this).parent().parent().parent().parent().next().find(".ToggleW").slideDown();
				}else{
					closeClss.removeClass("on");
					closeClss.parent().removeClass("Default");
					closeClss.parent().parent().next(".ToggleW").slideDown();
				}
			}
			
			// cookie 처리 추가
			var _section = closeClss.parent().parent().parent().parent().attr( 'id' );
			var _status = ( closeClss.hasClass( 'on' ) ? 'closed' : 'opened' );
			$.cookie( _section, _status, { expires: 365} );
		}).on('mouseover', function(){
			if(!overFlag){
				$(this).after('<span class="tolltipWrap"> 닫고 열수 있어요 </span>');
				overFlag = true;
			}
		}).on('mouseout', function(){
			overFlag = false;
			$(this).next().remove(".tolltipWrap");
		});

		//쿠키
		var _sectionId = null;
				var _sectionStatus = null;
				$( 'div.lazyi' ).each( function() {
					_sectionId = $( this ).attr( 'id' );
					_sectionStatus = $.cookie( _sectionId );
					if ( typeof _sectionStatus !== 'undefined' && _sectionStatus !== null ) {
						if ( _sectionStatus === 'closed' ) {
							$( this ).find( '.sect_close' ).addClass( 'on' );
							$( this ).find( '.fixWrap' ).addClass( 'Default' );
							$( this ).find( '.ToggleW' ).slideUp(0);
						}
					}
				});

		// 2017-09-26 수정
		$(".board_box div a").on("click", function(){
			var size = $(window).width();
			var mobile = 767;
			
			if(size <= mobile){
				var tabBox = $(this).parent().parent(".board_box");
				$(".board_box").removeClass("on");
				tabBox.addClass("on");
			}
		});
		that.funHot();
		that.slides();
		that.swipe();
	}
}

//중학 강좌 메인
var curriculumMainTabSlider = {
	init:function(){
		var t = this;
		var seriesCont = $(".series_content");
		var challengeCont = $(".challenge_content .challenge_box");
		var recommendCont = $(".recommend_content .recommend_box");
		var seriesTab;
		var challengeTab;
		var recommendTab;

		seriesTab = this.seriesTab(function(){
			seriesCont.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
			seriesCont.owlCarousel({
				nav: false,
				loop: true,
				items: 1,
				lazyLoad: true
			});
		});
		challengeTab = this.challengeTab(function(){
			challengeCont.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
			challengeCont.owlCarousel({
				nav: false,
				loop: false,
				items: 1,
				// responsive:{
				// 	768: {
				// 		items: 2
				// 	},
				// 	0: {
				// 		items: 1
				// 	}
				// },
				dots:true,
				smartSpeed:10000,
				dotsSpeed:250,
				dragEndSpeed:250,
				lazyLoad:true
				// onTranslated:callBack
			});
		});

		recommendTab = this.recommendTab(function(){
			recommendCont.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
			recommendCont.owlCarousel({
				nav: false,
				loop: false,
				responsive:{
					768: {
						items: 3
					},
					0: {
						items: 2
					}
				},
				smartSpeed:10000,
				dotsSpeed:250,
				dragEndSpeed:250
			});
		});

		$(window).resize(function(){
			var width = $(window).width();
			if(width < 980 || $("html").hasClass("mob")){	// 2020-02-17
				seriesTab.destroy(true);
				challengeTab.destroy(true);
				recommendTab.destroy(true);

				seriesCont.owlCarousel({
					nav: false,
					loop: true,
					items: 1
				});
				challengeCont.owlCarousel({
					center:true,
					nav: false,
					loop: false,
					items: 1
					// onTranslated:callBack
					// responsive:{
					// 	768: {
					// 		items: 2
					// 	},
					// 	0: {
					// 		items: 1
					// 	}
					// },

				});
				recommendCont.owlCarousel({
					nav: false,
					loop: true,
					responsive:{
						1024: {
							items: 3
						},
						768: {
							items: 3
						},
						0: {
							items: 2
						}
					}
				});
				
				$(".challenge_wrap .tab_main_curriculum").owlCarousel({
					nav: false,
					responsive:{
						//2020-12-18
						768: {
							items: 4
						},
						500: {
							items: 3
						},
						0: {
							items: 2
						}
						//2020-12-18 수정끝
					}
					//stagePadding:10
				});

				$(".recommend_wrap .tab_main_curriculum").owlCarousel({
					nav: false,
					responsive:{
						768: {
							items: 5
						},
						500:{
							items:4
						},
						0: {
							items: 3
						}
					}
					//stagePadding:10
				});
			}else{
				seriesTab.destroy(false);
				challengeTab.destroy(false);
				recommendTab.destroy(true);
				seriesCont.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
				challengeCont.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
				recommendCont.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
				$(".tab_main_curriculum").trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
			}


			if($('html').hasClass('mob') && $(window).width() > 979){
				seriesCont.owlCarousel({
					nav: false,
					loop: true,
					items: 1
				});
				recommendCont.owlCarousel({
					nav: false,
					loop: false,
					responsive:{
						1024: {
							items: 3
						}
					}
				});
			}

		}).resize();
	},
	seriesTab: function(callback){
		var fadeSlide;
		var seriesSlider;
		var owlSelector = $(".series_content");
		fadeSlide = new TabFade({
			el: owlSelector,
			tabBox: $(".series_wrap .tab_main_curriculum"),
			tabActive: "on",
			clickCallback: function(){
				if($(window).width() < 980)
					return callback();
			}
		});
		return fadeSlide;
	},
	challengeTab: function(callback){
		var fadeSlide;
		var curriculumSlider;
		var owlSelector = $(".challenge_content");
		fadeSlide = new TabFade({
			el: owlSelector,
			tabBox: $(".challenge_wrap .tab_main_curriculum"),
			tabActive: "on",
			clickCallback: function(){
				if($(window).width() < 980)
					return callback();
			}
		});
		return fadeSlide;
	},
	recommendTab: function(callback){
		var fadeSlide;
		var curriculumSlider;
		var owlSelector = $(".recommend_content");
		fadeSlide = new TabFade({
			el: owlSelector,
			tabBox: $(".recommend_wrap .tab_main_curriculum"),
			tabActive: "on",
			clickCallback: function(){
				if($(window).width() < 980)
					return callback();
				else if($(window).width() >= 980 && $('html').hasClass('mob') )
					return callback();
			}
		});
		return fadeSlide;
	}
}

//강좌 시리즈, 학년별 보기등 사용
var curriculumMobileTab = {
	idx:0,
	tabEvnt: function(clss){
		var t = this;
		var priTab = $(".pri_m_tab_wrap .tab");
		var priTabA = $(".pri_m_tab_wrap .tab").find("a");
		priTabA.on("click", function(e){
			e.preventDefault ? e.preventDefault : returnValue = false;
			var idx = priTabA.index(this);
			t.idx = idx;

			var prevIdx3 = 0;
			for(var i = 0; i < priTabA.length; i++){
				if(priTabA.eq(i).parent(".tab").hasClass("on"))
					prevIdx3 = i;
			}

			if(prevIdx3 < idx)
				$(".pri_m_tab_wrap").trigger('next.owl.carousel');
			if(prevIdx3 > idx)
				$(".pri_m_tab_wrap").trigger('prev.owl.carousel');

			priTab.removeClass("on");
			priTab.eq(t.idx).addClass("on");
			clss.hide(0);
			clss.eq(t.idx).show(0);
		});
	},
	seriesBnrInit: function(){
		var t = this;
		var tabCont = $(".series_box");
		$(window).resize(function(){
			var width = $(window).width();
			if(width < 980 || $("html").hasClass("mob")){ // 2020-02-17
				tabCont.hide(0);
				tabCont.eq(t.idx).show(0);
				t.tabEvnt(tabCont);
				$(".pri_tab_basic").owlCarousel({
					nav: false,
					responsive:{
						768: {
							items: 5
						},
						500: {
							items: 4
						},
						0: {
							items: 3
						}
					},
					startPosition: t.idx
				});
			}else{
				tabCont.show(0);
				$(".pri_tab_basic").trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
			}
		}).resize();
	},
	// 2017-12-26 개발요청 삭제
	// seriesViewInit: function(){
	// 	var t = this;
	// 	var tabCont = $(".series_view_box");
	// 	$(window).resize(function(){
	// 		var width = $(window).width();
	// 		if(width < 980){
	// 			tabCont.hide(0);
	// 			tabCont.eq(t.idx).show(0);
	// 			t.tabEvnt(tabCont);
	// 		}else{
	// 			tabCont.show(0);
	// 		}
	// 	}).resize();
	// },
	yearSubjectInit: function(){
		var t = this;
		var tabCont = $(".year_subject_box");
		$(window).resize(function(){
			var width = $(window).width();
			if(width < 980){
				tabCont.hide(0);
				tabCont.eq(t.idx).show(0);
				t.tabEvnt(tabCont);
				$(".pri_tab_basic").owlCarousel({
					nav: false,
					responsive:{
						768: {
							items: 5
						},
						500: {
							items: 4
						},
						0: {
							items: 3
						}
					},
					startPosition: t.idx
				});
			}else{
				tabCont.show(0);
				$(".pri_tab_basic").trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded');
			}
		}).resize();
	}
}

//교재학습자료
var teachingCmmn = {
	init:function(){
		$('.bookbox').owlCarousel({
			loop:true,
			nav:true,
			autoplay:true,			// 2022-11-01 추가
			autoplayTimeout:2000,	// 2022-11-01 추가
			responsive: {
				980: {
					items: 5
				},
				768: {
					items: 4
				},
				0: {
					items: 3
				}
			}
		})
	}
	
}

