$(function() {
	//공통 환경 변수
	$.f_varBanner = {
	    defaults: {
			objCatgryBtn: null,	//분류버튼
	        objScr: null,   			// 스크린 영역
	        objBtn: null, 				// 버튼 영역
	        objInfo: null, 			// 목록 정보
	        objTimer: null, 			// 타이머
	        
	        isBtnAct: "mouseover",  // 버튼 작동방식 mouseover,click
	        isBtnType: "li", // 버튼 타입 img,li   
	        nBtnImgPath: "", // 버튼 이미지 경로
	        nBtnImgType: "none", // none : 동일 파일명, number : 파일명 + 숫자
	        
	        nScrLimitCnt: 999,  //노출 배너 제한 개수
	        nScrTotalCnt: 0,  //배너 전체 개수
	        nScrDivNm: "", //다중 div 구조에서 단일div 선택시
			nOrderCatgryNo: 999, // 현재 선택된 분류 (999면 랜덤)
	        nOrderNo: 999, // 현재 선택된 레이어 (999면 랜덤)
	        nOrderNoBtn: -1, // 버튼 선택시 레이어
			vNextCatgryCd: "",  //다음 분류 코드
	
	        nWidth: 0, // 배너 스크린 영역 폭
	        nHeight: 0, // 배너 스크린 영역 높이
	        nCount: 0, // 배너 스크린 영역에 속해있는 레이어의 수
			nCategryCount: 0, // 배너 분류 버튼의 수
	        isActType: "none",  // 배너 액션 타입 none,left,right,up,down,fade,page
	                
	        nStartUp: 0, // 스타트 시 첫 레이어의 FadeIn 속도
	        nDelay: 5000, // 딜레이
	        nSpeed: 0, // 액션시의 속도
	        nSpeedFade: 0, // 페이드 관련 액션에서 버튼 작동시 속도의 교정값 [되도록 고정]
	        isStartFade:"Y" // 스타트 FadeIn 효과 여부 [프로그램으로 스크린을 Display:block 처리할 경우 사용]
	    }
	};
	
	/* START 프리미엄 메인 프로모션 배너   */
    $.fn.jQBanner = function(defaults){
	    var config = $.extend({}, $.f_varBanner.defaults, defaults);

		config.objCatgryBtn = "#"+this.attr("id")+" .clsBannerCatgryBtn";
        config.objScr = "#"+this.attr("id")+" .clsBannerScreen";
        config.objBtn = "#"+this.attr("id")+" .clsBannerButton";
        
        jsBanInit(config);
        return this;
    };
    
    function jsBanInit(config) {
        var nPosFix;

        /* 배너 스크린 CSS 설정 */
        $(config.objScr).css({'position':'relative','height':config.nHeight+'px','width':config.nWidth+'px','overflow':'hidden'});
        
		/* 분류, 레이어 선택 */
		jsBanSelLayer(config);

        /* 액션 타입에 따른 초기 세팅 */
		$(config.objCatgryBtn+" li").each(function(){
			var thisCatgryCd = $(this).attr("catgryCd");
			$(config.objScr+" div[catgryCd="+thisCatgryCd+"]").each(function(i){
				if ($(this).attr("catgryCd")==config.vNextCatgryCd && config.nOrderNo==i) {
					nPosFix = 0;
					if (!(config.nOrderNo==i && config.isStartFade=="N")) {
						$(this).fadeIn(config.nStartUp);
					}
				} else {
					nPosFix = config.nWidth;
				}
				$(this).css({'position':'absolute','top':'0','left':nPosFix+'px'});
				$(this).attr("divno_"+thisCatgryCd,i);
			});
		});
       
		jsCatgryBtnBind(config);

		/* 버튼 바인드 */
		jsBanBtnBind(config);

		/* 스크린 pause 바인드 */
		jsScrPauseBind(config);

		/* 배너 타이머 등록 및 액션 시작!!!! */
		config.objTimer = setTimeout( function(){jsBanTimer(config);}, config.nDelay);
    };

	function jsBanSelLayer(config) {
		/* 첫 분류 버튼 선택 */
		var objCatgryBtnLi = $(config.objCatgryBtn+" li");

		config.nCategryCount = objCatgryBtnLi.length;
		config.nOrderCatgryNo = (config.nOrderCatgryNo==999) ? Math.floor(Math.random() * config.nCategryCount):config.nOrderCatgryNo;
		config.vNextCatgryCd = objCatgryBtnLi.eq(config.nOrderCatgryNo).attr("catgryCd");

		objCatgryBtnLi.each(function(i){
			var thisCatgryCd = $(this).attr("catgryCd");
			var thisCatgryImg = $(this).find("img");
			if (config.nOrderCatgryNo==i) {
				thisCatgryImg.attr("src", thisCatgryImg.attr("src").replace("_off","_on"));
			} else {
				thisCatgryImg.attr("src", thisCatgryImg.attr("src").replace("_on","_off"));
			}
			$(this).attr("btnno",i); 

			/* 버튼 순번 설정 */
	        $(config.objBtn+" "+config.isBtnType+"[catgryCd="+thisCatgryCd+"]").each(function(i){ 
				if ($(this).attr("catgryCd")==config.vNextCatgryCd) {
					$(this).css("display","block") ;
				}else{
					$(this).css("display","none") ;
				}
				$(this).attr("btnno",i); 
				$(this).css("cursor","hand") ;
			});
		});

        /* 첫 레이어 선택 */
		config.nCount = $(config.objScr+" div[catgryCd="+config.vNextCatgryCd+"]").length;
        config.nOrderNo = (config.nOrderNo==999) ? Math.floor(Math.random() * config.nCount):config.nOrderNo-1;
		$(config.objScr+" div").css({'left':config.nWidth+'px','display':'none'});
	}

	function jsCatgryBtnBind(config) {
		$(config.objCatgryBtn+" li").click(function(){
			var nImgNo = $(this).attr("btnno");
			clearTimeout(config.objTimer);
			config.nOrderNo = 999;
			config.nOrderCatgryNo = parseInt(nImgNo);
			jsBanSelLayer(config);
			jsBanTimer(config);
		});
	}

    /* 배너 타이머 */
    function jsBanTimer(config) {
        /* 버튼 액션 순번의 초기화 */
        config.nOrderNoBtn = -1;

        jsBanAction(config);
        config.objTimer = setTimeout( function(){jsBanTimer(config);}, config.nDelay);
    };

    /* 배너 액션 처리 */
    function jsBanAction(config) {
        var nSpeed = config.nSpeed;
        var nDivNoSel = config.nOrderNo;
        var nOrderNext = (config.nOrderNo+1)%(config.nCount);

        if (config.nOrderNoBtn >= 0) {
            config.nOrderNo = config.nOrderNoBtn;
            nOrderNext = config.nOrderNoBtn;
            nSpeed = (config.isActType=="fade" ||  config.isActType=="none") ? config.nSpeedFade : 0;
        } else {
            config.nOrderNo = ((config.nCount-1)==config.nOrderNo) ? nOrderNext : config.nOrderNo+1;
        }

        var nDivNoNext = nOrderNext;
		
		var objSelObj = $(config.objScr+" div[divno_"+config.vNextCatgryCd+"='"+nDivNoSel+"']");
        var objNextObj = $(config.objScr+" div[divno_"+config.vNextCatgryCd+"='"+nDivNoNext+"']");

        /* 액션에 의한 버튼 선택 */
        jsBanBtnRO(config,nOrderNext);

        /* 실제 스크린 레이어들의 동작 처리 */
		objSelObj.css({'left':config.nWidth+'px','display':'none'});
		objNextObj.css('left','0');
		objNextObj.fadeIn(nSpeed);

		/*배너 딜레이 */
		config.nDelay = parseInt(objNextObj.attr("delay"));
    }

    /* 스크린 pause 바인드 */
    function jsScrPauseBind(config) {
        /* 스크린에 대한 처리 */
        $(config.objScr).mouseover(function(){
            clearTimeout(config.objTimer);
        });
        $(config.objScr).mouseout(function(){
            if (config.isActType != "none" && config.isActType != "page") {
                config.objTimer = setTimeout( function(){jsBanTimer(config);}, config.nDelay);
            }
        });     
    }
    
    /* 버튼 바인드 */
    function jsBanBtnBind(config) {
        /* 초기 버튼 설정 */
		jsBanBtnRO(config,config.nOrderNo);
        
        /* 버튼에 대해 마우스 오버일 경우 처리 */
        if (config.isBtnAct=="mouseover") {
            $(config.objBtn+" "+config.isBtnType).mouseover(function(){
                var nImgNo = $(this).attr("btnno");
                clearTimeout(config.objTimer);
                config.nOrderNoBtn = parseInt(nImgNo);
                jsBanAction(config);
            });
            $(config.objBtn+" "+config.isBtnType).mouseout(function(){
				config.objTimer = setTimeout( function(){jsBanTimer(config);}, config.nDelay);
            });

        /* 버튼에 대해 클릭일 경우 처리 */
        } else if (config.isBtnAct=="click") {
            $(config.objBtn+" "+config.isBtnType).click(function(){
                var nImgNo = $(this).attr("btnno");
                clearTimeout(config.objTimer);

				config.nOrderNoBtn = parseInt(nImgNo);
                
                jsBanAction(config);

				config.objTimer = setTimeout( function(){jsBanTimer(config);}, config.nDelay);
                
            });
        }
    };

    /* 버튼 롤오버 처리 */
    function jsBanBtnRO (config,nSel) {
        if (config.isBtnType=="img") {
            $(config.objBtn+" img").each(function(i){
                if (nSel==i) {
                    $(this).attr("src",$(this).attr("oversrc"));
                } else {
                    $(this).attr("src",$(this).attr("outsrc"));
                }
            });
            
        } else if (config.isBtnType=="li") {
			$(config.objCatgryBtn+" li").each(function(){
				var thisCatgryCd = $(this).attr("catgryCd");
				$(config.objBtn+" li[catgryCd="+thisCatgryCd+"]").each(function(i){
					if ($(this).attr("catgryCd")==config.vNextCatgryCd && nSel==i) {
						$(this).attr("class",$(this).attr("overclass"));
					} else {
						$(this).attr("class",$(this).attr("outclass"));
					}
				});
			});            
        }
    }
    /* END 프리미엄 메인 프로모션 배너   */
    
    /* START 프리미엄 좌우 버튼 배너   */
    $.fn.jQArrowBanner = function(defaults){
	    var config = $.extend({}, $.f_varBanner.defaults, defaults);

        config.objScr = "#"+this.attr("id")+" .clsBannerScreen";
        config.objBtn = "#"+this.attr("id")+" .clsBannerButton";
        config.objInfo = "#"+this.attr("id")+" .clsBannerListInfo";
        
        jsArrowBanner(config);
        return this;
    };

    function jsArrowBanner(config) {
        var nPosFix;
        var nDisplayFix;

        $(config.objScr).css({'position':'relative','height':config.nHeight+'px','width':config.nWidth+'px','overflow':'hidden'}); /* 배너 스크린 CSS 설정 */
        if(config.nScrDivNm != ""){
        	config.nScrDivNm = "."+config.nScrDivNm;
        }
        config.nScrTotalCnt = $(config.objScr+" div"+config.nScrDivNm).length;
        config.nOrderNo = (config.nOrderNo==999) ? Math.floor(Math.random() * config.nScrTotalCnt):config.nOrderNo-1;
        
        $(config.objInfo).html("<span>"+(config.nOrderNo+1) +"</span>/"+config.nScrTotalCnt);
        
		$(config.objScr+" div"+config.nScrDivNm).each(function(i){
			if (config.nOrderNo==i) {
				nPosFix = 0;
				nDisplayFix = "block";
				if (!(config.nOrderNo==i && config.isStartFade=="N")) {
					$(this).fadeIn(config.nStartUp);
				}
			} else {
				nPosFix = config.nWidth;
				nDisplayFix = "none";
			}
			$(this).css({'position':'absolute','top':'0','left':nPosFix+'px','display':nDisplayFix});
			$(this).attr("divno_",i);
		});
		
		$(config.objBtn+" li").click(function(){
			var nDivNoSel = config.nOrderNo;
			var nDivNoNext = 0;
			
			if($(this).attr("class") == "preBtn"){
				nDivNoNext = (config.nOrderNo-1 < 0)?config.nScrTotalCnt-1:config.nOrderNo-1;
			}else{
				nDivNoNext = (config.nOrderNo+1 > config.nScrTotalCnt-1)?0:config.nOrderNo+1;
			}
			config.nOrderNo = nDivNoNext;
			var objSelObj = $(config.objScr+" div[divno_='"+nDivNoSel+"']");
	        var objNextObj = $(config.objScr+" div[divno_='"+nDivNoNext+"']");

			objSelObj.css({'left':config.nWidth+'px','display':'none'});
			objNextObj.css('left','0');
			objNextObj.fadeIn(config.nSpeed);
			
			$(config.objInfo).html("<span>"+(config.nOrderNo+1) +"</span>/"+config.nScrTotalCnt);
		});
    };
    /* END 프리미엄 좌우 버튼 배너   */
    
    /* START 프리미엄 버튼 배너   */
    $.fn.jQBtnBanner = function(defaults){
	    var config = $.extend({}, $.f_varBanner.defaults, defaults);

        config.objScr = "#"+this.attr("id")+" .clsBannerScreen";
        config.objBtn = "#"+this.attr("id")+" .clsBannerButton";
        
        jsBtnBanner(config);
        return this;
    };

    function jsBtnBanner(config) {
        var nPosFix;
        var v_nBtnImgPath = config.nBtnImgPath;

        $(config.objScr).css({'position':'relative','height':config.nHeight+'px','width':config.nWidth+'px','overflow':'hidden'}); /* 배너 스크린 CSS 설정 */
        config.nScrTotalCnt = $(config.objScr+" div").length;
        config.nOrderNo = (config.nOrderNo==999) ? Math.floor(Math.random() * config.nScrTotalCnt):config.nOrderNo-1;
        
		$(config.objScr+" div").each(function(i){
			if(i > (config.nScrLimitCnt-1)){
				return;
			}
			
			if (config.nOrderNo==i) {
				nPosFix = 0;
				if (!(config.nOrderNo==i && config.isStartFade=="N")) {
					$(this).fadeIn(config.nStartUp);
				}
			} else {
				nPosFix = config.nWidth;
			}
			
			// 이동 버튼타입 숫자시에
			if(config.nBtnImgType == "number"){
				v_nBtnImgPath = config.nBtnImgPath + (i+1);
			}
			
			$(this).css({'position':'absolute','top':'0','left':nPosFix+'px'});
			$(this).attr("divno_",i);
			
			var bannerBtnObj = document.createElement("img");
			if (config.nOrderNo==i) {
				$(bannerBtnObj).attr("src",v_nBtnImgPath+"_on.gif").attr("alt", i).attr("divno_",i);
			}else{
				$(bannerBtnObj).attr("src",v_nBtnImgPath+"_off.gif").attr("alt", i).attr("divno_",i);
			}
			$(bannerBtnObj).mouseenter(function(){
				$(this).attr("src",$(this).attr("src").replace("_off","_on"));
				$(this).siblings().each(function(){
					$(this).attr("src",$(this).attr("src").replace("_on","_off"));
				});
				
				var objSelObj = $(config.objScr+" div[divno_='"+$(this).attr("divno_")+"']");
				objSelObj.siblings().css({'left':config.nWidth+'px','display':'none'});
				objSelObj.css('left','0');
				objSelObj.fadeIn(config.nSpeed);
		        
			});
			
			$(config.objBtn).append(bannerBtnObj);
		});
    };
    /* END 프리미엄 버튼 배너   */
    
    /* START 공통 탭 이벤트 bind   */
    $.fn.jQCommonBannerTab = function(defaults){
	    var config = $.extend({}, $.f_varBanner.defaults, defaults);

        config.objBtn = "."+this.attr("id")+"_tabs li";
        config.objScr = "."+this.attr("id")+"_list";
        
        jsCommonBannerTab(config);
        return this;
    };

    function jsCommonBannerTab(config) {
    	$(config.objBtn).click(function(){
    		if(config.isBtnType == "img"){
    			var thisObj = $(this).find("img");
    			thisObj.attr("src",thisObj.attr("src").replace("_off","_on"));
    			
    			$(this).siblings().each(function(){
    				var v_thisObj = $(this).find("img");
    				v_thisObj.attr("src",v_thisObj.attr("src").replace("_on","_off"));
				});
    			
    			$(this).siblings().removeClass("selected");
        		$(this).addClass("selected");
        		
        	}else if (config.isBtnType == "li"){
        		$(this).siblings().removeClass("selected");
        		$(this).addClass("selected");
        	}
    		
    		$(config.objScr).css("display","none").eq($(this).index()).css("display","block");
    	});
    };
    /* END 공통 탭 이벤트 bind   */
    
    /* START 공감 강좌평 롤링   */
    $.fn.jQListRolling = function(defaults){
    	var config = $.extend({}, $.f_varBanner.defaults, defaults);
	    config.objScr = "#"+this.attr("id")+" .clsBannerScreen";
	    config.nScrTotalCnt = $(config.objScr+" div.course_flat_package_list").length;
	    
	    if(config.nScrTotalCnt > 1){
	    	jsListRolling(config);
	    }
        return this;
    };

  
    function jsListRolling(config) {
    	/* 배너 스크린 CSS 설정 */
    	 $(config.objScr).css({'position':'relative','height':config.nHeight+'px','width':config.nWidth+'px','overflow':'hidden'}); /* 배너 스크린 CSS 설정 */
         config.nOrderNo = (config.nOrderNo==999) ? Math.floor(Math.random() * config.nScrTotalCnt):config.nOrderNo-1;
         
         $(config.objScr+" div.course_flat_package_list").each(function(i){
             nPosFix = (config.nOrderNo==i)?0:config.nHeight;
             $(this).css({'position':'absolute','top':(-1*nPosFix)+'px','left':'0'});
             if (!(config.nOrderNo==i && config.isStartFade=="N")) {
                 $(this).fadeIn(config.nStartUp);
             }
             $(this).attr("divno",i);
         });
         
         jsListRollingScrPauseBind(config);
         config.objTimer = setTimeout( function(){jsListRollingTimer(config);}, config.nDelay);
    }
    
    function jsListRollingAction(config) {
//    	var nPageSel;
        var nSpeed = config.nSpeed;
        var nDivNoSel = config.nOrderNo;
        var nOrderNext = (config.nOrderNo+1)%(config.nScrTotalCnt);
        
        config.nOrderNo = ((config.nScrTotalCnt-1)==config.nOrderNo) ? nOrderNext : config.nOrderNo+1;
        
        var nDivNoNext = nOrderNext;

        var objSelObj = $(config.objScr+" div[divno='"+nDivNoSel+"']");
        var objNextObj = $(config.objScr+" div[divno='"+nDivNoNext+"']");
        
        objNextObj.css('top',config.nHeight+'px');
        objSelObj.animate({'top':(-1*config.nHeight)+'px'},nSpeed);
        objNextObj.animate({'top':'0'},nSpeed);
    }
    
    function jsListRollingScrPauseBind(config) {
        $(config.objScr).mouseover(function(){
            clearTimeout(config.objTimer);
        });
        $(config.objScr).mouseout(function(){
                config.objTimer = setTimeout( function(){jsListRollingTimer(config);}, config.nDelay);
        });     
    }
    
    function jsListRollingTimer(config) {
        config.nOrderNoBtn = -1;

        jsListRollingAction(config);
        config.objTimer = setTimeout( function(){jsListRollingTimer(config);}, config.nDelay);
    };
    /* END 공감 강좌평 롤링   */
});

//프리미엄 정보 forward (성적향상후기..)
function openPremiumInfo(objMngId, url, newWndwYn, objType) {
	var delegateUrl = "/premium/delegator?objMngId=" + objMngId + "&objType=" + objType + "&url=" + encodeURIComponent(url);

	if (newWndwYn != "Y") {
		location.href = delegateUrl;
	} else {
		window.open(delegateUrl, "_blank");
	}
}


// 프리미엄 강좌 호감도 평가하기
function slider (a_init, a_tpl) {

	this.f_setValue  = f_sliderSetValue;
	this.f_getPos    = f_sliderGetPos;
	
	// register in the global collection	
	if (!window.A_SLIDERS)
		window.A_SLIDERS = [];
	this.n_id = window.A_SLIDERS.length;
	window.A_SLIDERS[this.n_id] = this;

	// save config parameters in the slider object
	var s_key = null;
	if (a_tpl){
		for (s_key in a_tpl){
			this[s_key] = a_tpl[s_key];
		}
	}
	
	for (s_key in a_init){
		this[s_key] = a_init[s_key];
	}

	this.n_pix2value = this.n_pathLength / (this.n_maxValue - this.n_minValue);
	if (this.n_value == null)
		this.n_value = this.n_minValue;

	// generate the control's HTML
	document.write(
		'<div style="width:' + this.n_controlWidth + 'px;height:' + this.n_controlHeight + 'px;border:0; background-image:url(' + this.s_imgControl + ')" id="sl' + this.n_id + 'base">' +
		'<img src="' + this.s_imgSlider + '" width="' + this.n_sliderWidth + '" height="' + this.n_sliderHeight + '" border="0" style="position:relative;left:' + this.n_pathLeft + 'px;top:' + this.n_pathTop + 'px;z-index:' + this.n_zIndex + ';cursor:pointer;visibility:hidden;" name="sl' + this.n_id + 'slider" id="sl' + this.n_id + 'slider" onmousedown="return f_sliderMouseDown(' + this.n_id + ')"/></div>'
	);
	this.e_base   = get_element('sl' + this.n_id + 'base');
	this.e_slider = get_element('sl' + this.n_id + 'slider');
	
	// safely hook document/window events
	if (!window.f_savedMouseMove && document.onmousemove != f_sliderMouseMove) {
		window.f_savedMouseMove = document.onmousemove;
		document.onmousemove = f_sliderMouseMove;
	}
	if (!window.f_savedMouseUp && document.onmouseup != f_sliderMouseUp) {
		window.f_savedMouseUp = document.onmouseup;
		document.onmouseup = f_sliderMouseUp;
	}
	// preset to the value in the input box if available
	var e_input = this.s_form == null
		? get_element(this.s_name)
		: document.forms[this.s_form]
			? document.forms[this.s_form].elements[this.s_name]
			: null;
	this.f_setValue(e_input && e_input.value != '' ? e_input.value : null, 1);
	this.e_slider.style.visibility = 'visible';
}

function f_sliderSetValue (n_value, b_noInputCheck) {
	if (n_value == null)
		n_value = this.n_value == null ? this.n_minValue : this.n_value;
	if (isNaN(n_value))
		return false;
	// round to closest multiple if step is specified
	if (this.n_step)
		n_value = Math.round((n_value - this.n_minValue) / this.n_step) * this.n_step + this.n_minValue;
	// smooth out the result
	if (n_value % 1)
		n_value = Math.round(n_value * 1e5) / 1e5;

	if (n_value < this.n_minValue)
		n_value = this.n_minValue;
	if (n_value > this.n_maxValue)
		n_value = this.n_maxValue;

	this.n_value = n_value;

	// move the slider
	if (this.b_vertical)
		this.e_slider.style.top  = (this.n_pathTop + this.n_pathLength - Math.round((n_value - this.n_minValue) * this.n_pix2value)) + 'px';
	else
		this.e_slider.style.left = (this.n_pathLeft + Math.round((n_value - this.n_minValue) * this.n_pix2value)) + 'px';

	// save new value
	var e_input;
	if (this.s_form == null) {
		e_input = get_element(this.s_name);
		if (!e_input)
			return b_noInputCheck ? null : f_sliderError(this.n_id, "Can not find the input with ID='" + this.s_name + "'.");
	}
	else {
		var e_form = document.forms[this.s_form];
		if (!e_form)
			return b_noInputCheck ? null : f_sliderError(this.n_id, "Can not find the form with NAME='" + this.s_form + "'.");
		e_input = e_form.elements[this.s_name];
		if (!e_input)
			return b_noInputCheck ? null : f_sliderError(this.n_id, "Can not find the input with NAME='" + this.s_name + "'.");
	}
	e_input.value = n_value;
}

// get absolute position of the element in the document
function f_sliderGetPos (b_vertical, b_base) {
	var n_pos = 0,
		s_coord = (b_vertical ? 'Top' : 'Left');
	var o_elem = o_elem2 = b_base ? this.e_base : this.e_slider;
	
	while (o_elem) {
		n_pos += o_elem["offset" + s_coord];
		o_elem = o_elem.offsetParent;
	}
	o_elem = o_elem2;

	var n_offset;
	while (o_elem.tagName != "BODY") {
		n_offset = o_elem["scroll" + s_coord];
		if (n_offset)
			n_pos -= o_elem["scroll" + s_coord];
		o_elem = o_elem.parentNode;
	}
	return n_pos;
}

function f_sliderMouseDown (n_id) {
	window.n_activeSliderId = n_id;
	return false;
}

function f_sliderMouseUp (e_event, b_watching) {
	if (window.n_activeSliderId != null) {
		var o_slider = window.A_SLIDERS[window.n_activeSliderId];
		o_slider.f_setValue(o_slider.n_minValue + (o_slider.b_vertical
			? (o_slider.n_pathLength - parseInt(o_slider.e_slider.style.top) + o_slider.n_pathTop)
			: (parseInt(o_slider.e_slider.style.left) - o_slider.n_pathLeft)) / o_slider.n_pix2value);
		if (b_watching)	return;
		window.n_activeSliderId = null;
	}
	if (window.f_savedMouseUp)
		return window.f_savedMouseUp(e_event);
}

function f_sliderMouseMove (e_event) {

	if (!e_event && window.event) e_event = window.event;

	// save mouse coordinates
	if (e_event) {
		window.n_mouseX = e_event.clientX + f_scrollLeft();
		window.n_mouseY = e_event.clientY + f_scrollTop();
	}

	// check if in drag mode
	if (window.n_activeSliderId != null) {
		var o_slider = window.A_SLIDERS[window.n_activeSliderId];

//		var n_pxOffset;
		if (o_slider.b_vertical) {
			var n_sliderTop = window.n_mouseY - o_slider.n_sliderHeight / 2 - o_slider.f_getPos(1, 1) - 3;
			// limit the slider movement
			if (n_sliderTop < o_slider.n_pathTop)
				n_sliderTop = o_slider.n_pathTop;
			var n_pxMax = o_slider.n_pathTop + o_slider.n_pathLength;
			if (n_sliderTop > n_pxMax)
				n_sliderTop = n_pxMax;
			o_slider.e_slider.style.top = n_sliderTop + 'px';
			n_pxOffset = o_slider.n_pathLength - n_sliderTop + o_slider.n_pathTop;
		}
		else {
			var n_sliderLeft = window.n_mouseX - o_slider.n_sliderWidth / 2 - o_slider.f_getPos(0, 1) - 3;
			// limit the slider movement
			if (n_sliderLeft < o_slider.n_pathLeft)
				n_sliderLeft = o_slider.n_pathLeft;
			var n_pxMax = o_slider.n_pathLeft + o_slider.n_pathLength;
			if (n_sliderLeft > n_pxMax)
				n_sliderLeft = n_pxMax;
			o_slider.e_slider.style.left = n_sliderLeft + 'px';
			n_pxOffset = n_sliderLeft - o_slider.n_pathLeft;
		}
		if (o_slider.b_watch)
			 f_sliderMouseUp(e_event, 1);

		return false;
	}
	
	if (window.f_savedMouseMove)
		return window.f_savedMouseMove(e_event);
}

// get the scroller positions of the page
function f_scrollLeft() {
	return f_filterResults (
		window.pageXOffset ? window.pageXOffset : 0,
		document.documentElement ? document.documentElement.scrollLeft : 0,
		document.body ? document.body.scrollLeft : 0
	);
}
function f_scrollTop() {
	return f_filterResults (
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);
}
function f_filterResults(n_win, n_docel, n_body) {
	var n_result = n_win ? n_win : 0;
	if (n_docel && (!n_result || (n_result > n_docel)))
		n_result = n_docel;
	return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}

function f_sliderError (n_id, s_message) {
	alert("Slider #" + n_id + " Error:\n" + s_message);
	window.n_activeSliderId = null;
}

get_element = document.all ?
	function (s_id) { return document.all[s_id]; } :
	function (s_id) { return document.getElementById(s_id); };
	

//빈 문자열인지 검사 (빈칸만 포함하는 문자열도 빈 문자열로 간주)
function IsEmpty(data) { 
//	var length = 0;
	var trimdata = TrimAll(data); 

	if(trimdata.length == 0) return true; 
	else return false;
} 
	
// 강좌 호감도 빈 문자열인지 검사하여 빈 문자열일 경우 메세지(failMessage) 출력	
function checkEmpty(data, msg) {
	if(IsEmpty(data)) {
		alert(msg);
		return false;
	} else return true;
}

//############### 문자열 내의 모든 공백 문자 제거 ##################
function TrimAll(data) { 
	var lszTrim = data; 
//	var j = 0; 
	 
	for(var i = 0; i < data.length; i++) 
	{ 
		if(data.substring(i, i+1) == ' ') 
		{ 
			if(i > 0) 
				lszTrim = data.substring(0, i); 
			else 
				lszTrim = ""; 
 
			lszTrim = lszTrim + data.substring(i+1); 
 
			data = lszTrim; 

			i--;			 
		}
	} 
	
	for(var i = 0; i < data.length; i++) 
	{ 
		if(data.charCodeAt(i) == 12288) 
		{ 
			if(i > 0) 
				lszTrim = data.substring(0, i); 
			else 
				lszTrim = ""; 
 
			lszTrim = lszTrim + data.substring(i+1); 
 
			data = lszTrim; 

			i--;			 
		}
	} 
	return lszTrim; 
} 
