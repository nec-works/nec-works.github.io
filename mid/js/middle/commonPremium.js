/******************************************
 * 프리미엄 공통 스크립트
 ******************************************/

/*
 * 단일 상품 담기 / 바로신청
 */
function oneProductBasket(productId, bsktPchsYn){
    if(confirm("EBS 중학프리미엄 강좌는 프리패스 신청 후에 수강 가능합니다. \n 확인을 누르시면, 프리패스 신청 페이지로 연결됩니다.")){
        location.href = '/premium/freeFreePassApplication';
    }

    // 무료 프리패스 신청 기간 중 장바구니 기능 제어
/*	if(navigator.userAgent.toLowerCase().indexOf('android') > -1 && checkApp() ){
		alert('mid.ebs.co.kr의 중학프리미엄에서 신청하고,\n모바일 앱에서 편리하게 수강하시기 바랍니다.');
	} else {
		if(checkAuthenticatedUser()){
			var msg ="장바구니에 담으시겠습니까?";
			if(typeof bsktPchsYn == 'undefined') bsktPchsYn="";
			if(bsktPchsYn == 'Y'){
				msg ="바로 신청하시겠습니까?";
			}
			if(confirm(msg)){
				try {
					*//* 웹로그 수집 URL. 장바구니 담기 이벤트 발생 시 호출. *//*
					n_click_logging("/fakePath/premium/product/basket?productId="+productId);
				}
				catch(error) {console.error('webLog n_click_logging Error!!');}
				location.href = "/premium/product/basket/save?productId="+productId+"&bsktPchsYn="+bsktPchsYn;
			}
		}
	}*/
}



/*
 * HTML5 player 재생
 */
function premiumViewObject( courseId, type ) {
	$.ajax({
		url:'/premium/course/pop/getPlayerUrlAjax',
		type:'POST',
		dataType:'json',
		data: { courseId: courseId, playerType: type },
		success:function(data){
			initPlayer(data.fileUrl);
		},
		error:function(obj){
		}
	});
}

/*
 * HTML5 player 생성
 */	
function initPlayer( vodURL ) {	
	$('body').height( $( window ).height() );
	$('#ly_video .ly_content .in_wrap').children('div').empty();
	
	var playerCfg = {
		debugMode : false,
		continuerTime : 0,
		controllers : {
			timeSlider : true,
			prevButton : true,
			playButton : true,
			osdPlayButton : true,
			nextButton : true,
			stopButton : true,
			currentTime : true,
			durationTime : true,
			fullscreenButton : true,
			expandButton : false,
			playListButton : false,
			languageButton : false,
			subtitlesButton : false,
			bookmarkButton : false,
			volumeButton : true,
			volumeSlider : true,
			clear : false,
			backwardButton : false,
			currentSkip : false,
			forwardButton : false,
			speedDownButton : false,
			currentSpeed : false,
			speedUpButton : false,
			favoriteButton : false,
			repeatButton : false
		},
		domain : window.location.protocol + '//' + window.location.hostname,
		sources : [ {
			src : vodURL
		} ],
		volumeSliderType : 1,
		autoPlay : true,
		controllersAutoHide : true,
		useFlash : false,
		useThumb : false
	};

	window.createNewVersionMediaPlayer('#course_play_area', playerCfg);
}	

/*
 * 강좌 특징 반환
 */
function getCourseFeatAjax(courseId) {
	$.ajax({
		url:'/premium/getPremiumCourseFeatAjax',
		type:'POST',
		dataType:'text',
		data: { courseId: courseId },
		success:function(data){
			$('#ly_video .ly_content .in_wrap').children('div').empty();
			$('#ly_video .ly_content .in_wrap').children('div').append( data );
		},
		error:function(obj){
		}
	});
}

/**
* 목록에서 학습방 담기
*/
function saveProductCourseStudyOnList(productId, clsfnSystId) {
	var returnUrl = '/premium/product/view?productId='+productId+'&clsfnSystId='+clsfnSystId;
	if ( confirm( "학습방에 담으시겠습니까?" ) ) {
		location.href = '/premium/product/course/save?productId='+productId+'&returnUrl='+returnUrl;
	}
	else {
		return false;
	}
}
	
/*
	쿠폰 등록 하기 
	couponNo : 쿠폰번호 (문자열)
	추가로 설정해야할것 해당 레이어 팝업 클래스가 couponLayer가 추가 되어야 닫아짐 
*/
function addCoupon(couponNo){
	$.ajax({
		headers: {
			"Accept": "application/json"
		},
		type : 'POST',
		url : '/premium/saveCoupone', 
		data:{'couponNo': couponNo }, 
		async : false,
		dataType : 'json',
		error : function(request,status,error){
			/* alert("code : " + requedst.status + "\n messeage : " + request.responseText + "\n error : " + error); */ 
			console.log("에러");
		},
		success : function(obj) {
			if(null != obj && null != obj.msg && '' != obj.msg){
				if("notLogin" == obj.msg){
					if(confirm("로그인 후 이용하실 수 있습니다.")){
						LoginFocus();
						return false;
					}
				}else if ("couponeUsePeriod" == obj.msg ){
					alert("쿠폰 유효기간이 아닙니다.");
					return false;
				}else if ("registeredCoupon" == obj.msg ){
					alert("이미 등록된 쿠폰 입니다.");
					return false;
				}else if ("registeredCouponSno" == obj.msg ){
					alert("이미 발급한 쿠폰 입니다.");
					return false;
				}else if ("success" == obj.msg ){
					if(confirm("쿠폰 다운로드가 완료되었습니다. \r\n 쿠폰함으로 이동하시겠습니까?")){
						location.href="/mypage/common/couponList";
					}else{
						$(".couponLayer").hide();
					}
					return false;
				}else if ("notSaveCoupone" == obj.msg ){
					alert("해당 쿠폰에 등록할 요건이 안됩니다. 다시 확인해주세요");
					return false;
				}else{
					alert("에러가 났습니다. 담당자에게 문의 하여 주십시요");
				}
			}
		},
	});
}