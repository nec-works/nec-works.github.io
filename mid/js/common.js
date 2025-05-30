function login() {
	/*setLocalLoginMode();*/
	if($("input[name='snsSite']").val().length >0 ){
		return true;
		
	}else{
		var checker = new FormChecker(document._login);
		checker.checkRequired('i', '아이디를 입력하세요.', true);
		checker.checkRequired('c', '비밀번호를 입력하세요.', true);
		
		if (checker.validate()) {
			var j_username = $("input[name=i]").val();
			j_username = $.trim(j_username);
			$("input[name=i]").val(j_username);
			document._login.submit();
			return false;
		} else {
			return false;
		}
	}
}

function logout() {
		// 일단 중학만.
		try{
			ebs_middle_player.requestFacebookLogout();
		}catch(error){
			
		}
	
	document._login.submit();
}

function shortUrlFn(snsType,site) {
	var shareUrl = window.snsContents.longUrl;
	//반응형 게시판
	var boardYn;
	if(snsType.indexOf('_board') > -1 ){
		//shareUrl = window.snsBoardContents.longUrl;
		snsType = snsType.replace('_board','');
		boardYn = "Y";
	}
	
	var snsTypeKorNm = "";
	
	switch(snsType){
		case "twitter" :
			snsTypeKorNm = "트위터로";
			break;
		case "facebook" :
			snsTypeKorNm = "페이스북으로";
			break;
		case "classting" :
			snsTypeKorNm = "클래스팅으로";
			break;
		case "kakao" :
			snsTypeKorNm = "카카오스토리로";
			break;
		case "band" :
			snsTypeKorNm = "밴드로";
			break;
		case "naver" :
			snsTypeKorNm = "네이버로";
			break;
	}
	
	if (confirm( snsTypeKorNm + " 공유하시겠습니까?" ) ){
		/* 
		 * URL 단축 API
		 * bitly API(https://app.bitly.com/)
		 * ID : gmkim6693
		 * token : 631e5771b000328db5157fd06740abd09663e8f1
		 * 
		 * ID : doremipa1102@sharemind.kr
		 * token : d4db4933922f2edef14d51d7e1d83af100f4347a
		 */
		var bit = {
			login:		'gmkim6693',
			apiKey:		'631e5771b000328db5157fd06740abd09663e8f1',
			history:	'0',
			longUrl:	shareUrl
		};
		
		fetch('https://api-ssl.bitly.com/v4/shorten', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer '+bit.apiKey,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "long_url" : bit.longUrl })
		})
		.then((response) => response.json())
		.then((data) => {
			sendSnsLink( data.link, snsType, site, boardYn );
		});
	}
}

function sendSnsLink( shortUrl, snsType, site, boardYn) {
	var metaTitle = $('meta[property="og:title"]').attr('content');
	if(typeof metaTitle != 'undefined' && metaTitle != null){
		snsContents.title = metaTitle;
	}
	var shareUrl = window.snsContents.longUrl;
	var title = window.snsContents.title;
	var desc = window.snsContents.desc;
	var image = window.snsContents.image;
	var twitterDesc = window.snsContents.twitter;
	//반응형 게시판
	if(boardYn){
		shareUrl = window.snsBoardContents.longUrl;
		title = window.snsBoardContents.title;
		desc = window.snsBoardContents.desc;
		image = window.snsBoardContents.image;
		twitterDesc = window.snsBoardContents.twitter;
	}
	
	if( snsType=="twitter" ) {
		openTwitter(shortUrl, twitterDesc);
	} else if (snsType=="facebook") {
		//shareFacebook(shareUrl, title, desc, image, site);
		openFacebook(shortUrl, title);
	} else if (snsType=="classting") {
		openPstClsTing(shortUrl, title, desc, image);
	} else if( snsType=="kakao" ) {
		shareKakao(shortUrl, title, desc, image, site);
	} else if( snsType=="band" ) {
		shareBand(shortUrl, title);
	} else if( snsType=="naver" ) {
		shareNaver(shortUrl, title);
	}
	
	//sns history
	if(snsType != "facebook"){
		snsClickFn(snsType,boardYn);
	}
}

function snsClickFn(snsType,boardYn){
	var pageId = window.snsContents.id;
	var winfo = window.snsContents.info;
	//반응형 게시판
	if(boardYn){
		pageId = window.snsBoardContents.id;
		winfo = window.snsBoardContents.info;
	}
	var info = "N";
	if(typeof winfo != 'undefined' && winfo != null){
		info = winfo;
	}
	// 초등 창의체험 문화유산 코리아 sns 이력 저장 제외.
	if(pageId != '' && pageId != null && pageId != 'CPG_culturekorea'){
		$.ajax({
			url : "/user/sns/saveAjax",
			dataType : "json",
			data:{'snsType': snsType,'pageId': pageId,'info': info},
			type : "post",
			async : false,
			success : function (data) {
				return false;
			},error:function(request,status,error){
				return false;
			}
		});
	}
}

function openTwitter(u, t) {
	var w = 500;
	var h = 320;
	var x = Math.floor((window.screen.availWidth-(w+12))/2);
	var y = Math.floor((window.screen.availHeight-(h+30))/2);
	var url = "http://twitter.com/share?count=none&lang=en&url=" + encodeURIComponent(u) + "&text=" + encodeURIComponent(t);
	window.open(url, "twitter", "width="+w+",height="+h+",status=yes,resizable=yes,scrollbars=yes,top="+y+",left="+x);
}

function openFacebook(u, t) {
	var w = 500;
	var h = 320;
	var x = Math.floor((window.screen.availWidth-(w+12))/2);
	var y = Math.floor((window.screen.availHeight-(h+30))/2);
	var url = "http://www.facebook.com/sharer.php?u=" + u + "&t=" + encodeURIComponent('"' + t + '"');
	window.open(url, "facebook", "width="+w+",height="+h+",status=yes,resizable=yes,scrollbars=yes,top="+y+",left="+x);
}

function shareFacebook(url, title, desc, image, site) {
	var appId = "";
	if(image == null && image ==""){
		fm = add_input(fm,'image','http://mid.ebs.co.kr/images/middle/com/facebook_ebs.jpg');
	}
	
	/*
	 * facebook API(https://developers.facebook.com)
	 * 계정ID : ebscs@naver.com
	 * 초등 APP ID : ebsPrimary(456595015015467)
	 * 중학 APP ID : ebsMid(776086566198087)
	 */
	
	if(site=="primary"){
		appId = '456595015015467';
	}else{
		appId = '776086566198087';
	}
	
	window.fbAsyncInit = function(){
		FB.init({
			appId:appId,
			status:true,
			xfbml:true,
			version:'v5.0'
		});
		$(function(){
			startFacebookShare(url, title, desc, image);
		});
	};
	(function(d,s,id){
		var js,fjs = d.getElementsByTagName(s)[0];
		if(d.getElementById(id)){
			startFacebookShare(url, title, desc, image);
		}
		js=d.createElement(s); js.id=id;
		js.src = "https://connect.facebook.net/ko_KR/sdk.js";
		fjs.parentNode.insertBefore(js,fjs);
	}(document,'script','facebook-jssdk'));
}

function startFacebookShare(url, title, desc, image){
	var obj = {method:'feed',display:'popup',link:url,picture:image,name:title,description:desc};
	function callback(response){
		if(response && !response.error_code){
			snsClickFn("facebook");
			alert("게시물이 등록되었습니다.");
		}
	}
	FB.ui(obj,callback);
}

function openPstClsTing(url, title, msg, image){
	var site = "";
	if(window.location.host.indexOf("primary.ebs.co.kr") != -1){
		site = "primary";
	}else{
		site = "middle";
	}
	
	var r_url = "";
	if(image != null && image != ""){
		r_url +="&image=" + image;
	}else{
		r_url +="&image=" + window.location.origin+"/images/"+site+"/sns/ebs_sns_img.jpg";
	}
	if(title != null && title != ""){
		r_url += "&title=" + encodeURIComponent(title);
	}else{
		r_url += "&title=" + encodeURIComponent("EBS") + (site == "primary" ? "초등" : "중학");
	}
	if(msg != null && msg != ""){
		r_url += "&text=" + encodeURIComponent(msg);
	}else{
		r_url += "&text=" + encodeURIComponent("EBS") + (site == "primary" ? "초등" : "중학");
	}
	if(url != null && url != ""){
		r_url += "&url=" + url;
	}else{
		r_url += "&url=" + window.location.href;
	}
	var w = 800;
	var h = 600;
	var x = Math.floor((window.screen.availWidth-(w+12))/2);
	var y = Math.floor((window.screen.availHeight-(h+30))/2);
	var href = "http://www.classting.com/classting/4_Share.php?source=share_type1"+r_url;
	window.open(href, 'classTing', 'width='+w+', height='+h+',resizable=yes,scrollbars=yes,top='+y+',left='+x);
}

function shareKakao(url, title, desc, image, site) {
	if(image == null && image ==""){
		fm = add_input(fm,'image','http://mid.ebs.co.kr/images/middle/com/facebook_ebs.jpg');
	}
	var appId = "";
	if(site=="primary"){
		appId = '2ff375e75d29c063cf90ad869d775792';
	}else{
		appId = 'b2f39f434a3c5622131f4d76f6a87e09';
	}
	window.kakaoAsyncInit = function(){
		Kakao.init(appId);
		$(function(){
			startKakaoShare(url, title);
		});
	};
	(function(d,s,id){
		var js,fjs = d.getElementsByTagName(s)[0];
		if(d.getElementById(id)){
			startKakaoShare(url, title);
		}
		js=d.createElement(s); js.id=id;
		js.src = "/js/sdk/kakao.story.min.js";
		fjs.parentNode.insertBefore(js,fjs);
	}(document,'script','kakao-js-sdk'));
}

function startKakaoShare(url, title){
	Kakao.Story.share({
		url: url
	});
}

function shareBand(url, title) {
	var w = 410;
	var h = 540;
	var x = Math.floor((window.screen.availWidth-(w+12))/2);
	var y = Math.floor((window.screen.availHeight-(h+30))/2);
	var sendUrl = "http://www.band.us/plugin/share?body="+encodeURIComponent(title)+ encodeURIComponent("\n") + encodeURIComponent(url);
	window.open(sendUrl, "band", "width="+w+",height="+h+",status=yes,resizable=yes,scrollbars=yes,top="+y+",left="+x);
}

function shareNaver(url, title) {
	var w = 600;
	var h = 600;
	var sendUrl = "http://share.naver.com/web/shareView.nhn?url="+encodeURIComponent(url)+"&title="+encodeURIComponent(title);
	window.open(sendUrl, '', "resizable=no,status=no,location=no,toolbar=no,menubar=no,fullscreen=no,scrollbars=no,dependent=no,width="+w+",height="+h);
}

function mobShortUrlFn(type,site) {
	
	var typeKorNm = "";
	switch(type){
		case "kakaotalk" :
			typeKorNm = "카카오톡으로";
			break;
		case "twitter" :
			typeKorNm = "트위터로";
			break;
		case "facebook" :
			typeKorNm = "페이스북으로";
			break;
		case "classting" :
			typeKorNm = "클래스팅으로";
			break;
		case "kakaoStory" :
			typeKorNm = "카카오스토리로";
			break;
		case "band" :
			typeKorNm = "밴드로";
			break;
		case "naver" :
			typeKorNm = "네이버로";
			break;
	}
	
	if (confirm( typeKorNm + " 공유하시겠습니까?" ) ){
		/* 
		 * URL 단축 API
		 * bitly API(https://app.bitly.com/)
		 * ID : gmkim6693
		 * token : 631e5771b000328db5157fd06740abd09663e8f1
		 * ID : doremipa1102@sharemind.kr
		 * token : d4db4933922f2edef14d51d7e1d83af100f4347a
		 */
		cUrl = document.URL;
	 	var bit = {
			login:		'gmkim6693',
			apiKey:		'631e5771b000328db5157fd06740abd09663e8f1',  //apikey
			history:	'0',
			longUrl:	cUrl
		};
		
		fetch('https://api-ssl.bitly.com/v4/shorten', {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer '+bit.apiKey,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ "long_url" : bit.longUrl })
		})
		.then((response) => response.json())
		.then((data) => {
			var shorUrl = data.link; //bitly shortUrl
			if(type=='twitter'){
				doTwit(shorUrl);
			}else if( type == "facebook"){
				doFace(shorUrl);
			}else if( type == "kakaotalk"){
				doKakaotalk(shorUrl,site);
			}else if( type == "kakaoStory"){
				doKakaoStory(shorUrl);
			}else if( type == "band"){
				doBand(shorUrl);
			}else if( type == "naver"){
				doNaver(shorUrl);
			}else if( type == "classting"){
				openPstClsTing(shorUrl, "","","");
			}
		});
	}
}

function doTwit(shorUrl){
	var w = 500;
	var h = 320;
	var x = Math.floor((window.screen.availWidth-(w+12))/2);
	var y = Math.floor((window.screen.availHeight-(h+30))/2);
	var url = "http://twitter.com/share?count=none&lang=en&url=" + shorUrl + "&text=" + encodeURIComponent('"' + document.title + '"');
	location.href = url;
}

function doFace(shorUrl){
	var url = "http://www.facebook.com/sharer.php?u=" + shorUrl + "&t=" + encodeURIComponent('"' + document.title + '"');
	location.href = url;
}
	
function doKakaotalk(shorUrl,site){
	var nm = '초등';
	var thumbImg = $('meta[property="og:image"]').attr('content'); //og이미지 주소
	var siteUrl = 'primary.ebs.co.kr';
	var image = "https://cbox.ebs.co.kr/portal/event/2016/10/28/share_primid_logo.png";
	if(null != site && site == 'middle'){
		image = "https://cbox.ebs.co.kr/portal/event/2016/10/28/share_ebs.logo.png";
		nm = '중학';
		siteUrl = 'mid.ebs.co.kr';
	}
	var initKey = '2ff375e75d29c063cf90ad869d775792';
	
	if(null != site && 'middle' == site){
		initKey = 'b2f39f434a3c5622131f4d76f6a87e09';
	}
	
	if(null != thumbImg && '' != thumbImg){
		image = thumbImg;
	}
	
	var title = "EBS "+nm+"\n";
	var thumbTitle = $('meta[property="og:title"]').attr('content'); //og타이틀
	if(null != thumbTitle && '' != thumbTitle){
		title = thumbTitle;
	}
	var description = "";
	var thumbDesc = $('meta[property="og:description"]').attr('content'); //og설
	if(null != thumbDesc && '' != thumbDesc){
		description = thumbDesc
	} 
	
	Kakao.init(initKey);
	Kakao.Link.sendDefault({
		objectType: 'feed',
		content: {
			title: title,
			description: description,
			imageUrl: image,
			link: {
				mobileWebUrl: cUrl,
				webUrl: cUrl
			}
		},
		success : function (obj) {
			Kakao.cleanup();
		},
		fail : function (e) {
			console.error(e);
		} 
	});
	
}

function doKakaoStory(shorUrl){
	var image = "";
	var site = "mid";
	if(image == null && image ==""){
		fm = add_input(fm,'image','http://mid.ebs.co.kr/images/middle/com/facebook_ebs.jpg');
	}
	var appId = "";
	if(site=="primary"){
		appId = '2ff375e75d29c063cf90ad869d775792';
	}else{
		appId = 'b2f39f434a3c5622131f4d76f6a87e09';
	}
	window.kakaoAsyncInit = function(){
		Kakao.init(appId);
		$(function(){
			startKakaoShare(shorUrl, document.title);
		});
	};
	(function(d,s,id){
		var js,fjs = d.getElementsByTagName(s)[0];
		if(d.getElementById(id)){
			startKakaoShare(shorUrl, document.title);
		}
		js=d.createElement(s); js.id=id;
		js.src = "/js/sdk/kakao.story.min.js";
		fjs.parentNode.insertBefore(js,fjs);
	}(document,'script','kakao-js-sdk'));
}

function doKakaotalkShere(pImg,pTitle,pUrl,site){
	var image = pImg != "" ? pImg : "https://cbox.ebs.co.kr/portal/event/2016/10/28/share_ebs.logo.png";
	var title = pTitle != "" ? 'EBS 중학 교재 사주세요~!\n'+pTitle : "EBS중학 모바일";
	var pUrl = pUrl != "" ? pUrl : document.URL;
	var siteDomainForKakao = "mid.ebs.co.kr";
	var appId = 'b2f39f434a3c5622131f4d76f6a87e09';

	if(site == "primary"){
		image = pImg != "" ? pImg : "https://cbox.ebs.co.kr/portal/event/2016/10/28/share_primid_logo.png";
		title = pTitle != "" ? 'EBS 초등 교재 사주세요~!\n'+pTitle : "EBS초등 모바일";
		siteDomainForKakao = "primary.ebs.co.kr";
		appId = '2ff375e75d29c063cf90ad869d775792';
	}
	
	Kakao.init(appId);
	Kakao.Link.sendDefault({
		objectType: 'feed',
		content: {
			title: title+"\n",
			imageUrl: image,
			link: {
				mobileWebUrl: pUrl,
				webUrl: pUrl
			}
		},
		success : function (obj) {
			Kakao.cleanup();
		},
		fail : function (e) {
			console.error(e);
		} 
	});
}

function doBand(shorUrl){
	var url = "http://www.band.us/plugin/share?body="+encodeURIComponent(document.title)+ encodeURIComponent("\n") + shorUrl;
	location.href = url;
	
}

function doNaver(shorUrl){
	var title = document.title;
	var subTitle = "";
	if(subTitle!=""){
		title = subTitle;
	}
	var url = "http://share.naver.com/web/shareView.nhn?url="+shorUrl+"&title="+encodeURIComponent(title);
	location.href = url;
}
/**
 * 문자열 뒤 공백제거.
 * @returns
 */
String.prototype.trim = function() {
	 return this.replace(/(^\s*)|(\s$)/g, "");
};

function resize() {
	var tarHeight = 0;
	//교재 메인 페이지만 높이 100 추가
	if(document.referrer.indexOf('book/main/index') != -1){
		tarHeight = 100;
	}
	var doc = document.getElementById('_iframe');
	var pageheight = doc.scrollHeight+105;//doc.scrollHeight+35
	if (doc.scrollHeight == 0) {
	} else {
		
		try {
			parent.document.getElementById("contentFrame").height = pageheight+ "px";
			//첫번
			parent.document.getElementById("contentFrame").resizeTo(parent.document.getElementById("contentFrame").offsetWidth,pageheight);

			parent.parent.document.getElementById("contentFrame").resizeTo(parent.parent.document.getElementById("contentFrame").offsetWidth, pageheight + 400);
			parent.document.getElementById("blogFrame").src ="http://blog.ebs.co.kr/blog/front/main/student/blog_iframe.jsp?frame_height="+(pageheight+400)+"&frame_name=contentFrame";
			//alert(parent.frames["blogFrame"].src);
			
		} catch (e) {
			try {
				if(navigator.userAgent.indexOf("Firefox") != -1)
				 {
					parent.document.getElementById("contentFrame").height = pageheight + tarHeight + 100 + "px";
				 }else if(navigator.userAgent.indexOf("Chrome") != -1)
				 {
					parent.document.getElementById("contentFrame").height = pageheight + tarHeight + "px";
				 }else if(navigator.userAgent.indexOf("MSIE") != -1)
				 { 
					 if(navigator.userAgent.indexOf("MSIE 7") != -1) {
						 parent.document.getElementById("contentFrame").height = pageheight + "px";
					 }else if(navigator.userAgent.indexOf("MSIE 8") != -1){
						 parent.document.getElementById("contentFrame").height = pageheight + "px";
					 }else parent.document.getElementById("contentFrame").height = pageheight + tarHeight + "px";
				 }else{
					 parent.document.getElementById("contentFrame").height = pageheight  + "px";
					
				 }
			} catch (e) {}
			
		}
	}
	
}

/**
 * PLEasure Window Global variables
 */
var gPlayerPopWindow = null;
var gPlayerPopWindowWidth = 1270;
var gPlayerPopWindowHeight = 758;
var gPlayerPopWindowTop = Math.floor( ( window.screen.availHeight - ( gPlayerPopWindowHeight + 30 ) ) / 2 );
var gPlayerPopWindowLeft = Math.floor( ( window.screen.availWidth - ( gPlayerPopWindowWidth + 12 ) ) / 2 );

var pPlayerPopWindow = null;
var pPlayerPopWindowWidth = 1270;
var pPlayerPopWindowHeight = 758;

function openPle( site, url, day ) {
	if(site == 'primary'){
		if(typeof day == "undefined"){ 
			day = "";
		}else{
			day = "?day="+day;
		}
		gPlayerPopWindowWidth = 1557;
		gPlayerPopWindowHeight = 885;
		if(!url) url = '//'+location.host+"/pleasure/index";
		if ( gPlayerPopWindow ) gPlayerPopWindow.close();
		gPlayerPopWindow = window.open( url+day, "_EBSPLAYERWINDOW", "width=" + gPlayerPopWindowWidth + ", height=" + gPlayerPopWindowHeight + ", toolbar=0, directories=0, status=no, menubar=0, scrollbars=1, resizable=1, fullscreen=0, top=" + gPlayerPopWindowTop + ",left=" + gPlayerPopWindowLeft );
	}else{
		openRecentPleasure();
	}
}

/**
 * PLEasure 중학홈
 */
function openRecentPleasure(courseId) {
	$.ajax({
		url : "/user/recent/course/info",
		dataType : "json",
		data : {'courseId' : courseId},
		type : "post",
		async : false,
		success : function (data) {
			if(data.state == "fail"){
				alert("로그인 후 이용해 주세요.");
			}else if(data.obj == undefined){
				alert("학습중인 강좌가 없습니다.");
			}else if(data.obj != undefined){
				openPopupPleasurePlainPlayer( data.obj.site, data.obj.courseId, data.obj.stepId, data.obj.lectId, data.obj.enrolSno, data.obj.ecdFileClsCd, null );
			}
		},error:function(request,status,error){
			return false;
		}
	});
}

/**
 * PLEasure 나의학습방
 */
function openPleCourse( site ) {
	var url = "/ple/" + site + "/EBSPle.html?appName=AppMyCourse";
	if(site == "primary"){
		url = "/pleasure/mypage/course/current/index#recommend"
	}
	if ( gPlayerPopWindow ) {
		gPlayerPopWindow.close();
	}
	gPlayerPopWindow = window.open( url, "_EBSPLAYERWINDOW", "width=" + gPlayerPopWindowWidth + ", height=" + gPlayerPopWindowHeight + ", toolbar=0, directories=0, status=no, menubar=0, scrollbars=1, resizable=1, fullscreen=0, top=" + gPlayerPopWindowTop + ",left=" + gPlayerPopWindowLeft );
}

/**
 * PLEasure 울타리 UI
 */
function openPleFriendUI( num ) {
	var site = "primary";
	if ( num == 2 ) {
		site = "middle";
	}
	openPleFriend( site );
}

/**
 * PLEasure 울타리
 */
function openPleFriend( site ) {
	var url = "/pleasure/friend/my/index";
	if(site=="middle"){
		pPlayerPopWindowWidth = 1000;
		pPlayerPopWindowHeight = 726;
	}
	if ( pPlayerPopWindow ) {
		pPlayerPopWindow.close();
	}
	pPlayerPopWindow = window.open( url, "_EBSPLAYERWINDOW_N", "width=" + pPlayerPopWindowWidth + ", height=" + pPlayerPopWindowHeight + ", toolbar=0, directories=0, status=no, menubar=0, scrollbars=1, resizable=1, fullscreen=0, top=" + gPlayerPopWindowTop + ",left=" + gPlayerPopWindowLeft );
}

/**
 * PLEasure 쪽지함 UI
 */
function openPleNoteUI( num ) {
	var site = "primary";
	if ( num == 2 ) {
		site = "middle";
	}
	openPleNote( site );
}

/**
 * PLEasure 쪽지함
 */
function openPleNote( site ) {
	var url = "/pleasure/note/receive/index";
	if(site=="middle"){
		pPlayerPopWindowWidth = 1000;
		pPlayerPopWindowHeight = 726;
	}
	if ( pPlayerPopWindow ) {
		pPlayerPopWindow.close();
	}
	pPlayerPopWindow = window.open( url, "_EBSPLAYERWINDOW_N", "width=" + pPlayerPopWindowWidth + ", height=" + pPlayerPopWindowHeight + ", toolbar=0, directories=0, status=no, menubar=0, scrollbars=1, resizable=1, fullscreen=0, top=" + gPlayerPopWindowTop + ",left=" + gPlayerPopWindowLeft );
}

/**
 * PLEasure 실버라이트 학습창
 */
function openPleSilverPlayer( site, courseId, stepId, lectureId, enrollNo, encodingTypeCode, interfaceType, indexPosition, siteDsCd ) {
	// Edge, Chrome 브라우저에서는 무조건 HTML5Player 호출 처리
	if( siteDsCd != 'PR' && ( navigator.userAgent.indexOf( 'Edge/' ) > -1 || window.chrome || navigator.userAgent.indexOf( "Chrome" ) > -1 ) ) {
		// Chorme Web 브라우저 안내
		if (/chrome/i.test( navigator.userAgent )) {
			alert( '※ 기본 학습창이 “구 학습창＂으로 설정되어 있습니다.\n크롬 브라우저에서는 "신규 학습창"으로 학습이 가능합니다.\n인터넷 익스플로러(IE)에서는 정상적으로 구 학습창을 이용하실 수 있습니다.' );
		}
		openPopupPleasurePlainPlayer( site, courseId, stepId, lectureId, enrollNo, encodingTypeCode, interfaceType, indexPosition );
		return false;
	} else if( siteDsCd == 'PR' ) {
		// Chorme Web 브라우저 안내
		if (/chrome/i.test( navigator.userAgent )) {
			alert( "크롬 브라우저 버젼45 에서는\n동영상 및 다운로드 플러그인 이용이 제한됩니다.\n인터넷 익스플로러(IE)에서는 정상적으로\n이용하실 수 있습니다." );
		}
		// PR은 표준학습창으로만
		return false;
	}
	
	if ( checkMobileBrowser() ) {
		alert( "현재 강의보기는 모바일용으로 지원되지 않습니다." );
		return;
	}

	if ( indexPosition == "undefined" || indexPosition == null || indexPosition == "null" ) {
		indexPosition = "";
	}

	var url = "/ple/" + site + "/EBSPle.html?appName=VOD&playerType=S&courseId=" + courseId + "&stepId=" + stepId + "&lectureId=" + lectureId + "&enrollNo=" + enrollNo + "&encodingTypeCode=" + encodingTypeCode + "&interfaceType=" + interfaceType + "&indexPosition=" + indexPosition;
	if ( gPlayerPopWindow ) {
		gPlayerPopWindow.close();
	}
	gPlayerPopWindow = window.open( url, "_EBSPLAYERWINDOW", "width=" + gPlayerPopWindowWidth + ", height=" + gPlayerPopWindowHeight + ", toolbar=0, directories=0, status=no, menubar=0, scrollbars=1, resizable=1, fullscreen=0, top=" + gPlayerPopWindowTop + ",left=" + gPlayerPopWindowLeft );
}

/**
 * PLEasure activeX 학습창
 */
function openPleActivePlayer( site, courseId, stepId, lectureId, enrollNo, encodingTypeCode, interfaceType, indexPosition, siteDsCd ) {
	// Edge, Chrome 브라우저에서는 무조건 HTML5Player 호출 처리
	if( siteDsCd != 'PR' && ( navigator.userAgent.indexOf( 'Edge/' ) > -1 || window.chrome || navigator.userAgent.indexOf( "Chrome" ) > -1 ) ) {
		// Chorme Web 브라우저 안내
		if (/chrome/i.test( navigator.userAgent )) {
			alert( '※ 기본 학습창이 “구 학습창＂으로 설정되어 있습니다.\n크롬 브라우저에서는 "신규 학습창"으로 학습이 가능합니다.\n인터넷 익스플로러(IE)에서는 정상적으로 구 학습창을 이용하실 수 있습니다.' );
		}
		
		openPopupPleasurePlainPlayer( site, courseId, stepId, lectureId, enrollNo, encodingTypeCode, interfaceType, indexPosition );
		return false;
	} else if( siteDsCd == 'PR' ) {
		// Chorme Web 브라우저 안내
		if (/chrome/i.test( navigator.userAgent )) {
			alert( "크롬 브라우저 버젼45 에서는\n동영상 및 다운로드 플러그인 이용이 제한됩니다.\n인터넷 익스플로러(IE)에서는 정상적으로\n이용하실 수 있습니다." );
		}
	}
	
	if ( checkMobileBrowser() ) {
		alert( "현재 강의보기는 모바일용으로 지원되지 않습니다." );
		return;
	}

	if ( indexPosition == "undefined" || indexPosition == null || indexPosition == "null" ) {
		indexPosition = "";
	}

	var url = "/ple/" + site + "/EBSPle.html?appName=VOD&playerType=A&courseId=" + courseId + "&stepId=" + stepId + "&lectureId=" + lectureId + "&enrollNo=" + enrollNo + "&encodingTypeCode=" + encodingTypeCode + "&interfaceType=" + interfaceType + "&indexPosition=" + indexPosition;
	if ( gPlayerPopWindow ) {
		gPlayerPopWindow.close();
	}
	gPlayerPopWindow = window.open( url, "_EBSPLAYERWINDOW", "width=" + gPlayerPopWindowWidth + ", height=" + gPlayerPopWindowHeight + ", toolbar=0, directories=0, status=no, menubar=0, scrollbars=1, resizable=1, fullscreen=0, top=" + gPlayerPopWindowTop + ",left=" + gPlayerPopWindowLeft );
}

/**
 * WEB ActiveX 일반학습창
 */
function openMixedPlayer( site, courseId, stepId, lectureId, enrollNo, encodingTypeCode, interfaceType, indexPosition, siteDsCd ) {
	openPopupPleasurePlainPlayer( site, courseId, stepId, lectureId, enrollNo, encodingTypeCode, interfaceType, indexPosition );
}

/**
 * WEB HTML5Player 일반학습창
 */
function openVodMainHTML5Player( site, courseId, stepId, lectureId, enrollNo, encodingTypeCode, interfaceType, indexPosition ) {
	if ( indexPosition == "undefined" || indexPosition == null || indexPosition == "null" ) {
		indexPosition = "";
	}
	var w = 1034;
	var h = 650;
	var x = Math.floor( ( window.screen.availWidth - ( w + 12 ) ) / 2 );
	var y = Math.floor( ( window.screen.availHeight - ( h + 30 ) ) / 2 );
	var url = "/player/vodMainHTML5Player.jsp?cid=" + courseId + "&sid=" + stepId + "&lid=" + lectureId + "&eno=" + enrollNo + "&encType=" + encodingTypeCode + "&indexPosition=" + indexPosition;
	if ( gPlayerPopWindow ) {
		gPlayerPopWindow.close();
	}
	gPlayerPopWindow = window.open( url, "_EBSPLAYERWINDOW", 'width=' + w + ', height=' + h + ', scrollbars=0, status=1, menubar=0, directories=0, location=0, toolbar=0, resizable=0, top=' + y + ',left=' + x );
}

/**
 * "자기주도형 강좌 학습하기( 최근 학습 강의 확인 )
 */
function checkSdlRecentLect( courseId, site ) {
	$.ajax( {
		headers : {
			"Accept" : "application/json"
		},
		type : 'POST',
		url : '/course/getUserSdlLect',
		dataType : 'json',
		data : {
			'courseId' : courseId
		},
		success : function( obj, http, st ) {
			var sdl = obj.sdlLect;
			if ( sdl.indexNo == 0 ) {
				alert( "강좌에 포함된 모든 강의가 더이상 서비스 되지 않습니다." );
			} else {
				openPopupSdlPlainPlayer( site, sdl.courseId, sdl.stepId, sdl.lectId );
			}
		},
		error : function( obj, http, st ) {
			alert( 'error' );
		}
	} );
}

/**
 * Pleasure Player 학습창 새창용
 */
function openPopupSdlPlainPlayer( site, courseId, stepId, lectureId, indexPosition ) {
	$.ajax({
		url: "/course/sdl/checkInfoAjax",
		type: 'GET',
		async: false,
		dataType : "json",
		data: {"courseId":courseId,"lectId":lectureId},
		success: function (data) {
			if(data.exceptionMsg != ""){
				//에러 표시
				alert(data.exceptionMsg);
			}else{
				//정상
				if ( indexPosition == "undefined" || indexPosition == null || indexPosition == "null" ) {
					indexPosition = "";
				}
				var url = "/player/vodMainSdlPlayer.jsp?cid=" + courseId + "&sid=" + stepId + "&lid=" + lectureId + "&indexPosition=" + indexPosition;
				
				var w = 1557;
				var h = 885;
				var x = Math.floor( ( window.screen.availWidth - ( w + 12 ) ) / 2 );
				var y = Math.floor( ( window.screen.availHeight - ( h + 30 ) ) / 2 );
				
				if ( gPlayerPopWindow ) {
					gPlayerPopWindow.close();
				}
				gPlayerPopWindow = window.open( url, "_EBSPLAYERWINDOW", 'width='+w+', height='+h+', toolbar=0, directories=0, status=no, menubar=0, scrollbars=1, resizable=1, fullscreen=0, top=' + y + ',left=' + x );
			}
		},
		error: function (e) {
			console.error(e);
		}
	});
	
}

/**
 * Pleasure Player 학습창
 */
function openPleasurePlayer( site, courseId, stepId, lectureId, enrollNo, encodingTypeCode, interfaceType, indexPosition, siteCd, hash ) {
	if ( indexPosition == "undefined" || indexPosition == null || indexPosition == "null" ) {
		indexPosition = "";
	}
	var tag = "";
	if (hash != undefined){
		tag="#"+hash;
	}
	var url = "/pleasure/course/player/main/index?cid=" + courseId + "&sid=" + stepId + "&lid=" + lectureId + "&eno=" + enrollNo + "&encType=" + encodingTypeCode + "&indexPosition=" + indexPosition + tag;
	parent.location.href = url;
}

/**
 * Pleasure Player 학습창 새창용
 */
function openPopupPleasurePlayer( site, courseId, stepId, lectureId, enrollNo, encodingTypeCode, interfaceType, indexPosition ) {
	if ( indexPosition == "undefined" || indexPosition == null || indexPosition == "null" ) {
		indexPosition = "";
	}
	
	if (encodingTypeCode == null) {
		encodingTypeCode = "M10";
	}
	
	var url = "/pleasure/course/player/main/index?cid=" + courseId + "&sid=" + stepId + "&lid=" + lectureId + "&eno=" + enrollNo + "&encType=" + encodingTypeCode + "&indexPosition=" + indexPosition;
	
	var w = 1557;
	var h = 885;
	var x = Math.floor( ( window.screen.availWidth - ( w + 12 ) ) / 2 );
	var y = Math.floor( ( window.screen.availHeight - ( h + 30 ) ) / 2 );
	
	if ( gPlayerPopWindow ) {
		gPlayerPopWindow.close();
	}
	gPlayerPopWindow = window.open( url, "_EBSPLAYERWINDOW", 'width='+w+', height='+h+', toolbar=0, directories=0, status=no, menubar=0, scrollbars=1, resizable=1, fullscreen=0, top=' + y + ',left=' + x );
	setttingPlaner(courseId, stepId, lectureId);
}

/**
 * Pleasure Player 학습창 새창용
 */
function openPopupPleasurePlainPlayer( site, courseId, stepId, lectureId, enrollNo, encodingTypeCode, interfaceType, indexPosition ) {
	
	if ( indexPosition == "undefined" || indexPosition == null || indexPosition == "null" ) {
		indexPosition = "";
	}
	var url = "/pleasure/course/plain/player/main/index?cid=" + courseId + "&sid=" + stepId + "&lid=" + lectureId + "&eno=" + enrollNo + "&encType=" + encodingTypeCode + "&indexPosition=" + indexPosition;
	if(null != site && "PS" == site ){
		 url += "&click=main_my1";
	}else{
		url += "&clnk=main_head";
	}
	
	var w = 1557;
	var h = 885;
	var x = Math.floor( ( window.screen.availWidth - ( w + 12 ) ) / 2 );
	var y = Math.floor( ( window.screen.availHeight - ( h + 30 ) ) / 2 );
	
	if ( gPlayerPopWindow ) {
		gPlayerPopWindow.close();
	}
	gPlayerPopWindow = window.open( url, "_EBSPLAYERWINDOW", 'width='+w+', height='+h+', toolbar=0, directories=0, status=no, menubar=0, scrollbars=1, resizable=1, fullscreen=0, top=' + y + ',left=' + x );
	setttingPlaner(courseId, stepId, lectureId);
}

/**
 * WEB 임시 강의만 보기 학습창
 */
function openOnlyPlayer( cid, sid, lid, eno, encType ) {
	if ( checkMobileBrowser() ) {
		alert( "현재 강의보기는 모바일용으로 지원되지 않습니다." );
		return;
	}

	if ( confirm( "'임시 강의만 보기' 시 개인 학습이력이 남지 않습니다." ) ) {
		var w = 664;
		var h = 570;
		var x = Math.floor( ( window.screen.availWidth - ( w + 12 ) ) / 2 );
		var y = Math.floor( ( window.screen.availHeight - ( h + 30 ) ) / 2 );
		var url = "/player/vod_main_only.jsp?cid=" + cid + "&sid=" + sid + "&lid=" + lid + "&eno=" + eno + "&encType=" + encType;
		if ( gPlayerPopWindow ) {
			gPlayerPopWindow.close();
		}
		gPlayerPopWindow = window.open( url, "_EBSPLAYERWINDOW", 'width=664, height=570, scrollbars=0, status=1, menubar=0, directories=0, location=0, toolbar=0, resizable=0, top=' + y + ',left=' + x );
	}
}

/**
 *모바일 MP4 학습창
 */ 
function openMobileMP4Player(cid, sid, lid, eno, encType) {
	if(confirm("'무선네트워크(wifi)에 연결되어 있는지 확인하세요.\n3G 접속시 과다한 데이터 통화료가 부과될 수 있습니다.\n※ 학습에 대한 수강이력은 남지 않습니다.")){
		var w = 520;
		var h = 360;
		var x = Math.floor((window.screen.availWidth-(w+12))/2);
		var y = Math.floor((window.screen.availHeight-(h+30))/2);
		var url = "/player/mp4_player.jsp?cid="+cid+"&sid="+sid+"&lid="+lid+"&eno="+eno+"&encType="+encType;
		window.open(url, "",'width=520, height=360, scrollbars=0, status=1, menubar=0, directories=0, location=0, toolbar=0, resizable=0, top='+y+',left='+x);
	}
}

/**
 *Mobile browser check
 */
function checkMobileBrowser(){
	if (navigator.userAgent.match(/iPad|iPhone|Mobile|UP.Browser|Android|BlackBerry|Windows CE|Nokia|webOS|Opera Mini|SonyEricsson|opera mobi|Windows Phone|IEMobile|POLARIS|MOT|SAMSUNG|SCH-|SPH-|CANU|IM-|EV-/) != null){
		return true;
	}
	return false;
}

/**
 * 나의 학습방 - 강좌 상세 이동 
 */
function goStudy(courseId) {
	location.href = "/mypage/course/view?courseId="+courseId;
}

function openPlayerForPremiumHTML5(courseId,type,scale,site){
	$.ajax({
		url:'/premium/course/pop/getPlayerUrlAjax',
		type:'POST',
		dataType:'json',
		data: { courseId: courseId, playerType: type },
		success:function(data){
		 	if("exception"==data.type){
		 		alert(data.exceptionMessage);
		 	}else{
		 		
		 		 var width = "345";
		 		var height = "355";
		 		if(scale == "4:3"){
		 			if(site == "primary"){
		 				width = "345";
		 				height = "355";
		 			}else{
		 				width = "330";
		 				height = "330";
		 			}
		 		}else if(scale == "16:9"){
		 			if(site == "primary"){
		 				width = "450";
		 				height = "350";
		 			}else{
		 				width = "435";
		 				height = "335";
		 			}
		 		}
		 		
		 		$("#forwardForm").remove();
		 		var formToHtml5 = $("<form></form>");
		 		formToHtml5.attr("action","/popup/event/popupHTML5Player.jsp");
		 		formToHtml5.attr("method","post");
		 		formToHtml5.attr("target","Popup01");
		 		formToHtml5.attr("name","forwardForm");
		 		formToHtml5.attr("id","forwardForm");
		 		
		 		var hiddenFileUrl = $('<input type="hidden" name="fileUrl" class="fileUrl" value="'+data.fileUrl+'" />');
		 		formToHtml5.append(hiddenFileUrl);
		 		formToHtml5.appendTo('body');
		 		
		 		var pop = window.open('' ,'Popup01','width=' + width  + ',height=' + height  + ',top=50,scrollbars=auto,left=150');
		 		var f = document.forwardForm;
		 		f.fileUrl.value = data.fileUrl;
		 		f.target = "Popup01";
		 		f.submit();
		 	   pop.focus();
		 	}
		},
		   error:function(obj){
		}
	});
}

//금칙어 호출
function checkBanword(content,title){
	BoardJS.banWords();
	var banWordS = BoardJS.BAN_WORDS;
	
	for (index in banWordS)	{
		
		if(content.toLowerCase().indexOf(banWordS[index]) != -1) {
			alert('사용이 금지된 단어 입니다 : ' + banWordS[index]);
			return false;
		}
		//undefined, NaN, Null, '' 등이 아닐 때
		if(title && title.toLowerCase().indexOf(banWordS[index]) != -1){
			alert('제목에 사용이 금지된 단어 입니다 : ' + banWordS[index]);
			return false;
		}
	}
	return true;
}

//금칙어 호출
function checkBanwordKeyword(keyword){
	BoardJS.banWords();
	var banWordS = BoardJS.BAN_WORDS;

	for (index in banWordS)	{

		if(keyword.toLowerCase().indexOf(banWordS[index]) != -1) {
			alert('사용이 금지된 단어 입니다 : ' + banWordS[index]);
			return false;
		}
	}
	return true;
}

//URL패턴체크
function checkDetailUrl(strUrl) {
    var expUrl =  /^(http|https?):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/
    
    var a = navigator.usereAgent;
    
    if(!expUrl.test(strUrl)||(/chrome/i.test(a))){ //IE or Chrome에서 얼럿창 표시되게 조건
        alert("URL형식이 아닙니다.");
    }
    return expUrl.test(strUrl);
}

function reserve_go(type){
	if(type == 'mid'){
		if(confirm("중학서비스의 예비과정으로 이동합니다."))
			window.open('http://mid.ebs.co.kr/course/seriesMenu/list?menu=reserve&seriesId=S00004',type);
	}
	if(type == 'eng'){
		alert('EBS의 중고등영어듣기 능력평가로 이동합니다.');
		window.open('http://home.ebs.co.kr/home1810/index.html',type);
	}
	if(type == 'high'){
		alert('EBSi의 예비과정으로 이동합니다.');
		window.open('http://www.ebsi.co.kr/ebs/pot/potg/retrieveSeriesSubjectList.ebs?strMnuDescrCd=PM02&strPrmId=PRO_313&strNaviType=1',type);
	}
}

function go_EBSprogram(site){
	if(confirm("EBS 방송프로그램으로 이동 하시겠습니까?")){
		if(site == 'primary')
			window.open('http://www.ebs.co.kr/actions/CultureSubIntro?menu_id=F015');
		else 
			window.open('http://www.ebs.co.kr/actions/CultureSubIntro?menu_id=F016');
	}
}

function setObjectStatus_hidden(selObj){
	if (!selObj) return false;
	if (!(selObj.className) || (selObj.className == "")){
		selObj.className = "hidden_text";
	} else {
		if ((selObj.className != "hidden_text") && (selObj.className.indexOf(' hidden_text') <= -1)){
			selObj.className = selObj.className + " hidden_text";
		}
	}
}

/**
 * 퀵메뉴 관련
 */
function quickMoveFn(wH){
	var $target;
	var $sec_target; //중학,문제은행
	var $q_target = $(".quick_wrap"); //초등
	var $mq_target = $("#main_quick_area"); //중학
	var $mm_target = $(".main_quick_area"); //문제은행
	var $top_ad = $(".top_ad"); //top배너
	var target_css = {position:'fixed', top:'10px'}; //default css
	var sec_s_css = {top:'10px'}; //second start css
	var sec_css = {top:'10px'}; //second css
	var hH = $("#header").outerHeight(true); //header height
	var stopH = $(document).height() - ($("#Footer").height()+ 10 + $("#quick_renewal").outerHeight(true)); //stop height
	var topH = stopH; //default stopH - page gap 보정
	var gap = 0; //header gap
	var sgap = 0; //footer gap
	var top_flag = false;
	if ($top_ad.length > 0 && $top_ad.css("display") != "none"){
		top_flag = true;
	}
	//초등
	if($q_target.length > 0){
		if(top_flag){
			hH += $top_ad.outerHeight(true);
		}
		$target = $q_target;
		//초등 old page
		if($(".quick_wrap.old").length > 0){
			if(top_flag){
				topH -= $top_ad.outerHeight(true);
			}
			target_css.marginLeft = '980px';
			topH -= 212;
			gap = 15;
		}else if(location.href.indexOf('/main/primary') > -1){ // 초등 메인 페이지 우측 광고배너
			if(top_flag){
				topH -= $top_ad.outerHeight(true);
			}
			hH += $(".mVisual").outerHeight(true);
			gap = 10;
			$sec_target = $target;
			sec_css.top = '20px';	// position fixed 되기 전 배너 위치 지정
		}else{
			if(top_flag){
				topH -= $top_ad.outerHeight(true);
			}
			topH -= 197;
			gap = 9;
			sgap = -10;
		}
	//중학
	}else if($mq_target.length > 0){
		if(top_flag){
			hH += $top_ad.outerHeight(true);
		}
		$target = $mq_target;
		target_css.marginLeft = '980px';
		topH -= 297;
		gap = -10;
		sgap = -15;
		//강좌 상세
		if($(".float_menu").length > 0){
			target_css.top  = '15px';
			$sec_target = $("#quick_renewal");
			sec_s_css.top  = '50px';
			hH -= $(".float_menu").outerHeight(true);
			if(top_flag){
				gap = 50;
			}else{
				topH += $top_ad.outerHeight(true);
				gap = 60;
			}
			topH -= 100;
			sgap = -70;
		}
	//문제은행,중학 강좌,중학 교재
	}else if($mm_target.length > 0){
		hH += $(".top_ad").outerHeight(true);
		$target = $mm_target;
		$sec_target = $("#quick_renewal");
		sec_css.top  = '174px';
		//강좌 메인
		if($(".nav_main_2015").length > 0){
			$sec_target = $("#quick_renewal");
			sec_css.top  = '416px';
			hH += $(".nav_main_2015").outerHeight(true);
			gap = -10;
			sgap = -15;
		//교재
		}else if($(".nav_main_2016").length > 0){
			sec_css.top  = '434px';
			hH += $(".nav_main_2016").outerHeight(true);
		}else{
			//문제은행
			if($(".nav_qbank").length > 0){
				hH += $(".nav_qbank").outerHeight(true);
			}
			//중학,초등 구분
			if($(".visual_tit").length > 0){
				sgap = -10;
				//초등
				if(location.href.indexOf('primary.ebs.co.kr') != -1){
					sec_css.top  = '0px';
					if(top_flag){
						topH -= $top_ad.outerHeight(true);
					}else{
						hH -= $top_ad.outerHeight(true);
					}
					topH -= 266;
					gap = -10;
				}else{
					hH += $(".visual_tit").outerHeight(true);
					if(!top_flag){
						hH -= $top_ad.outerHeight(true);
						topH -= 261;
					}else{
						topH -= 361;
					}
					gap = -20;
				}
			}
		}
	}else{
		return false;
	}
	if(wH > hH + gap){
		if(wH > stopH + sgap){
			//target_css.position = 'absolute'; 2024-12-27 삭제
			//target_css.top = topH; 2024-12-27 삭제
			$target.css(target_css);
			if($sec_target){
				$sec_target.css(sec_s_css);
			}
		}else{
			$target.css(target_css);
			if($sec_target){
				$sec_target.css(sec_s_css);
			}
		}
	}else{
		$target.removeAttr('style');
		if($sec_target){
			$sec_target.css(sec_css);
		}
	}
}
$(function() {
	if(location.href.indexOf('/main/middle') < 0 && location.href.indexOf('/main/primary') < 0){
		if($("#quick_renewal").length == 0){
			return false;
		}else{
			$(window).scroll(function(){
				if(location.href.indexOf('primary.ebs.co.kr') > -1 ){
					quickMoveFn($(window).scrollTop());
				}
			});
		}
	}
	
	if(location.href.indexOf('/main/primary') > -1) {
		$(window).scroll(function(){
			quickMoveFn($(window).scrollTop());
		});
	}
});

// 파라미터 값 받아오기 이름명으로
function getParameterFunction(name, url) {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	var rtnValue;
	try{
		rtnValue = results[2];
	}catch(e){
		rtnValue = null;
	}
	
	return rtnValue;
}

function openWindow(url, type, name, scrollbar_state) {
	var pop_size	= type.split("*");
	var popupwidth  = pop_size[0];
	var popupheight = pop_size[1];
	var scroll_bars = "auto";
	if(isNaN(parseInt(popupwidth))) {
		Top  = (window.screen.availHeight - 600) / 2;
		Left = (window.screen.availWidth  - 800) / 2;
	} else {
		Top  = (window.screen.availHeight - popupheight) / 2;
		Left = (window.screen.availWidth  - popupwidth)  / 2;
	}
	
	if(scrollbar_state != "undefined" && scrollbar_state != ""){
		scroll_bars = scrollbar_state;
	}
			
	if(name == "customerInfo") scroll_bars = "yes"; 
	if(Top  < 0) Top  = 0;
	if(Left < 0) Left = 0;
	
	Feature = "toolbar=0,menubar=0,scrollbars=" + scroll_bars + ",resizable=no,left=" + Left + ",top=" + Top + ",width=" + popupwidth + ",height=" + popupheight;
	
	if(name == "") name = "popupWindow";
	PopUpWindow = window.open(url, name, Feature);
	PopUpWindow.focus();
}
function goPremiumCourse(courseId) {
	location.href = "http://www.ebs.co.kr/actions/AboutMiddleIntro?program_id_data="+ courseId + "&afterYN=N";
}
function LoginFocus(retURL){
	var checkUrl = (retURL==null?location.href:retURL);
	
	
	// 리턴 url 여부 확인
	var returnUrl = getParameterFunction('returnUrl');
	
	// 리턴 url 파라미터가 있으면 기존 url 을 가져온다
	if(null != returnUrl && "" != returnUrl){
		checkUrl = returnUrl;
	}else{
		// 아니면 인코딩을 미리한다. 
		checkUrl = encodeURIComponent(checkUrl);
	}
	
	try {
		
		/* 초등 */
		if(location.href.indexOf('primary.ebs.co.kr') != -1){
			
			if(location.pathname == '/'){
				checkUrl = location.protocol + "//" + location.host + "/main/primary";
			}
			
			/* 초등 학습창 */
			if(location.href.indexOf('/pleasure') != -1){
				$('.togLogin').show();	setTimeout(function(){$( '#loginform01' ).focus();},50);
			}else{
				if(checkUrl.indexOf('http%3A%2F%2F') != 1){
				   var replaceCheckUrl = checkUrl.replace('http%3A%2F%2F', 'https%3A%2F%2F');
				   top.parent.location.href="https://"+location.host+"/login/form?returnUrl="+replaceCheckUrl;
				} else {
				   top.parent.location.href="/login/form?returnUrl="+checkUrl;
				}
			}
		}
		/* 중학 */
		else{
			
			if(location.href.indexOf('/pleasure') != -1){
				top.document._login.j_username.blur();
				top.document._login.j_username.focus();
			}else{
				// 현제 url 임시 변수에 생성
				var tempUrl = location.href;
				// 현제 url 이 /board로 선언할시 (iframe 속 url )
				if(tempUrl.indexOf("/board") > -1){
					// iframe의 밖았url 로 교체
					tempUrl =top.parent.location.href; 
				}else if(location.pathname == '/' ){
					tempUrl = location.protocol + "//" + location.host + "/main/middle";
				}
				top.parent.location.href="/login/form?returnUrl="+ checkUrl;
			}
			
		}
		
	} catch (e) {
	}
}

function frameOpenBanner(siteId, bannerPositionId, bnnrMngId, bnnrUrl, newWndwYn) {
	var bannerDelegateUrl = "";
	if (siteId == "primary") bannerDelegateUrl = "/banner/primary/delegator?bnnrMngId=" + bnnrMngId + "&bnnrUrl=" + encodeURIComponent(bnnrUrl);
	else bannerDelegateUrl = "/banner/middle/delegator?bnnrMngId=" + bnnrMngId + "&bnnrUrl=" + encodeURIComponent(bnnrUrl);

	if (newWndwYn != "Y") {
		parent.location.href = bannerDelegateUrl;
	} else {
		parent.window.open(bannerDelegateUrl, "_blank");
	}
}
function cyberClassView(url){
	//openWindow(url,"1*1","cyberClassPop");
	var Feature = "toolbar=0,menubar=0,scrollbars=yes,resizable=no,width=1,height=1px,left=10,top=10";
	window.open(url, "cyberClassPop", Feature);
}

var pleWeb="web";

function parentPopResize(){
	parent.window.resizeTo("800","800");
	parent.window.document.body.scroll = "yes";
}

function goBoardAttach(auth,url){
	if (auth == 'false') {
		if(confirm("로그인 후 이용하실 수 있습니다.")){
			loginFocus();
		}
		return;
	}
	location.href = url;
}

window.setApp = function(pushId){ 
	$.ajax({
		url: "/setSessionForApp",
		type: 'GET',
		async: false,
		dataType : "json",
		data: {"pushId":pushId},
		success: function (data) {
		},
		error: function (e) {
			console.error(e);
		}
	});
};
window.checkApp = function(){
	var rtn = false;
	$.ajax({
		url: "/checkSessionApp",
		type: 'GET',
		async: false,
		dataType : "json",
		success: function (data) {
			rtn = data;
		},
		error: function (e) {
			console.error(e);
		}
	});
	return rtn ;
};

window.isImgVersionApp = function(){
	var rtnFlag = false;
	try{
		$.ajax({
			url: "/api/push/isImgtechApp",
			type: 'GET',
			async: false,
			dataType : 'json',
			success: function (data) {
				if(data.code == "1"){
					rtnFlag = true;
				}else{
					rtnFlag = false;
				}
			},
			error: function () {
				rtnFlag = false;
			}
		});
	} catch (e) {
		rtnFlag = false;
	}
	return rtnFlag;
};

window.isImgVersionAppVer = function(){
	var rtnFlag = false;
	try{
		$.ajax({
			url: "/api/push/isImgtechAppVer",
			type: 'GET',
			async: false,
			dataType : 'json',
			success: function (data) {
				if(data.code == "1"){
					rtnFlag = true;
				}else{
					rtnFlag = false;
				}
			},
			error: function () {
				rtnFlag = false;
			}
		});
	} catch (e) {
		rtnFlag = false;
	}
	return rtnFlag;
};

//base64 Encryption
function b64(s) {
	  var key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	  var i = 0, len = s.length,
	      c1, c2, c3,
	      e1, e2, e3, e4,
	      result = [];
	 
	  while (i < len) {
	    c1 = s.charCodeAt(i++);
	    c2 = s.charCodeAt(i++);
	    c3 = s.charCodeAt(i++);
	   
	    e1 = c1 >> 2;
	    e2 = ((c1 & 3) << 4) | (c2 >> 4);
	    e3 = ((c2 & 15) << 2) | (c3 >> 6);
	    e4 = c3 & 63;
	   
	    if (isNaN(c2)) {
	      e3 = e4 = 64;
	    } else if (isNaN(c3)) {
	      e4 = 64;
	    }
	   
	    result.push(e1, e2, e3, e4);
	  }
	 
	  return result.map(function (e) { return key.charAt(e); }).join('');
}

//콤마찍기
function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

//콤마풀기
function uncomma(str) {
    str = String(str);
    return str.replace(/[^\d]+/g, '');
}

//브라우져사이즈 
var width_size = window.outerWidth;
var sChangedSize = "";
var sHost = location.host;

if (width_size > 979) {
	sChangedSize = "PC";
} else {
	//중학은 반응형 처리되면, 예외처리 삭제해야 함
	if(sHost.indexOf(".mid.")>0){
	  sChangedSize = "PC";	
	} else {
	  sChangedSize = "MB";
	}
	
}

//팝업 중앙 띄우기
function itemPopParam(popwidth, popheight) {
    var height = screen.height;
    var width = screen.width;

    var left = (width - popwidth) / 2;
    var top = (height - popheight) / 2;

    return ",top=" + top + ",left=" + left + ",width=" + popwidth + ",height=" + popheight;
}

//수식 처리

var currentMathEditor = '';
var currentMathImgID = '';

function editorMath(editor_element_id, mathimg_element_id, mathtextstr) {
    currentMathEditor = editor_element_id;
    currentMathImgID = mathimg_element_id;
    var mahtPopUri = '/matheditor/Edit';
    //PC모드 : 새창,  모바일모드 : 레이어팝업
    var sTarget = "mathWindowCommon";
    var winOption = "toolbar=no,location=no,directories=no,status=no,scrollbars=no,resizable=yes,copyhistory=no,menubar=no";
    if(sChangedSize == "PC"){
    	winOption += itemPopParam(865,480);
    } else {
    	sTarget = "mathEditPopIframe";
    }
    if (mathtextstr != "")
    {
    	mathtextstr = $(mathimg_element_id).attr("mathtextstr");
    	
    	var imgID = $(mathimg_element_id).attr("rawId","");
    	if ($(imgID).attr("rawId") == "")
        {
        	$(imgID).attr("rawId",getNewGuid());
    	}
    	
    	//일반게시판에서는 수식전달용 폼이 없어서 동적으로 생성해야 함
    	var form = document.createElement("form");
    	form.setAttribute("method","post");
    	form.setAttribute("target",sTarget);
    	form.setAttribute("name",  "mathPopParamForm");
    	form.setAttribute("id",    "mathPopParamForm");
    	document.body.appendChild(form);
    	
    	var input_id = document.createElement("input");  
    	input_id.setAttribute("type" ,"hidden");                 
    	input_id.setAttribute("name" ,"popmathtextstr");                        
    	input_id.setAttribute("id"   ,"popmathtextstr");                        
    	input_id.setAttribute("value", mathtextstr);                          
    	form.appendChild(input_id);
    	
    	var input_id2 = document.createElement("input");  
    	input_id2.setAttribute("type" ,"hidden");                 
    	input_id2.setAttribute("name" ,"DeviceMode");                        
    	input_id2.setAttribute("id"   ,"DeviceMode");                        
    	input_id2.setAttribute("value",sChangedSize);                          
    	form.appendChild(input_id2);

    	var input_id3 = document.createElement("input");  
    	input_id3.setAttribute("type" ,"hidden");                 
    	input_id3.setAttribute("name" ,"rawId");                        
    	input_id3.setAttribute("id"   ,"rawId");                        
    	input_id3.setAttribute("value",$(imgID).attr("rawId"));                          
    	form.appendChild(input_id3);

        if (form)
        {
        	document.getElementById("popmathtextstr").value = mathtextstr;
        	form.action = mahtPopUri;
            
            if(sChangedSize=="PC"){
            	var mathWindow = window.open("about:blank", "mathWindowCommon", winOption);
            	mathWindow.focus();
            	form.submit();
            } else {
            	$("#mathEditPopDIV").fadeIn('slow');
            	$("#mathEditPopDIV").css({'top':0,'left':0,'width':'100%','height':'100%'});
            	form.submit();
            } 
            document.body.removeChild(form);//생성했던 폼 삭제함
        }
    }
    else
    {
    	//일반게시판에서는 수식전달용 폼이 없어서 동적으로 생성해야 함
    	var form = document.createElement("form");
    	form.setAttribute("method","post");
    	form.setAttribute("target",sTarget);
    	form.setAttribute("name",  "mathPopParamForm");
    	form.setAttribute("id",    "mathPopParamForm");
    	document.body.appendChild(form);
    	
    	var input_id2 = document.createElement("input");  
    	input_id2.setAttribute("type" ,"hidden");                 
    	input_id2.setAttribute("name" ,"DeviceMode");                        
    	input_id2.setAttribute("id"   ,"DeviceMode");                        
    	input_id2.setAttribute("value",sChangedSize);                          
    	form.appendChild(input_id2);

    	if (form)
        {
        	form.action = mahtPopUri;
        	
        	if(sChangedSize=="PC"){
            	var mathWindow = window.open("about:blank", "mathWindowCommon", winOption);
            	mathWindow.focus();
            	form.submit();
            } else {
            	$("#mathEditPopDIV").fadeIn('slow');
            	$("#mathEditPopDIV").css({'top':0,'left':0,'width':'100%','height':'100%'});
            	form.submit();
            } 
            	
            document.body.removeChild(form);//생성했던 폼 삭제함
        }
    }
    scrollTo(0,0);
    return false;
}

//작업한 수식 입력
function ClosedMathPublic(imgTag, mathtextstr) {
	var frameName = "";
	
	//학습창 형태
	if ($('.iframe_inner > iframe').size()>0){
		frameName = '#'+$('.iframe_inner > iframe').attr("name"); 
	}
	
	//중학 일반페이지 아이프레임 하위에 있는 형태
	if($('#contentFrame').size()>0){ 
		frameName = '#contentFrame';
	}
	
	//수식변경모드일 경우 기존이미지 속성을 변경해버림
	if(currentMathImgID!=""){
		var obj = $('iframe[src="/js/board/sEditor/SmartEditor2Skin.html"]').contents().find("iframe[name=se2_iframe]").contents().find('img[rawId="'+$(currentMathImgID).attr("rawId")+'"]');
		if(typeof oEditors != 'undefined'){
			$(obj).attr("src"        ,$(imgTag).attr("src"));
			$(obj).attr("mathtextstr",$(imgTag).attr("mathtextstr"));
			$(obj).attr("rawId"      ,$(imgTag).attr("rawId"));
			
		} else {
			
			$(frameName).get(0).contentWindow.$('iframe[src="/js/board/sEditor/SmartEditor2Skin.html"]').contents().find("iframe[name=se2_iframe]").contents().find('img[rawId="'+$(currentMathImgID).attr("rawId")+'"]').attr("src"        ,$(imgTag).attr("src"));
			$(frameName).get(0).contentWindow.$('iframe[src="/js/board/sEditor/SmartEditor2Skin.html"]').contents().find("iframe[name=se2_iframe]").contents().find('img[rawId="'+$(currentMathImgID).attr("rawId")+'"]').attr("mathtextstr",$(imgTag).attr("mathtextstr"));
			$(frameName).get(0).contentWindow.$('iframe[src="/js/board/sEditor/SmartEditor2Skin.html"]').contents().find("iframe[name=se2_iframe]").contents().find('img[rawId="'+$(currentMathImgID).attr("rawId")+'"]').attr("rawId"      ,$(imgTag).attr("rawId"));
			
		}
		currentMathImgID = "";
	} else {
		if(null != imgTag && null != $("#questionLevel").val() && '' != $("#questionLevel").val() && 1 < $("#questionLevel").val()  ){
			var ctntarea = document.querySelector("#naver_editer").contentWindow.document.querySelector("iframe").contentWindow.document.querySelector(".se2_inputarea");
			if( -1 >= ctntarea.innerHTML.indexOf('답변 내용이 도움이 되었기를 바랍니다. 추가적으로 의문사항이 있으면 추가질문을 남겨주시기 바랍니다.') ){
				imgTag +='<p><br/></p> <br/> <p>답변 내용이 도움이 되었기를 바랍니다. 추가적으로 의문사항이 있으면 추가질문을 남겨주시기 바랍니다. </p> <br/><p>그럼 열공하세요^^</p>';
			}
		}
		//수식을 처음 입력하는 경우
		if(typeof oEditors != 'undefined'){
			oEditors.getById["postContent"].exec("PASTE_HTML", [imgTag]);
		} else {
			//oEditors 가 Iframe 내부에 있다면;;;;
			$(frameName).get(0).contentWindow.oEditors.getById["postContent"].exec("PASTE_HTML", [imgTag]);	
		}
	}
}

//난수키 생성
function getNewGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
}

function getUserId() {
	var userId = "";
	$.ajax({
		url: "/login/getUserId",
		type: 'POST',
		async: false,
		dataType : "json",
		success: function (data) {
			userId = data.userId;
		},
		error: function (e) {
			console.error(e);
		}
	});
	return userId ;
}

//text에디터에서 각종 태그 제외하고 텍스트만 추출
function getOnlyText(text) {
	var deleteTag = /<\/?[^>]+>/gi;// html 태그 제거
	var deleteText = /.nbsp;/gi;//nbsp; 제거
	returnText = text.replace(deleteTag,"");
	returnText = returnText.replace(deleteText,"");
	returnText = returnText.replace(/&amp;/g, "&");
	return returnText;
}

/* a tag가 있는지 화인
 * */
function checkATag(content, bbsId, bbsTypeId, siteDsCd) {
	var reg = /<a[^<]*<\/a>/g;

	if( 'PS' == siteDsCd && '17' == bbsTypeId ) {
		return false;
	}
	else {
		if (reg.test(content)) {
			alert('링크주소는 게시글 작성 시 입력할 수 없습니다.');
			return true;
		}
		else {
			return false;
		}
	}

}

// 학습플래너 해당 강의 학습여부 저장하기.
function setttingPlaner(courseId, stepId, lectureId){
	
	if(null != courseId && '' != courseId && null != stepId && '' != stepId && null != lectureId && '' != lectureId){
		$.ajax({
			headers: {
				"Accept": "application/json"
			},
			url : '/mypage/planner/settingMyPlanerDetlStudy',
			data : {'courseId' : courseId,'stepId' : stepId, 'lectureId':lectureId},
			dataType : 'json',
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			success:function(obj){
				
			},error : function(obj,http) {
				alert('처리되지 못했습니다.');
			}
		});
		
	}
}

/* 
 * 로그인되어 있는지 확인
 * */
function checkAuthenticatedUser(){
	var loginFlag = false;
	
	$.ajax({
		url: "/login/checkLogin",
		type: 'POST',
		async: false,
		dataType : "json",
		success: function (data) {
			loginFlag = data;
		},
		error: function (e) {
			console.error(e);
		}
	});

	if (!loginFlag) {
		if(confirm("로그인 후 이용하실 수 있습니다.")) {
			LoginFocus();
		}
		return;
	}
	
	return true;
}

// 앱 정보를 가져오기
window.isImgtechAppInfo = function(){
	var rtnMap;
	try{
		$.ajax({
			url: "/api/push/isImgtechAppInfo",
			type: 'GET',
			async: false,
			dataType : 'json',
			success: function (data) {
				if(data.code == "1"){
					rtnMap = data.resultMap;
				}else{
					rtnMap = null;
				}
			},
			error: function () {
				rtnMap = null;
			}
		});
	} catch (e) {
		rtnMap = null;
	}
	return rtnMap;
};

// postmessage receive 함수
function receivePostMsg(event) {
	if (event.data != '' && event.origin == 'https://cloud-enomix.ebs.co.kr') // 수신 허용 체크
	{
		switch (event.data.func) {
		case "resizing":
			var ifrmName = event.data.ifrmName; // 리사이징 할 iframe 이름
			var height = event.data.height; // 리사이징 할 iframe 높이
			document.getElementById(ifrmName).height = parseInt(height) + 100; // iframe height 리사이징
			break;
		case "login":
			LoginFocus();
			break;
		case "searchFaq":
			var nodeId = event.data.nodeId;
			var keyword = event.data.keyword;
			goFaqPage(nodeId, keyword);
			break;
		case "qnaMenu":
			var menu = event.data.menu;
			if (menu == 'TOTAL') {
				location.href = "/customer/frame?frameName=qna";
				
			} else {
				location.href = "/mypage/inquiry/erms/list";
			}
			break;
		case "qnaView":
			var ticketId = event.data.ticketId;
			var rnum = event.data.rnum;
			var pageName = event.data.pageName;
			location.href = "/mypage/inquiry/erms/list?ticketId="+ticketId+"&rnum="+rnum+"&pageName="+pageName;
			break;
		default:
			break;
		}
	}
}

var enomix = {
	iframeSubmit : function(targetForm, targetUrl){
		var ci;
		if(isLogin()){
			ci = this.getEncryptParam();
		}else{
			ci = "LOGOUT";
		}
		if(document.enomixForm){
			document.enomixForm.remove();
		}
		var enomixForm = document.createElement("form");
		enomixForm.setAttribute("name", "enomixForm");
		enomixForm.setAttribute("method", "Post");
	 	enomixForm.setAttribute("action", targetUrl);
		this.createInput(enomixForm, "ci", ci);
		document.body.appendChild(enomixForm);
		enomixForm.target = targetForm;
		enomixForm.submit();
	},
	createInput : function(frm, name, value){
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", name);
		hiddenField.setAttribute("value", value);
		frm.appendChild(hiddenField);
	},
	getEncryptParam: function(){
		var rtn = null;
		$.ajax( {
			url : "/login/getEncryptUser",
			type : 'GET', async : false, dataType : 'json',
			success : function(e){
				rtn = e.encTxt;
			},
			error : function(e){
				console.error(e);
			}
		});
		return rtn;
	}
}

function goStop(){
};


/**
 * 교재 구입 url 
 * @param isbn // isbn 키
 * @param courseId // 강좌 아이디
 * @param textbookPurchaseUrl // 구매 URL 
 * isbn키,강좌 아이디 , 구매 URL 이든하나는 필수로 필요하다
 */
function buyBookUrl(isbn,courseId,textbookPurchaseUrl,textBookId){
	// 교재 ELT 여부 조회
	var txbkEltYn = isTxbkEltYn(textBookId);

	if(isMobile() && '' != isbn ){
		var partnerCode = 'EMT';
		if(-1 < location.href.indexOf('primary')){
			partnerCode = 'EET';
		}
		var url =  "https://www.kyobobook.co.kr/product/detailViewKor.laf?barcode=" + isbn.trim() + "&LINK="+partnerCode;
		// ELT 교재일 경우 (교보문고에서 처리 전까지 임시 조치)
		if (txbkEltYn == "Y") {
			url = "https://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=ENG&barcode=" + isbn.trim();
		}
		if(null != textbookPurchaseUrl && '' != textbookPurchaseUrl && 'http://' != textbookPurchaseUrl){
			url = textbookPurchaseUrl;
		}
		var clicka = document.createElement("a");
		clicka.href = url ;
		clicka.target = "_blank";
		document.body.appendChild(clicka);
		clicka.click();
	}else{
		if(null != textbookPurchaseUrl && '' != textbookPurchaseUrl && 'http://' != textbookPurchaseUrl){
			window.open(textbookPurchaseUrl);	
		}else{
			if((null == isbn || '' == isbn) && (null == courseId || '' == courseId ) ){
				alert("교재가 없습니다.");
				return false;
			}else{
				// ELT 교재일 경우 (교보문고에서 처리 전까지 임시 조치)
				if (txbkEltYn == "Y") {
					window.open("https://www.kyobobook.co.kr/product/detailViewKor.laf?ejkGb=ENG&barcode=" + isbn.trim());
				} else {
					window.open("/rest/course/outGate2?isbn=" + isbn + "&courseId=" + courseId + "&returnUrl=");
				}
			}
		}
	}
}


/**
 * 교재 프리뷰 url 
 * @param siteDsCd // 사이트 코드
 * @param isbn // 
 */
function previewBookURL(siteDsCd,isbn){
	// 제휴 코드
	var partnerCode = "EMT";
	if(null != siteDsCd && 'PS' == siteDsCd){
		partnerCode = "EET";
	}
	var commonUrl = "http://www.kyobobook.co.kr/cooper/redirect_over.jsp?next_url=http://preview.kyobobook.co.kr/";
	if(isMobile()){
		commonUrl += "mkbrPreview.jsp?siteGb=INK&ejkGb=KOR&barcode="+isbn+"&loginYn=N&LINK="+partnerCode+"&isApp=true";
		location.href = commonUrl;
	}else{
		commonUrl += "preview.jsp?siteGb=INK&ejkGb=KOR&barcode="+isbn+"&loginYn=N&LINK="+partnerCode;
		window.open(commonUrl, "openpreview", "top=0 , left=0 ,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=1250,height=695");
	}	
}

/**
* : 파라미터에 포함된 이름의 값을 가져오는 함수
* @param name : 값을 가져올 파라미터 이름
 */
function getCommonParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



/**
    무료 프리패스 신청자 여부
*/

function isProperFreepassUser(){
    var resultString;
    $.ajax({
        url: "/premium/isProperFreepassUser",
        type: 'POST',
        async: false,
        data : {'ftcktProdId' : '504'},
        dataType : "json",
        success: function (data) {
            if(data.result == "fail"){
                resultString = data.result;
            }else{
                resultString = data.result;
            }
        },
        error: function (e) {
            console.error(e);
        }

    });

    return resultString;
}


/**
    환불 완료 여부
*/

function isReimbursedCompl(){
    var resultString;
    $.ajax({
        url: "/premium/isReimbursedCompl",
        type: 'POST',
        async: false,
        dataType : "json",
        success: function (data) {
            if(data.result == "fail"){
                resultString = data.result;
            }else{
                resultString = data.result;
            }
        },
        error: function (e) {
            console.error(e);
        }

    });

    return resultString;
}

/**
 * 무료 프리패스 신청 기간 연장 대상자
 *
 */

function isFreepassExtended(){
	var resultString;
	$.ajax({
		url: "/premium/isFreepassExtended",
		type: 'POST',
		async: false,
		dataType : "json",
		success: function (data) {
			resultString = data.result;
		},
		error: function (e) {
			console.error(e);
		}

	});

	return resultString;
}


/**
 * 교재 ELT 여부 조회
 * @param txbkId
 */
function isTxbkEltYn(txbkId) {
	var txbkEltYn = "N";

	if (txbkId != null && txbkId != "") {
		$.ajax({
			url: "/book/isTxbkEltYn",
			type: 'POST',
			async: false,
			data : {'txbkId' : txbkId},
			dataType : "json",
			success: function (data) {
				txbkEltYn = data.eltYn;
			},
			error: function (e) {
				console.error(e);
				txbkEltYn = "N";
			}
		});
	}

	return txbkEltYn;
}


/**
 * @param checkUrl
* URL 체크 용 소스 취약점 대뷔 설정
 */
function urlCheck(checkUrl){
	var flag = true;
	if(null != checkUrl && "" != checkUrl ){
		var testUrl = /(http(s)?:\/\/)/
		if( testUrl.test(checkUrl) ){
			var tempUrl =new URL(checkUrl);
			var tempArrayList = new Array();
			tempArrayList.push("mid.ebs.co.kr");
			tempArrayList.push("primary.ebs.co.kr");
			for(var i =0; i < tempArrayList.length;i++){
				if(-1 < tempUrl.hostname.indexOf(tempArrayList[i])){
					flag = true;
					break;
				}else{
					flag = false;
				}
			}
		}else if(-1 < checkUrl.indexOf("://")){
			flag = false;
		}
	}
	return flag;
}


/* XSS 변경 */
function replacelToXss(str){
str = str.replace(/\n/g,"<br />");
 str = str.replace(/</g,"&lt;");
 str = str.replace(/>/g,"&gt;");
 str = str.replace(/\"/g,"&quot;");
 str = str.replace(/\'/g,"&#39;");
 return str;
}

/*
	앱용으로 호출하는 모바일
	카카오톡이랑 클래스팅만
 */
function mobShortUrlFnApp(type,site) {
	
	var typeKorNm = "";
	switch(type){
		case "kakaotalk" :
			typeKorNm = "카카오톡으로";
			break;
		case "twitter" :
			typeKorNm = "트위터로";
			break;
		case "facebook" :
			typeKorNm = "페이스북으로";
			break;
		case "classting" :
			typeKorNm = "클래스팅으로";
			break;
		case "kakaoStory" :
			typeKorNm = "카카오스토리로";
			break;
		case "band" :
			typeKorNm = "밴드로";
			break;
		case "naver" :
			typeKorNm = "네이버로";
			break;
	}
	
	if (confirm( typeKorNm + " 공유하시겠습니까?" ) ){
		/* 
		 * URL 단축 API
		 * bitly API(https://app.bitly.com/)
		 * ID : gmkim6693
		 * token : 631e5771b000328db5157fd06740abd09663e8f1
		 * ID : doremipa1102@sharemind.kr
		 * token : d4db4933922f2edef14d51d7e1d83af100f4347a
		 */
		cUrl = document.URL;
		
		
			
			var nm = '초등';
			var thumbImg = $('meta[property="og:image"]').attr('content'); //og이미지 주소
			var siteUrl = 'primary.ebs.co.kr';
			var image = "https://cbox.ebs.co.kr/portal/event/2016/10/28/share_primid_logo.png";
			if(null != site && site == 'middle'){
				image = "https://cbox.ebs.co.kr/portal/event/2016/10/28/share_ebs.logo.png";
				nm = '중학';
				siteUrl = 'mid.ebs.co.kr';
			}
			
			if(null != thumbImg && '' != thumbImg){
					image = thumbImg;
			}
			
			var title = "";
			
			var description = "";
			if("kakaotalk" == type){
				
				var thumbTitle = $('meta[property="og:title"]').attr('content'); //og타이틀
				if(null != thumbTitle && '' != thumbTitle){
					title = thumbTitle;
					title = title.replace(/\.\./g,'');
					title = encodeURI(title );
				}
				
				var thumbDesc = $('meta[property="og:description"]').attr('content'); //og설
				if(null != thumbDesc && '' != thumbDesc){
					description = thumbDesc
					description = description.replace(/\.\./g,'');
					description = encodeURI(description );
				}
			}
			 
			
			// var url = location.protocol+"//"+location.hostname+"/appSnsShare?paramKey=type@"+type+";;site@"+site+";;imageUrl@"+image+";;cUrl@"+cUrl;
			var url = location.protocol+"//"+location.hostname+"/appSnsShare?paramKey=type@"+type+";;site@"+site+";;imageUrl@"+image+";;description@"+description+";;cUrl@"+cUrl+";;title@"+title; 
			 
			//var newWindow = window.open("about:blank");
			// newWindow.location.href = "/common/download/redirect?url="+url ;
			location.href = "/common/download/redirect?url="+url ;
			
			
		

	}
}


/**
 * 해당 문항코드 미리보기
 * @param premivewItempId : 미리보기용 아이템 아이디
 */
function openPreviewQuestion(premivewItempId,isNewAppYn){
	if(null != premivewItempId && '' != premivewItempId){
		// 중학
		var previewUrl = 'https://ai-plus.ebs.co.kr/mid/xip/landingExplanation.ebs?itemId=';
		if(window.location.host.indexOf("primary.ebs.co.kr") != -1){
			previewUrl = 'https://ai.ebs.co.kr/pri/xip/landingExplanation.ebs?itemId=';
		}
		previewUrl = previewUrl + premivewItempId;
		if(isNewAppYn && "Y" == isNewAppYn ){
			/*window.open("/common/download/redirect?url="+previewUrl);*/
			location.href="/common/download/redirect?url="+previewUrl
		}else{
			window.open(previewUrl, "openpreview", "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=500,height=670");
		}

	}else{
		alert("정상적인 방법으로 실행되지 않았습니다.");
	}
}