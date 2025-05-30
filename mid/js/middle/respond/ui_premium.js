var mainPremium = {
    init: function(){
        
        var bestSlider = $('.pm_main .frame .owl-carousel');
        bestSlider.owlCarousel({
            loop:true,
            nav:true,
            dots:false,
            items: 1
        });
        
        mainPremium.teacherSlider();
        
        $(window).resize(function(){
            mainPremium.teacherSlider();    
        });
        
    },
    teacherSlider: function(){
        var teacherSlider = $('.teachers ul');
        if($(window).width() < 980){
            teacherSlider.addClass('owl-carousel');
            teacherSlider.owlCarousel({
                loop:false,
                nav:false,
                dots:true,
                autoHeight:true,
                responsive: {
                    768: {
                        items: 5
                    },
                    600: {
                        items: 4
                    },
                    480: {
                        items: 3
                    },
                    0: {
                        items: 2
                    }
                }
            });
        }
        else{
            teacherSlider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded owl-drag');
        }
            
    }
}

var asideMenu = {
    init: function(){
        $('#pm_menu > ul > li > a').on('click',function(e){
            if($(this).siblings('ul').size() > 0){
                e.preventDefault();
                if($(this).next('ul').is(':visible')){
                    $(this).next('ul').hide();
                    $(this).parent('li').removeClass('on');
                }
                else{
                    $('#pm_menu > ul > li > ul').hide();
                    $('#pm_menu > ul > li').removeClass('on');
                    $(this).next('ul').show();
                    $(this).parent('li').addClass('on');

                }
            }            
        });
        //181206 추가 시작
        $('#pm_menu_tablet .lnb > ul > li > a').on('click',function(e){
            if($(this).siblings('ul').size() > 0){
                e.preventDefault();
                if($(this).parent('li').hasClass('on')){
                    $(this).parent('li').removeClass('on');
                }
                else{
                    $('#pm_menu_tablet .lnb > ul > li').removeClass('on');
                    $(this).parent('li').addClass('on');

                }
            }            
        });
        setTimeout(function(){
            $('#pm_menu_tablet .owl-carousel li a').each(function(){
                $(this).parent('li').css('width',$(this).outerWidth() + 1);
            });
        },200);
        var lnbTabletSlider;
        setTimeout(function(){
            lnbTabletSlider = $('#pm_menu_tablet .owl-carousel').owlCarousel({
                loop:false,
                nav:false,
                dots:false,
                autoWidth:true,
                items: 1
            });
        },300);
        $(window).resize(function(){
            if(typeof(lnbTabletSlider) !== undefined && lnbTabletSlider != undefined){
                lnbTabletSlider.trigger('destroy.owl.carousel');
                $('#pm_menu_tablet .owl-carousel li').removeAttr('style');
                $('#pm_menu_tablet .owl-carousel li a').each(function(){
                    $(this).parent('li').css('width',$(this).outerWidth() + 1);
                });
                lnbTabletSlider = $('#pm_menu_tablet .owl-carousel').owlCarousel({
                    loop:false,
                    nav:false,
                    dots:false,
                    autoWidth:true,
                    items: 1
                });
            }
        });
    }
}

var tabs ={
    init: function(){
        $('.tabs a').on('click',function(e){
            e.preventDefault();
            target = $(this).attr('href');
            $(target).siblings('.tView').hide();
            $(target).show();
            $(this).parents('.tabs').find('li').removeClass('on');
            $(this).parent().addClass('on');
        });
    }
}

var quickSearch ={
    init: function(){
        $('.pm_quickSerach .category a').on('click',function(e){
            e.preventDefault();
            target = $(this).attr('href');
            $(target).siblings('.sArea').hide();
            $(target).show();
            $(this).parent().siblings().removeClass('on');
            $(this).parent().addClass('on');
        });
    }
}

var classSlider ={
    init: function(){
        var classSlider = $('.pm_tabs_class ul');        
        var size = $('.pm_tabs_class ul li').size(); //181119 추가
        if($(window).width() < 980 && size > 6){ //181119 추가
            classSlider.addClass('owl-carousel');
            classSlider.owlCarousel({
                loop:false,
                nav:false,
                dots:true,
                responsive: {
                    768: {
                        items: 7
                    },
                    360: {
                        items: 5
                    },
                    0: {
                        items: 3
                    }
                }
            });
        }
        else{
            classSlider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded owl-drag');
        }
		// 2022-03-30 추가
		if ($(".pm_tabs_class").hasClass("tabpm")){
			$(".pm_tabs_class.tabpm ul").trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded owl-drag');
		}
        $(window).resize(function(){
            if($(window).width() < 980 && size > 6){ //181119 추가
                classSlider.addClass('owl-carousel');
                classSlider.owlCarousel({
                    loop:false,
                    nav:false,
                    dots:true,
                    responsive: {
                        768: {
                            items: 7
                        },
                        360: {
                            items: 5
                        },
                        0: {
                            items: 3
                        }
                    }
                });                
            }
            else{
                classSlider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded owl-drag');
            }
			// 2022-03-30 추가
			if ($(".pm_tabs_class").hasClass("tabpm")){
				$(".pm_tabs_class.tabpm ul").trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded owl-drag');
			}
        });
        
        /* 181120 추가 시작 */
        $('.pm_tabs_class a').on('click',function(e){
            e.preventDefault();
            target = $(this).attr('href');
            $(this).parents('.pm_tabs_class').find('li').removeClass('on');
            $(this).parent().addClass('on');
            
            if(target != '#'){
                $(target).siblings('.tView').hide();
                $(target).show();
            }
        });
        /* 181120 추가 끝 */
    }
}

var lectureSearchSlider ={
	    init: function(){
	        var lectureSearchSlider = $('.pm_lectureSearch ul');
	        if($(window).width() < 980){
	            lectureSearchSlider.addClass('owl-carousel');
	            lectureSearchSlider.owlCarousel({
	                loop:false,
	                nav:false,
	                dots:true,
	                responsive: {
	                    768: {
	                        items: 7
	                    },
	                    767: {
	                        items: 6
	                    },
	                    400: {
	                        items: 5
	                    },
	                    340: {
	                        items: 4
	                    },
	                    0: {
	                        items: 3
	                    }
	                }
	            });
	        }
	        else{
	            lectureSearchSlider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded owl-drag');
	        }
	        $(window).resize(function(){
	            if($(window).width() < 980){
	                lectureSearchSlider.addClass('owl-carousel');
	                lectureSearchSlider.owlCarousel({
	                    loop:false,
	                    nav:false,
	                    dots:true,
	                    responsive: {
	                        768: {
	                            items: 7
	                        },
	                        767: {
	                            items: 6
	                        },
	                        400: {
	                            items: 5
	                        },
	                        340: {
	                            items: 4
	                        },
	                        0: {
	                            items: 3
	                        }
	                    }
	                });                
	            }
	            else{
	                lectureSearchSlider.trigger('destroy.owl.carousel').removeClass('owl-carousel owl-loaded owl-drag');
	            }
	        });
	    }
	}

var premiumSearch ={
    init: function(){
        $('.lectureSelect table th').on('click',function(){
            if($(window).width() < 768) {
                if($(this).siblings('td').is(':visible')){
                    $(this).removeClass('active');
                    $(this).siblings('td').hide();
                }else{
                    $(this).addClass('active');
                    $(this).siblings('td').show();
                }
            }
        });
        $(window).resize(function(){
            if($(window).width() > 767){
                $('.lectureSelect table th').removeClass('active');
                $('.lectureSelect table td').show();
            }
        });
    }
}

var layerPopup ={
    init: function(){
        $('[data-btn=layer]').on('click',function(e){
        	e.preventDefault();
        	$('body').append('<div class="pm_dim"></div>')
        	$('#ly_video .ly_head').children('p').html($(this).attr('data-title'));
        	
        	var type = $(this).attr('data-type');
        	
        	if('courseFeat' == type) {
        		getCourseFeatAjax($(this).attr('data-courseId'));
        	}
        	else {
        		premiumViewObject($(this).attr('data-courseId'), $(this).attr('data-type'));
        	}
            
            $($(this).attr('data-target')).show();
            
        });
        $('.pm_layer .close').on('click',function(e){
            e.preventDefault();
            $('#ly_video .ly_content .in_wrap').children('div').empty();
            $(this).closest('.pm_layer').hide(); 
            $('.pm_dim').remove();
        });
        $(window).resize(function(){
        });
    }
}

var detailTab ={
    init: function(){        
        $('.pm_tabs_view ul a').on('click',function(e){
            if($('.pm_tabs_view ul li.on').index() === 0 || $('.pm_tabs_view ul li.on').index() === 1){
                if($(this).text() === '강좌소개' || $(this).text() === '강의목록'){
                    e.preventDefault();

                    $('.pm_tabs_view ul a').each(function () {
                        $(this).parent().removeClass('on');
                    })
                    $(this).parent().addClass('on');

                    var target = $(this).attr('href');
                    $target = $(target);
                    $('html, body').scrollTop($target.offset().top-60);
                }
            }            
        });
    }
}

/* 181120 추가 시작 */
var subTop = {
    init: function(){
        if($('#pm_subtop .in').hasClass('owl-carousel')){
            var size = $('#pm_subtop .item').size();
            if(size > 1){
                var topSlider = $('#pm_subtop .owl-carousel');
                topSlider.owlCarousel({
                    loop:true,
                    nav:true,
                    items: 1,
        	        autoplay: true,
        	        autoplayTimeout: 2000,
        	        autoplayHoverPause: true
                });
            }     
        }
    }
}
/* 181120 추가 끝 */

$(document).ready(function() {
	if(location.href.indexOf("/premium/middle/index") > -1){
		mainPremium.init();
	}
	
	if(location.href.indexOf("/premium/nolnb/index") <= -1){
		asideMenu.init();
	}
    tabs.init();
    quickSearch.init();
    classSlider.init();
    lectureSearchSlider.init();
    premiumSearch.init();
    layerPopup.init();
    if(
		(location.href.indexOf("/premium/product/view") <= -1)
    	&& (location.href.indexOf("/premium/online/preView") <= -1)
    ){
    	detailTab.init();
    }
    subTop.init(); //181120 추가
    
    $('.sect_top .toggler').on('click',function(e){
        e.preventDefault();
        $(this).closest('.sect_top').toggleClass('on');
    });
});


/* 181120 추가 시작 */
function goPage(url) {
	document.location.href = url;
}

function selTab(pos) {
	$('#tab'+ preTab).removeClass("on");
	$('#tab'+ preTab +'menu').hide();

	$('#tab'+ pos).addClass("on");
	$('#tab'+ pos +'menu').show();

	preTab = pos;
}
/* 181120 추가 끝 */