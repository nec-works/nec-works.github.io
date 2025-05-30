$(document).ready(function(){

	// 검색 레이블 포커싱
	searchFocusLayer();
	// 추천강좌 리스트
	//recommandList();

	var $LayerPop = $('#customModal');
	var $otPop = $("#mylec_preview_layer_wrap"); // ot 맛보기 팝업
	var $assessmentPop = $('#assessment_layer_wrap'); // 진단평가 팝업
    var $itempoolPop = $('#itempool_layer'); // 평가결과 및 추천강좌 팝업
    var $profilePop = $('#profile_layer_wrap'); // 프로필 변경 팝업 2018-01-31 추가
	var $dim = $('#customFade');
	var $document = $('#document');

	//$document.css('background','#fff');
	//$otPop.css('display','none');
	// 내게 맞는 강좌 찾기 팝업
		
	$('.btn_find_mylec').live('click', function() {
		$("#DiagEvalArea").css("display","block");
		$LayerPop.addClass('on').css('display','block'); //2017-07-26 수정
		$('#document').addClass('modalScroll');
		/*
		$LayerPop.css({
			'z-index':'2520',
			'display':'block'
		});
		*/
		$dim.fadeIn(500);
		// 상단 탑이 있는 경우 없는 경우
		if($('.top_ad').css("display")=="none"){
			$dim.css('height',$('#document').height());
		}else{
			$dim.css('height',$('#document').height() + $('.top_ad').height());
		}
		$('body, html').animate({ scrollTop: 0 }, 300);
		if($LayerPop.height() > $('body, html').height()){
			$dim.css('height',$LayerPop.height()+'30px');
		}
		openWindowByMask()
		return false;
	});
	$LayerPop.find('.layer_close').live('click',function() {
    	$("#LIselected2Text, #LIselected2Text").html("");
        $("#LIselected2Text, #LIselected2Text").attr('style','display:none');
        
        $(".step2, .step3").hide();
        $(".step1, .select_subject_area").show();
       // $('.slick_layerPop_main').slick('unslick');
        
      	goLayer(0);
      	
      	
		$("#DiagEvalArea").css("display","none");
		$('#document').removeClass('modalScroll');
		$LayerPop.removeClass('on').css('display','none'); //2017-07-26 수정
		/*
		$LayerPop.css({
			'display':'none',
			'z-index':'-2520',
			'height':'0'
		});
		*/
		$assessmentPop .css('z-index','-2520');
		// $dim.fadeOut(500);
		closeWindowByMask()
		return false;
	});


	// ot 맛보기 팝업 - main
	$('.preview_ot_main').live('click',function() {
		$otPop.addClass('on').css('display','block');
	});
	
	// ot 맛보기 팝업
	$('.preview_ot, .open_view').live('click',function() {
		$otPop.css('display','block');
		$otPop.addClass('on');

		if( $(window).width() < 980){
			$('body').addClass('noscroll');
			$dim.css('z-index','2530');
			$otPop.css({
				'position':'fixed',
				'top':'50px'
				//,'z-index':'2530'
			});
			// mobile 터치 방지
			$("body").bind('touchmove', function(e){e.preventDefault()});
		}
		if($(window).width() > 980){
			$dim.css('z-index','2510');
			$otPop.css({
				'position':'absolute',
				'top':'0'
			   //,'z-index':'2530'
			});
			$('body, html').animate({ scrollTop: 400 }, 300);
		}
		return false;
	});
	$('.mylec_preview_layer a.preview_close').live('click',function() {
		$('body').removeClass('noscroll');
		$otPop.removeClass('on').css('display','none');
		$dim.css('z-index','2510');
		// mobile 터치 해제
		// $("body").unbind('touchmove'); 2017-07-26 삭제
		return false;
	});

	// 평가결과 및 추천강좌 팝업
	$LayerPop.find('.recommend').live('click',function() {
		$("#DiagRcoCourseArea").css("display","block");
		//recommandList();
		
		$assessmentPop.addClass('on').css({
			'z-index':'2800'
				,'display':'block'
			});

		if(980 < $(window).width() < 1100){
			$dim.css('z-index','2510');
		}

		if($(window).width()  < 980){
			$dim.css('z-index','2530');
			$('body, html').animate({ scrollTop: 0 }, 300);
		}else{
			$dim.css('z-index','2510');
			$('body, html').animate({ scrollTop: 400 }, 300);
			//console.log("pc")
		}
		return false;
	});
	$assessmentPop.find('.preview_close').live('click',function() {
		$("#DiagRcoCourseArea").css("display","none");
		var video = document.getElementById( 'DiagHTML5Player' );
		if(video != undefined){
			video.pause();
		}
		
		
		
		$assessmentPop.removeClass('on').css('display','none'); //2017-07-26 수정
		$dim.css('z-index','2510');
		return false;
	});

	// 진단평가 팝업
	$LayerPop.find('.btn_qSolve').click(function() {

		if($(window).width() > 979) { 
			$itempoolPop.css('display','none');
		}
		if($(window).width() < 979){
			$dim.css('z-index','2530');
			$itempoolPop.css('display','block'); //2017-07-26 수정
			// $itempoolPop.css({
			// 	'z-index':'2800',
			// 	'display':'block'
			// });
			$('body, html').animate({ scrollTop: 0 }, 300);
		}
		return false;
	});
	$itempoolPop.find('.itempool_close, .itempool_close_gray').click(function() {
		$dim.css('z-index','2510');
		$itempoolPop.css('display','none');
		return false;
	});
	
	// 2017-08-14 평가결과 및 추천강좌 롤링 추가
	$('.thum_list_weak .btn_prev, .thum_list_weak .btn_next').bind("click", function(){
		var totalLengt = $(this).parent().find('.list_weak2 li').length;
		if($(this).attr('class') == "btn_next"){
			$(this).parent().find('.list_weak2').append($(this).parent().find('.list_weak2 li').eq(0));
		}else{
			$(this).parent().find('.list_weak2').prepend($(this).parent().find('.list_weak2 li').eq(totalLengt-1));
		}
		return false;
	});
	
	$(".btn_reset").live("click", function(){
    	$("#LIselected2Text, #LIselected2Text").html("");
        $("#LIselected2Text, #LIselected2Text").attr('style','display:none');
        
        $(".step2, .step3").hide();
        $(".step1, .select_subject_area").show();
       // $('.slick_layerPop_main').slick('unslick');
        
      	goLayer(0);
        return false;
    });

    // 프로필 팝업 2018-01-31 추가
	$('.profile_we_open').live('click', function() {
		$profilePop.css('display','block');
		$profilePop.addClass('on');

		if( $(window).width() < 980){
			$dim.css('display','block');
			
			$profilePop.css({
				'position':'fixed'
			});
		}
		if($(window).width() > 980){
			$profilePop.css({
				'position':'fixed'
			});
		}
		return false;
	});
	$('.profile_we_close').live('click', function() {
		$profilePop.css('display','none');
		$profilePop.removeClass('on');
		return false;
	});

});


$(window).resize(function(){
	if($('#customModal').hasClass('on')){
		openWindowByMask();
	}
});

// dim open
function openWindowByMask(){
        //화면의 높이와 너비를 구한다.
        var maskHeight = $(document).height();  
        var maskWidth = $(window).width();  

        //마스크의 높이와 너비를 화면 것으로 만들어 전체 화면을 채운다.
        $('#layerMask').css({'width':maskWidth,'height':maskHeight});  

        //애니메이션 효과
        // $('#layerMask').fadeIn(1000);      
        $('#layerMask').fadeTo("slow",0.7);    
}

// dim close
function closeWindowByMask(){    
        $('#layerMask').hide();    
}

//강좌검색 검색영역 레이블
function searchFocusLayer(){
	$(".search_input .input_text").live('focusin',function(){
		$(this).prev("label").css("z-index","-1");
	}).live('focusout', function(){
		if(this.value == ''){
			$(this).prev("label").removeAttr("style");
		}
	});
}

// 추천강좌 리스트
/*
function recommandList(){
	if($.browser.version == 8.0 && $.browser.msie && $.browser.version == 7){
		 $('.slick_layerPop').slick({
		  dots: false,
		  infinite: true,
		  speed: 800,
		  slidesToShow: 2,
		  slidesToScroll: 2,
		  autoplay: false,
		  autoplaySpeed: 2000,
		  responsive: [
			{
			  breakpoint: 768,
			  settings: {
				 arrows: false,
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			}
		  ]
		});	
	}else{
		 $('.slick_layerPop').slick({
		  dots: false,
		  infinite: true,
		  speed: 800,
		  slidesToShow: 2,
		  slidesToScroll: 2,
		  autoplay: false,
		  autoplaySpeed: 2000
		});	
	}
}
*/