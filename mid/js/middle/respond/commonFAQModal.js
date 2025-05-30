var _returnUrl = "";
var _pleasureYn = "";
var _viewCount = "21";

// 레이어창 띄우기(faqtype - 한국사 : kor, 과학 : sci, 사회 : soc)
function faq_layer(faqtype) {
	$("."+faqtype+"_layer").css('display','block');
	
	// 학습Q&A탭 이외로 접속시 문구 제거.
	if(_returnUrl == null || _returnUrl == ""){
		$(".text_close").css("display","none");
	}
}

// 레이어창 닫기(faqtype - 한국사 : kor, 과학 : sci, 사회 : soc)
function faq_layer_close(faqtype) {
	// 중학 메인페이지는 FAQ 영역 삭제 처리.
	if(location.href.indexOf("/main/middle") > -1){
		$("."+faqtype+"_layer").remove();
	}else{
		$("."+faqtype+"_layer").css('display','none');
	}
	
	// 학습창일 경우 동영상 재생
	if(_pleasureYn == 'Y'){
		$(".mpv_play_button").trigger("click");
	}
	if(_returnUrl != null && _returnUrl !=""){
		location.href = _returnUrl; // 학습Q&A 탭으로 이동.
	}
}

// FAQ 레이어 팝업 생성.
function openFAQLayer(qnaBoardId, url, searchKeyword, pleasureYn, faqType) {
	_returnUrl = url; // 학습 Q&A탭 리턴 URL 셋팅.
	_pleasureYn = pleasureYn; // 학습창 여부 셋팅. 
	
	// 학습창일 경우 동영상 일시정지
	if(_pleasureYn == 'Y'){
		$(".mpv_pause_button").trigger("click");
	}
	
	$.ajax({
		type : 'POST',
		url : '/srch/list',
		
		data:{
				"boardId" : qnaBoardId,
				"query" : searchKeyword,
//				"collection" : "",
				"viewCount" : _viewCount,
				"pageNo" : "1",
				"faqType" : faqType,
				'beforeUrl' : location.href
		},
		dataType : 'html',
		async : true,
		success : function(obj){
			if(faqType == "korHistory"){
				$(".kor_layer_wr").html(obj);
				faq_layer("kor");
				// 검색창 포커스 처리
				$('#ladyer_input_kor').focus();
			}else if(faqType == "science"){
				$(".sci_layer_wr").html(obj);
				faq_layer("sci");
				// 검색창 포커스 처리
				$('#ladyer_input_sci').focus();
			}else if(faqType == "social"){
				$(".soc_layer_wr").html(obj);
				faq_layer("soc");
				// 검색창 포커스 처리
				$('#ladyer_input_soc').focus();
			}
		},
		error : function(request,status,error) {
			alert('오류가 발생하였습니다.');
		}
	});
}

// FAQ 레이어 팝업 검색.
function searchFAQLayer(faqType, tabNm, startIdx) {
	var searchKeyword = $("[name=searchKeywordFAQ]").val();
	var chkKeyword = searchKeyword.replace(/(\s*)/g, "");
	var viewCount = _viewCount;
	if(chkKeyword.length < 1){
		alert('검색어를 입력해 주세요.');
		return false;
	}
	
//	if(tabNm == "history_clip"){
//		viewCount = 21;
//	}
	
	$.ajax({
		type : 'POST',
		url : '/srch/list',
		
		data:{
				"query" : searchKeyword,
				"collection" : tabNm,
				"viewCount" : viewCount,
				"startIdx" : startIdx,
				"pageNo" : "1",
				"faqType" : faqType
		},
		dataType : 'html',
		async : true,
		success : function(obj){
			if(faqType == "korHistory"){
				$(".kor_layer_wr").html(obj);
				faq_layer("kor");
			}else if(faqType == "science"){
				$(".sci_layer_wr").html(obj);
				faq_layer("sci");
			}else if(faqType == "social"){
				$(".soc_layer_wr").html(obj);
				faq_layer("soc");
			}
		},
		error : function(request,status,error) {
			alert('오류가 발생하였습니다.');
		}
	});
}

// 즉문즉답 강의 학습이력 쌓기.
function insertDailyStudyTime(stepId, lectId, courseId, faqType){
	$.ajax( {
		type : 'POST',
		url : '/srch/insertDailyStudyTime',
		async : false,
		dataType : 'json',
		data : {"stepId":stepId,"lectureId":lectId,"courseId":courseId, "faqType":faqType},
		success :  function(data) {
			
		},
		error :function(data) {
			return ;
		}
	});
}

//과학 클립뱅크 강의 학습이력 쌓기.
function insertDailyStudyTimeClip(stepId, clipId, courseId, faqType){
	$.ajax( {
		type : 'POST',
		url : '/srch/insertDailyStudyTimeClip',
		async : false,
		dataType : 'json',
		data : {"stepId":stepId,"clipId":clipId,"courseId":courseId, "faqType":faqType},
		success :  function(data) {
			
		},
		error :function(data) {
			return ;
		}
	});
}

// FAQ 파업 창 생성 시 검색창으로 포커스 이동.
function setFocus(){
	if(!$('input[name="searchKeywordFAQ"]').val()){
		$('input[name="searchKeywordFAQ"]').focus();
		$('input[name="searchKeywordFAQ"]').blur();
	}
}

// 모달을 세팅 (강좌상세:container(중학), document(초등) / 학습창:bodyBoxW)
function settingFAQModal(position, faqType) {
	var premiumClass = "";
	// 중학과 프리미엄에서 같은 레이어팝업 페이지를 사용하여 CSS 구분을 위한 Class 추가를 위해서 프리미엄일 경우 특정 클래스 추가.
	if(position == 'premium'){
		position = "container";
		premiumClass = " premium_kor";
	}
	var modalPoopup ='';
	
	if(faqType == '' || faqType == undefined || faqType == 'korHistory'){
		modalPoopup = '<div id="faqModalPopup" class="kor_layer'+premiumClass+'" style="display:none"><div class="kor_layer_wr"></div><div class="dim"></div></div>';
	}else if(faqType == 'science'){
		modalPoopup = '<div id="faqModalPopup" class="sci_layer" style="display:none"><div class="sci_layer_wr"></div><div class="dim"></div></div>';
	}else if(faqType == 'social'){
		modalPoopup = '<div id="faqModalPopup" class="soc_layer" style="display:none"><div class="soc_layer_wr"></div><div class="dim"></div></div>';
	}
	
	$("#"+position).append(modalPoopup);
	
}